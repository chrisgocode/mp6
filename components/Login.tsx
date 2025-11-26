import { Button } from "./ui/button";

export default function LoginButton() {
  return (
    <>
      <Button>
        <a href={`/api/auth/github`}>Sign in with GitHub</a>
      </Button>
    </>
  );
}
