import { motion } from "motion/react";
import { DefaultCover } from "@/assets/images";
import { useNavigate } from "react-router-dom";

export const BestPopularCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-[200px] cursor-pointer overflow-hidden rounded-2xl"
      onClick={() => {
        navigate("/playlist/toplist");
      }}
    >
      <motion.img
        className="absolute left-0 top-0 w-full"
        src={DefaultCover}
        alt="sample"
        initial={{ y: 0 }}
        animate={{ y: "-50%" }}
        draggable={false}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 50,
        }}
      />
      <div
        className="absolute left-3 top-3 flex font-sans text-3xl font-bold text-white"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
      >
        Best of 2024
      </div>
    </div>
  );
};
