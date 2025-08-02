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
    color: "text-cyan-400",
  },
  {
    label: "User",
    icon: CircleUserRound,
    href: "/dashboard/user",
    color: "text-purple-400",
  },
  {
    label: "Doctors",
    icon: Stethoscope,
    href: "/dashboard/doctors",
    color: "text-pink-400",
  },
  {
    label: "ChatBot",
    icon: BotMessageSquare,
    href: "/chatbot",
    color: "text-pink-400",
  },
  {
    label: "Documents",
    icon: ClipboardPlus,
    href: "/documents",
    color: "text-yellow-400",
  },
  {
    label: "History",
    icon: History,
    href: "/history",
    color: "text-emerald-400",
  },
  {
    label: "Log Out",
    icon: LogOut,
    href: "/",
    color: "text-red-400",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex flex-col h-screen w-72 bg-gray-900 shadow-lg select-none">
      <div className="flex items-center px-6 py-5 border-b border-gray-700">
        <div className="relative w-10 h-10 mr-3">
          <Image
            src="/logo.png"
            alt="Caretakr Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1
          className={cn(
            "text-3xl font-extrabold text-white",
            montserrat.className
          )}
        >
          Caretakr
        </h1>
      </div>

      <ul className="flex flex-col flex-grow px-4 py-6 space-y-2 overflow-y-auto">
        {routes.map((route, i) => {
          const isActive = pathname === route.href;

          // Special case for Logout (index 6)
          const onClickHandler = () => {
            if (i === 6) {
              handleLogout();
            }
          };

          return (
            <li key={route.href}>
              <Link
                href={route.href}
                onClick={onClickHandler}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 font-semibold text-sm md:text-base",
                  isActive
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-cyan-700 hover:text-white",
                  "focus:outline-none focus:ring-2 focus:ring-cyan-500"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <route.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive
                      ? route.color.replace("-400", "-300")
                      : "text-gray-400"
                  )}
                />
                <span className="truncate">{route.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="px-6 py-4 border-t border-gray-700 text-gray-400 text-xs text-center select-text">
        &copy; 2025 Caretakr. All rights reserved.
      </div>
    </nav>
  );
};

export default Sidebar;

// "use client";

// import { Montserrat } from "next/font/google";
// import { cn } from "@/lib/utils";

// import {
//   ClipboardPlus,
//   Stethoscope,
//   LayoutDashboard,
//   CircleUserRound,
//   History,
//   LogOut,
//   BotMessageSquare,
//   MessagesSquare,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { logout } from "@/actions/user/auth";

// const montserrat = Montserrat({
//   weight: "600",
//   subsets: ["latin"],
// });

// const routes = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     href: "/dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "User",
//     icon: CircleUserRound,
//     href: "/dashboard/user",
//     color: "text-violet-500",
//   },
//   {
//     label: "Doctors",
//     icon: Stethoscope,
//     href: "/dashboard/doctors",
//     color: "text-pink-500",
//   },
//   // {
//   //   label: "Conversations",
//   //   icon: MessagesSquare,
//   //   href: "/conversations",
//   //   color: "text-orange-500",
//   // },
//   {
//     label: "ChatBot",
//     icon: BotMessageSquare,
//     href: "/chatbot",
//     color: "text-pink-500",
//   },

//   {
//     label: "Documents",
//     icon: ClipboardPlus,
//     href: "/documents",
//     color: "text-yellow-500",
//   },
//   {
//     label: "History",
//     icon: History,
//     href: "/history",
//     color: "text-emerald-500",
//   },
//   {
//     label: "Log Out",
//     icon: LogOut,
//     href: "/",
//     color: "text-red-500",
//   },
// ];

// const Sidebar = () => {
//   const pathname = usePathname();
//   const handleLogout = async () => {
//     await logout();
//   };
//   return (
//     <div className="space-y-4 py-4 flex flex-col h-[100vh] bg-[#111827] text-white w-[100%]">
//       <div className="px-3 py-2 flex-1 ">
//         <Link href="/dashboard" className="flex items-center pl-3 mb-14">
//           <div className="relative w-8 h-8 mr-8">
//             <Image src="/logo.png" alt="Logo" fill />
//           </div>
//           <h1 className={cn("text-2xl font-bold", montserrat.className)}>
//             Caretakr
//           </h1>
//         </Link>
//         <div className="space-y-2 ">
//           {routes.map((route, i) => (
//             <Link
//               onClick={() => {
//                 if (i == 6) {
//                   handleLogout();
//                 }
//               }}
//               href={route.href}
//               key={route.href}
//               className={cn(
//                 "text-sm md:text-xl group flex p-4 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
//                 pathname === route.href
//                   ? "text-white bg-white/10"
//                   : "text-zinc-400"
//               )}
//             >
//               <div className="flex items-center flex-1">
//                 <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
//                 {route.label}
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
