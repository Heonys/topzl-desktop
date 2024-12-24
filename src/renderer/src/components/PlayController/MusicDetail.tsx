import { motion, Variants, AnimatePresence } from "motion/react";
import Slider from "rc-slider";
import { useCurrentMusic } from "@/hooks/useCurrentMusic";
import { useDetail } from "@/hooks";
import { IconButton } from "@/common";
import { formatTime } from "@/utils";

const variants: Variants = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: "0%",
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  exit: {
    y: "100%",
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

const GRAY = "#EAE6E5";

export const MusicDetail = () => {
  const { isVisible, onClose } = useDetail();
  const { currentItem } = useCurrentMusic();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 size-full bg-black"
          onClick={onClose}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="size-full opacity-85 blur-3xl brightness-90 contrast-75"
            style={{ backgroundImage: `url(${currentItem?.artwork})` }}
          />
          <div className="absolute left-0 top-0 flex size-full items-center justify-center gap-10">
            <div
              className="flex h-4/5 w-2/5 flex-col items-center justify-center gap-4 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="size-[50vh] rounded-2xl object-cover"
                src={currentItem?.artwork}
                alt="artwork"
              />
              <div className="flex w-full flex-col gap-4 px-14">
                <div className="flex w-full gap-3">
                  <div className="flex w-3/5 flex-col">
                    <div className="truncate text-xl">{currentItem?.title}</div>
                    <div className="truncate text-sm text-gray-300">{currentItem?.artist}</div>
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-1">
                    <IconButton color="white" iconName="volume" size={13} opacity />
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={0.5}
                      className="cursor-pointer"
                      styles={{
                        track: { background: "#EAE6E5" },
                        handle: { visibility: "hidden" },
                        rail: { background: "#888888" },
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-3">
                  <div className="text-xs text-gray-300">{"00:04"}</div>
                  <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={2.5}
                    className="cursor-pointer"
                    styles={{
                      track: { background: "#EAE6E5" },
                      handle: { visibility: "hidden" },
                      rail: { background: "#888888" },
                    }}
                  />
                  <div className="text-xs text-gray-300">
                    {formatTime(currentItem?.duration as number)}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <IconButton iconName="repeat" size={13} color={GRAY} />
                  <IconButton iconName="skip-previous" size={25} opacity color={GRAY} />
                  <IconButton
                    iconName="pause"
                    size={25}
                    opacity
                    color={GRAY}
                    onClick={() => {
                      window.plugin
                        .getLyric("http://www.lrcgc.com/lyric-8064-247078.html")
                        .then((res) => {
                          console.log(res);
                        });
                    }}
                  />
                  <IconButton iconName="skip-next" size={25} opacity color={GRAY} />
                  <IconButton iconName="shuffle" size={13} color={GRAY} />
                </div>
              </div>
            </div>
            {/* Lyric */}
            <div
              className="h-3/4 w-[35%] overflow-auto bg-transparent py-5 text-white/40 scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              <pre>
                {`아파트 아파트
아파트 아파트
아파트 아파트
Uh, uh huh uh huh

아파트 아파트
아파트 아파트
아파트 아파트
Uh, uh huh uh huh

Kissy face, kissy face
Sent to your phone but,
I'm trying to kiss your lips for real
Red hearts, red hearts
That's what I'm on yeah
Come give me something I can feel
Oh oh oh
Don't you want me like I want you, baby
Don't you need me like I need you now
Sleep tomorrow but tonight go crazy
All you gotta do is just meet me at the

아파트 아파트
아파트 아파트
아파트 아파트
Uh, uh huh uh huh

아파트 아파트
아파트 아파트
아파트 아파트
Uh, uh huh uh huh

It's whatever it's whatever it's whatever you like
Turn this 아파트 into a club
I'm talking drink, dance, smoke, freak,
party all night
건배 건배 girl what's up
Oh oh oh
Don't you want me like I want you, baby
Don't you need me like I need you now
Sleep tomorrow but tonight go crazy
All you gotta do is just meet me at the

아파트 아파트
아파트 아파트
아파트 아파트
Uh, uh huh uh huh

아파트 아파트
아파트 아파트
아파트 아파트
Uh, uh huh uh huh

Hey so now you know the game
Are you ready?
Cause I'm comin to get ya
Get ya, get ya
Hold on, hold on
I'm on my way
Yeah yeah yeah yeah yeah
I'm on my way
Hold on, hold on
I'm on my way
Yeah yeah yeah yeah yeah
I'm on my way

Don't you want me like I want you, baby
Don't you need me like I need you now
Sleep tomorrow but tonight go crazy
All you gotta do is just meet me at the

아파트 아파트
아파트 아파트
아파트 아파트
Just meet me at the
(Uh huh uh huh)

아파트 아파트
아파트 아파트
아파트 아파트
Just meet me at the
(Uh huh uh huh)
아파트 아파트
아파트 아파트
아파트 아파트
Just meet me at the
(Uh huh uh huh)

아파트 아파트
아파트 아파트
아파트 아파트
Uh, uh huh uh huh`}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
