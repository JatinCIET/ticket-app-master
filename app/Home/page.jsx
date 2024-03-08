"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TicketCard from "../(components)/TicketCard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const{data:session}=useSession();
  const router =useRouter();

  useEffect(() => {
    if(!session){
      router.push("/Login")
    }
    const getTickets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/Tickets", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };

    getTickets();
  }, []);

  if (!tickets.length) {
    return <p>No tickets.</p>;
  }

  const uniqueCategories = [
    ...new Set(tickets.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    id={_index}
                    key={_index}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
