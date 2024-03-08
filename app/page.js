import { getServerSession, AuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import Login from "../app/Login/page";
export default async function Home() {
  const session = await getServerSession(AuthOptions);

  if (session) redirect("/Home");

  return (
    <main>
      <Login/>
    </main>
  );
}
