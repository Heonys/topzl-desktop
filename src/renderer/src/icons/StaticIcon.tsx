import { memo } from "react";
import type { IconBaseProps } from "react-icons";
import {
  IoMdRefresh,
  IoMdSkipForward,
  IoMdSkipBackward,
  IoIosMore,
  IoMdMore,
  IoMdNotificationsOutline,
} from "react-icons/io";
import {
  IoLanguage,
  IoSearch,
  IoStatsChart,
  IoFolderOpenOutline,
  IoChevronDownOutline,
  IoChevronForward,
  IoCheckmark,
  IoCheckmarkCircleOutline,
  IoHeadset,
  IoPower,
} from "react-icons/io5";
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdOutlineLyrics,
  MdOutlineSpeed,
  MdOutlinePlaylistAdd,
  MdOutlineLibraryMusic,
  MdLanguage,
  MdHistory,
  MdNavigateNext,
  MdNavigateBefore,
  MdAudiotrack,
  MdNotInterested,
  MdOutlineExplore,
  MdOutlinePrivacyTip,
  MdOutlinePlaylistPlay,
  MdPlaylistRemove,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";
import {
  HiMiniXMark,
  HiMinus,
  HiOutlineCog8Tooth,
  HiOutlineSparkles,
  HiOutlineTrophy,
  HiOutlineCodeBracketSquare,
  HiOutlinePencilSquare,
  HiMiniHome,
} from "react-icons/hi2";
import {
  PiPushPinFill,
  PiVinylRecordDuotone,
  PiHeart,
  PiHeartFill,
  PiShuffleBold,
} from "react-icons/pi";
import { TbPictureInPicture } from "react-icons/tb";
import { RiTShirt2Line, RiFunctionFill, RiLoader2Fill } from "react-icons/ri";
import { RxDividerVertical, RxDividerHorizontal } from "react-icons/rx";
import { VscChromeMaximize, VscSymbolMethod } from "react-icons/vsc";
import { FaGithub, FaPlay, FaPause, FaRegTrashAlt, FaRegKeyboard } from "react-icons/fa";
import { FaChevronDown, FaLink, FaWindows, FaUserCheck } from "react-icons/fa6";
import { GoPlus, GoDatabase } from "react-icons/go";
import { BiSolidVolumeFull, BiSolidVolumeMute, BiSolidPlaylist } from "react-icons/bi";
import { LuRepeat, LuRepeat1, LuClock } from "react-icons/lu";
import { FiDownload, FiCopy } from "react-icons/fi";
import { SiApplemusic } from "react-icons/si";
import { TiArrowUnsorted } from "react-icons/ti";
import { CgCloseR } from "react-icons/cg";
import { BsFolderPlus, BsPlugin } from "react-icons/bs";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";
import { AiOutlineExperiment, AiOutlinePicture } from "react-icons/ai";
import { TfiVideoClapper } from "react-icons/tfi";

export type IconNames = keyof typeof IconMap;
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
  ["heart"]: PiHeart,
  ["heart-fill"]: PiHeartFill,
  ["chart"]: IoStatsChart,
  ["record"]: PiVinylRecordDuotone,
  ["download"]: FiDownload,
  ["previous"]: GrFormPreviousLink,
  ["next"]: GrFormNextLink,
  ["refresh"]: IoMdRefresh,
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
  ["shuffle"]: PiShuffleBold,
  ["speed"]: MdOutlineSpeed,
  ["trash"]: FaRegTrashAlt,
  ["down"]: FaChevronDown,
  ["add-playlist"]: MdOutlinePlaylistAdd,
  ["next-playlist"]: MdOutlinePlaylistPlay,
  ["remove-playlist"]: MdPlaylistRemove,
  ["library-music"]: MdOutlineLibraryMusic,
  ["apple"]: SiApplemusic,
  ["rename"]: HiOutlinePencilSquare,
  ["sort"]: TiArrowUnsorted,
  ["sort-asc"]: HiOutlineSortAscending,
  ["sort-desc"]: HiOutlineSortDescending,
  ["explore"]: MdOutlineExplore,
  ["clock"]: LuClock,
  ["home"]: HiMiniHome,
  ["chevron-down"]: IoChevronDownOutline,
  ["chevron-right"]: IoChevronForward,
  ["check"]: IoCheckmark,
  ["box-close"]: CgCloseR,
  ["notification"]: IoMdNotificationsOutline,
  ["history"]: MdHistory,
  ["forder-plus"]: BsFolderPlus,
  ["check-circle"]: IoCheckmarkCircleOutline,
  ["loading"]: RiLoader2Fill,
  ["error"]: MdNotInterested,
  ["more"]: IoIosMore,
  ["more-verticle"]: IoMdMore,
  ["navigate-next"]: MdNavigateNext,
  ["navigate-prev"]: MdNavigateBefore,
  ["track"]: MdAudiotrack,
  ["privacy"]: MdOutlinePrivacyTip,
  ["headset"]: IoHeadset,
  ["update"]: MdOutlineTipsAndUpdates,
  ["global"]: MdLanguage,
  ["method"]: VscSymbolMethod,
  ["test"]: AiOutlineExperiment,
  ["power"]: IoPower,
  ["hot-key"]: FaRegKeyboard,
  ["function"]: RiFunctionFill,
  ["database"]: GoDatabase,
  ["plugin"]: BsPlugin,
  ["windows"]: FaWindows,
  ["user-check"]: FaUserCheck,
  ["link"]: FaLink,
  ["capture"]: AiOutlinePicture,
  ["copy"]: FiCopy,
  ["video"]: TfiVideoClapper,
};

type Props = {
  iconName: keyof typeof IconMap;
} & IconBaseProps;

const StaticIcon = ({ iconName, ...props }: Props) => {
  const Icon = IconMap[iconName];
  return <Icon {...props} />;
};

export default memo(StaticIcon);
