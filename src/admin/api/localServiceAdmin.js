// Lưu data vào local
export const saveAdminLocalStore = (data, key) => {
  const dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};
// Lấy data từ local
export const getAdminLocalStore = () => {
  const data = localStorage.getItem("admin_info");
  return data ? JSON.parse(data) : null;
};
//  đăng xuất
export const adminLogout = () => {
  localStorage.clear();
  window.location.href = "/admin/login";
};
