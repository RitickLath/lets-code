import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 sm:px-8 md:px-10 lg:px-12 bg-[#252525] border-b-2 border-[#2b2b2b] text-white">
      {/* Large Screen */}
      <div className="hidden lg:flex justify-between items-center py-3">
        <h1 className="font-bold text-xl text-[#ae6162]">Let's Code</h1>
        <div className="flex space-x-8">
          <button className="cursor-pointer">About</button>
          <button className="cursor-pointer">Problems</button>
        </div>
        <div className="flex space-x-8">
          <button className="cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="cursor-pointer text-left px-4 py-1 rounded-full bg-[#6166b9] hover:bg-[#3c4069]"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Small Screen */}
      <div className="flex justify-between items-center py-3 lg:hidden">
        <h1 className="text-[#ae6162] text-xl font-semibold">Let's Code</h1>
        <div>
          <Sheet>
            <SheetTrigger>
              <svg
                className="cursor-pointer"
                role="img"
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M5.375 2.65a2.64 2.64 0 01-2.62 2.65 2.64 2.64 0 01-2.63-2.65A2.64 2.64 0 012.755 0a2.64 2.64 0 012.62 2.65zm0 9.35a2.64 2.64 0 01-2.62 2.65A2.64 2.64 0 01.125 12a2.64 2.64 0 012.63-2.65A2.64 2.64 0 015.375 12zm0 9.35A2.64 2.64 0 012.755 24a2.64 2.64 0 01-2.63-2.65 2.64 2.64 0 012.63-2.65 2.64 2.64 0 012.62 2.65zM11.315 0a2.64 2.64 0 00-2.61 2.65 2.64 2.64 0 002.6 2.65h9.94a2.64 2.64 0 002.63-2.65A2.64 2.64 0 0021.255 0zm-2.61 12a2.64 2.64 0 012.62-2.65h5.68a2.64 2.64 0 012.6 2.65 2.64 2.64 0 01-2.6 2.65h-5.7a2.64 2.64 0 01-2.6-2.65z" />
              </svg>
            </SheetTrigger>
            <SheetContent className="text-white border-0 bg-[#343132] w-[250px] sm:w-[450px]">
              <SheetHeader>
                <SheetTitle className="text-[#ae6162] text-center text-lg">
                  Let's Code
                </SheetTitle>

                <div className="pl-2 flex flex-col space-y-4 py-6">
                  <button className="cursor-pointer text-left">About</button>
                  <button className="cursor-pointer text-left">Problem</button>
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={() => navigate("/login")}
                      className="cursor-pointer text-left"
                    >
                      Login
                    </button>
                    <button
                      className="cursor-pointer text-left px-4 py-1 rounded-full bg-[#6166b9] hover:bg-[#3c4069]"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// about
// Login
// logout
// sign up
// problems
// dashboard
// profile
