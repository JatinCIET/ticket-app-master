// Nav.js
"use client"
import { faHome, faTicket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/Home">
          <FontAwesomeIcon icon={faHome} className="text-white" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="text-white" />
        </Link>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <SessionProvider>
          <Link href="/signout">
            <FontAwesomeIcon icon={faRightFromBracket} className="text-white" />
          </Link>
        </SessionProvider>
      </div>
    </nav>
  );
};

export default Nav;
