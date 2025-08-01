"use client";

import { registerables, Chart } from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Download,
  Trash,
  File,
  TrendingDown,
  TrendingUp,
  Droplet,
  HeartPulse,
} from "lucide-react";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import { Bloodtype } from "@mui/icons-material";
import { data2 } from "@/constants/graphdata";
import { getUser } from "@/actions/user/auth";
import Link from "next/link";

Chart.register(...registerables);

const arr = [
  {
    id: "1",
    icon: <Droplet size={35} color="blue" />,
    parameter: "Blood Pressure",
    value: "110/70",
    icon2: <TrendingUp color="green" />,
    description: "92% higher than last time",
  },
  {
    id: "2",
    icon: <HeartPulse size={35} color="blue" />,
    parameter: "Heart Rate",
    value: "85 BPM",
    icon2: <TrendingDown color="red" />,
    description: "5% lesser than last time",
  },
  {
    id: "3",
    icon: <MedicationLiquidIcon fontSize="large" color="primary" />,
    parameter: "Glucose Level",
    value: "75-90",
    icon2: <TrendingDown color="red" />,
    description: "20% lesser than last time",
  },
  {
    id: "4",
    icon: <Bloodtype fontSize="large" color="primary" />,
    parameter: "Blood Count",
    value: "9.456/ml",
    icon2: <TrendingDown color="red" />,
    description: "25% lesser than last time",
  },
];

const docs = [
  {
    id: "1",
    heading: "Medical Check Up Report",
    size: "2 Mb",
  },
  {
    id: "2",
    heading: "Blood Count Report",
    size: "4 Mb",
  },
  {
    id: "3",
    heading: "Glucose Level Report",
    size: "12 Mb",
  },
];

const Card = ({ img1, img2, name, val, desc }) => (
  <div className="bg-white/60 shadow-sm w-full max-w-[300px] p-5 rounded-xl flex flex-col items-center transition hover:shadow-lg m-2">
    {img1}
    <h4 className="text-xl md:text-2xl font-bold text-indigo-900 mt-4">
      {name}
    </h4>
    <p className="text-violet-600 text-lg md:text-xl mt-2">{val}</p>
    <div className="flex items-center mt-2">
      {img2}
      <p className="text-xs text-gray-400 ml-1">{desc}</p>
    </div>
  </div>
);

const Doc = ({ heading, size }) => (
  <div className="flex justify-between items-center p-3 rounded-lg bg-violet-50 my-2 hover:bg-violet-100 transition">
    <div className="flex items-center">
      <File className="mr-3" size={28} color="blue" />
      <div>
        <h4 className="font-semibold text-[16px] text-gray-900">{heading}</h4>
        <p className="text-xs text-gray-500">{size}</p>
      </div>
    </div>
    <div className="flex gap-4">
      <button aria-label="Delete Document" title="Delete">
        <Trash className="hover:text-red-600 transition" />
      </button>
      <button aria-label="Download Document" title="Download">
        <Download className="hover:text-green-600 transition" />
      </button>
    </div>
  </div>
);

const Graph = ({ data }) => (
  <div className="w-full h-60 md:h-72 lg:h-96">
    <Line options={{ maintainAspectRatio: false }} data={data} />
  </div>
);

const page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const response = await getUser();
      if (response) {
        setUser(response.user);
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-8 text-lg text-indigo-500 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-teal-50 to-violet-100 p-4 md:p-8">
      {/* Welcome/Profile Row */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 items-center md:items-stretch">
        <div className="flex-1 flex flex-col justify-center p-6 rounded-2xl bg-indigo-500 text-white shadow-md items-start">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Welcome {user.name}!
          </h2>
          <p className="opacity-90 mb-4">
            Lets check your health with us.
            <br />
            Care with your health from now to get better health
          </p>
          <Link href="/dashboard/doctors" passHref legacyBehavior>
            <button className="bg-gradient-to-tr from-cyan-400 via-sky-400 to-indigo-400 hover:from-pink-500 hover:to-orange-400 rounded-full px-6 py-2 text-white font-semibold shadow-lg transition-transform hover:scale-105">
              Connect to Doctor
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center w-full max-w-[260px] bg-white/80 rounded-2xl shadow-md p-4">
          <h4 className="text-xl font-bold text-gray-700 mb-3">Profile</h4>
          <img
            className="h-20 w-20 rounded-full border-4 border-indigo-200 object-cover bg-indigo-100 mb-2"
            src={user.profile_pic}
            alt="profile"
            loading="lazy"
          />
          <h5 className="font-bold text-lg mb-1">{user.name}</h5>
          <p className="text-gray-500 text-sm">Hello guys</p>
        </div>
      </div>

      {/* Health Stat Cards */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {arr.map(({ id, icon, icon2, parameter, value, description }) => (
          <Card
            key={id}
            img1={icon}
            img2={icon2}
            name={parameter}
            val={value}
            desc={description}
          />
        ))}
      </div>

      {/* Graph and Documents Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* Performance Graph */}
        <div className="flex-1 bg-white/90 rounded-2xl shadow p-6 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-indigo-700">
                Performance Heart Rate
              </h3>
              <p className="text-xs md:text-sm text-gray-400">
                1-3 December 2023
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-violet-800 text-lg font-bold">72 bpm</span>
              <span className="text-gray-400 text-xs">Average</span>
            </div>
          </div>
          <Graph data={data2} />
        </div>

        {/* Documents */}
        <div className="flex-1 bg-white/90 rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-indigo-700">
                Health Reports Document
              </h3>
              <p className="text-xs md:text-sm text-gray-400">
                5-7 December 2023
              </p>
            </div>
            <span className="text-violet-600 text-sm font-semibold cursor-pointer hover:underline">
              View All
            </span>
          </div>
          <div className="overflow-y-auto max-h-72">
            {docs.map(({ id, heading, size }) => (
              <Doc key={id} heading={heading} size={size} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

// "use client";
// import { registerables, Chart } from "chart.js";

// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";

// import { Download } from "lucide-react";
// import { Trash } from "lucide-react";
// import { File } from "lucide-react";
// import { TrendingDown } from "lucide-react";
// import { TrendingUp } from "lucide-react";
// import { Droplet } from "lucide-react";
// import { HeartPulse } from "lucide-react";
// import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
// import { Bloodtype } from "@mui/icons-material";
// import { data2 } from "@/constants/graphdata";
// import { timeLabels } from "@/constants/graphdata";
// import { getUser } from "@/actions/user/auth";
// import Link from "next/link";

// Chart.register(...registerables);

// const arr = [
//   {
//     id: "1",
//     icon: <Droplet size={35} color="blue" />,
//     parameter: "Blood Pressure",
//     value: "110/70",
//     icon2: <TrendingUp color="green" />,
//     description: "92% higher than last time",
//   },
//   {
//     id: "2",
//     icon: <HeartPulse size={35} color="blue" />,
//     parameter: "Heart Rate",
//     value: "85 BPM",
//     icon2: <TrendingDown color="red" />,
//     description: "5% lesser than last time",
//   },
//   {
//     id: "3",
//     icon: <MedicationLiquidIcon fontSize="large" color="primary" />,
//     parameter: "Glucose Level",
//     value: "75-90",
//     icon2: <TrendingDown color="red" />,
//     description: "20% lesser than last time",
//   },
//   {
//     id: "4",
//     icon: <Bloodtype fontSize="large" color="primary" />,
//     parameter: "Blood Count",
//     value: "9.456/ml",
//     icon2: <TrendingDown color="red" />,
//     description: "25% lesser than last time",
//   },
// ];

// const docs = [
//   {
//     id: "1",
//     heading: "Medical Check Up Report",
//     size: "2 Mb",
//   },
//   {
//     id: "2",
//     heading: "Blood Count Report",
//     size: "4 Mb",
//   },
//   {
//     id: "3",
//     heading: "Glucose Level Report",
//     size: "12 Mb",
//   },
// ];

// const Card = (props) => {
//   return (
//     <div className="bg-white w-1/5 h-48 p-[1rem] rounded-[0.4rem]">
//       {props.img1}
//       <h4 className="text-2xl font-bold text-black-300 mt-[2rem]">
//         {props.name}
//       </h4>
//       <p className="text-violet-500 text-xl mt-[0.5rem]">{props.val}</p>
//       <div className="flex mt-[0.5rem]">
//         {props.img2}
//         <p className="text-sm text-grey-200 ml-[0.2rem]">{props.desc}</p>
//       </div>
//     </div>
//   );
// };

// const Graph = ({ data }) => {
//   return <Line className="w-ful rounded-lg h-fit" data={data} />;
// };

// const Doc = (props) => {
//   return (
//     <div className="flex justify-between mt-5">
//       <div className="flex mt-5">
//         <File className="mr-[1rem]" size={35} color="blue" />
//         <div>
//           <h4 className="font-bold text-md text-black">{props.heading}</h4>
//           <p className="text-sm text-grey-200">{props.size}</p>
//         </div>
//       </div>
//       <div className="flex w-[6rem] justify-between">
//         <Trash />
//         <Download />
//       </div>
//     </div>
//   );
// };

// const page = () => {
//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUserData = async () => {
//       const response = await getUser();
//       if (response) {
//         console.log(response.user);
//         setUser(response.user);
//         setLoading(false);
//       }
//     };
//     getUserData();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <div className="text-center mt-[2rem]">Loading...</div>
//       ) : (
//         <div className=" bg-blue-50 h-[100%] w-[85vw]">
//           {/* <h3 className=" text-2xl text-state-900">Dashboard</h3> */}
//           <div className="flex justify-around pt-4">
//             <div className="w-3/4 h-48 pt-[1.5rem] pl-[10rem] border-4 border-indigo-500 bg-indigo-500 rounded-md">
//               <h2 className="text-white text-4xl">Welcome {user.name}!</h2>
//               <p className="text-white text-s mt-[0.5rem] mb-[0.5rem]">
//                 Lets check your health with us. Care with <br />
//                 your health from now to get better health
//               </p>
//               <button className="text-white text-center bg-sky-300 rounded-[0.3rem] h-[2.4rem] pl-[0.5rem] pr-[0.5rem] ">
//                 <Link href="/dashboard/doctors">Connect to Doctor</Link>
//               </button>
//             </div>
//             <div className="w-1/5 h-48 ml-[1rem] bg-white rounded-[0.4rem] p-[1.5rem]">
//               <h4 className="text-black-300 text-xl font-bold">Profile</h4>
//               <div className="ml-[6rem] mt-[1rem]">
//                 <img
//                   className="h-[4rem] w-[4rem] rounded-[50%] border-red-400 bg-green-400 "
//                   src={user.profile_pic}
//                   alt="profile"
//                 />
//                 <h5 className="text-m font-bold ">{user.name}</h5>
//                 <p>Hello guys</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-evenly mt-[3rem]">
//             {arr.map((item) => (
//               <Card
//                 key={item.id}
//                 id={item.id}
//                 img1={item.icon}
//                 img2={item.icon2}
//                 name={item.parameter}
//                 val={item.value}
//                 desc={item.description}
//               />
//             ))}
//           </div>
//           <div className="mt-[3rem] flex m-3 h-[47%] ">
//             <div className="w-1/2 h-[100%] ml-[1rem] bg-white rounded-[0.4rem] p-[1rem] ">
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="text-2xl font-bold">Performance Heart Rate</h3>
//                   <p className="text-sm text-grey-200">1-3 December 2023</p>
//                 </div>
//                 <div>
//                   <div className="flex justify-between h-[3rem] p-2 bg-violet-50 items-center">
//                     <p className="text-violet-800 text-xl text-bold">72 bmp</p>
//                     <p className="ml-2 text-grey-300 text-md">Average</p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <Graph data={data2} />
//               </div>
//             </div>
//             <div className="w-1/2 h-[100%] bg-white rounded-[0.4rem] p-[1rem] ml-[1rem]">
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="text-2xl font-bold">
//                     Health Reports Document
//                   </h3>
//                   <p className="text-sm text-grey-200">5-7 December 2023</p>
//                 </div>
//                 <p className="text-violet-500 text-md">View All</p>
//               </div>
//               <div className="mt-[1rem]">
//                 {docs.map((item) => (
//                   <Doc key={item.id} heading={item.heading} size={item.size} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default page;
