import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "antd";
import "./avatar.css";
const Avatar = () => {
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
  return (
    <div>
      <div className="contentAvatar">
        <div>
          <button onClick={showModal}>
            {user.avatar ? (
              <img
                style={{
                  width: 270,
                  height: 270,
                  borderRadius: "50%",
                }}
                src={user.avatar}
                alt=""
              />
            ) : (
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
            )}

            <div className="contentI">
              <i className="fa-solid fa-camera" />
            </div>
          </button>
          <Modal
            title="Thay đổi ảnh đại diện"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <form action=""
            //  onSubmit={handleSubmit}
             >
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
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // value={values.name}
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
      </div>
    </div>
  );
};

export default Avatar;
