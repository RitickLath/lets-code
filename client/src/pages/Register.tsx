import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/context/auth-context";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(null);

    if (formData.password !== formData.confirmPassword) {
      setIsError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setIsError(response.data.error || "Registration failed");
        setIsAuthenticated(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setIsError(error.response?.data?.error || "Something went wrong");
        setIsAuthenticated(false);
      } else {
        setIsError("Unexpected error occurred");
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[80dvh] text-white px-4"
      style={{
        backgroundImage: `
          linear-gradient(to right, #2f2f2f 1px, transparent 1px),
          linear-gradient(to bottom, #2f2f2f 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e1e] w-full max-w-md p-6 rounded-xl shadow-lg border border-[#2f2f2f]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        {/* Error Message */}
        {isError && (
          <div className="text-red-400 text-sm mb-4 text-center">{isError}</div>
        )}

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm text-[#92959c] mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2b2b2b] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#6166b9]"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-[#92959c] mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2b2b2b] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#6166b9]"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm text-[#92959c] mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2b2b2b] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#6166b9]"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm text-[#92959c] mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2b2b2b] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#6166b9]"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#6166b9] hover:bg-[#3c4069] py-2 rounded font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-[#92959c] mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#6166b9] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
