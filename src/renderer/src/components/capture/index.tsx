import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import hotkeys from "hotkeys-js";
import { useAtom } from "jotai";
import { IconButton } from "@/common";
import { capturedAtom } from "@/atom";

export const DesktopCaptureContainer = () => {
  const [isCaptured, setIsCaptured] = useAtom(capturedAtom);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    hotkeys("ctrl+f12", (e) => {
      e.preventDefault();
      HandleDesktopCapture();
    });
    return () => {
      hotkeys.unbind("ctrl+f12");
    };
  }, []);

  const HandleDesktopCapture = async () => {
    const videoEl = videoRef.current!;
    const sourceId = await window.common.getDesktopCaptureId();

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: sourceId,
        },
      } as MediaTrackConstraints,
    });

    videoEl.srcObject = stream;
    videoEl.onloadedmetadata = () => {
      videoEl.play();
      drawCanvas();
    };
    setIsCaptured(true);
  };

  const drawCanvas = () => {
    const videoEl = videoRef.current!;
    const canvasEl = canvasRef.current!;
    const ctx = canvasEl.getContext("2d");
    if (ctx) {
      canvasEl.width = videoEl.videoWidth * 0.65;
      canvasEl.height = videoEl.videoHeight * 0.65;
      ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current!;
    const imageUrl = canvas.toDataURL("image/png");
    window.common.downloadCapturedImage(imageUrl);
  };

  return (
    <>
      <video ref={videoRef} className="hidden" />
      {isCaptured && (
        <AnimatePresence>
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <motion.div
              className="rounded-lg border-4 border-black shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-end gap-2 bg-[#efefef] p-0.5 px-1">
                <IconButton
                  iconName="download"
                  size={15}
                  opacity
                  onClick={() => {
                    downloadImage(); //
                  }}
                />
                <IconButton
                  iconName="x-mark"
                  size={18}
                  opacity
                  onClick={() => setIsCaptured(false)}
                />
              </div>
              <motion.canvas ref={canvasRef} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
