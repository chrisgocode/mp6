import ProfileCard from "@/components/ProfileCard";
import getUserById from "@/lib/getUserById";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div>ID not found</div>
      </div>
    );
  }

  const user = await getUserById(id);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <ProfileCard />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <ProfileCard user={user} />
    </div>
  );
}
