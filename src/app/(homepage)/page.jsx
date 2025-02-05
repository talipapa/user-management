'use server'

import { fetchUsers } from "./_action";
import { getUser } from "@/lib/session";
import ClientWrapper from "./_components/Admin/ClientWrapper";

export default async function page() {
  const users = await fetchUsers();
  const currentUser = await getUser();


  return (
    <ClientWrapper users={users} currentUser={currentUser}/>
  );
}
