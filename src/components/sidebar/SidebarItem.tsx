'use client'
import React from "react";
import { usePathname } from 'next/navigation'
 
import { Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

import { SidebarItemType } from "./SidebarData";

const SidebarItem = ({
  item,
  expand,
}: {
  item: SidebarItemType;
  expand: boolean;
}) => {
  const  pathname  = usePathname();
  const isActive = pathname === item.href;
  return (
    <Tooltip title={`${item?.linkName}`}>
      <Link href={item.href}>
        <Stack direction="row" width={expand?"12rem":"20rem"} spacing={{xs:1,sm:2}}  sx={{backgroundColor:isActive?'green':'inherit'}} padding="0.4rem 1rem">
          {item?.icon} <Typography sx={{visibility:expand?'visible':'hidden',textAlign:"center"}} gutterBottom={false} paragraph>{item.linkName}</Typography>
        </Stack>
      </Link>
    </Tooltip>
  );
};

export default SidebarItem;
