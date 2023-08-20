"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useRouter,usePathname,useSearchParams } from "next/navigation";
import Login from "./login/page";

export default function Home() {
  
   const pathname = usePathname()
  const searchParams = useSearchParams()
   useEffect(() => {
      const url = pathname + searchParams.toString()
      // sendSomewhere(url)
      console.log("url:",pathname,searchParams.toString())
   }, [pathname, searchParams])

  return (
    <Box >
      
      <Login/>
      {/* <Button variant="outlined" color="primary" size="small" href="/timeline">
        {" "}
        go straigth to the home page
      </Button> */}
    </Box>
  );
}
