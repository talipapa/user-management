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
        if (res === 404){
          console.warn("No users found")
        }
        setUsers(res)
      })
      .catch((err) => {
        console.error(err)
      })

  }, [])
  return (
    <div>
      <Table/>
    </div>
  );
}
