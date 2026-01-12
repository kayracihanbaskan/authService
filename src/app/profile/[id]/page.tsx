export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-2xl p-2 bg-orange-500 rounded-3xl font-mono ">Profile Page {id}</p>
    </div>
  );
}
