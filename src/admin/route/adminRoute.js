import React from "react";
import AdminIndex from "../layout/AdminIndex";
import Booking from "../pages/Booking/Booking";
import Home from "../pages/Home/Home";
import Location from "../pages/Location/Location";
import Room from "../pages/Room/Room";
import User from "../pages/User/User";
import PageNotFound from "../pages/404/PageNotFound";

export const adminRoute = {
  home: {
    path: "/admin",
    element: (
      <AdminIndex>
        <Home />
      </AdminIndex>
    ),
  },

  booking: {
    path: "/admin/booking",
    element: (
      <AdminIndex>
        <Booking />
      </AdminIndex>
    ),
  },

  location: {
    path: "/admin/location",
    element: (
      <AdminIndex>
        <Location />
      </AdminIndex>
    ),
  },

  room: {
    path: "/admin/room",
    element: (
      <AdminIndex>
        <Room />
      </AdminIndex>
    ),
  },

  user: {
    path: "/admin/user",
    element: (
      <AdminIndex>
        <User />
      </AdminIndex>
    ),
  },
  other: { path: "admin/*", element: <PageNotFound /> },
};

export default adminRoute;
