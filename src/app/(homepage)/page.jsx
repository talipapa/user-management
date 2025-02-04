'use client'
import Image from "next/image";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { fetchUsers } from "./_action";

export default function Home() {
  const [users, setUsers] = useState([])



  useEffect(() => {
    fetchUsers()
      .then((res) => {
        if (res.length <= 0){
          console.warn("No users found")
        }
        setUsers(res)
      })
      .catch((err) => {
        console.error(err)
      })

  }, [])
  return (
    <div className="w-full lg:w-[70%] bg-slate-50 lg:shadow-xl lg:rounded-3xl px-8 py-6">
      <Table users={users}/>
    </div>
  );
}
