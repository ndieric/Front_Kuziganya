

import React from "react";
import { redirect } from "next/navigation";
import DashBoard from "./DashBoard";

async function loadData () {
  const res = await fetch(`${process.env.ROOT_API}/dashboard`,{cache:"no-cache"});
  const data = res.json();
  // if(!data.ok)return
  return data;
};
export default async function Home() {
  if (typeof window !== "undefined") {
    const userStorage = localStorage.getItem("user");
    if (!userStorage) return redirect("/login");
  }

   const {response}  = await loadData()
  return <DashBoard resumee={response}/>;

}
