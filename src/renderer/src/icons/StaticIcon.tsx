import { memo } from "react";
import type { IconBaseProps } from "react-icons";
import { HiMiniXMark, HiMinus, HiOutlineCog8Tooth, HiOutlineSparkles } from "react-icons/hi2";
import { TbPictureInPicture } from "react-icons/tb";
import { RiTShirt2Line } from "react-icons/ri";
import { RxDividerVertical, RxDividerHorizontal } from "react-icons/rx";
import { VscChromeMaximize } from "react-icons/vsc";
import { PiPushPinFill, PiVinylRecordDuotone } from "react-icons/pi";
import { IoLanguage, IoSearch, IoStatsChart } from "react-icons/io5";
import { MdDarkMode, MdOutlineLightMode, MdOutlineLyrics, MdOutlineSpeed } from "react-icons/md";
import { FaGithub, FaPlay, FaPause, FaRegTrashAlt } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { GrFormPreviousLink, GrFormNextLink, GrFormRefresh } from "react-icons/gr";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoFolderOpenOutline } from "react-icons/io5";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { BiSolidVolumeFull, BiSolidVolumeMute, BiSolidPlaylist } from "react-icons/bi";
import { LuRepeat, LuRepeat1, LuShuffle } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { SiApplemusic } from "react-icons/si";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { TiArrowUnsorted } from "react-icons/ti";
import { HiOutlineSortDescending, HiOutlineSortAscending } from "react-icons/hi";
import { FaRegCompass } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { HiMiniHome } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoCheckmark, IoCheckmarkCircleOutline } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { BsFolderPlus } from "react-icons/bs";
import { RiLoader2Fill } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";

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
  ["heart-fill"]: GoHeartFill,
  ["chart"]: IoStatsChart,
  ["record"]: PiVinylRecordDuotone,
  ["download"]: FiDownload,
  ["previous"]: GrFormPreviousLink,
  ["next"]: GrFormNextLink,
  ["refresh"]: GrFormRefresh,
  ["trophy"]: HiOutlineTrophy,
  ["forder-open"]: IoFolderOpenOutline,
  ["code-bracket-sqare"]: HiOutlineCodeBracketSquare,
  ["plus"]: GoPlus,
  ["play"]: FaPlay,
  ["pause"]: FaPause,
  ["skip-next"]: IoMdSkipForward,
  ["skip-previous"]: IoMdSkipBackward,
  ["lyric"]: MdOutlineLyrics,
  ["volume"]: BiSolidVolumeFull,
  ["mute"]: BiSolidVolumeMute,
  ["playlist"]: BiSolidPlaylist,
  ["repeat"]: LuRepeat,
  ["repeat-1"]: LuRepeat1,
  ["shuffle"]: LuShuffle,
  ["speed"]: MdOutlineSpeed,
  ["trash"]: FaRegTrashAlt,
  ["down"]: FaChevronDown,
  ["add-playlist"]: MdOutlinePlaylistAdd,
  ["library-music"]: MdOutlineLibraryMusic,
  ["apple"]: SiApplemusic,
  ["rename"]: HiOutlinePencilSquare,
  ["sort"]: TiArrowUnsorted,
  ["sort-asc"]: HiOutlineSortAscending,
  ["sort-desc"]: HiOutlineSortDescending,
  ["discover"]: FaRegCompass,
  ["clock"]: LuClock,
  ["home"]: HiMiniHome,
  ["chevron-down"]: IoChevronDownOutline,
  ["check"]: IoCheckmark,
  ["box-close"]: CgCloseR,
  ["notification"]: IoMdNotificationsOutline,
  ["history"]: MdHistory,
  ["forder-plus"]: BsFolderPlus,
  ["check-circle"]: IoCheckmarkCircleOutline,
  ["loading"]: RiLoader2Fill,
  ["error"]: MdErrorOutline,
};

type Props = {
  iconName: keyof typeof IconMap;
} & IconBaseProps;

const StaticIcon = ({ iconName, ...props }: Props) => {
  const Icon = IconMap[iconName];
  return <Icon {...props} />;
};

export default memo(StaticIcon);
