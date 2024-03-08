 "use client"

import { useSession } from "next-auth/react";
import EditTicketForm from "../../(components)/Editticket";
import { useRouter } from "next/navigation"; // Corrected import statement

const getTicketById = async (id, session) => {
  const router = useRouter();

  if (!session) {
    router.push("/Login");
    return null;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ticket");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const TicketPage = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const EDITMODE = params.id !== "new";

  if (!session) {
    router.push("/Login");
    return null;
  }

  const updateTicketData = EDITMODE ? getTicketById(params.id, session) : { _id: "new" };

  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
