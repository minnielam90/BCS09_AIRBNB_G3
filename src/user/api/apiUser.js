import React from "react";
import { https } from "../../services/configServ";

// lấy thông tin phòng thuê
export const itemKS = {
  getAllItem: () => {
    return https.get("/api/phong-thue");
  },
};
// lấy thông tin chi tiết phòng thuê
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
// lấy thông tin bình luận
export const getComment = {
  getComment: (maPhong) => {
    return https.get(`/api/binh-luan/lay-binh-luan-theo-phong/${maPhong}`);
  },
};
// đăng kí
export const registerPost = {
  registerPost: (data) => {
    return https.post("/api/auth/signup", data);
  },
};
// post comment
export const postComment = {
  postComment: (data) => {
    return https.post("/api/binh-luan", data);
  },
};
// edit information
export const editInfrmation = {
  editInfrmation: (id, data) => {
    return https.put(`/api/users/${id}`, data);
  },
};
