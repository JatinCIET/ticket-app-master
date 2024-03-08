"use Client"
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();

  return <div>{session?.user?.name}</div>;
};

export default UserInfo;
