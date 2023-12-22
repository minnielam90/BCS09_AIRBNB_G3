import React from "react";
import { https } from "../../services/configServ";

export const userServ = {
  getList: () => {
    return https.get("/api/users");
  },
};

export const roomServ = {
  login: (info) => https.post(`/auth/signin`, info),

  getList: () => {
    return https.get("/api/phong-thue");
  },
  addRoom: (roomData) => {
    return https.post("/api/phong-thue", roomData);
  },
};

export const locationServ = {
  getList: () => {
    return https.get("/api/vi-tri");
  },
};

export const bookingRoomServ = {
  getList: () => {
    return https.get("/api/dat-phong");
  },
};
