import React from "react";


import { ISearchParams } from "@/types";

import { redirect } from "next/navigation";
import { IUser, MemberType } from "../../../../types";
import ListOfCredits from "./ListOfCredits";


interface ListOfCotisationsProps {
  contributions: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}
// "montant":10000,
//   "codeTransaction":"732456456546456546",
//   "membreId":1
const loadCredits = async ({ page, size, direction ,token}: ISearchParams ) => {
  // const res = await fetch(
  //       `${process.env.ROOT_API}/credits?page=${page}&size=${size}&direction=${direction}&sortBy=nom`,{
  //         cache:"no-cache",next:{
  //         tags:["cotisations"]
  //       },
  //       headers:{
  //         "Authorization":`Bearer ${token}`
  //       }
  //     }
  //     );
  const res = await fetch(
        `${process.env.ROOT_API}/credits`,{
          cache:"no-cache",next:{
          tags:["credits"]
        },
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
      );
      if(!res.ok)return
      return res.json();
};


export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined | "ASC" | "DESC";
  };
}) {
  let userStorage:IUser={
    id:"",
    prenom:"",
    nom:"",
    email:"",
    role:"",
    token:""
  }
  if(typeof window !== 'undefined'){

    userStorage=JSON.parse(localStorage.getItem("user")!)
    if (!userStorage) redirect("/login");
  }
  // const session = await getServerSession(authOptions);
 
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams?.page) : 0;
  const size =
    typeof searchParams?.size === "string" ? Number(searchParams?.size) : 10;
  const direction =
    searchParams?.direction === "DESC" ? searchParams?.direction : "ASC";

  const contributions: ListOfCotisationsProps = await loadCredits({
    page,
    size,
    direction,
    token:userStorage?.token!
  })

  return <ListOfCredits credits={contributions} />;
}
