import { https } from "./configAdmin";

// Đăng nhập
export const loginAdmin = {
  loginAdmin: (data) => {
    return https.post("/api/auth/signin", data);
  },
};

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
  changeImageRoom: (id, formFile) => {
    return https.post(
      `/api/phong-thue/upload-hinh-phong?maPhong=${id}`,
      { formFile: formFile },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export const locationServ = {
  getList: () => {
    return https.get("/api/vi-tri");
  },
  addLocation: (locationData) => {
    return https.post("/api/vi-tri", locationData);
  },
  addLocationImage: (data) => {
    return https.post("/api/vi-tri/upload-hinh-vitri", data);
  },
  deleteLocation: (id) => {
    return https.delete(`/api/vi-tri/${id}`);
  },
  getDetailLocation: (id) => {
    return https.get(`/api/vi-tri/${id}`);
  },
  editLocation: (id, locationData) => {
    return https.put(`/api/vi-tri/${id}`, locationData);
  },
  changeImageLocation: (id, formFile) => {
    return https.post(
      `/api/vi-tri/upload-hinh-vitri?maViTri=${id}`,
      { formFile: formFile },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export const bookingRoomServ = {
  getList: () => {
    return https.get("/api/dat-phong");
  },
  addBookingRoom: (bookingRoomData) => {
    return https.post("/api/dat-phong", bookingRoomData);
  },
  deleteBookingRoom: (id) => {
    return https.delete(`/api/dat-phong/${id}`);
  },
  getDetailBookingRoom: (id) => {
    return https.get(`/api/dat-phong/${id}`);
  },
  editBookingRoom: (id, roomData) => {
    return https.put(`/api/dat-phong/${id}`, roomData);
  },
};
