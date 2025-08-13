import {
  FaBrain,
  FaExpand,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa";
import { MdOutlineReplay10 } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import axios from "axios";

const ProblemDetailPageNavbar = ({
  setIndex,
  problemId,
}: {
  setIndex: (a: 1 | 2 | 3) => void;
  problemId: string;
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [like, setLike] = useState<number>(0);
  const [disLike, setDislike] = useState<number>(0);
  const [alreadySaved, setAlreadySaved] = useState<boolean>(false);
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);

  const getStats = async () => {
    try {
      const response = await axios.get(`/api/problems/getStats/${problemId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        const { likeCount, dislikeCount, liked, saved } = response.data.data;
        setLike(likeCount);
        setDislike(dislikeCount);
        setAlreadyLiked(liked);
        setAlreadySaved(saved);
      }
    } catch (error: any) {
      console.error("Failed to fetch problem stats:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getStats();
    }
  }, [problemId, isAuthenticated]);

  const handleSave = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axios.post(
        `/api/problems/save/${problemId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setAlreadySaved((prev) => !prev);
      }
    } catch (error: any) {
      console.error("Failed to save problem:", error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axios.post(
        `/api/problems/like/${problemId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        const wasLiked = alreadyLiked;
        setAlreadyLiked(!wasLiked);
        setLike((prev) => prev + (wasLiked ? -1 : 1));
      }
    } catch (error: any) {
      console.error("Failed to like problem:", error);
    }
  };

  const handleDislike = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axios.post(
        `/api/problems/dislike/${problemId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setDislike((prev) =>
          response.data.message.includes("removed") ? prev - 1 : prev + 1
        );
      }
    } catch (error: any) {
      console.error("Failed to dislike problem:", error);
    }
  };

  return (
    <div className="px-3 mr-2 flex justify-between bg-[#2e2e2e] rounded-xl items-center">
      <div className="rounded-md flex space-x-4 w-full py-2">
        {/* Description */}
        <button
          onClick={() => setIndex(1)}
          className="flex cursor-pointer hover:text-blue-400 items-center space-x-1 text-sm"
        >
          <TbFileDescription />
          <span>Description</span>
        </button>

        {/* Submissions */}
        <button
          onClick={() => setIndex(2)}
          className="flex cursor-pointer hover:text-blue-400 items-center space-x-1 text-sm"
        >
          <MdOutlineReplay10 />
          <span>Submissions</span>
        </button>

        {/* Ask AI */}
        <button
          onClick={() => setIndex(3)}
          className="flex cursor-pointer hover:text-blue-400 items-center space-x-1 text-sm"
        >
          <FaBrain />
          <span>Ask AI</span>
        </button>

        {/* Like */}
        <button
          onClick={handleLike}
          title={isAuthenticated ? "Like Problem." : "Login to Like."}
          className={`flex cursor-pointer items-center space-x-1 text-sm ml-2 ${
            alreadyLiked ? "text-blue-400" : "hover:text-blue-400"
          }`}
        >
          <FaRegThumbsUp />
          <span>{like}</span>
        </button>

        {/* Dislike */}
        <button
          onClick={handleDislike}
          title={isAuthenticated ? "Dislike Problem." : "Login to Dislike."}
          className="flex cursor-pointer hover:text-blue-400 items-center space-x-1 text-sm ml-2"
        >
          <FaRegThumbsDown />
          <span>{disLike}</span>
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          title={isAuthenticated ? "Save Problem." : "Login to Save."}
          className={`flex cursor-pointer items-center space-x-1 text-sm ml-2 ${
            alreadySaved ? "text-blue-400" : "hover:text-blue-400"
          }`}
        >
          <FaRegBookmark />
        </button>
      </div>

      {/* Fullscreen icon */}
      <div className="hidden md:flex">
        <FaExpand className="hover:text-blue-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default ProblemDetailPageNavbar;
