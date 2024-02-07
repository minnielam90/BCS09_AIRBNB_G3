import React from "react";
import AdminIndex from "../layout/AdminIndex";
import Booking from "../pages/Booking/Booking";
import Home from "../pages/Home/Home";
import Location from "../pages/Location/Location";
import Room from "../pages/Room/Room";
import User from "../pages/User/User";
import PageNotFound from "../pages/404/PageNotFound";
import LoginAdmin from "../pages/Login/LoginAdmin";
import PrivateRoute from "./PrivateRoute";

export const adminRoute = {
  login: { path: "/admin/login", element: <LoginAdmin /> },
  home: {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminIndex>
          <Home />
        </AdminIndex>
      </PrivateRoute>
    ),
  },

  booking: {
    path: "/admin/booking",
    element: (
      <PrivateRoute>
        <AdminIndex>
          <Booking />
        </AdminIndex>
      </PrivateRoute>
    ),
  },

  location: {
    path: "/admin/location",
    element: (
      <PrivateRoute>
        <AdminIndex>
          <Location />
        </AdminIndex>
      </PrivateRoute>
    ),
  },

  room: {
    path: "/admin/room",
    element: (
      <PrivateRoute>
        <AdminIndex>
          <Room />
        </AdminIndex>
      </PrivateRoute>
    ),
  },

  user: {
    path: "/admin/user",
    element: (
      <PrivateRoute>
        <AdminIndex>
          <User />
        </AdminIndex>
      </PrivateRoute>
    ),
  },
  other: { path: "admin/*", element: <PageNotFound /> },
};

export default adminRoute;
