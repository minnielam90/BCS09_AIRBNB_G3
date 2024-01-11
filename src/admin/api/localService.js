export const userLocalStorage = {
  set: (adminLogin) => {
    let dataJson = JSON.stringify(adminLogin);
    localStorage.setItem("ADMIN", dataJson);
  },
  get: () => {
    let dataJson = localStorage.getItem("ADMIN");
    return JSON.parse(dataJson);
  },
  remove: () => {
    localStorage.removeItem("ADMIN");
  },
};

export const getLocalStore = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
