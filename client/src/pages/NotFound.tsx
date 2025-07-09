import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-[#ae6162] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-white">Page Not Found</h2>
      <p className="text-[#92959c] mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#6166b9] hover:bg-[#3c4069] text-white px-6 py-2 rounded-lg transition duration-200"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
