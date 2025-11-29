import { Button } from "./ui/button";

export default function LoginButton() {
  return (
    <>
      <Button>
        {/*
          i originally used a <Link> tag here but the next.js prefetching was throwing errors when
          clicking the button so i switched to an <a> tag for simplicity. hope that's fine
        */}
        <a href={`/api/auth/github`}>Sign in with GitHub</a>
      </Button>
    </>
  );
}
