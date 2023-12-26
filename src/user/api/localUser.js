// Lưu data vào local
export const saveLocalStore = (data, key) => {
  const dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};
// Lấy data từ local
export const getLocalStore = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
