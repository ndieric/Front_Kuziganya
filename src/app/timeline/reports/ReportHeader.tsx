"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { HiOutlineUserAdd, HiOutlineRefresh } from "react-icons/hi";
// import InputSearchComponent from "../common/InputSearchComponent";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FormattedMessage } from "react-intl";

type AppProps = {
  value?: string;

  handleClickOpenCreateDialog: () => void;
  handleClear?: () => void;
};

export default function ReportHeader() {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(e.target.value);
  return (
    <Box
      sx={{
        // backgroundColor: `background.paper`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "flex-end",
        padding: "1rem 0.3rem",
        gap: "10px",
      }}
    >
      {/* CREATE NEW MEMBER BOTTOM */}
      <Box
        sx={{
          display: "flex",
          justifyContents: "center",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          width: { xs: "100%", sm: "auto" },
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Link
          href={`/timeline/cotisation?page=${0}&size=${10}`}
          className="py-2 border-mainColor border-solid border   opacity-75 hover:opacity-100 px-3  rounded text-mainColor flex items-center justify-center gap-1 w-full  font-medium transition-all  "
        >
          <HiOutlineRefresh fontSize={16} /> <FormattedMessage id="relaod" />
        </Link>
      
      </Box>
    </Box>
  );
}
