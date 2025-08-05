import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

interface Problem {
  _id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface Submission {
  _id: string;
  user: string;
  problemId: Problem;
  language: string;
  status: string;
  executionTime: number;
  memoryUsed: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProfileData {
  email: string;
  username: string;
  likedProblem: Problem[];
  SavedProblem: Problem[];
  createdAt: string;
  problemSolved: number;
  recentSubmissions: Submission[];
  totalSubmissions: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/auth/profile",
          {
            withCredentials: true,
          }
        );
        setProfile(data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-10">Loading profile...</div>
    );
  }

  if (!profile) {
    return (
      <div className="text-red-400 text-center py-10">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* User Info */}
      <div className="bg-[#1f1f1f] text-center rounded-xl p-6 mb-6 shadow-lg">
        <p className="text-4xl md:text-5xl pb-3 font-semibold">
          {profile.username}
        </p>
        <p>{profile.email}</p>
        <p className="text-gray-400">
          Joined: {moment(profile.createdAt).format("MMMM Do YYYY")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#2b2b2b] rounded-xl p-4 text-center hover:scale-105">
          <p className="text-xl font-bold">{profile.problemSolved}</p>
          <p className="text-sm text-gray-400">Problems Solved</p>
        </div>
        <div className="bg-[#2b2b2b] rounded-xl p-4 text-center hover:scale-105">
          <p className="text-xl font-bold">{profile.likedProblem.length}</p>
          <p className="text-sm text-gray-400">Liked Problems</p>
        </div>
        <div className="bg-[#2b2b2b] rounded-xl p-4 text-center hover:scale-105">
          <p className="text-xl font-bold">{profile.SavedProblem.length}</p>
          <p className="text-sm text-gray-400">Saved Problems</p>
        </div>
        <div className="bg-[#2b2b2b] rounded-xl p-4 text-center hover:scale-105">
          <p className="text-xl font-bold">{profile.totalSubmissions}</p>
          <p className="text-sm text-gray-400">Total Submissions</p>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-[#1f1f1f] rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 pl-1">Recent Submissions</h2>
        {profile.recentSubmissions.length === 0 ? (
          <p className="text-gray-400 text-center">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {profile.recentSubmissions.map((sub: Submission) => (
              <div
                key={sub._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#2b2b2b] p-4 rounded-xl hover:scale-105"
              >
                <div>
                  <p className="font-semibold text-lg">{sub.problemId.title}</p>
                  <p className="text-sm text-gray-400">
                    Difficulty:{" "}
                    <span className="capitalize">
                      {sub.problemId.difficulty}
                    </span>{" "}
                    | Language: {sub.language}
                  </p>
                </div>
                <div className="text-sm text-gray-300 mt-2 md:mt-0">
                  <p>
                    <span
                      className={`font-semibold ${
                        sub.status === "Accepted"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </p>
                  <p>{moment(sub.createdAt).fromNow()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

// will add like and saved problem showcase also
