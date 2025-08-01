"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Montserrat } from "next/font/google";
import { registerables, Chart } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(...registerables);

import { data1, data2, data3, data4 } from "@/constants/graphdata";
import { FileClock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/actions/user/auth";

const Graph = ({ data }) => {
  return (
    <Line
      className="w-full rounded-lg"
      data={data}
      options={{
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      }}
    />
  );
};

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const boxs = [
  {
    heading: "Blood pressure",
    condition: "Above norm",
    value: "120/89",
    measurement: "mmHg",
    graph: <Graph data={data1} />,
    color: "text-violet-500",
  },
  {
    heading: "Heart rate",
    condition: "In the norm",
    value: "120",
    measurement: "beats per minute",
    graph: <Graph data={data2} />,
    color: "text-orange-500",
  },
  {
    heading: "Glucose",
    condition: "Normal",
    value: "100",
    measurement: "mg/dL",
    graph: <Graph data={data3} />,
    color: "text-orange-500",
  },
  {
    heading: "Cholesterol",
    condition: "Above norm",
    value: "200",
    measurement: "mg/dL",
    graph: <Graph data={data4} />,
    color: "text-violet-500",
  },
];

const page = () => {
  const [user, setUser] = useState();
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

  return (
    <>
      {loading ? (
        <div className="text-center mt-8 text-lg text-indigo-500 min-h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-teal-50 to-violet-100 flex flex-col md:flex-row items-stretch">
          {/* Profile Panel */}
          <aside className="w-full md:w-1/4 lg:w-1/5 p-4 md:py-10 flex-shrink-0 flex justify-center md:justify-start">
            <div className="bg-white/90 rounded-2xl m-auto shadow-md max-w-xs w-full px-4 py-6 md:sticky md:top-10">
              <h4 className="text-gray-800 text-2xl font-bold text-center mb-2">
                Profile
              </h4>
              <div className="flex flex-col items-center gap-2">
                <img
                  className="object-cover h-24 w-24 bg-green-400 rounded-full shadow mb-2 border-4 border-blue-200"
                  src={user.profile_pic}
                  alt="patient photo"
                />
                <h5 className="text-lg font-bold text-neutral-800">
                  {user.name}
                </h5>
                <Link
                  href="/history"
                  className="flex items-center text-emerald-500 font-bold hover:underline mt-1"
                >
                  <FileClock className={cn("h-5 w-5 mr-1 text-emerald-500")} />
                  Patient History
                </Link>
              </div>
              {user?.country && (
                <div className="mt-6 space-y-2 text-sm md:text-base">
                  <div>
                    <span className="text-gray-500">Country:</span>
                    <div className="font-bold text-lg">{user.country}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Gender:</span>
                    <div className="font-bold text-lg">{user.gender}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Height:</span>
                    <div className="font-bold text-lg">{user.height} cm</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <div className="font-bold text-lg">{user.weight} kg</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Blood Group:</span>
                    <div className="font-bold text-lg">{user.bloodGroup}</div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Dashboard Cards */}
          <main className="flex-1 p-2 md:p-10 flex">
            <div className="w-full bg-white/95 rounded-2xl shadow-md p-3 md:p-6 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                {boxs.map((box, i) => (
                  <Card
                    key={box.heading + i}
                    className="flex flex-col min-h-[290px] shadow hover:shadow-lg transition rounded-xl relative bg-gradient-to-tr from-white via-blue-50 to-violet-50"
                  >
                    <CardHeader className="flex justify-between flex-row">
                      <div>
                        <CardTitle
                          className={cn(
                            "text-xl sm:text-2xl font-bold",
                            montserrat.className
                          )}
                        >
                          {box.heading}
                        </CardTitle>
                        <CardDescription
                          className={cn(
                            "text-md sm:text-xl font-semibold mt-1",
                            montserrat.className
                          )}
                        >
                          {box.condition}
                        </CardDescription>
                      </div>
                      <div>
                        <CardTitle className="p-2 flex flex-col items-end">
                          <span
                            className={cn(
                              "text-xl sm:text-2xl font-bold",
                              montserrat.className,
                              box.color
                            )}
                          >
                            {box.value}
                          </span>
                          <span
                            className={cn(
                              "text-sm sm:text-lg font-semibold mt-1",
                              montserrat.className
                            )}
                          >
                            {box.measurement}
                          </span>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="w-full flex-1 min-h-[150px]">
                      {box.graph}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default page;
