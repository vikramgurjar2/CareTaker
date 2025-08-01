import { ActionButton } from "@/components/actionButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-100">
      {/* Left Section */}
      <section className="flex flex-1 flex-col justify-center items-center md:items-end px-6 md:px-16 lg:px-24 py-12 md:pr-[8rem] lg:pr-[10rem]">
        <div className="max-w-lg bg-white/80 rounded-2xl shadow-xl p-8">
          {/* Heading & Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-indigo-900">
              Track your health <br /> with ease!
            </h2>
            <p className="text-lg text-teal-800 leading-relaxed">
              A platform designed to provide information about
              <br />
              health parameters and medical benefits.
            </p>
          </div>
          {/* Call to Action */}
          <div className="mt-10">
            <Link href="/signup" passHref legacyBehavior>
              <ActionButton className="font-bold uppercase text-lg md:text-xl px-8 py-3 rounded-full bg-gradient-to-tr from-teal-500 via-indigo-500 to-violet-500 text-white shadow-xl hover:from-pink-500 hover:to-orange-400 transition-transform scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                Start Now
              </ActionButton>
            </Link>
          </div>
        </div>
      </section>
      {/* Right Section - Image */}
      <section className="flex flex-1 justify-center items-center px-6 md:px-16 lg:px-24 py-12">
        <div className="w-full max-w-lg max-h-[550px] relative drop-shadow-md">
          <Image
            src="/bro.png"
            alt="home_image"
            width={550}
            height={550}
            className="object-contain rounded-2xl bg-violet-50"
            priority
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;

// import { ActionButton } from "@/components/actionButton";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// //indigo-500
// const HomePage = () => {
//   return (
//     <main className="h-[100vh] w-[100%] flex flex-row bg-indigo-50">
//       <section className=" flex flex-1 flex-col justify-center items-end p-8 pr-[10rem]">
//         <div>
//           <div className="flex flex-row items-center gap-8">
//             <Image src="/logo_black.png" alt="logo" width={100} height={100} />
//             <span className="text-5xl font-bold">Caretackr</span>
//           </div>
//           <div className="flex flex-col gap-7 mt-[5rem]">
//             <h2 className="text-6xl font-bold">
//               Track your health <br /> with ease!
//             </h2>
//             <p className="text-lg">
//               A platform designed to provide information about <br /> health
//               parameters and medical benefits:
//             </p>
//           </div>
//           <div className="mt-[3rem]">
//             <Link href="/signup">
//               <ActionButton className="font-bold uppercase text-xl">
//                 start now
//               </ActionButton>
//             </Link>
//           </div>
//         </div>
//       </section>
//       <section className="flex flex-1 flex-col justify-center items-start pl-[10rem] ">
//         <Image src="/bro.png" alt="home_image" width={550} height={550} />
//       </section>
//     </main>
//   );
// };

// export default HomePage;
