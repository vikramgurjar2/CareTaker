"use client";

import axios from "axios";
import { z } from "zod";

import Heading from "@/components/heading";
import { BotMessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/empty";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

const page = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessage = [...messages, userMessage];

      const response = await axios.post("/api/chatbot", {
        messages: newMessage,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-pink-100 to-white p-4 sm:p-8">
      <Heading
        title="ChatBot"
        description="Our most advanced conversation model"
        icon={BotMessageSquare}
        iconColor="text-pink-600"
        bgColor="bg-pink-200/30"
      />

      <main className="flex flex-col flex-1 max-w-4xl mx-auto w-full mt-6">
        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-3 rounded-lg border border-pink-300 bg-white p-4 focus-within:shadow-lg transition-shadow ease-in-out"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Ask me anything..."
                      className="border-0 outline-none focus:ring-0 focus:border-pink-500 text-base"
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="col-span-12 lg:col-span-2 flex items-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-md bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-colors text-white font-semibold"
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </form>
        </Form>

        <section className="flex-1 mt-6 overflow-auto space-y-5">
          {isLoading && (
            <div className="flex justify-center items-center bg-pink-50 rounded-lg p-10">
              <Loader />
            </div>
          )}

          {!isLoading && messages.length === 0 && (
            <Empty label="No conversation started" />
          )}

          {/* Messages List */}
          <div className="flex flex-col-reverse space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-100">
            {messages.map((message, idx) => (
              <div
                key={`${message.content}-${idx}`}
                className={cn(
                  "flex gap-4 p-4 rounded-lg max-w-4xl mx-auto",
                  message.role === "user"
                    ? "bg-white border border-pink-200 items-start"
                    : "bg-pink-100 border border-pink-300 items-start"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                <p className="text-gray-700 whitespace-pre-wrap break-words">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;

// "use client";

// import axios from "axios";
// import { z } from "zod";

// import Heading from "@/components/heading";
// import { BotMessageSquare } from "lucide-react";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Loader } from "@/components/loader";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Empty } from "@/components/empty";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { UserAvatar } from "@/components/user-avatar";
// import { BotAvatar } from "@/components/bot-avatar";

// const page = () => {
//   const router = useRouter();
//   const [messages, setMessages] = useState([]);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values) => {
//     try {
//       const userMessage = {
//         role: "user",
//         content: values.prompt,
//       };
//       const newMessage = [...messages, userMessage];

//       const response = await axios.post("/api/chatbot", {
//         messages: newMessage,
//       });

//       setMessages((current) => [...current, userMessage, response.data]);

//       form.reset();
//     } catch (err) {
//       console.log(err);

//       // console.log(err);
//     } finally {
//       router.refresh();
//     }
//   };

//   return (
//     <div>
//       <Heading
//         title="ChatBot"
//         description="Our most advanced conversation model"
//         icon={BotMessageSquare}
//         iconColor="text-pink-500"
//         bgColor="bg-pink-500/10"
//       />

//       <div className="px-4 lg:px-8">
//         <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="
//             rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none
//                       focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         placeholder="What you want to know"
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 className="col-span-12 lg:col-span-2 w-full"
//                 disabled={isLoading}
//               >
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>
//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//               <Loader />
//             </div>
//           )}
//           {messages.length === 0 && !isLoading && (
//             <Empty label="No conversation started" />
//           )}
//           <div className="flex flex-col-reverse gap-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.content}
//                 className={cn(
//                   "p-8 w-full flex items-start gap-x-8 rounded-lg",
//                   message.role === "user"
//                     ? "bg-white border border-black/10"
//                     : "bg-muted"
//                 )}
//               >
//                 {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

//                 <p className="text-sm">{message.content}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
