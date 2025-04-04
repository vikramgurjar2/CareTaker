"use client";
import React, { useState, useEffect } from "react";
import SimplePeer from "simple-peer";
import io from "socket.io-client";
import Webcam from "react-webcam";
import { PhoneCall } from "lucide-react";
import { Mic } from "lucide-react";
import { Video } from "lucide-react";
import { MicOff } from "lucide-react";
import { VideoOff } from "lucide-react";
import { PhoneOff } from "lucide-react";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [video, setVideo] = useState(true);
  const [mic, setMic] = useState(false);
  // const [call,setCall]=useState(false)
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [socket, setSocket] = useState(null);

  const [last, setLast] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const parseUrlParams = () => {
      const parts = pathname.split("/");

      const lastPart = parts.pop();
      setLast(lastPart);

      // console.log("Last part of the URL:", lastPart);
    };

    // Call the parseUrlParams function
    parseUrlParams();

    const newsocket = io("http://localhost:4000");
    setSocket(newsocket);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        newsocket.on("signal", (data) => {
          // console.log(data.type)
          if (data.type === "offer") {
            const newPeer = new SimplePeer({ initiator: false, stream });
            // console.log(newPeer)
            // console.log(data)
            newPeer.signal(data.data);
            setPeer(newPeer);
          } else if (data.type === "answer") {
            peer.signal(data);
          }
        });
        // console.log(last)
        newsocket.emit("join-room", last, (err) => {
          if (err) console.error(err);
        });
      })
      .catch((err) => console.error(err));

    newsocket.on("navigateBack", () => {
      router.back();
    });

    return () => {
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
        console.log("Track Enabled:", track.enabled); // Check if track is enabled
        console.log("Track Muted:", track.muted); // Check if track is muted
      });
    }
  }, [peer, remoteStream]);

  const handleCall = () => {
    // setCall(!call)
    const newPeer = new SimplePeer({ initiator: true, stream });
    newPeer.on("signal", (data) => {
      if (socket) {
        // console.log(data)
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
  // bg-[#111827]
  const handleCallCut = () => {
    if (peer) {
      peer.destroy();
    }

    if (socket) {
      // socket.emit('disconnect');
      socket.emit("navigateBack");
      socket.disconnect();
    }

    router.back();
  };
  return (
    <div className="bg-cyan-50 h-screen w-full overflow-auto p-5 flex relative">
      <div className="w-full h-full bg-[#111827] flex p-8 rouned-md gap-7 ">
        <div className="h-full flex flex-1 justify-center items-center">
          {video == true ? (
            <Webcam
              mirrored={true}
              // width={600}
              audio={mic}
              className="rounded-md"
              style={{ width: "80%" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              Webcam is turned off
            </div>
          )}
        </div>
        {console.log(remoteStream)}
        <div className="flex flex-1 h-full items-center justify-center">
          {remoteStream ? (
            <Webcam
              className="rounded-md"
              autoPlay
              ref={(ref) => {
                if (ref) {
                  ref.srcObject = remoteStream;
                }
              }}
              style={{ width: "80%" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl text-gray-200 ">
              Press{" "}
              <span className="px-2">
                <PhoneCall size={20} color="#e0e0e0" />
              </span>
              to make a call to your doctor
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-[2.5rem]  left-0 w-full   mt-[1rem] flex justify-center gap-[4rem]">
        <button
          className="h-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black "
          onClick={handleMic}
        >
          {mic == true ? (
            <MicOff size={30} color="#969595" />
          ) : (
            <Mic size={30} color="#e0e0e0" />
          )}
        </button>
        <button
          className="hh-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black "
          onClick={handleVideo}
        >
          {video === true ? (
            <Video size={30} color="#e0e0e0" />
          ) : (
            <VideoOff size={30} color="#969595" />
          )}
        </button>
        <button
          className="h-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black "
          onClick={handleCall}
        >
          <PhoneCall size={30} color="#e0e0e0" />
        </button>
        <button
          className="h-[4rem] w-[4rem] flex items-center justify-center border-1 rounded-[50%] bg-black"
          onClick={handleCallCut}
        >
          <PhoneOff size={30} color="red" />
        </button>
      </div>
    </div>
  );
};

export default page;
