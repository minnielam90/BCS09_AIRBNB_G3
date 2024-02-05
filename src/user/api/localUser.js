// Lưu data vào local
export const saveLocalStore = (data, key) => {
  const dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};
// Lấy data từ local
export const getLocalStore = () => {
  const data = localStorage.getItem("user_info");
  return data ? JSON.parse(data) : null;
};
//  đăng xuất
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
// login ADMIN
export const loginAdmin = () => {
  localStorage.clear();
  window.location.href = "/admin/login";
};
