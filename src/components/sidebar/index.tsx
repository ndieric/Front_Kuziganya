import React from "react";
import SidebarItem from "./SidebarItem";
import Stack from "@mui/material/Stack";
import { sidebarData, SidebarItemType } from "./SidebarData";
import { Box, Button, IconButton } from "@mui/material";
import {HiLogout,HiMenu} from "react-icons/hi"


function index() {
  return (
    <Stack
      minHeight="100vh"
      spacing={{ xs: 1, sm: 2 }}
      direction="column"
      justifyContent="space-between"
      position="sticky"
      top="0"
      alignItems="inherit"
      paddingTop="7rem"
      sx={{ backgroundColor: "#055E68", color: "#B9D2D2" }}
      display="flex"

    >
      <IconButton>

      <HiMenu size={30}/>
      </IconButton>
      <Box >
      {sidebarData.map((data: SidebarItemType) => (
        <SidebarItem item={data} expand={true} key={data?.href} />
      ))}

      </Box>
     
       <Box>
        <Button variant="contained" color="error" startIcon={<HiLogout size={23}/>}>
          
       se deconnecter
        </Button>
      </Box>
    </Stack>
  );
}

export default index;
