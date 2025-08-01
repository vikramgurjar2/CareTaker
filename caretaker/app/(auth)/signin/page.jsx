"use client";
import { login, signInGoogle } from "@/actions/user/auth";
import { ActionButton } from "@/components/actionButton";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    const { result, message } = await signInGoogle(accessToken);
    if (result) {
      router.push(`/dashboard/`);
    } else {
      toast.error(message);
    }
    setLoading(false);
  }

  const login_google = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!user.email || !user.password) {
        toast.error("Please complete the fields !");
        setLoading(false);
        return;
      }
      const { result, message } = await login({
        email: user.email,
        password: user.password,
      });
      if (result) {
        router.push(`/dashboard`);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Signin failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-blue-50">
      <div className="absolute top-4 left-4 md:left-10 md:top-6 text-sm md:text-base text-gray-700">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>

      {/* Center container both vertically and horizontally */}
      <div className="flex flex-1 justify-center items-center px-4 md:px-0">
        <div className="bg-white rounded-md shadow-md max-w-md w-full p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 text-center">
            {loading ? "Loading..." : "Sign in"}
          </h2>

          {/* Google Sign in button */}
          <ActionButton
            onClick={() => {
              setLoading(true);
              login_google();
            }}
            disabled={loading}
            className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition"
            aria-label="Sign in with Google"
          >
            {/* Simple Google icon */}
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </ActionButton>

          <div className="relative my-8">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              {/* Give the text a background and horizontal padding */}
              <span className="bg-white px-4 text-sm text-gray-500">
                Or sign in with email
              </span>
            </div>
          </div>

          {/* Email & Password Inputs */}
          <div className="flex flex-col gap-6">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full px-6 py-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled={loading}
            />

            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password (min. 8 characters)"
              autoComplete="current-password"
              className="w-full px-6 py-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              disabled={loading}
              minLength={8}
            />
          </div>

          <div className="mt-8">
            <ActionButton
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition"
            >
              Sign In
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

// "use client";
// import { login, signInGoogle } from "@/actions/user/auth";
// import { ActionButton } from "@/components/actionButton";
// import { useGoogleLogin } from "@react-oauth/google";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const SignInPage = () => {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   async function handleGoogleLoginSuccess(tokenResponse) {
//     const accessToken = tokenResponse.access_token;
//     const { result, message } = await signInGoogle(accessToken);
//     if (result) {
//       router.push(`/dashboard/`);
//     } else {
//       toast.error(message);
//     }
//     setLoading(false);
//   }

//   const login_google = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       if (!user.email || !user.password) {
//         toast.error("Please complete the fields !");
//         return;
//       }
//       const { result, message } = await login({
//         email: user.email,
//         password: user.password,
//       });
//       if (result) {
//         router.push(`/dashboard`);
//       } else {
//         toast.error(message);
//       }
//     } catch (error) {
//       console.log("Signin failed", error.message);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-blue-50">
//       <div className="absolute left-6 top-4 flex items-center ">
//         {/* <Image src="/logo.png " width={20} height={20} /> */}
//         {/* <h1>Caretakr</h1> */}
//         <span>
//           Don't have an account?
//           <Link href="/signup" className="hover:text-blue-800">
//             {" "}
//             Sign up
//           </Link>
//         </span>
//       </div>
//       <div className="bg-white rounded-sm w-[60%] h-fit p-8 flex flex-col justify-center align-items">
//         <h2 className="text-6xl mb-[3.5rem] font-bold ">
//           {loading ? "Loading..." : "Sign in"}
//         </h2>
//         <div className="flex flex-col w-[100%] justify-center items-center ">
//           <ActionButton
//             onClick={() => {
//               setLoading(true);
//               login_google();
//             }}
//             className="font-bold text-xl w-[25vw]"
//           >
//             Google
//           </ActionButton>
//           <div className="border-t-2 border-gray-500 flex flex-col gap-4 text-xl mt-[2.5rem] pt-[2.5rem] ">
//             <div className="flex flex-col gap-4">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
//                 value={user.email}
//                 onChange={(e) => setUser({ ...user, email: e.target.value })}
//               />
//               <input
//                 type="password"
//                 placeholder="Password min. 8 characters"
//                 className="bg-transparent w-[25vw] broder-solid border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 px-6 py-4 bg-gray-200 "
//                 value={user.password}
//                 onChange={(e) => setUser({ ...user, password: e.target.value })}
//               />
//             </div>
//             <div className="mt-[1rem] m-auto">
//               <ActionButton
//                 className=" font-bold uppercase text-xl w-[25vw]"
//                 onClick={handleLogin}
//                 disabled={loading}
//               >
//                 Sign Up
//               </ActionButton>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
