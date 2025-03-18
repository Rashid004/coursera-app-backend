import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./page/SignUp";
import Courses from "./page/Courses";
import AppLayout from "./ui/AppLayout";
import Signin from "./page/SignIn";
import { ReactNode } from "react";

const isAuthenticated = () => !!localStorage.getItem("token");

// ✅ Type-safe PrivateRoute
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

// ✅ Prevent authenticated users from accessing signin/signup
const AuthRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/courses" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/courses",
        element: (
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <AuthRoute>
            <Signin />
          </AuthRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthRoute>
            <Signup />
          </AuthRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
