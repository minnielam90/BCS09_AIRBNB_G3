import { DatePicker, Modal, message } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInfrmation } from "../../api/apiUser";
import { saveLocalStore } from "../../api/localUser";
import { saveInfoUser } from "../../redux/userSlice";
import Avatar from "../Avatar/Avatar";
import "./personalPage.css";
import dayjs from "dayjs";
import HistoryUser from "../HistoryUser/HistoryUser";
import "./responsitePersonalPage.css";

const PersonalPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  // editInfoUser
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      gender: user.gender,
    },
    onSubmit: (values) => {
      editInfrmation
        .editInfrmation(user.id, values)
        .then((res) => {
          messageApi.open({
            type: "success",
            content: "Cập nhập hồ sơ thành công",
          });
          saveLocalStore(res.data.content, "user_info");
          dispatch(saveInfoUser(res.data.content));
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: err.response.data.content,
          });
        });
    },
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = formik;
  const dateFormat = "DD/MM/YYYY";
  const dateBirthday = dayjs(user.birthday).format(dateFormat);
  return (
    <>
      {contextHolder}
      <div className="content_personalPage">
        <div
          className="container"
          style={{
            paddingTop: 100,
          }}
        >
          <div className="flex contentPersonalPageUser">
            <div className="basis-3/12">
              <div className=" mb-8 sticky top-28 bottom-40">
                <div className="w-5/6">
                  <div
                    style={{
                      height: "80vh",
                      backgroundColor: "white",
                    }}
                    className="mx-auto p-6 shadow-xl border rounded-xl w-full ml-9 "
                  >
                    {/* avatar */}
                    <Avatar />
                    {/* edit user */}{" "}
                    <div
                      className="underline editUserHoSo"
                      style={{
                        textAlign: "center",
                        marginTop: 20,
                      }}
                    >
                      <a
                        onClick={showModal}
                        style={{
                          border: "none",
                          background: "none",
                        }}
                      >
                        Chỉnh sửa hồ sơ
                      </a>{" "}
                      <i
                        className="fa-solid fa-pen"
                        style={{
                          fontSize: 13,
                          paddingBottom: 15,
                        }}
                      />
                      <Modal
                        width={800}
                        title="Chỉnh sửa hồ sơ"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                      >
                        {" "}
                        <form action="" onSubmit={handleSubmit}>
                          <div
                            className="grid grid-cols-2"
                            style={{ gap: "15px" }}
                          >
                            {/* Tên người dùng */}
                            <div className="mb-2">
                              <label
                                htmlFor="name"
                                className="block"
                                style={{
                                  color: "gray",
                                  opacity: "0.5",
                                  marginBottom: "5px",
                                }}
                              >
                                Tên người dùng
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                className="border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                style={{
                                  borderRadius: "5px",
                                  fontSize: "20px",
                                  padding: "10px",
                                  backgroundColor: "#374151",
                                  color: "white",
                                }}
                                placeholder="Điền tên vào đây ..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                              />
                              {errors.name && touched.name ? (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.name}
                                </p>
                              ) : null}
                            </div>
                            {/* Email */}
                            <div className="mb-2">
                              <label
                                htmlFor="email"
                                className="block"
                                style={{
                                  color: "gray",
                                  opacity: "0.5",
                                  marginBottom: "5px",
                                }}
                              >
                                Email
                              </label>
                              <input
                                type="text"
                                id="email"
                                name="email"
                                className="border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                style={{
                                  borderRadius: "5px",
                                  fontSize: "20px",
                                  padding: "10px",
                                  backgroundColor: "#374151",
                                  color: "white",
                                }}
                                placeholder="Example@gmail.com"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                              {errors.email && touched.email ? (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.email}
                                </p>
                              ) : null}
                            </div>
                            {/* Số điện thoại */}
                            <div className="mb-2">
                              <label
                                htmlFor="phone"
                                className="block"
                                style={{
                                  color: "gray",
                                  opacity: "0.5",
                                  marginBottom: "5px",
                                }}
                              >
                                Số điện thoại
                              </label>
                              <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                style={{
                                  borderRadius: "5px",
                                  fontSize: "20px",
                                  padding: "10px",
                                  backgroundColor: "#374151",
                                  color: "white",
                                }}
                                placeholder="098 6888 234"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                              />
                              {errors.phone && touched.phone ? (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.phone}
                                </p>
                              ) : null}
                            </div>
                            {/* Ngày sinh */}
                            <div className="mb-2 content_birthday">
                              <label
                                htmlFor=""
                                className="block"
                                style={{
                                  color: "gray",
                                  opacity: "0.5",
                                  marginBottom: "5px",
                                }}
                              >
                                Ngày sinh
                              </label>
                              <DatePicker
                                className="border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                style={{
                                  borderRadius: "5px",
                                  fontSize: "20px",
                                  padding: "10px",
                                  backgroundColor: "#374151",
                                }}
                                defaultValue={dayjs(dateBirthday, dateFormat)}
                                format={dateFormat}
                                onChange={(date, dateString) => {
                                  setFieldValue("birthday", date);
                                }}
                                onBlur={handleBlur}
                              />
                            </div>
                            {/* Giới tính */}
                            <div className="mb-2">
                              <div>
                                <label
                                  htmlFor="gender"
                                  className="block"
                                  style={{
                                    color: "gray",
                                    opacity: "0.5",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Giới tính
                                </label>
                                <select
                                  id="gender"
                                  name="gender"
                                  className="border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  style={{
                                    borderRadius: "5px",
                                    fontSize: "20px",
                                    padding: "10px",
                                    backgroundColor: "#374151",
                                    color: "white",
                                  }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.gender}
                                >
                                  <option value="">Chọn giới tính</option>
                                  <option value={true}>Nam</option>
                                  <option value={false}>Nữ</option>
                                </select>
                                {errors.gender && touched.gender ? (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.gender}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => {
                                handleOk();
                              }}
                              className="bg-green-500 px-4 py-2 rounded-md font-medium"
                            >
                              Lưu thông tin
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleCancel();
                              }}
                              className="bg-red-500 px-4 py-2 rounded-md font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </Modal>
                    </div>
                    {/* Xác minh danh tính */}
                    <div
                      style={{
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      {user.avatar ? (
                        <div className="flex space-x-1 items-center my-2">
                          <div>
                            <svg
                              height={20}
                              version="1.1"
                              viewBox="0 0 20 20"
                              width={20}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="layer1">
                                <path
                                  d="M 10 0 C 4.4830748 0 0 4.4830748 0 10 C 0 15.516925 4.4830748 20 10 20 C 10.585816 20 11.156471 19.938763 11.714844 19.841797 L 10.833984 18.960938 C 10.559273 18.986249 10.281503 19 10 19 C 7.7805094 19 5.7554759 18.195439 4.1875 16.867188 L 4.2871094 16.835938 L 5.0878906 16.615234 L 5.9003906 16.427734 L 6.7167969 16.273438 L 6.9472656 16.216797 L 7.1699219 16.123047 L 7.3710938 15.996094 L 7.5507812 15.835938 L 7.7011719 15.652344 L 7.8222656 15.443359 L 7.9101562 15.220703 L 7.9570312 14.986328 L 7.9707031 14.748047 L 7.9433594 14.509766 L 7.8789062 14.279297 L 7.7792969 14.0625 L 7.6484375 13.865234 L 7.4902344 13.644531 L 7.3535156 13.416016 L 7.0742188 12.855469 L 6.8261719 12.279297 L 6.609375 11.693359 L 6.4238281 11.09375 L 6.2734375 10.486328 L 6.1542969 9.8710938 L 6.0683594 9.2519531 L 6.015625 8.6289062 L 6 8.0019531 L 6.0195312 7.609375 L 6.078125 7.2207031 L 6.171875 6.8398438 L 6.3046875 6.4707031 L 6.4726562 6.1152344 L 6.6738281 5.7792969 L 6.9082031 5.4628906 L 7.1699219 5.171875 L 7.4628906 4.9082031 L 7.7773438 4.6738281 L 8.1152344 4.4746094 L 8.4707031 4.3046875 L 8.8398438 4.1738281 L 9.21875 4.078125 L 9.6074219 4.0195312 L 10 4 L 10.392578 4.0195312 L 10.78125 4.078125 L 11.160156 4.1738281 L 11.529297 4.3046875 L 11.886719 4.4746094 L 12.222656 4.6738281 L 12.537109 4.9082031 L 12.830078 5.171875 L 13.091797 5.4628906 L 13.326172 5.7792969 L 13.527344 6.1152344 L 13.695312 6.4707031 L 13.828125 6.8398438 L 13.923828 7.2207031 L 13.982422 7.609375 L 14 8.0019531 L 13.984375 8.6289062 L 13.931641 9.2519531 L 13.845703 9.8710938 L 13.728516 10.486328 L 13.576172 11.09375 L 13.390625 11.693359 L 13.173828 12.279297 L 12.925781 12.855469 L 12.646484 13.416016 L 12.509766 13.644531 L 12.351562 13.865234 L 12.220703 14.0625 L 12.121094 14.279297 L 12.056641 14.509766 L 12.029297 14.748047 L 12.042969 14.986328 L 12.091797 15.220703 L 12.177734 15.443359 L 12.298828 15.652344 L 12.451172 15.835938 L 12.628906 15.996094 L 12.830078 16.123047 L 13.052734 16.216797 L 13.283203 16.273438 L 14.099609 16.427734 L 14.380859 16.492188 L 15.210938 15.662109 L 15.15625 15.646484 L 14.306641 15.449219 L 13.447266 15.287109 L 13.322266 15.25 L 13.212891 15.181641 L 13.125 15.087891 L 13.0625 14.974609 L 13.033203 14.847656 L 13.035156 14.720703 L 13.070312 14.595703 L 13.136719 14.484375 L 13.347656 14.193359 L 13.529297 13.884766 L 13.833984 13.275391 L 14.103516 12.652344 L 14.339844 12.013672 L 14.541016 11.361328 L 14.705078 10.703125 L 14.833984 10.035156 L 14.925781 9.359375 L 14.982422 8.6816406 L 15 8.0019531 L 14.982422 7.5664062 L 14.923828 7.1328125 L 14.830078 6.7070312 L 14.697266 6.2910156 L 14.53125 5.8886719 L 14.330078 5.5 L 14.097656 5.1328125 L 13.830078 4.7871094 L 13.537109 4.4648438 L 13.212891 4.171875 L 12.869141 3.90625 L 12.5 3.6699219 L 12.113281 3.46875 L 11.710938 3.3027344 L 11.294922 3.1699219 L 10.867188 3.0761719 L 10.435547 3.0195312 L 10 3 L 9.5644531 3.0195312 L 9.1328125 3.0761719 L 8.7050781 3.1699219 L 8.2890625 3.3027344 L 7.8867188 3.46875 L 7.5 3.6699219 L 7.1328125 3.90625 L 6.7871094 4.171875 L 6.4628906 4.4648438 L 6.1699219 4.7871094 L 5.9042969 5.1328125 L 5.6699219 5.5 L 5.46875 5.8886719 L 5.3027344 6.2910156 L 5.1699219 6.7070312 L 5.0761719 7.1328125 L 5.0195312 7.5664062 L 5 8.0019531 L 5.0175781 8.6816406 L 5.0742188 9.359375 L 5.1660156 10.035156 L 5.2949219 10.703125 L 5.4589844 11.361328 L 5.6601562 12.013672 L 5.8984375 12.652344 L 6.1660156 13.275391 L 6.4707031 13.884766 L 6.6523438 14.193359 L 6.8632812 14.484375 L 6.9296875 14.595703 L 6.9648438 14.720703 L 6.96875 14.847656 L 6.9375 14.974609 L 6.875 15.087891 L 6.7871094 15.181641 L 6.6777344 15.25 L 6.5527344 15.287109 L 5.6953125 15.449219 L 4.84375 15.646484 L 4.0019531 15.878906 L 3.375 16.080078 C 1.9045777 14.478558 1 12.349397 1 10 C 1 5.0235149 5.0235149 1 10 1 C 14.976485 1 19 5.0235149 19 10 C 19 10.770107 18.893394 11.512655 18.710938 12.224609 C 18.934373 12.0863 19.190334 12.003491 19.457031 11.996094 C 19.572069 11.992939 19.680193 12.017817 19.789062 12.041016 C 19.926187 11.381756 20 10.699535 20 10 C 20 4.4830748 15.516925 0 10 0 z M 19.484375 12.996094 C 19.354615 12.999694 19.231345 13.053634 19.140625 13.146484 L 13.494141 18.792969 L 10.847656 16.146484 C 10.376401 15.655678 9.6498182 16.382262 10.140625 16.853516 L 13.140625 19.853516 C 13.33589 20.0487 13.652391 20.0487 13.847656 19.853516 L 19.847656 13.853516 C 20.172926 13.535513 19.939096 12.983623 19.484375 12.996094 z "
                                  style={{
                                    fill: "#222222",
                                    fillOpacity: 1,
                                    stroke: "none",
                                    strokeWidth: 0,
                                    fill: "green",
                                  }}
                                />
                              </g>
                            </svg>
                          </div>
                          <p className="text-green-500">
                            Đã cập nhập ảnh đại diện
                          </p>
                        </div>
                      ) : (
                        <div className="flex space-x-1 items-center my-2">
                          <div>
                            <svg
                              height={20}
                              version="1.1"
                              viewBox="0 0 20 20"
                              width={20}
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                color: "red",
                              }}
                            >
                              <g id="layer1">
                                <path
                                  d="M 10 0 C 4.4830748 0 0 4.4830748 0 10 C 0 15.516925 4.4830748 20 10 20 C 10.688953 20 11.361729 19.92998 12.011719 19.796875 C 11.996369 19.723105 11.982546 19.649468 11.978516 19.570312 C 11.963916 19.28398 12.055646 18.978224 12.214844 18.71875 C 11.506055 18.898816 10.765886 19 10 19 C 7.7805094 19 5.7554759 18.195439 4.1875 16.867188 L 4.2871094 16.835938 L 5.0878906 16.615234 L 5.9003906 16.427734 L 6.7167969 16.273438 L 6.9472656 16.216797 L 7.1699219 16.123047 L 7.3710938 15.996094 L 7.5507812 15.835938 L 7.7011719 15.652344 L 7.8222656 15.443359 L 7.9101562 15.220703 L 7.9570312 14.986328 L 7.9707031 14.748047 L 7.9433594 14.509766 L 7.8789062 14.279297 L 7.7792969 14.0625 L 7.6484375 13.865234 L 7.4902344 13.644531 L 7.3535156 13.416016 L 7.0742188 12.855469 L 6.8261719 12.279297 L 6.609375 11.693359 L 6.4238281 11.09375 L 6.2734375 10.486328 L 6.1542969 9.8710938 L 6.0683594 9.2519531 L 6.015625 8.6289062 L 6 8.0019531 L 6.0195312 7.609375 L 6.078125 7.2207031 L 6.171875 6.8398438 L 6.3046875 6.4707031 L 6.4726562 6.1152344 L 6.6738281 5.7792969 L 6.9082031 5.4628906 L 7.1699219 5.171875 L 7.4628906 4.9082031 L 7.7773438 4.6738281 L 8.1152344 4.4746094 L 8.4707031 4.3046875 L 8.8398438 4.1738281 L 9.21875 4.078125 L 9.6074219 4.0195312 L 10 4 L 10.392578 4.0195312 L 10.78125 4.078125 L 11.160156 4.1738281 L 11.529297 4.3046875 L 11.886719 4.4746094 L 12.222656 4.6738281 L 12.537109 4.9082031 L 12.830078 5.171875 L 13.091797 5.4628906 L 13.326172 5.7792969 L 13.527344 6.1152344 L 13.695312 6.4707031 L 13.828125 6.8398438 L 13.923828 7.2207031 L 13.982422 7.609375 L 14 8.0019531 L 13.984375 8.6289062 L 13.931641 9.2519531 L 13.845703 9.8710938 L 13.728516 10.486328 L 13.576172 11.09375 L 13.390625 11.693359 L 13.267578 12.027344 C 13.341998 12.015244 13.412974 11.990254 13.490234 11.990234 C 13.766723 11.990263 14.032958 12.071764 14.265625 12.212891 L 14.339844 12.013672 L 14.541016 11.361328 L 14.705078 10.703125 L 14.833984 10.035156 L 14.925781 9.359375 L 14.982422 8.6816406 L 15 8.0019531 L 14.982422 7.5664062 L 14.923828 7.1328125 L 14.830078 6.7070312 L 14.697266 6.2910156 L 14.53125 5.8886719 L 14.330078 5.5 L 14.097656 5.1328125 L 13.830078 4.7871094 L 13.537109 4.4648438 L 13.212891 4.171875 L 12.869141 3.90625 L 12.5 3.6699219 L 12.113281 3.46875 L 11.710938 3.3027344 L 11.294922 3.1699219 L 10.867188 3.0761719 L 10.435547 3.0195312 L 10 3 L 9.5644531 3.0195312 L 9.1328125 3.0761719 L 8.7050781 3.1699219 L 8.2890625 3.3027344 L 7.8867188 3.46875 L 7.5 3.6699219 L 7.1328125 3.90625 L 6.7871094 4.171875 L 6.4628906 4.4648438 L 6.1699219 4.7871094 L 5.9042969 5.1328125 L 5.6699219 5.5 L 5.46875 5.8886719 L 5.3027344 6.2910156 L 5.1699219 6.7070312 L 5.0761719 7.1328125 L 5.0195312 7.5664062 L 5 8.0019531 L 5.0175781 8.6816406 L 5.0742188 9.359375 L 5.1660156 10.035156 L 5.2949219 10.703125 L 5.4589844 11.361328 L 5.6601562 12.013672 L 5.8984375 12.652344 L 6.1660156 13.275391 L 6.4707031 13.884766 L 6.6523438 14.193359 L 6.8632812 14.484375 L 6.9296875 14.595703 L 6.9648438 14.720703 L 6.96875 14.847656 L 6.9375 14.974609 L 6.875 15.087891 L 6.7871094 15.181641 L 6.6777344 15.25 L 6.5527344 15.287109 L 5.6953125 15.449219 L 4.84375 15.646484 L 4.0019531 15.878906 L 3.375 16.080078 C 1.9045777 14.478558 1 12.349397 1 10 C 1 5.0235149 5.0235149 1 10 1 C 14.976485 1 19 5.0235149 19 10 C 19 10.767956 18.894362 11.508593 18.712891 12.21875 C 18.935994 12.080995 19.190909 11.997616 19.457031 11.990234 C 19.572733 11.987034 19.681562 12.011686 19.791016 12.035156 C 19.927319 11.37778 20 10.697385 20 10 C 20 4.4830748 15.516925 0 10 0 z M 13.490234 12.990234 C 13.042214 12.990373 12.820437 13.534284 13.140625 13.847656 L 15.787109 16.494141 L 13.140625 19.140625 C 12.649785 19.611879 13.376402 20.338496 13.847656 19.847656 L 16.494141 17.201172 L 19.140625 19.847656 C 19.611879 20.338496 20.338496 19.611879 19.847656 19.140625 L 17.201172 16.494141 L 19.847656 13.847656 C 20.172926 13.529653 19.939096 12.977763 19.484375 12.990234 C 19.354615 12.993834 19.231344 13.047774 19.140625 13.140625 L 16.494141 15.787109 L 13.847656 13.140625 C 13.753596 13.044465 13.624753 12.990248 13.490234 12.990234 z "
                                  style={{
                                    fill: "#222222",
                                    fillOpacity: 1,
                                    stroke: "red",
                                    strokeWidth: 0,
                                    fill: "red",
                                  }}
                                />
                              </g>
                            </svg>
                          </div>
                          <p className="text-red-500">Cập nhập ảnh đại diện</p>
                        </div>
                      )}
                    </div>
                    {/* Thông tin cá nhân */}
                    <div className="space-y-4">
                      <h3
                        style={{
                          fontSize: 20,
                          fontWeight: "650",
                          marginTop: 15,
                        }}
                      >
                        Thông tin cá nhân
                      </h3>
                      <div className="space-y-4 information">
                        <div className="flex gap-3 items-center">
                          <i className="fa-solid fa-user" />
                          <p>{user.name}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <i className="fa-solid fa-cake-candles" />
                          <p>{moment(user.birthday).format("DD/MM/YYYY")}</p>
                        </div>
                        <div className="flex gap-3 items-center gender">
                          {user.gender ? (
                            <i className="fa-solid fa-person" />
                          ) : (
                            <i className="fa-solid fa-person-dress" />
                          )}
                          {user.gender ? <p>Nam</p> : <p>Nữ</p>}
                        </div>
                        <div className="flex gap-3 items-center">
                          <i className="fa-solid fa-phone" />{" "}
                          <p>{user.phone}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <i className="fa-solid fa-envelope" />
                          <p>{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-9/12">
              <HistoryUser />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalPage;
