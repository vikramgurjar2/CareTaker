// "use client";
// import React, { useState, useEffect } from "react";
// import SimplePeer from "simple-peer";
// import io from "socket.io-client";
// import Webcam from "react-webcam";
// import { PhoneCall } from "lucide-react";
// import { Mic } from "lucide-react";
// import { Video } from "lucide-react";
// import { MicOff } from "lucide-react";
// import { VideoOff } from "lucide-react";
// import { PhoneOff } from "lucide-react";

// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";

// const page = () => {
//   const router = useRouter();

//   const [video, setVideo] = useState(true);
//   const [mic, setMic] = useState(false);
//   // const [call,setCall]=useState(false)
//   const [peer, setPeer] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [socket, setSocket] = useState(null);

//   const [last, setLast] = useState(null);

//   const pathname = usePathname();

//   useEffect(() => {
//     const parseUrlParams = () => {
//       const parts = pathname.split("/");

//       const lastPart = parts.pop();
//       setLast(lastPart);

//       // console.log("Last part of the URL:", lastPart);
//     };

//     // Call the parseUrlParams function
//     parseUrlParams();

//     const newsocket = io("http://localhost:4000");
//     setSocket(newsocket);

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setStream(stream);

//         newsocket.on("signal", (data) => {
//           // console.log(data.type)
//           if (data.type === "offer") {
//             const newPeer = new SimplePeer({ initiator: false, stream });
//             // console.log(newPeer)
//             // console.log(data)
//             newPeer.signal(data.data);
//             setPeer(newPeer);
//           } else if (data.type === "answer") {
//             peer.signal(data);
//           }
//         });
//         // console.log(last)
//         newsocket.emit("join-room", last, (err) => {
//           if (err) console.error(err);
//         });
//       })
//       .catch((err) => console.error(err));

//     newsocket.on("navigateBack", () => {
//       router.back();
//     });

//     return () => {
//       newsocket.disconnect();
//     };
//   }, [last]);

//   useEffect(() => {
//     if (peer) {
//       peer.on("stream", (remoteStream) => {
//         setRemoteStream(remoteStream);
//       });
//     }
//     if (remoteStream) {
//       const videoTracks = remoteStream.getVideoTracks();
//       videoTracks.forEach((track) => {
//         console.log("Track Enabled:", track.enabled); // Check if track is enabled
//         console.log("Track Muted:", track.muted); // Check if track is muted
//       });
//     }
//   }, [peer, remoteStream]);

//   const handleCall = () => {
//     // setCall(!call)
//     const newPeer = new SimplePeer({ initiator: true, stream });
//     newPeer.on("signal", (data) => {
//       if (socket) {
//         // console.log(data)
//         socket.emit("signal", { type: "offer", data });
//       } else {
//         console.error("socket connection not established");
//       }
//     });
//     console.log(newPeer);
//     setPeer(newPeer);
//   };

//   const handleMic = () => {
//     setMic(!mic);
//   };

//   const handleVideo = () => {
//     setVideo(!video);
//   };
//   // bg-[#111827]
//   const handleCallCut = () => {
//     if (peer) {
//       peer.destroy();
//     }

//     if (socket) {
//       // socket.emit('disconnect');
//       socket.emit("navigateBack");
//       socket.disconnect();
//     }

//     router.back();
//   };
//   return (
//     <div className="bg-cyan-50 h-screen w-full overflow-auto p-5 flex relative">
//       <div className="w-full h-full bg-[#111827] flex p-8 rouned-md gap-7 ">
//         <div className="h-full flex flex-1 justify-center items-center">
//           {video == true ? (
//             <Webcam
//               mirrored={true}
//               // width={600}
//               audio={mic}
//               className="rounded-md"
//               style={{ width: "80%" }}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-white">
//               Webcam is turned off
//             </div>
//           )}
//         </div>
//         {console.log(remoteStream)}
//         <div className="flex flex-1 h-full items-center justify-center">
//           {remoteStream ? (
//             <Webcam
//               className="rounded-md"
//               autoPlay
//               ref={(ref) => {
//                 if (ref) {
//                   ref.srcObject = remoteStream;
//                 }
//               }}
//               style={{ width: "80%" }}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-xl text-gray-200 ">
//               Press{" "}
//               <span className="px-2">
//                 <PhoneCall size={20} color="#e0e0e0" />
//               </span>
//               to make a call to your doctor
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="absolute bottom-[2.5rem]  left-0 w-full   mt-[1rem] flex justify-center gap-[4rem]">
//         <button
//           className="h-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black "
//           onClick={handleMic}
//         >
//           {mic == true ? (
//             <MicOff size={30} color="#969595" />
//           ) : (
//             <Mic size={30} color="#e0e0e0" />
//           )}
//         </button>
//         <button
//           className="hh-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black "
//           onClick={handleVideo}
//         >
//           {video === true ? (
//             <Video size={30} color="#e0e0e0" />
//           ) : (
//             <VideoOff size={30} color="#969595" />
//           )}
//         </button>
//         <button
//           className="h-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black "
//           onClick={handleCall}
//         >
//           <PhoneCall size={30} color="#e0e0e0" />
//         </button>
//         <button
//           className="h-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black"
//           onClick={handleCallCut}
//         >
//           <PhoneOff size={30} color="red" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default page;
"use client";
import React, { useState, useEffect, useRef } from "react";
import SimplePeer from "simple-peer";
import io from "socket.io-client";
import Webcam from "react-webcam";
import {
  PhoneCall,
  Mic,
  Video,
  MicOff,
  VideoOff,
  PhoneOff,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const webcamRef = useRef(null);

  const [video, setVideo] = useState(true);
  const [mic, setMic] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [last, setLast] = useState(null);
  const pathname = usePathname();

  // Function to stop all camera streams
  const stopAllStreams = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (webcamRef.current && webcamRef.current.stream) {
      webcamRef.current.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  useEffect(() => {
    const parseUrlParams = () => {
      const parts = pathname.split("/");
      const lastPart = parts.pop();
      setLast(lastPart);
    };

    parseUrlParams();

    const newsocket = io("http://localhost:4000");
    setSocket(newsocket);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        newsocket.on("signal", (data) => {
          if (data.type === "offer") {
            const newPeer = new SimplePeer({ initiator: false, stream });
            newPeer.signal(data.data);
            setPeer(newPeer);
            setCallActive(true);
          } else if (data.type === "answer") {
            peer.signal(data);
          }
        });

        newsocket.emit("join-room", last, (err) => {
          if (err) console.error(err);
        });
      })
      .catch((err) => console.error(err));

    newsocket.on("navigateBack", () => {
      router.back();
    });

    return () => {
      stopAllStreams();
      newsocket.disconnect();
    };
  }, [last]);

  useEffect(() => {
    if (peer) {
      peer.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
      });
    }
    if (remoteStream) {
      const videoTracks = remoteStream.getVideoTracks();
      videoTracks.forEach((track) => {
        console.log("Track Enabled:", track.enabled);
        console.log("Track Muted:", track.muted);
      });
    }
  }, [peer, remoteStream]);

  const handleCall = () => {
    setCallActive(true);
    const newPeer = new SimplePeer({ initiator: true, stream });
    newPeer.on("signal", (data) => {
      if (socket) {
        socket.emit("signal", { type: "offer", data });
      } else {
        console.error("socket connection not established");
      }
    });
    console.log(newPeer);
    setPeer(newPeer);
  };

  const handleMic = () => {
    setMic(!mic);
  };

  const handleVideo = () => {
    setVideo(!video);
  };

  const handleCallCut = () => {
    if (peer) {
      peer.destroy();
    }

    stopAllStreams();

    if (socket) {
      socket.emit("navigateBack");
      socket.disconnect();
    }

    router.back();
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Main Video Container */}
      <div className="h-full w-full flex flex-col lg:flex-row gap-3 p-3 sm:p-4 md:p-6 pb-28 sm:pb-32">
        {!callActive ? (
          // Pre-call view - Single video
          <div className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 shadow-2xl border border-slate-700/50">
            {video ? (
              <Webcam
                ref={webcamRef}
                mirrored={true}
                audio={mic}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-300">
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-700/50 mb-4">
                  <VideoOff
                    size={32}
                    className="sm:w-10 sm:h-10 text-slate-400"
                  />
                </div>
                <p className="text-sm sm:text-base text-center font-medium">
                  Camera is off
                </p>
              </div>
            )}

            {/* Call instruction overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none flex items-end justify-center pb-12">
              <div className="text-center text-slate-200 px-4">
                <div className="flex items-center justify-center mb-3">
                  <PhoneCall size={24} className="text-blue-400" />
                </div>
                <p className="text-base sm:text-lg font-medium">
                  Press call button to connect
                </p>
              </div>
            </div>
          </div>
        ) : (
          // During call view - Split screen
          <>
            {/* Local Video (Your video) */}
            <div className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 shadow-2xl border border-slate-700/50">
              {video ? (
                <Webcam
                  ref={webcamRef}
                  mirrored={true}
                  audio={mic}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-300">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-700/50 mb-4">
                    <VideoOff
                      size={32}
                      className="sm:w-10 sm:h-10 text-slate-400"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-center font-medium">
                    Camera is off
                  </p>
                </div>
              )}

              {/* Label */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  You
                </p>
              </div>
            </div>

            {/* Remote Video (Doctor's video) */}
            <div className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 shadow-2xl border border-slate-700/50">
              {remoteStream ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  ref={(ref) => {
                    if (ref && remoteStream) {
                      ref.srcObject = remoteStream;
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 px-4">
                  <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-700/50 mb-4 sm:mb-6">
                    <User
                      size={40}
                      className="sm:w-14 sm:h-14 text-slate-400"
                    />
                  </div>
                  <p className="text-base sm:text-lg text-center font-medium mb-2">
                    Connecting to doctor...
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Label */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  Doctor
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 via-slate-900/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4 py-6 sm:py-8">
          {/* Mic Button */}
          <button
            onClick={handleMic}
            className={`group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full transition-all duration-200 ${
              mic
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-800 hover:bg-slate-700"
            } shadow-lg hover:shadow-xl active:scale-95`}
            aria-label={mic ? "Mute microphone" : "Unmute microphone"}
          >
            {mic ? (
              <Mic size={20} className="sm:w-6 sm:h-6 text-white" />
            ) : (
              <MicOff size={20} className="sm:w-6 sm:h-6 text-red-400" />
            )}
          </button>

          {/* Video Button */}
          <button
            onClick={handleVideo}
            className={`group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full transition-all duration-200 ${
              video
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-800 hover:bg-slate-700"
            } shadow-lg hover:shadow-xl active:scale-95`}
            aria-label={video ? "Turn off camera" : "Turn on camera"}
          >
            {video ? (
              <Video size={20} className="sm:w-6 sm:h-6 text-white" />
            ) : (
              <VideoOff size={20} className="sm:w-6 sm:h-6 text-red-400" />
            )}
          </button>

          {/* Call Button - Only show if call not active */}
          {!callActive && (
            <button
              onClick={handleCall}
              className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              aria-label="Start call"
            >
              <PhoneCall size={24} className="sm:w-7 sm:h-7 text-white" />
            </button>
          )}

          {/* End Call Button */}
          <button
            onClick={handleCallCut}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            aria-label="End call"
          >
            <PhoneOff size={24} className="sm:w-7 sm:h-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
