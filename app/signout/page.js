// SignOut.js
"use client"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If there's no active session, redirect to the home page
    if (!session) {
      router.push("/Login");
    }
  }, [session, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/Login"); // Redirect to the home page after signing out
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {session ? (
        <div className="text-center">
          <p className="text-xl mb-4">Hello, {session.user.name}!</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
