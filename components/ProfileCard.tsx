import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/lib/types";
import Image from "next/image";

export default async function ProfileCard({ user }: { user?: User }) {
  // trying out the shadcn loading skeleton
  // /profile?id=69266fe08349d7db6ccb3ee5
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 text-sm">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={user.avatar_url}
            alt={user.username}
            width={64}
            height={64}
            loading="eager" // console was complaining about setting this to eager
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>{user.username}</CardTitle>
            <CardDescription>
              Joined {new Date(user.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6 text-sm">
          <div>
            <span className="font-semibold">{user.public_repos}</span> repos
          </div>
          <div>
            <span className="font-semibold">{user.followers}</span> followers
          </div>
          <div>
            <span className="font-semibold">{user.following}</span> following
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
