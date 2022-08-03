import React, { FC, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Nav } from "@/components/Nav";

import { history } from "@/helper";
import { useAppSelector } from "@/store";

import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "@/routes/PrivateRoute";

const App: FC = () => {
  history.navigate = useNavigate();
  history.location = useLocation();

  const dark = useAppSelector((state) => state.theme.dark);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="dark:text-white">
      <Nav />
      <div className="container mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
