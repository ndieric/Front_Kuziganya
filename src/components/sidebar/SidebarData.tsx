import React from "react";
import {
    HiCog,
    HiDesktopComputer,
    HiHome,
    HiOutlineUsers,
    HiShoppingCart,
    

    HiUsers,
    HiViewGrid,
} from "react-icons/hi";
export type SidebarItemType=
      {
        href: string ,
        linkName: string ,
        icon: React.ReactNode,
        priveleges: string[],
    }


export const sidebarData:SidebarItemType[] = [
    {
        href: "/timeline",
        linkName: "Dashboard",
        icon: <HiHome size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/membres",
        linkName: "Membre",
        icon: <HiOutlineUsers size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/cotisation",
        linkName: "Cotisation",
        icon: <HiDesktopComputer size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/credit",
        linkName: "credit",
        icon: <HiViewGrid size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager"],
    },
    {
        href: "/timeline/remboursement",
        linkName: "Remboursement",
        icon: <HiShoppingCart size={20} />,
        priveleges: ["SuperAdmin", "Admin", "StockManager", "Salesman"],
    },
    {
        href: "/timeline/settings",
        linkName: "Parametres",
        icon: <HiCog size={20} />,
        priveleges: ["SuperAdmin"],
    },
   
];