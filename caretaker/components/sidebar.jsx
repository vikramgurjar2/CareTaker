"use client";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

import {
  ClipboardPlus,
  Stethoscope,
  LayoutDashboard,
  CircleUserRound,
  History,
  LogOut,
  BotMessageSquare,
  MessagesSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/user/auth";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "User",
    icon: CircleUserRound,
    href: "/dashboard/user",
    color: "text-violet-500",
  },
  {
    label: "Doctors",
    icon: Stethoscope,
    href: "/dashboard/doctors",
    color: "text-pink-500",
  },
  // {
  //   label: "Conversations",
  //   icon: MessagesSquare,
  //   href: "/conversations",
  //   color: "text-orange-500",
  // },
  {
    label: "ChatBot",
    icon: BotMessageSquare,
    href: "/chatbot",
    color: "text-pink-500",
  },

  {
    label: "Documents",
    icon: ClipboardPlus,
    href: "/documents",
    color: "text-yellow-500",
  },
  {
    label: "History",
    icon: History,
    href: "/history",
    color: "text-emerald-500",
  },
  {
    label: "Log Out",
    icon: LogOut,
    href: "/",
    color: "text-red-500",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="space-y-4 py-4 flex flex-col h-[100vh] bg-[#111827] text-white w-[100%]">
      <div className="px-3 py-2 flex-1 ">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-8">
            <Image src="/logo.png" alt="Logo" fill />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Caretakr
          </h1>
        </Link>
        <div className="space-y-2 ">
          {routes.map((route, i) => (
            <Link
              onClick={() => {
                if (i == 6) {
                  handleLogout();
                }
              }}
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm md:text-xl group flex p-4 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
