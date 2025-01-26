import { motion } from "motion/react";
import recordImage from "@/assets/images/record.png";

type Props = {
  musicItem: MusicItem;
};

export const RecordPlayer = ({ musicItem }: Props) => {
  return (
    <div className="relative h-[200px] rounded-2xl bg-black/10">
      <motion.img
        className="absolute h-full"
        src={recordImage}
        alt="record"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      />
      <div className="absolute left-0 top-0 h-full">
        <img
          className="size-[200px] rounded-l-2xl object-cover"
          src={musicItem.artwork}
          alt="artwork"
          style={{
            clipPath: "polygon(100% 0, 55% 50%, 100% 100%, 0 100%, 0 0)",
          }}
        />
      </div>
    </div>
  );
};
