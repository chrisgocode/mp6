import { getUsersCollection } from "@/db";
import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // extracts code from url
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    console.error("No code received");
  }

  try {
    // exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description);
    }

    // get user info
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // console.log(userData);

    if (!userData.id) {
      throw new Error("User ID not found");
    }

    const user: User = {
      github_id: userData.id,
      username: userData.login,
      avatar_url: userData.avatar_url,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
    };

    const usersCollection = await getUsersCollection();

    // check if user already exists
    const existingUser = await usersCollection.findOne({
      githubId: userData.id,
    });

    let userId: string;
    if (existingUser) {
      // user exists, use their existing ID
      console.log("user exists");
      userId = existingUser._id.toHexString();
    } else {
      // user doesn't exist, insert new user
      console.log("user doesn't exist");
      const res = await usersCollection.insertOne(user);
      if (!res.acknowledged) {
        throw new Error("Failed to insert user");
      }
      userId = res.insertedId.toHexString();
    }

    // redirect to our profile route with user id in the url
    // is there a better way to do this?
    const params = new URLSearchParams({
      id: userId,
    });

    return NextResponse.redirect(new URL(`/profile?${params}`, request.url));
  } catch (error) {
    console.error("OAuth error:", error);
  }
}
