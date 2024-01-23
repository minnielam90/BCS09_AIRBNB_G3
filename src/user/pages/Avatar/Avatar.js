import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, message } from "antd";
import "./avatar.css";
import { useFormik } from "formik";
import { editAvatar } from "../../api/apiUser";
import { saveLocalStore } from "../../api/localUser";
import { saveInfoUser } from "../../redux/userSlice";
const Avatar = () => {
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
  };
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append("formFile", values[key]);
      }
      editAvatar
        .editAvatar(formData)
        .then((res) => {
          messageApi.open({
            type: "success",
            content: "Cập nhập ảnh thành công",
          });
          resetForm();
          setavatarUser("");
          let data = {
            ...res.data.content,
            token: res.data.content,
          };
          console.log(res.data.content)
          // dispatch(saveInfoUser({ ...data }));
          // saveLocalStore({ ...data }, "user_info");
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: err.response.data.content,
          });
        });
    },
  });
  const [avatarUser, setavatarUser] = useState([]);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = formik;
  return (
    <div>
      {contextHolder}
      <div className="contentAvatar">
        <div className="bg_show">
          <button onClick={showModal}>
            {user.avatar ? (
              <div>
                <img
                  style={{
                    width: 270,
                    height: 270,
                    borderRadius: "50%",
                  }}
                  src={user.avatar}
                  alt=""
                />
                <div className="middle">
                  <div className="test_bg">
                    <i className="fa-solid fa-camera" />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <svg
                  className=""
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    width: 270,
                    height: 270,
                    //   backgroundColor: "#FF385C",
                    borderRadius: "50%",
                  }}
                >
                  <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                </svg>
                <div className="middle">
                  <div className="test_bg">
                    <i className="fa-solid fa-camera" />
                  </div>
                </div>
              </div>
            )}
          </button>
          <Modal
            title="Thay đổi ảnh đại diện"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <form action="" onSubmit={handleSubmit}>
              <div>
                {/* Tên người dùng */}
                <div className="mb-2">
                  <img
                    // style={{
                    //   width: 270,
                    //   height: 270,
                    //   borderRadius: "50%",
                    // }}
                    src={avatarUser}
                    alt=""
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    className="border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    style={{
                      borderRadius: "5px",
                      fontSize: "20px",
                      padding: "10px",
                      backgroundColor: "#374151",
                      color: "white",
                    }}
                    onChange={(event) => {
                      const img = event.target.files[0];
                      if (img) {
                        const urlImg = URL.createObjectURL(img);
                        setavatarUser(urlImg);
                      }
                      setFieldValue("avatar", img);
                    }}
                    accept="image/*"
                    onBlur={handleBlur}
                    // value={values.avatar.name ? values.avatar.name : ''}
                  />
                  {/* {errors.name && touched.name ? (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.name}
                                </p>
                              ) : null} */}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    handleOk();
                  }}
                  className="bg-green-500 px-4 py-2 rounded-md font-medium"
                >
                  Lưu thay đổi
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
      </div>
    </div>
  );
};

export default Avatar;
