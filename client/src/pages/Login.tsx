import { AuthContext } from "@/context/auth-context";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "", // username or email
    password: "",
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
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setIsError(response.data.error || "Login failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setIsError(error.response?.data?.error || "Login failed");
        setIsAuthenticated(false);
      } else {
        setIsError("Something went wrong");
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
          Login to Your Account
        </h2>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 text-sm text-center mb-4">{isError}</p>
        )}

        {/* Identifier Input */}
        <div className="mb-4">
          <label className="block text-sm text-[#92959c] mb-1">
            Username or Email
          </label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#2b2b2b] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#6166b9]"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#6166b9] hover:bg-[#3c4069] py-2 rounded font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm text-[#92959c] mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#6166b9] cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
