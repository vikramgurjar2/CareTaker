"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { visitedDoctors } from "@/constants/visitedDoctor";
import { cn } from "@/lib/utils";
import { ClipboardPlus, Pill, SquareActivity } from "lucide-react";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import MedicationLiquidOutlinedIcon from "@mui/icons-material/MedicationLiquidOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import { Montserrat } from "next/font/google";
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
    <div className="bg-blue-50 min-h-screen w-full flex flex-col p-4 md:p-8 overflow-auto">
      {/* --- Visited Doctors Section --- */}
      <section className="max-w-[1400px] mx-auto w-full mb-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardPlus size={30} className="text-teal-600" />
            <h1
              className={cn(
                "text-2xl font-bold text-gray-800",
                montserrat.className
              )}
            >
              Visited Doctors
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visitedDoctors.map((doct) => (
              <Card
                key={doct.name + doct.dateConsulted}
                className="bg-teal-50 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex p-4 gap-4">
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-green-400 shadow-inner">
                    <Image
                      src={doct.img}
                      alt={doct.name + " profile"}
                      fill
                      className="object-cover object-center"
                      sizes="112px"
                      priority={false}
                    />
                  </div>
                  <CardHeader className="p-0 flex flex-col justify-center">
                    <CardTitle
                      className={cn(
                        "text-xl font-semibold",
                        montserrat.className
                      )}
                    >
                      {doct.name}
                    </CardTitle>
                    <span
                      className={cn(
                        "text-sm font-semibold text-teal-700 mt-1",
                        montserrat.className
                      )}
                    >
                      {doct.spec}
                    </span>
                    <span className="text-sm mt-2 text-gray-900 font-semibold">
                      Consulted For: {doct.consultedFor}
                    </span>
                    <span className="text-sm text-gray-600">
                      Date: {doct.dateConsulted}
                    </span>
                  </CardHeader>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Latest Diagnoses Section --- */}
      <section className="max-w-[1400px] mx-auto w-full mb-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Pill size={25} className="text-lime-600" />
            <h1
              className={cn(
                "text-2xl font-bold text-gray-800",
                montserrat.className
              )}
            >
              Latest Diagnoses
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-between items-stretch">
            {/* Diagnosis Card 1 */}
            <Card className="flex-1 bg-lime-50 hover:shadow-lg transition cursor-pointer rounded-lg">
              <div className="flex items-center gap-4 p-6">
                <div className="relative rounded-full bg-white h-20 w-20 flex items-center justify-center shadow">
                  <CoronavirusIcon
                    fontSize="large"
                    color="success"
                    className="text-green-600"
                  />
                </div>
                <CardHeader className="p-0 flex flex-col justify-center flex-1">
                  <CardTitle
                    className={cn("text-2xl font-bold", montserrat.className)}
                  >
                    Vericella
                  </CardTitle>
                  <p
                    className={cn(
                      "text-base font-semibold text-gray-700 pt-2",
                      montserrat.className
                    )}
                  >
                    No hospitalize
                  </p>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600">01/02/2024</p>
                  </CardContent>
                </CardHeader>
              </div>
            </Card>

            {/* Diagnosis Card 2 */}
            <Card className="flex-1 bg-cyan-50 hover:shadow-lg transition cursor-pointer rounded-lg">
              <div className="flex items-center gap-4 p-6">
                <div className="relative rounded-full bg-white h-20 w-20 flex items-center justify-center shadow">
                  <VaccinesOutlinedIcon
                    fontSize="large"
                    className="text-blue-600"
                  />
                </div>
                <CardHeader className="p-0 flex flex-col justify-center flex-1">
                  <CardTitle
                    className={cn("text-2xl font-bold", montserrat.className)}
                  >
                    Angina
                  </CardTitle>
                  <p
                    className={cn(
                      "text-base font-semibold text-gray-700 pt-2",
                      montserrat.className
                    )}
                  >
                    Ear complications
                  </p>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600">02/01/2024</p>
                  </CardContent>
                </CardHeader>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Health Averages Section --- */}
      <section className="max-w-[1400px] mx-auto w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <SquareActivity size={25} className="text-purple-600" />
            <h1
              className={cn(
                "text-2xl font-bold text-gray-800",
                montserrat.className
              )}
            >
              Health Averages
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blood pressure */}
            <div className="bg-red-50 rounded-lg hover:shadow-lg transition cursor-pointer flex flex-col items-center p-6">
              <div className="relative rounded-full bg-white h-20 w-20 flex items-center justify-center shadow mb-4">
                <WaterDropOutlinedIcon
                  fontSize="large"
                  className="text-red-400"
                />
              </div>
              <span
                className={cn(
                  "text-2xl font-bold text-red-500",
                  montserrat.className
                )}
              >
                Blood pressure
              </span>
              <span
                className={cn(
                  "text-4xl font-bold text-red-600 mt-4",
                  montserrat.className
                )}
              >
                120/80
              </span>
            </div>

            {/* Heart Rate */}
            <div className="bg-orange-50 rounded-lg hover:shadow-lg transition cursor-pointer flex flex-col items-center p-6">
              <div className="relative rounded-full bg-white h-20 w-20 flex items-center justify-center shadow mb-4">
                <MonitorHeartOutlinedIcon
                  fontSize="large"
                  className="text-orange-400"
                />
              </div>
              <span
                className={cn(
                  "text-2xl font-bold text-orange-500",
                  montserrat.className
                )}
              >
                Heart Rate
              </span>
              <span
                className={cn(
                  "text-4xl font-bold text-orange-600 mt-4",
                  montserrat.className
                )}
              >
                80
              </span>
            </div>

            {/* Glucose Level */}
            <div className="bg-purple-50 rounded-lg hover:shadow-lg transition cursor-pointer flex flex-col items-center p-6">
              <div className="relative rounded-full bg-white h-20 w-20 flex items-center justify-center shadow mb-4">
                <MedicationLiquidOutlinedIcon
                  fontSize="large"
                  className="text-purple-400"
                />
              </div>
              <span
                className={cn(
                  "text-2xl font-bold text-purple-500",
                  montserrat.className
                )}
              >
                Glucose Level
              </span>
              <span
                className={cn(
                  "text-4xl font-bold text-purple-600 mt-4",
                  montserrat.className
                )}
              >
                130
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
