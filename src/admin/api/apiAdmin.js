import React from "react";
import { https } from "../../services/configServ";

export const userServ = {
  getList: () => {
    return https.get("/api/users");
  },
};

export const roomServ = {
  getList: () => {
    return https.get("/api/phong-thue");
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
