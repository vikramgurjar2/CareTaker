import { ActionButton } from "@/components/actionButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//indigo-500
const HomePage = () => {
  return (
    <main className="h-[100vh] w-[100%] flex flex-row bg-indigo-50">
      <section className=" flex flex-1 flex-col justify-center items-end p-8 pr-[10rem]">
        <div>
          <div className="flex flex-row items-center gap-8">
            <Image src="/logo_black.png" alt="logo" width={100} height={100} />
            <span className="text-5xl font-bold">Caretackr</span>
          </div>
          <div className="flex flex-col gap-7 mt-[5rem]">
            <h2 className="text-6xl font-bold">
              Track your health <br /> with ease!
            </h2>
            <p className="text-lg">
              A platform designed to provide information about <br /> health
              parameters and medical benefits:
            </p>
          </div>
          <div className="mt-[3rem]">
            <Link href="/signup">
              <ActionButton className="font-bold uppercase text-xl">
                start now
              </ActionButton>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col justify-center items-start pl-[10rem] ">
        <Image src="/bro.png" alt="home_image" width={550} height={550} />
      </section>
    </main>
  );
};

export default HomePage;
