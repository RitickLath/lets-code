import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProblemDetail from "./pages/ProblemDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import NonProtectedRoute from "./components/NonProtectedRoute";
import { lazy, Suspense } from "react";

const Problems = lazy(() => import("./pages/Problems"));

const App = () => {
  return (
    <div className="min-h-screen bg-[#252525] ">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="py-4 px-6 sm:px-8 md:px-10 lg:px-12 bg-[#252525] min-h-[90dvh] text-white">
            <Routes>
              {/* All can access */}
              <Route path="/" element={<Home />} />
              <Route
                path="/problems"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Problems />
                  </Suspense>
                }
              />
              <Route path="/problems/:id" element={<ProblemDetail />} />

              {/* Only Non Logged In user */}
              <Route element={<NonProtectedRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Only logged in user */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Error/Invalid Routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
