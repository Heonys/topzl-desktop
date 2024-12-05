import { memo } from "react";
import type { IconBaseProps } from "react-icons";
import { HiMiniXMark, HiMinus, HiOutlineCog8Tooth, HiOutlineSparkles } from "react-icons/hi2";
import { TbPictureInPicture } from "react-icons/tb";
import { RiTShirt2Line } from "react-icons/ri";
import { RxDividerVertical, RxDividerHorizontal } from "react-icons/rx";
import { VscChromeMaximize } from "react-icons/vsc";
import { PiPushPinFill, PiVinylRecordDuotone, PiDownloadDuotone } from "react-icons/pi";
import { IoLanguage, IoSearch, IoStatsChart } from "react-icons/io5";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { GoHeart } from "react-icons/go";

const IconMap = {
  ["x-mark"]: HiMiniXMark,
  ["minimize"]: HiMinus,
  ["maximize"]: VscChromeMaximize,
  ["picture-in-picture"]: TbPictureInPicture,
  ["cog-8-tooth"]: HiOutlineCog8Tooth,
  ["t-shirt"]: RiTShirt2Line,
  ["sparkles"]: HiOutlineSparkles,
  ["divider-vertical"]: RxDividerVertical,
  ["divider-horizontal"]: RxDividerHorizontal,
  ["push-pin"]: PiPushPinFill,
  ["language"]: IoLanguage,
  ["dark-mode"]: MdDarkMode,
  ["light-mode"]: MdOutlineLightMode,
  ["search"]: IoSearch,
  ["github"]: FaGithub,
  ["heart"]: GoHeart,
  ["chart"]: IoStatsChart,
  ["record"]: PiVinylRecordDuotone,
  ["download"]: PiDownloadDuotone,
};

type Props = {
  iconName: keyof typeof IconMap;
} & IconBaseProps;

const StaticIcon = ({ iconName, ...props }: Props) => {
  const Icon = IconMap[iconName];
  return <Icon {...props} />;
};

export default memo(StaticIcon);
