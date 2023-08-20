import React from "react";
// import Box from "@mui/material/Box";
import ListOfMembers from "@/app/timeline/membres/ListOfMembers";
import { ISearchParams, MemberType } from "@/types";
<<<<<<< HEAD
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";
=======
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956

interface ListOfMembersProps {
  members: any;
  handleClickOpenCreateDialog: (member: MemberType) => void;
}

<<<<<<< HEAD
const loadMembers = async ({ page, size, direction }: ISearchParams) => {
  try {
    const res = await fetch(
      `${process.env.ROOT_API}/membres?page:${page}&size:${size}&direction:${direction}&sortBy=nom`
    );
    if (!res.ok) throw Error("Failed to fetch");
    return res.json();
  } catch (err) {
    throw new Error("Error accure");
  }
};

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined | "ASC" | "DESC";
  };
}) {
  const session = await getServerSession(authOptions);
  // GET PARAMS
  /**  page:string
    size:number
    direction:'ASC' | 'DESC' */
  if (!session) redirect("/login");
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams?.page) : 0;
  const size =
    typeof searchParams?.size === "string" ? Number(searchParams?.size) : 10;
  const direction =
    searchParams?.direction === "DESC" ? searchParams?.direction : "ASC";

  const members: ListOfMembersProps = await loadMembers({
    page,
    size,
    direction,
  });

  return <ListOfMembers members={members} />;
=======
const loadMembers=async({page,size,direction}:ISearchParams)=>{
  try{
   const res=await fetch(`${process.env.ROOT_API}/membres?page:${page}&size:${size}&direction:${direction}&sortBy=nom`)
  if(!res.ok)throw Error("Failed to fetch")
  return res.json()

 }catch(err){
   throw new Error("Error accure")
 }
}

export  default async function Home({searchParams}:{
  searchParams: { [key: string]: string | string[] | undefined | "ASC" | "DESC" }
}) {

// GET PARAMS
/**  page:string
    size:number
    direction:'ASC' | 'DESC' */
const page=typeof searchParams?.page === 'string' ?Number(searchParams?.page):0
const size=typeof searchParams?.size === 'string' ?Number(searchParams?.size):10
const direction= searchParams?.direction === 'DESC'?searchParams?.direction:'ASC'


  const members:ListOfMembersProps=await loadMembers({page,size,direction})
  
  // const [open, setOpen] = useState<boolean>(false);
  // const [member, setMember] = useState({
  //   id: "",
  //   nom: "",
  //   email: "",
  //   contact: "",
  //   password: "",
  // });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setFilterValue(e.target.value);
  // // const handleClear = () => setFilterValue("");
  // const [members, setMembers] = useState([])
  // const handleClickOpenCreateDialog = (member?:MemberType) => {
  //   if(member)
  //   setMember(()=>member)
  //   setOpen(true)
  // };
  return (
    // <Box sx={{ width: "100%" }}>
     
      <ListOfMembers members={members} />
     
    // </Box>
  );
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956
}
