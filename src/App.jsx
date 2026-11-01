
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Component/Layout";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import ProtectedRoute from "./Component/ProtectedRoute";
import Profile from "./Component/profile";
import Internship from "./pages/internship";
import InternshipDetails from "./pages/InternshipDetails";
import ApplyInternship from "./pages/ApplyInternship";
import Students from "./pages/Students";
import TrainingSeasons from "./pages/TrainingSeasons";
import ImportStudents from "./pages/ImportStudents";
import Notfound from "./pages/Notfound";
import "./index.css";
import { I18nProvider } from "./i18n";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function saveUserData() {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setUserData(null);
      setAuthLoading(false);
      return null;
    }

    try {
      jwtDecode(token);

      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(data.data);
      setAuthLoading(false);
      return data.data;
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error.response?.data || error.message
      );

      localStorage.removeItem("userToken");
      setUserData(null);
      setAuthLoading(false);
      return null;
    }
  }

  useEffect(() => {
    saveUserData();
  }, []);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    window.location.href = "/login";
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login saveUserData={saveUserData} />,
    },
    {
      path: "/forgot-password",
      element: <Forgotpassword />,
    },
    {
      path: "/",
      element: <Layout userData={userData} logOut={logOut} />,
      children: [
        {
          index: true,
          element: <Navigate to="/internship" replace />,
        },
        {
          path: "internship",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <Internship />
            </ProtectedRoute>
          ),
        },
        {
          path: "internship/:id",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <InternshipDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "internship/:id/apply",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <ApplyInternship />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "students",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <Students />
            </ProtectedRoute>
          ),
        },
        {
          path: "training-seasons",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <TrainingSeasons />
            </ProtectedRoute>
          ),
        },
        {
          path: "import-students",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <ImportStudents />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoute userData={userData} loading={authLoading}>
              <Notfound />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <I18nProvider><RouterProvider router={router} /></I18nProvider>;
}
