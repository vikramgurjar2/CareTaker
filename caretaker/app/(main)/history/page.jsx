"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { visitedDoctors } from "@/constants/visitedDoctor";
import { cn } from "@/lib/utils";
import { ClipboardPlus, Pill, Syringe, SquareActivity } from "lucide-react";
// import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import MedicationLiquidOutlinedIcon from "@mui/icons-material/MedicationLiquidOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import { CardContent } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const page = () => {
  const [avgvalue, setavgValue] = useState({});

  return (
    <div className=" bg-blue-50 h-screen w-[100vw] md:w-[85vw] flex overflow-auto flex-col">
      <div className="p-5 w-full  text-wrap ">
        <div className=" w-full  bg-white rounded-lg shadow-md">
          <div className=" flex justify-strat w-1/4 pt-2 pb-2  pl-2 rounded-lg mb-2">
            <ClipboardPlus size={30} />
            <h1 className="text-black-300 text-xl font-bold ml-4 ">
              Visited Doctors
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-around items-center p-2 rounded-lg pb-5">
            {visitedDoctors.map((doct) => (
              <Card className="  w-full hover:shadow-md transition cursor-pointer bg-teal-50 ">
                <div className="flex flew-row justify-start m-2 p-2">
                  <Image
                    className="object-cover overflow-hidden  bg-green-400 m-2 rounded-xl"
                    src={doct.img}
                    alt="Doctor Image"
                    width={120}
                    height={30}
                  />
                  <CardHeader>
                    <CardTitle className="pl-2 flex flex-col">
                      <span
                        className={cn(
                          "text-2xl font-semibold",
                          montserrat.className
                        )}
                      >
                        {doct.name}
                      </span>
                      <span
                        className={cn(
                          "text-base font-semibold",
                          montserrat.className,
                          " pb-2 rounded-full inline-block  "
                        )}
                      >
                        {doct.spec}
                      </span>
                      <span className="rounded-full   text-lg font-semibold text-black ">
                        Consulted For: {doct.consultedFor}
                      </span>
                      <span className="rounded-full   text-lg font-semibold text-black ">
                        Consulted Date: {doct.dateConsulted}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="pl-5 pr-5 pt-3 w-full  text-wrap  top-[8rem] h-fit">
        <div className="w-full  bg-white rounded-lg shadow-md">
          <div className="flex justify-strat w-1/4 pt-2 pb-2 pl-2 rounded-lg mb-2">
            <Pill size={25} />
            <h1 className="text-black-300 text-xl font-bold ml-4 ">
              Latest Diagnoses
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-10 w-full justify-around items-center  p-5 pb-5 pt-3 rounded-lg">
            <Card className="w-min md:w-[50%]  hover:shadow-md transition cursor-pointer bg-lime-600/10">
              <div className="flex flx-row justify-start m-2 p-2 items-center">
                <div className=" rounded-[50%] p-4 bg-white h-20 w-20 items-center relative  ">
                  <CoronavirusIcon
                    fontSize="large"
                    color="success"
                    className="absolute top-[50%] left-[50%] tranform translate-x-[-50%] translate-y-[-50%] "
                  />
                </div>
                <CardHeader>
                  <CardTitle className="pl-2 flex flex-row">
                    <span
                      className={cn("text-2xl font-bold", montserrat.className)}
                    >
                      Vericella
                    </span>
                    <span
                      className={cn(
                        "text-base font-semibold",
                        montserrat.className,
                        "pl-2 pb-2 pt-2"
                      )}
                    >
                      no hospitalize
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>01/02/2024</p>
                </CardContent>
              </div>
            </Card>
            <Card className="w-min md:w-[50%]  hover:shadow-md transition cursor-pointer bg-cyan-600/10">
              <div className="flex flx-row justify-start m-2 p-2 items-center">
                <div className=" rounded-[50%] p-4 bg-white h-20 w-20 items-center relative  ">
                  <VaccinesOutlinedIcon
                    fontSize="large"
                    color="text-blue-500"
                    className="absolute top-[50%] left-[50%] tranform translate-x-[-50%] translate-y-[-50%] "
                  />
                </div>
                <CardHeader>
                  <CardTitle className="pl-2 flex flex-row">
                    <span
                      className={cn("text-2xl font-bold", montserrat.className)}
                    >
                      Angina
                    </span>
                    <span
                      className={cn(
                        "text-base font-semibold",
                        montserrat.className,
                        "pl-2 pb-2 pt-2"
                      )}
                    >
                      ear complications
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>02/01/2024</p>
                </CardContent>
              </div>
            </Card>
          </div>
          <div className="flex justify-strat w-1/4 pt-4 pb-2 pl-2 rounded-lg mb-2">
            <SquareActivity size={25} />
            <h1 className="text-black-300 text-xl font-bold ml-4 ">
              Health Averages
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-around items-center p-2 rounded-lg pl-5 h-auto pb-10">
            <div className="w-[30%] h-[18rem] hover:shadow-md transition cursor-pointer bg-red-50 pb-5 rounded-lg ">
              <div className="flex flex-col justify-center items-center m-2 p-2">
                <div className="rounded-[50%] p-5 bg-white h-20 w-20 items-center relative">
                  <WaterDropOutlinedIcon
                    fontSize="large"
                    color="danger"
                    className="absolute top-[50%] left-[50%] tranform translate-x-[-50%] translate-y-[-50%] "
                  />
                </div>
                <div className="pt-5 relative flex flex-col justify-center items-center">
                  <span
                    className={cn(
                      "text-2xl font-bold pt-5 text-red-400",
                      montserrat.className
                    )}
                  >
                    Blood pressure
                  </span>
                  <span
                    className={cn(
                      "text-4xl font-bold pt-8 text-red-500",
                      montserrat.className
                    )}
                  >
                    120/80
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[18rem] hover:shadow-md transition cursor-pointer bg-orange-50 pb-5 rounded-lg">
              <div className="flex flex-col justify-center items-center m-2 p-2">
                <div className="rounded-[50%] p-5 bg-white h-20 w-20 items-center relative">
                  <MonitorHeartOutlinedIcon
                    fontSize="large"
                    color="danger"
                    className="absolute top-[50%] left-[50%] tranform translate-x-[-50%] translate-y-[-50%] "
                  />
                </div>
                <div className="pt-5 relative flex flex-col justify-center items-center">
                  <span
                    className={cn(
                      "text-2xl font-bold pt-5 text-orange-400",
                      montserrat.className
                    )}
                  >
                    Heart Rate
                  </span>
                  <span
                    className={cn(
                      "text-4xl font-bold pt-8 text-orange-500",
                      montserrat.className
                    )}
                  >
                    80
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[30%] h-[18rem] hover:shadow-md transition cursor-pointer bg-purple-50 pb-5 rounded-lg">
              <div className="flex flex-col justify-center items-center m-2 p-2">
                <div className="rounded-[50%] p-5 bg-white h-20 w-20 items-center relative">
                  <MedicationLiquidOutlinedIcon
                    fontSize="large"
                    color="danger"
                    className="absolute top-[50%] left-[50%] tranform translate-x-[-50%] translate-y-[-50%] "
                  />
                </div>
                <div className="pt-5 relative flex flex-col justify-center items-center">
                  <span
                    className={cn(
                      "text-2xl font-bold pt-5 text-purple-400",
                      montserrat.className
                    )}
                  >
                    Glucose Level
                  </span>
                  <span
                    className={cn(
                      "text-4xl font-bold pt-8 text-purple-500",
                      montserrat.className
                    )}
                  >
                    130
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
