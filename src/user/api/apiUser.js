import React from "react";
import { https } from "../../services/configServ";

export const itemKS = {
  getAllItem: () => {
    return https.get("/api/phong-thue");
  },
};

export const detailRoom = {
  getRoomDetail: (id) => {
    return https.get(`/api/phong-thue/${id}`);
  },
};
// Đăng nhập
export const loginUser = {
  loginUser: (data) => {
    return https.post("/api/auth/signin", data);
  },
};
