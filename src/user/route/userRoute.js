import React from "react";
import HomePages from "../pages/Home/HomePages";
import HomeIndex from "../layout/HomeIndex";
import DetailItem from "../pages/DetailItem/DetailItem";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PersonalPage from "../pages/PersonalPage/PersonalPage";

export const userRoute = {
  home: {
    path: "/",
    element: (
      <HomeIndex>
        <HomePages />
      </HomeIndex>
    ),
  },
  detailItem: {
    path: "/detailItem/:id",
    element: (
      <HomeIndex>
        <DetailItem />
      </HomeIndex>
    ),
    id: (id) => `/detailItem/${id}`,
  },
  login: {
    path: "/login",
    element: <Login />,
  },
  register: {
    path: "/register",
    element: <Register />,
  },
  personalPage: {
    path: "/personalPage/:id",
    element: (
      <HomeIndex>
        <PersonalPage />
      </HomeIndex>
    ),
    id: (id) => `/personalPage/${id}`,
  },
};
