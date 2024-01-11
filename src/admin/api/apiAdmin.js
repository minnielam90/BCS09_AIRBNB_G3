import React from "react";
import { https } from "../../services/configServ";

export const userServ = {
  getList: () => {
    return https.get("/api/users");
  },
  addUser: (userData) => {
    return https.post("/api/users", userData);
  },
  deleteUser: (id) => {
    return https.delete(`/api/users?id=${id}`);
  },
  getDetailUser: (id) => {
    return https.get(`/api/users/${id}`);
  },
  editUser: (id, values) => {
    return https.put(`/api/users/${id}`, values);
  },
};

export const roomServ = {
  // login: (info) => https.post(`/api/auth/signin`, info),

  getList: () => {
    return https.get("/api/phong-thue");
  },
  addRoom: (roomData) => {
    return https.post("/api/phong-thue", roomData);
  },
  addRoomImage: (data) => {
    return https.post("/api/phong-thue/upload-hinh-phong", data);
  },
  deleteRoom: (id) => {
    return https.delete(`/api/phong-thue/${id}`);
  },
  getDetailRoom: (id) => {
    return https.get(`/api/phong-thue/${id}`);
  },
  editRoom: (id, roomData) => {
    return https.put(`/api/phong-thue/${id}`, roomData);
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
