import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { itemKS, layTheoNguoiDung } from "../../api/apiUser";
import { useSelector } from "react-redux";
import { differenceInDays, format } from "date-fns";
import "./responsiteHistoryUser.css";
const HistoryUser = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [listItemHU, setListItemHU] = useState([]);
  // getInfoRoom
  useEffect(() => {
    itemKS
      .getAllItem()
      .then((res) => {
        setListItemHU(res.data.content);
      })
      .catch((err) => {});
  }, []);
  // getRoomBooking
  const [listRoomBooking, setListRoomBooking] = useState([]);
  useEffect(() => {
    layTheoNguoiDung
      .layTheoNguoiDung(user.id)
      .then((res) => {
        setListRoomBooking(res.data.content);
      })
      .catch((err) => {});
  }, []);
  // Filter Room
  useEffect(() => {
    // Lọc ra những phòng có trong cả listItemHU và listRoomBooking
    const filteredRooms = listItemHU.filter((item) => {
      return listRoomBooking.some((booking) => booking.maPhong === item.id);
    });

    setFilteredRooms(filteredRooms);
  }, [listItemHU, listRoomBooking]); // Thêm listItemHU và listRoomBooking vào dependencies để useEffect chạy lại khi chúng thay đổi

  return (
    <div>
      <h2
        style={{
          fontSize: 30,
          fontWeight: "650",
        }}
        className="mb-4"
      >
        Phòng đã thuê
      </h2>
      <div className="space-y-3 mb-4">
        {filteredRooms.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-xl border rounded-xl flex space-y-3 contentHistoryUser"
            >
              <div
                className="w-4/12 contentHistoryUserL"
                style={{
                  padding: 20,
                }}
              >
                <NavLink to={`/detailItem/${item.id}`}>
                  <img
                    src={item.hinhAnh}
                    alt=""
                    style={{
                      width: 450,
                      borderRadius: 10,
                      height: 250,
                    }}
                  />
                </NavLink>
              </div>
              <div
                className="w-8/12 pr-6 contentHistoryUserR"
                style={{
                  position: "relative",
                }}
              >
                <div className="flex justify-between titlePersonalRoom">
                  <NavLink to={`/detailItem/${item.id}`}>
                    <h3
                      className="nameRooom"
                      style={{
                        fontSize: 25,
                        fontWeight: "650",
                        width: "100%",
                      }}
                    >
                      {item.tenPhong}
                    </h3>
                  </NavLink>
                  <i
                    className="fa-regular fa-heart"
                    style={{
                      fontSize: 20,
                    }}
                  />
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                    width: 70,
                    margin: "5px 0",
                  }}
                ></div>
                <p>{item.moTa}</p>
                <div
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                    width: 70,
                    margin: "5px 0",
                  }}
                ></div>
                <div className="flex space-x-3 userRooomTienIch">
                  <p>
                    {item.khach}
                    khách
                  </p>
                  <span> . </span>
                  <p>
                    {item.giuong}
                    giường
                  </p>
                  <span> . </span>
                  <p>
                    {item.phongNgu}
                    phòng ngủ
                  </p>
                  <span> . </span>
                  <p>
                    {item.phongTam}
                    phòng tắm
                  </p>
                </div>
                <div className="flex space-x-3 mt-3 nhuCauRoomUserBG">
                  {item.mayGiat ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 77.578 0 H 12.422 C 9.699 0 7.483 2.216 7.483 4.939 v 14.926 v 59.049 v 6.147 c 0 2.723 2.216 4.938 4.939 4.938 h 65.156 c 2.723 0 4.938 -2.216 4.938 -4.938 v -6.147 V 19.865 V 4.939 C 82.517 2.216 80.301 0 77.578 0 z M 9.483 4.939 C 9.483 3.318 10.802 2 12.422 2 h 65.156 c 1.62 0 2.938 1.318 2.938 2.939 v 13.926 H 9.483 V 4.939 z M 80.517 20.865 v 57.049 H 9.483 V 20.865 H 80.517 z M 80.517 85.062 c 0 1.62 -1.318 2.938 -2.938 2.938 H 12.422 c -1.621 0 -2.939 -1.318 -2.939 -2.938 v -5.147 h 71.033 V 85.062 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 45 71.295 c 12.078 0 21.905 -9.827 21.905 -21.905 c 0 -12.079 -9.827 -21.906 -21.905 -21.906 c -12.079 0 -21.905 9.827 -21.905 21.906 C 23.095 61.468 32.921 71.295 45 71.295 z M 45 29.484 c 10.976 0 19.905 8.93 19.905 19.906 c 0 10.976 -8.93 19.905 -19.905 19.905 s -19.905 -8.93 -19.905 -19.905 C 25.095 38.414 34.024 29.484 45 29.484 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 29.984 46.719 c -0.074 0.415 -0.138 0.832 -0.178 1.257 c -0.047 0.479 -0.072 0.952 -0.072 1.414 c 0 8.418 6.848 15.266 15.266 15.266 c 0.507 0 1.008 -0.028 1.503 -0.076 c 0.107 -0.011 0.212 -0.03 0.319 -0.043 c 0.398 -0.047 0.792 -0.104 1.18 -0.181 c 0.084 -0.017 0.165 -0.038 0.249 -0.057 c 0.421 -0.09 0.835 -0.196 1.242 -0.32 c 0.036 -0.011 0.071 -0.023 0.106 -0.034 c 3.78 -1.181 6.932 -3.782 8.804 -7.255 c 0.031 -0.057 0.057 -0.117 0.088 -0.175 c 0.171 -0.328 0.336 -0.66 0.484 -1.003 c 0.106 -0.24 0.197 -0.487 0.29 -0.733 c 0.06 -0.161 0.123 -0.32 0.177 -0.484 c 0.119 -0.348 0.221 -0.703 0.314 -1.062 c 0.018 -0.068 0.036 -0.136 0.053 -0.204 c 0.101 -0.41 0.183 -0.826 0.25 -1.248 c 0.003 -0.017 0.007 -0.033 0.01 -0.05 c 0.001 -0.006 0 -0.012 0 -0.017 c 0.117 -0.76 0.196 -1.531 0.196 -2.323 c 0 -8.418 -6.848 -15.266 -15.266 -15.266 c -7.455 0 -13.669 5.376 -14.995 12.453 c -0.001 0.003 -0.002 0.006 -0.003 0.009 C 29.994 46.63 29.992 46.674 29.984 46.719 z M 31.734 49.39 c 0 -0.38 0.026 -0.754 0.057 -1.126 c 0.016 -0.178 0.035 -0.358 0.059 -0.539 c 0.008 -0.061 0.019 -0.12 0.028 -0.181 c 5.287 -1.481 8.343 0.649 11.573 2.899 c 3.505 2.441 7.44 5.182 14.239 2.777 c -0.072 0.243 -0.159 0.479 -0.245 0.716 c -0.051 0.14 -0.098 0.282 -0.154 0.42 c -0.063 0.158 -0.134 0.312 -0.203 0.467 c -0.117 0.26 -0.238 0.519 -0.371 0.77 c -0.034 0.066 -0.069 0.131 -0.104 0.196 c -1.829 3.306 -5.026 5.75 -8.824 6.566 c -0.079 0.017 -0.158 0.034 -0.238 0.049 c -0.323 0.063 -0.652 0.111 -0.983 0.151 c -0.102 0.012 -0.203 0.028 -0.306 0.037 c -0.416 0.039 -0.836 0.064 -1.263 0.064 C 37.686 62.655 31.734 56.704 31.734 49.39 z M 45 36.124 c 7.314 0 13.266 5.951 13.266 13.266 c 0 0.502 -0.034 0.996 -0.088 1.484 c -6.553 2.8 -9.822 0.546 -13.582 -2.072 c -3.129 -2.179 -6.645 -4.613 -12.236 -3.425 C 34.063 40.018 39.084 36.124 45 36.124 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 31.943 5.729 H 18.285 c -2.594 0 -4.704 2.11 -4.704 4.704 s 2.11 4.704 4.704 4.704 h 13.658 c 2.594 0 4.704 -2.11 4.704 -4.704 S 34.537 5.729 31.943 5.729 z M 31.943 13.137 H 18.285 c -1.491 0 -2.704 -1.213 -2.704 -2.704 c 0 -1.491 1.213 -2.704 2.704 -2.704 h 13.658 c 1.491 0 2.704 1.213 2.704 2.704 C 34.646 11.924 33.434 13.137 31.943 13.137 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 55.255 5.729 H 53.4 c -2.594 0 -4.704 2.11 -4.704 4.704 s 2.11 4.704 4.704 4.704 h 1.854 c 2.594 0 4.704 -2.11 4.704 -4.704 S 57.849 5.729 55.255 5.729 z M 55.255 13.137 H 53.4 c -1.491 0 -2.704 -1.213 -2.704 -2.704 c 0 -1.491 1.213 -2.704 2.704 -2.704 h 1.854 c 1.491 0 2.704 1.213 2.704 2.704 C 57.959 11.924 56.746 13.137 55.255 13.137 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 71.716 5.729 h -1.854 c -2.594 0 -4.704 2.11 -4.704 4.704 s 2.11 4.704 4.704 4.704 h 1.854 c 2.594 0 4.703 -2.11 4.703 -4.704 S 74.31 5.729 71.716 5.729 z M 71.716 13.137 h -1.854 c -1.491 0 -2.704 -1.213 -2.704 -2.704 c 0 -1.491 1.213 -2.704 2.704 -2.704 h 1.854 c 1.49 0 2.703 1.213 2.703 2.704 C 74.419 11.924 73.206 13.137 71.716 13.137 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Máy giặt</span>
                    </p>
                  ) : null}
                  {item.banLa ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 75.555 35.541 V 23.798 C 75.555 10.676 64.879 0 51.757 0 c -1.57 0 -2.849 1.278 -2.849 2.849 v 42.857 c 0 3.773 2.027 7.294 5.292 9.188 l 7.768 4.505 V 89 c 0 0.553 0.447 1 1 1 h 11.587 c 0.553 0 1 -0.447 1 -1 V 58.823 v -6.657 c 3.306 -0.487 5.854 -3.333 5.854 -6.772 v -3.081 C 81.409 38.875 78.861 36.028 75.555 35.541 z M 50.908 45.706 V 2.849 C 50.908 2.381 51.289 2 51.757 2 c 12.02 0 21.798 9.779 21.798 21.798 V 36.46 v 14.788 v 6.575 h -9.587 V 22.697 c 0 -0.552 -0.447 -1 -1 -1 s -1 0.448 -1 1 v 34.391 l -6.764 -3.923 C 52.555 51.627 50.908 48.769 50.908 45.706 z M 73.555 88 h -9.587 V 59.823 h 9.587 V 88 z M 79.409 45.395 c 0 2.334 -1.656 4.288 -3.854 4.75 V 37.563 c 2.198 0.462 3.854 2.417 3.854 4.75 V 45.395 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 40.558 15.016 H 22.235 c -2.767 0 -5.018 -2.25 -5.018 -5.017 s 2.251 -5.018 5.018 -5.018 h 6.643 c 0.552 0 1 -0.448 1 -1 s -0.448 -1 -1 -1 h -6.643 c -3.87 0 -7.018 3.148 -7.018 7.018 c 0 3.869 3.148 7.017 7.018 7.017 h 18.323 c 0.552 0 1 -0.448 1 -1 S 41.11 15.016 40.558 15.016 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 40.558 33.824 H 15.608 c -3.869 0 -7.017 3.148 -7.017 7.018 s 3.148 7.018 7.017 7.018 h 6.643 c 0.552 0 1 -0.447 1 -1 s -0.448 -1 -1 -1 h -6.643 c -2.767 0 -5.017 -2.251 -5.017 -5.018 s 2.25 -5.018 5.017 -5.018 h 24.949 c 0.552 0 1 -0.448 1 -1 S 41.11 33.824 40.558 33.824 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 40.558 24.192 H 14.916 c -0.552 0 -1 0.448 -1 1 s 0.448 1 1 1 h 25.642 c 0.552 0 1 -0.448 1 -1 S 41.11 24.192 40.558 24.192 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bàn là</span>
                    </p>
                  ) : null}
                  {item.tivi ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 86.381 6.277 H 3.619 C 1.624 6.277 0 7.901 0 9.896 v 55.652 c 0 1.995 1.624 3.619 3.619 3.619 H 37.7 v 5.717 h -1.143 c -4.322 0 -7.838 3.516 -7.838 7.838 c 0 0.553 0.448 1 1 1 H 60.28 c 0.553 0 1 -0.447 1 -1 c 0 -4.322 -3.516 -7.838 -7.837 -7.838 H 52.3 v -5.717 h 34.081 c 1.996 0 3.619 -1.624 3.619 -3.619 V 9.896 C 90 7.901 88.377 6.277 86.381 6.277 z M 51.3 76.885 h 2.144 c 2.878 0 5.275 2.094 5.751 4.838 H 30.805 c 0.476 -2.744 2.874 -4.838 5.752 -4.838 H 38.7 c 0.552 0 1 -0.447 1 -1 v -6.717 h 10.6 v 6.717 C 50.3 76.438 50.747 76.885 51.3 76.885 z M 88 65.549 c 0 0.893 -0.727 1.619 -1.619 1.619 H 51.3 H 38.7 H 3.619 C 2.726 67.168 2 66.441 2 65.549 V 9.896 c 0 -0.893 0.726 -1.619 1.619 -1.619 h 82.762 C 87.273 8.277 88 9.004 88 9.896 V 65.549 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 83.146 12.131 H 6.854 c -0.552 0 -1 0.448 -1 1 v 45.183 c 0 0.553 0.448 1 1 1 h 76.293 c 0.553 0 1 -0.447 1 -1 V 13.131 C 84.146 12.579 83.699 12.131 83.146 12.131 z M 82.146 57.314 H 7.854 V 14.131 h 74.293 V 57.314 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 30.075 32.021 h 5.387 c -0.002 0.025 -0.015 0.047 -0.015 0.072 v 12.332 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 32.093 c 0 -0.026 -0.013 -0.047 -0.015 -0.072 h 5.387 c 0.552 0 1 -0.448 1 -1 s -0.448 -1 -1 -1 H 30.075 c -0.552 0 -1 0.448 -1 1 S 29.522 32.021 30.075 32.021 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 53.304 44.816 c 0.156 0.369 0.519 0.608 0.92 0.608 s 0.764 -0.239 0.92 -0.608 l 5.702 -13.404 c 0.217 -0.508 -0.021 -1.096 -0.528 -1.312 c -0.507 -0.215 -1.096 0.021 -1.312 0.529 L 54.224 41.87 l -4.782 -11.241 c -0.215 -0.508 -0.803 -0.744 -1.312 -0.529 c -0.508 0.216 -0.745 0.804 -0.528 1.312 L 53.304 44.816 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 83.146 62.172 h -2.046 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 2.046 c 0.553 0 1 -0.447 1 -1 S 83.699 62.172 83.146 62.172 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Tivi</span>
                    </p>
                  ) : null}
                  {item.dieuHoa ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 84.542 19.486 H 5.458 C 2.448 19.486 0 21.934 0 24.944 v 25.887 c 0 3.01 2.448 5.458 5.458 5.458 h 6.362 h 66.361 h 6.361 c 3.01 0 5.458 -2.448 5.458 -5.458 V 24.944 C 90 21.934 87.552 19.486 84.542 19.486 z M 12.82 54.289 V 41.863 h 64.361 v 5.213 H 19.239 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 h 57.942 v 5.213 H 12.82 z M 88 50.831 c 0 1.907 -1.551 3.458 -3.458 3.458 h -5.361 V 40.863 c 0 -0.552 -0.447 -1 -1 -1 H 11.82 c -0.552 0 -1 0.448 -1 1 v 13.426 H 5.458 C 3.551 54.289 2 52.738 2 50.831 V 24.944 c 0 -1.907 1.551 -3.458 3.458 -3.458 h 79.084 c 1.907 0 3.458 1.551 3.458 3.458 V 50.831 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 43.236 26.853 H 11.82 c -0.552 0 -1 0.448 -1 1 s 0.448 1 1 1 h 31.417 c 0.552 0 1 -0.448 1 -1 S 43.789 26.853 43.236 26.853 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 78.181 26.853 h -5.271 c -0.553 0 -1 0.448 -1 1 s 0.447 1 1 1 h 5.271 c 0.553 0 1 -0.448 1 -1 S 78.733 26.853 78.181 26.853 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 45 61.618 c -0.552 0 -1 0.447 -1 1 v 6.896 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 v -6.896 C 46 62.065 45.552 61.618 45 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 56.225 61.618 c -0.553 0 -1 0.447 -1 1 v 6.896 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 v -6.896 C 57.225 62.065 56.777 61.618 56.225 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 73.69 68.515 c -2.89 0 -5.241 -2.352 -5.241 -5.242 v -0.654 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 0.654 c 0 3.993 3.248 7.242 7.241 7.242 c 0.553 0 1 -0.447 1 -1 S 74.243 68.515 73.69 68.515 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 33.775 61.618 c -0.552 0 -1 0.447 -1 1 v 6.896 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 v -6.896 C 34.775 62.065 34.328 61.618 33.775 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 22.551 61.618 c -0.552 0 -1 0.447 -1 1 v 0.654 c 0 2.891 -2.352 5.242 -5.242 5.242 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 c 3.993 0 7.242 -3.249 7.242 -7.242 v -0.654 C 23.551 62.065 23.104 61.618 22.551 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Điều hòa</span>
                    </p>
                  ) : null}
                  {item.wifi ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <circle
                            cx={45}
                            cy="38.85"
                            r={3}
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform="  matrix(1 0 0 1 0 0) "
                          />
                          <path
                            d="M 32.288 77.877 c -0.806 0 -1.539 -0.485 -1.849 -1.238 l -4.458 -10.815 l -4.458 10.815 c -0.327 0.794 -1.11 1.293 -1.983 1.233 c -0.857 -0.058 -1.582 -0.656 -1.8 -1.487 l -5.758 -21.946 c -0.28 -1.068 0.358 -2.162 1.427 -2.442 c 1.07 -0.281 2.162 0.358 2.442 1.427 l 4.246 16.182 l 4.036 -9.792 c 0.309 -0.749 1.039 -1.238 1.849 -1.238 s 1.541 0.489 1.849 1.238 l 4.036 9.792 l 4.246 -16.182 c 0.28 -1.068 1.374 -1.708 2.442 -1.427 c 1.068 0.28 1.707 1.374 1.427 2.442 l -5.758 21.946 c -0.218 0.831 -0.943 1.43 -1.8 1.487 C 32.377 77.875 32.333 77.877 32.288 77.877 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 47.221 77.877 c -1.104 0 -2 -0.896 -2 -2 V 53.931 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 21.946 C 49.221 76.981 48.325 77.877 47.221 77.877 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 67.979 51.931 H 58.25 c -1.104 0 -2 0.896 -2 2 v 21.946 c 0 1.104 0.896 2 2 2 s 2 -0.896 2 -2 v -8.973 h 4.364 c 1.104 0 2 -0.896 2 -2 s -0.896 -2 -2 -2 H 60.25 v -6.974 h 7.729 c 1.104 0 2 -0.896 2 -2 S 69.084 51.931 67.979 51.931 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 76.083 77.877 c -1.104 0 -2 -0.896 -2 -2 V 53.931 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 21.946 C 78.083 76.981 77.188 77.877 76.083 77.877 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 76.083 17.434 c -0.531 0 -1.063 -0.211 -1.455 -0.628 C 66.846 8.548 56.324 4 45 4 S 23.154 8.548 15.373 16.805 c -0.757 0.804 -2.022 0.843 -2.827 0.084 c -0.804 -0.757 -0.841 -2.023 -0.084 -2.827 C 21.007 4.994 32.563 0 45 0 s 23.993 4.994 32.538 14.062 c 0.758 0.804 0.721 2.07 -0.083 2.827 C 77.068 17.253 76.575 17.434 76.083 17.434 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 67.3 25.707 c -0.531 0 -1.063 -0.211 -1.456 -0.628 c -5.487 -5.824 -12.89 -9.031 -20.844 -9.031 s -15.356 3.207 -20.844 9.031 c -0.757 0.805 -2.022 0.843 -2.827 0.084 c -0.804 -0.757 -0.841 -2.023 -0.084 -2.827 C 27.496 15.701 35.933 12.047 45 12.047 s 17.504 3.653 23.756 10.288 c 0.757 0.804 0.72 2.07 -0.084 2.827 C 68.285 25.526 67.792 25.707 67.3 25.707 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 58.938 33.584 c -0.531 0 -1.063 -0.211 -1.455 -0.628 c -3.287 -3.488 -7.72 -5.409 -12.482 -5.409 c -4.762 0 -9.195 1.921 -12.482 5.409 c -0.757 0.805 -2.022 0.843 -2.827 0.084 c -0.804 -0.757 -0.841 -2.023 -0.084 -2.827 c 4.05 -4.298 9.517 -6.666 15.393 -6.666 s 11.343 2.367 15.393 6.666 c 0.758 0.804 0.721 2.07 -0.083 2.827 C 59.923 33.403 59.43 33.584 58.938 33.584 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 87.466 90 H 2.534 c -1.104 0 -2 -0.896 -2 -2 V 38.988 c 0 -1.104 0.896 -2 2 -2 h 31.389 c 1.104 0 2 0.896 2 2 s -0.896 2 -2 2 H 4.534 V 86 h 80.932 V 40.988 H 56.077 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 31.389 c 1.104 0 2 0.896 2 2 V 88 C 89.466 89.104 88.57 90 87.466 90 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Wifi</span>
                    </p>
                  ) : null}
                  {item.bep ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 38.6 57.111 c -0.091 0 -0.184 -0.013 -0.275 -0.038 c -7.615 -2.179 -13.716 -7.948 -16.321 -15.435 c -0.182 -0.521 0.094 -1.092 0.616 -1.273 c 0.523 -0.185 1.091 0.094 1.273 0.616 c 2.391 6.872 7.992 12.169 14.982 14.168 c 0.531 0.152 0.838 0.706 0.687 1.237 C 39.435 56.825 39.035 57.111 38.6 57.111 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 86.528 39.542 h -9.951 c 0.231 -1.391 0.37 -2.813 0.414 -4.258 h 0.481 c 2.728 0 4.946 -2.219 4.946 -4.946 V 29.44 c 0 -2.728 -2.219 -4.947 -4.946 -4.947 H 12.61 c -2.728 0 -4.946 2.219 -4.946 4.947 v 0.897 c 0 2.728 2.219 4.946 4.946 4.946 h 0.481 c 0.045 1.445 0.183 2.867 0.414 4.258 H 3.472 C 1.558 39.542 0 41.099 0 43.013 s 1.558 3.472 3.472 3.472 h 12.02 c 2.457 5.928 6.646 10.96 11.935 14.465 L 14.173 79.878 c -1.935 2.764 -1.261 6.587 1.503 8.522 c 1.066 0.746 2.289 1.104 3.5 1.104 c 1.931 -0.001 3.833 -0.91 5.021 -2.608 l 5.879 -8.396 h 29.93 l 5.879 8.396 c 0.938 1.339 2.34 2.233 3.95 2.517 c 0.358 0.063 0.718 0.095 1.075 0.095 c 1.244 0 2.456 -0.38 3.497 -1.107 c 2.763 -1.937 3.437 -5.76 1.502 -8.522 L 62.658 60.951 c 5.289 -3.505 9.478 -8.537 11.935 -14.466 h 11.936 c 1.914 0 3.472 -1.558 3.472 -3.472 S 88.442 39.542 86.528 39.542 z M 9.664 30.337 V 29.44 c 0 -1.625 1.322 -2.947 2.946 -2.947 h 64.863 c 1.625 0 2.946 1.322 2.946 2.947 v 0.897 c 0 1.625 -1.321 2.946 -2.946 2.946 h -1.456 H 14.066 H 12.61 C 10.986 33.283 9.664 31.961 9.664 30.337 z M 3.472 44.485 C 2.66 44.485 2 43.825 2 43.013 s 0.66 -1.472 1.472 -1.472 h 10.436 c 0.233 1 0.513 1.982 0.837 2.943 H 3.472 z M 22.56 85.75 c -1.302 1.861 -3.875 2.314 -5.736 1.012 c -1.86 -1.303 -2.314 -3.877 -1.011 -5.737 l 13.32 -19.023 c 2.422 1.396 5.04 2.489 7.806 3.214 L 22.56 85.75 z M 51.034 65.688 l 4.058 5.795 H 34.991 l 4.058 -5.795 c 1.943 0.37 3.944 0.571 5.993 0.571 C 47.091 66.259 49.092 66.057 51.034 65.688 z M 31.477 76.501 l 2.114 -3.019 h 22.902 l 2.114 3.019 H 31.477 z M 74.271 81.024 c 1.303 1.86 0.849 4.435 -1.011 5.737 c -0.9 0.631 -1.991 0.871 -3.078 0.683 c -1.083 -0.191 -2.027 -0.793 -2.658 -1.694 L 53.145 65.216 c 2.767 -0.725 5.384 -1.818 7.807 -3.214 L 74.271 81.024 z M 45.042 64.259 c -16.194 0 -29.429 -12.908 -29.959 -28.976 h 59.918 C 74.472 51.351 61.235 64.259 45.042 64.259 z M 86.528 44.485 H 75.339 c 0.325 -0.962 0.604 -1.943 0.837 -2.943 h 10.352 c 0.812 0 1.472 0.66 1.472 1.472 S 87.34 44.485 86.528 44.485 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 44.91 21.106 c -0.152 0 -0.306 -0.035 -0.451 -0.108 c -0.493 -0.25 -0.689 -0.852 -0.44 -1.344 c 1.653 -3.262 1.652 -6.167 -0.003 -8.878 c -1.72 -2.831 -1.704 -5.691 0.047 -8.502 c 0.292 -0.468 0.909 -0.612 1.377 -0.32 s 0.612 0.909 0.32 1.377 c -1.356 2.177 -1.368 4.212 -0.036 6.404 c 2.017 3.304 2.043 6.946 0.08 10.823 C 45.626 20.906 45.275 21.106 44.91 21.106 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 53.614 21.106 c -0.151 0 -0.306 -0.035 -0.451 -0.108 c -0.492 -0.25 -0.689 -0.851 -0.44 -1.344 c 1.306 -2.577 1.307 -4.866 0.005 -7 c -1.433 -2.359 -1.419 -4.74 0.039 -7.08 c 0.292 -0.468 0.907 -0.611 1.378 -0.32 c 0.469 0.292 0.611 0.909 0.319 1.377 c -1.056 1.693 -1.064 3.276 -0.028 4.982 c 1.668 2.733 1.693 5.743 0.071 8.943 C 54.331 20.906 53.979 21.106 53.614 21.106 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 36.239 21.106 c -0.152 0 -0.306 -0.035 -0.451 -0.108 c -0.493 -0.25 -0.689 -0.852 -0.44 -1.344 c 1.306 -2.576 1.307 -4.866 0.005 -6.999 c -1.433 -2.358 -1.419 -4.74 0.039 -7.08 c 0.292 -0.468 0.909 -0.611 1.377 -0.32 c 0.469 0.292 0.612 0.909 0.32 1.377 c -1.055 1.693 -1.064 3.276 -0.028 4.982 c 1.668 2.733 1.693 5.743 0.071 8.943 C 36.956 20.906 36.604 21.106 36.239 21.106 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bếp</span>
                    </p>
                  ) : null}
                  {item.doXe ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 21.004 11.102 h -5.398 c -0.82 0 -1.484 0.664 -1.484 1.484 v 9.366 v 6.968 c 0 0.82 0.664 1.484 1.484 1.484 c 0.82 0 1.484 -0.664 1.484 -1.484 v -5.484 h 3.914 c 3.006 0 5.452 -2.445 5.452 -5.451 v -1.43 C 26.456 13.547 24.011 11.102 21.004 11.102 z M 23.489 17.983 c 0 1.37 -1.115 2.484 -2.485 2.484 H 17.09 v -6.399 h 3.914 c 1.37 0 2.485 1.115 2.485 2.485 V 17.983 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 26.772 4.259 H 12.552 c -4.683 0 -8.493 3.81 -8.493 8.492 v 14.219 c 0 4.683 3.81 8.493 8.493 8.493 h 6.254 v 15.474 c 0 0.819 0.664 1.484 1.484 1.484 s 1.484 -0.664 1.484 -1.484 V 35.463 h 4.999 c 4.683 0 8.493 -3.81 8.493 -8.493 V 12.751 C 35.264 8.069 31.455 4.259 26.772 4.259 z M 32.297 26.971 c 0 3.047 -2.479 5.526 -5.526 5.526 H 12.552 c -3.047 0 -5.526 -2.479 -5.526 -5.526 V 12.751 c 0 -3.047 2.479 -5.525 5.526 -5.525 h 14.219 c 3.047 0 5.526 2.478 5.526 5.525 V 26.971 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 51.204 64.241 h -1.96 c -0.819 0 -1.484 -0.664 -1.484 -1.484 c 0 -0.819 0.664 -1.484 1.484 -1.484 h 1.96 c 0.819 0 1.484 0.664 1.484 1.484 C 52.688 63.577 52.024 64.241 51.204 64.241 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 86.378 56.411 l -6.726 -1.12 c -22.322 -10.422 -41.475 -9.969 -56.937 1.341 C 12.3 56.674 0.935 60.025 0.016 66.278 L 0 73.418 c 0 2.389 1.944 4.334 4.334 4.334 h 1.895 c 0.862 4.542 4.855 7.989 9.644 7.989 c 4.789 0 8.783 -3.447 9.645 -7.989 h 36.342 c 0.862 4.542 4.855 7.989 9.645 7.989 s 8.783 -3.447 9.645 -7.989 h 2.184 c 1.262 0 2.459 -0.549 3.282 -1.504 l 2.334 -2.708 C 89.626 72.752 90 71.748 90 70.709 V 60.686 C 90 58.558 88.477 56.761 86.378 56.411 z M 60.993 51.93 l -2.396 4.702 H 28.079 C 37.748 50.844 48.634 49.277 60.993 51.93 z M 12.708 60.749 c -0.539 0.569 -1.236 1.172 -2.103 1.745 c -1.073 0.708 -3.537 2.087 -6.334 2.019 C 5.916 62.968 8.955 61.637 12.708 60.749 z M 15.872 82.774 c -3.78 0 -6.855 -3.075 -6.855 -6.855 c 0 -3.779 3.075 -6.854 6.855 -6.854 c 3.78 0 6.855 3.075 6.855 6.854 C 22.728 79.698 19.653 82.774 15.872 82.774 z M 71.503 82.774 c -3.78 0 -6.855 -3.075 -6.855 -6.855 c 0 -3.779 3.075 -6.854 6.855 -6.854 c 3.78 0 6.855 3.075 6.855 6.854 C 78.359 79.698 75.284 82.774 71.503 82.774 z M 86.702 71.602 l -2.335 2.708 c -0.259 0.301 -0.636 0.474 -1.034 0.474 h -2.077 c -0.565 -4.882 -4.719 -8.688 -9.752 -8.688 c -5.032 0 -9.187 3.805 -9.752 8.688 H 25.624 c -0.565 -4.882 -4.719 -8.688 -9.752 -8.688 c -5.032 0 -9.186 3.805 -9.751 8.688 H 4.334 c -0.753 0 -1.367 -0.613 -1.367 -1.367 v -6.043 c 0.493 0.068 0.992 0.105 1.499 0.105 c 2.564 0 5.273 -0.859 7.773 -2.509 c 2.222 -1.467 3.828 -3.276 4.479 -4.953 c 1.98 -0.266 4.063 -0.419 6.189 -0.419 c 0.095 0 0.192 0 0.287 0.001 l 0.498 0.003 l 0.004 -0.003 h 33.437 l -4.628 9.5 c -0.358 0.737 -0.052 1.625 0.684 1.984 c 0.21 0.101 0.431 0.15 0.649 0.15 c 0.55 0 1.078 -0.306 1.335 -0.834 l 5.667 -11.633 c 0 0 0 -0.001 0 -0.001 l 3.119 -6.119 c 4.665 1.23 9.532 3.031 14.619 5.418 l 0.184 0.086 l 7.129 1.188 c 0.662 0.11 1.142 0.677 1.142 1.348 v 0.588 h -1.62 c -0.819 0 -1.484 0.664 -1.484 1.484 c 0 0.819 0.664 1.484 1.484 1.484 h 1.62 v 6.468 C 87.033 71.037 86.915 71.354 86.702 71.602 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 15.872 80.636 c -2.601 0 -4.718 -2.116 -4.718 -4.718 c 0 -2.601 2.116 -4.717 4.718 -4.717 s 4.718 2.116 4.718 4.717 C 20.591 78.52 18.474 80.636 15.872 80.636 z M 15.872 74.168 c -0.965 0 -1.751 0.785 -1.751 1.75 c 0 0.966 0.785 1.751 1.751 1.751 s 1.751 -0.785 1.751 -1.751 C 17.624 74.953 16.838 74.168 15.872 74.168 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 71.503 80.636 c -2.602 0 -4.718 -2.116 -4.718 -4.718 c 0 -2.601 2.116 -4.717 4.718 -4.717 c 2.602 0 4.718 2.116 4.718 4.717 C 76.221 78.52 74.105 80.636 71.503 80.636 z M 71.503 74.168 c -0.966 0 -1.751 0.785 -1.751 1.75 c 0 0.966 0.785 1.751 1.751 1.751 c 0.966 0 1.751 -0.785 1.751 -1.751 C 73.254 74.953 72.469 74.168 71.503 74.168 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bãi đỗ xe</span>
                    </p>
                  ) : null}
                  {item.hoBoi ? (
                    <p className="flex">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: 30,
                          width: 30,
                          fill: "currentcolor",
                        }}
                      >
                        <path d="M29 15v16h-2v-6h-6v6h-2v-6l.005-.15a2 2 0 0 1 1.838-1.844L21 23h6v-8zM5 15v8h6a2 2 0 0 1 1.995 1.85L13 25v6h-2v-6H5v6H3V15zM16 1a15 15 0 0 1 13.556 8.571 1 1 0 0 1-.79 1.423l-.113.006H17v8h8v2h-8v10h-2V21H7v-2h8v-8H3.347a1 1 0 0 1-.946-1.323l.043-.106A15 15 0 0 1 16 1zm0 2C11.71 3 7.799 5.097 5.402 8.468l-.197.284L5.042 9h21.915l-.162-.248a12.995 12.995 0 0 0-10.1-5.734l-.365-.014z" />
                      </svg>
                      <span className="ms-1">Hồ bơi</span>
                    </p>
                  ) : null}
                  {item.banUi ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 64.014 36.879 H 49.247 c -1.871 0 -3.658 0.894 -4.781 2.391 l -4.802 6.403 c -0.576 0.768 -0.667 1.779 -0.238 2.637 c 0.429 0.859 1.292 1.393 2.253 1.393 h 22.335 c 1.979 0 3.589 -1.61 3.589 -3.589 v -5.646 C 67.603 38.489 65.992 36.879 64.014 36.879 z M 65.603 46.114 c 0 0.876 -0.713 1.589 -1.589 1.589 H 41.679 c -0.29 0 -0.421 -0.2 -0.464 -0.287 c -0.043 -0.086 -0.125 -0.312 0.049 -0.543 l 4.803 -6.403 c 0.747 -0.996 1.936 -1.591 3.181 -1.591 h 14.767 c 0.876 0 1.589 0.713 1.589 1.589 V 46.114 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 89 62.886 c -3.432 0 -6.223 -2.792 -6.223 -6.224 v -12.75 c 0 -4.195 -3.16 -7.66 -7.224 -8.156 v -2.877 c 0 -1.196 -0.468 -2.32 -1.317 -3.167 c -0.852 -0.849 -2.019 -1.338 -3.185 -1.309 c -0.945 0.004 -1.866 0.011 -2.785 0.018 l -1.869 -4.483 c -0.776 -1.864 -2.584 -3.068 -4.604 -3.068 h -8 c -2.062 0 -3.937 1.295 -4.666 3.222 l -1.956 5.167 c -21.995 2.015 -33.384 8.592 -40.42 29.381 H 5.244 C 2.353 58.641 0 60.993 0 63.886 v 4.244 c 0 0.553 0.448 1 1 1 h 73.834 c 0.553 0 1 -0.447 1 -1 v -4.244 c 0 -2.893 -2.353 -5.245 -5.244 -5.245 h -1.218 c 0.84 -2.121 1.926 -3.657 3.245 -4.561 c 1.839 -1.259 2.937 -3.445 2.937 -5.85 V 37.777 c 2.957 0.481 5.224 3.045 5.224 6.135 v 12.75 c 0 4.534 3.688 8.224 8.223 8.224 c 0.553 0 1 -0.447 1 -1 S 89.553 62.886 89 62.886 z M 49.382 29.071 l 1.617 -4.27 c 0.437 -1.154 1.56 -1.93 2.795 -1.93 h 8 c 1.21 0 2.292 0.721 2.758 1.838 l 1.557 3.734 c -0.199 0.002 -0.386 0.006 -0.582 0.009 c -4.416 0.057 -8.523 0.171 -12.343 0.377 c -0.144 0.008 -0.287 0.016 -0.429 0.024 c -0.734 0.041 -1.458 0.086 -2.171 0.135 C 50.179 29.014 49.773 29.041 49.382 29.071 z M 73.834 63.886 v 3.244 H 2 v -3.244 c 0 -1.789 1.455 -3.245 3.244 -3.245 h 2.22 h 60.487 h 2.639 C 72.379 60.641 73.834 62.097 73.834 63.886 z M 73.554 48.23 c 0 1.744 -0.772 3.313 -2.066 4.199 c -1.839 1.259 -3.235 3.295 -4.257 6.211 H 8.857 c 6.789 -19.55 17.446 -25.618 38.965 -27.461 c 0.023 0.002 0.042 0.015 0.065 0.015 c 0.028 0 0.057 -0.001 0.086 -0.004 c 5.189 -0.446 11.43 -0.689 19.638 -0.764 c 0.005 0 0.009 -0.002 0.014 -0.002 c 1.124 -0.01 2.268 -0.017 3.435 -0.021 c 0.003 0 0.007 0 0.01 0 c 0.662 0 1.285 0.258 1.756 0.726 c 0.47 0.468 0.729 1.089 0.729 1.75 V 48.23 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bàn ủi</span>
                    </p>
                  ) : null}
                </div>
                <div className="grid grid-cols-2 mt-3 gap-3 nhuCauRoomUserSM">
                  {item.mayGiat ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 77.578 0 H 12.422 C 9.699 0 7.483 2.216 7.483 4.939 v 14.926 v 59.049 v 6.147 c 0 2.723 2.216 4.938 4.939 4.938 h 65.156 c 2.723 0 4.938 -2.216 4.938 -4.938 v -6.147 V 19.865 V 4.939 C 82.517 2.216 80.301 0 77.578 0 z M 9.483 4.939 C 9.483 3.318 10.802 2 12.422 2 h 65.156 c 1.62 0 2.938 1.318 2.938 2.939 v 13.926 H 9.483 V 4.939 z M 80.517 20.865 v 57.049 H 9.483 V 20.865 H 80.517 z M 80.517 85.062 c 0 1.62 -1.318 2.938 -2.938 2.938 H 12.422 c -1.621 0 -2.939 -1.318 -2.939 -2.938 v -5.147 h 71.033 V 85.062 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 45 71.295 c 12.078 0 21.905 -9.827 21.905 -21.905 c 0 -12.079 -9.827 -21.906 -21.905 -21.906 c -12.079 0 -21.905 9.827 -21.905 21.906 C 23.095 61.468 32.921 71.295 45 71.295 z M 45 29.484 c 10.976 0 19.905 8.93 19.905 19.906 c 0 10.976 -8.93 19.905 -19.905 19.905 s -19.905 -8.93 -19.905 -19.905 C 25.095 38.414 34.024 29.484 45 29.484 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 29.984 46.719 c -0.074 0.415 -0.138 0.832 -0.178 1.257 c -0.047 0.479 -0.072 0.952 -0.072 1.414 c 0 8.418 6.848 15.266 15.266 15.266 c 0.507 0 1.008 -0.028 1.503 -0.076 c 0.107 -0.011 0.212 -0.03 0.319 -0.043 c 0.398 -0.047 0.792 -0.104 1.18 -0.181 c 0.084 -0.017 0.165 -0.038 0.249 -0.057 c 0.421 -0.09 0.835 -0.196 1.242 -0.32 c 0.036 -0.011 0.071 -0.023 0.106 -0.034 c 3.78 -1.181 6.932 -3.782 8.804 -7.255 c 0.031 -0.057 0.057 -0.117 0.088 -0.175 c 0.171 -0.328 0.336 -0.66 0.484 -1.003 c 0.106 -0.24 0.197 -0.487 0.29 -0.733 c 0.06 -0.161 0.123 -0.32 0.177 -0.484 c 0.119 -0.348 0.221 -0.703 0.314 -1.062 c 0.018 -0.068 0.036 -0.136 0.053 -0.204 c 0.101 -0.41 0.183 -0.826 0.25 -1.248 c 0.003 -0.017 0.007 -0.033 0.01 -0.05 c 0.001 -0.006 0 -0.012 0 -0.017 c 0.117 -0.76 0.196 -1.531 0.196 -2.323 c 0 -8.418 -6.848 -15.266 -15.266 -15.266 c -7.455 0 -13.669 5.376 -14.995 12.453 c -0.001 0.003 -0.002 0.006 -0.003 0.009 C 29.994 46.63 29.992 46.674 29.984 46.719 z M 31.734 49.39 c 0 -0.38 0.026 -0.754 0.057 -1.126 c 0.016 -0.178 0.035 -0.358 0.059 -0.539 c 0.008 -0.061 0.019 -0.12 0.028 -0.181 c 5.287 -1.481 8.343 0.649 11.573 2.899 c 3.505 2.441 7.44 5.182 14.239 2.777 c -0.072 0.243 -0.159 0.479 -0.245 0.716 c -0.051 0.14 -0.098 0.282 -0.154 0.42 c -0.063 0.158 -0.134 0.312 -0.203 0.467 c -0.117 0.26 -0.238 0.519 -0.371 0.77 c -0.034 0.066 -0.069 0.131 -0.104 0.196 c -1.829 3.306 -5.026 5.75 -8.824 6.566 c -0.079 0.017 -0.158 0.034 -0.238 0.049 c -0.323 0.063 -0.652 0.111 -0.983 0.151 c -0.102 0.012 -0.203 0.028 -0.306 0.037 c -0.416 0.039 -0.836 0.064 -1.263 0.064 C 37.686 62.655 31.734 56.704 31.734 49.39 z M 45 36.124 c 7.314 0 13.266 5.951 13.266 13.266 c 0 0.502 -0.034 0.996 -0.088 1.484 c -6.553 2.8 -9.822 0.546 -13.582 -2.072 c -3.129 -2.179 -6.645 -4.613 -12.236 -3.425 C 34.063 40.018 39.084 36.124 45 36.124 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 31.943 5.729 H 18.285 c -2.594 0 -4.704 2.11 -4.704 4.704 s 2.11 4.704 4.704 4.704 h 13.658 c 2.594 0 4.704 -2.11 4.704 -4.704 S 34.537 5.729 31.943 5.729 z M 31.943 13.137 H 18.285 c -1.491 0 -2.704 -1.213 -2.704 -2.704 c 0 -1.491 1.213 -2.704 2.704 -2.704 h 13.658 c 1.491 0 2.704 1.213 2.704 2.704 C 34.646 11.924 33.434 13.137 31.943 13.137 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 55.255 5.729 H 53.4 c -2.594 0 -4.704 2.11 -4.704 4.704 s 2.11 4.704 4.704 4.704 h 1.854 c 2.594 0 4.704 -2.11 4.704 -4.704 S 57.849 5.729 55.255 5.729 z M 55.255 13.137 H 53.4 c -1.491 0 -2.704 -1.213 -2.704 -2.704 c 0 -1.491 1.213 -2.704 2.704 -2.704 h 1.854 c 1.491 0 2.704 1.213 2.704 2.704 C 57.959 11.924 56.746 13.137 55.255 13.137 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 71.716 5.729 h -1.854 c -2.594 0 -4.704 2.11 -4.704 4.704 s 2.11 4.704 4.704 4.704 h 1.854 c 2.594 0 4.703 -2.11 4.703 -4.704 S 74.31 5.729 71.716 5.729 z M 71.716 13.137 h -1.854 c -1.491 0 -2.704 -1.213 -2.704 -2.704 c 0 -1.491 1.213 -2.704 2.704 -2.704 h 1.854 c 1.49 0 2.703 1.213 2.703 2.704 C 74.419 11.924 73.206 13.137 71.716 13.137 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Máy giặt</span>
                    </p>
                  ) : null}
                  {item.banLa ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 75.555 35.541 V 23.798 C 75.555 10.676 64.879 0 51.757 0 c -1.57 0 -2.849 1.278 -2.849 2.849 v 42.857 c 0 3.773 2.027 7.294 5.292 9.188 l 7.768 4.505 V 89 c 0 0.553 0.447 1 1 1 h 11.587 c 0.553 0 1 -0.447 1 -1 V 58.823 v -6.657 c 3.306 -0.487 5.854 -3.333 5.854 -6.772 v -3.081 C 81.409 38.875 78.861 36.028 75.555 35.541 z M 50.908 45.706 V 2.849 C 50.908 2.381 51.289 2 51.757 2 c 12.02 0 21.798 9.779 21.798 21.798 V 36.46 v 14.788 v 6.575 h -9.587 V 22.697 c 0 -0.552 -0.447 -1 -1 -1 s -1 0.448 -1 1 v 34.391 l -6.764 -3.923 C 52.555 51.627 50.908 48.769 50.908 45.706 z M 73.555 88 h -9.587 V 59.823 h 9.587 V 88 z M 79.409 45.395 c 0 2.334 -1.656 4.288 -3.854 4.75 V 37.563 c 2.198 0.462 3.854 2.417 3.854 4.75 V 45.395 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 40.558 15.016 H 22.235 c -2.767 0 -5.018 -2.25 -5.018 -5.017 s 2.251 -5.018 5.018 -5.018 h 6.643 c 0.552 0 1 -0.448 1 -1 s -0.448 -1 -1 -1 h -6.643 c -3.87 0 -7.018 3.148 -7.018 7.018 c 0 3.869 3.148 7.017 7.018 7.017 h 18.323 c 0.552 0 1 -0.448 1 -1 S 41.11 15.016 40.558 15.016 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 40.558 33.824 H 15.608 c -3.869 0 -7.017 3.148 -7.017 7.018 s 3.148 7.018 7.017 7.018 h 6.643 c 0.552 0 1 -0.447 1 -1 s -0.448 -1 -1 -1 h -6.643 c -2.767 0 -5.017 -2.251 -5.017 -5.018 s 2.25 -5.018 5.017 -5.018 h 24.949 c 0.552 0 1 -0.448 1 -1 S 41.11 33.824 40.558 33.824 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 40.558 24.192 H 14.916 c -0.552 0 -1 0.448 -1 1 s 0.448 1 1 1 h 25.642 c 0.552 0 1 -0.448 1 -1 S 41.11 24.192 40.558 24.192 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bàn là</span>
                    </p>
                  ) : null}
                  {item.tivi ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 86.381 6.277 H 3.619 C 1.624 6.277 0 7.901 0 9.896 v 55.652 c 0 1.995 1.624 3.619 3.619 3.619 H 37.7 v 5.717 h -1.143 c -4.322 0 -7.838 3.516 -7.838 7.838 c 0 0.553 0.448 1 1 1 H 60.28 c 0.553 0 1 -0.447 1 -1 c 0 -4.322 -3.516 -7.838 -7.837 -7.838 H 52.3 v -5.717 h 34.081 c 1.996 0 3.619 -1.624 3.619 -3.619 V 9.896 C 90 7.901 88.377 6.277 86.381 6.277 z M 51.3 76.885 h 2.144 c 2.878 0 5.275 2.094 5.751 4.838 H 30.805 c 0.476 -2.744 2.874 -4.838 5.752 -4.838 H 38.7 c 0.552 0 1 -0.447 1 -1 v -6.717 h 10.6 v 6.717 C 50.3 76.438 50.747 76.885 51.3 76.885 z M 88 65.549 c 0 0.893 -0.727 1.619 -1.619 1.619 H 51.3 H 38.7 H 3.619 C 2.726 67.168 2 66.441 2 65.549 V 9.896 c 0 -0.893 0.726 -1.619 1.619 -1.619 h 82.762 C 87.273 8.277 88 9.004 88 9.896 V 65.549 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 83.146 12.131 H 6.854 c -0.552 0 -1 0.448 -1 1 v 45.183 c 0 0.553 0.448 1 1 1 h 76.293 c 0.553 0 1 -0.447 1 -1 V 13.131 C 84.146 12.579 83.699 12.131 83.146 12.131 z M 82.146 57.314 H 7.854 V 14.131 h 74.293 V 57.314 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 30.075 32.021 h 5.387 c -0.002 0.025 -0.015 0.047 -0.015 0.072 v 12.332 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 32.093 c 0 -0.026 -0.013 -0.047 -0.015 -0.072 h 5.387 c 0.552 0 1 -0.448 1 -1 s -0.448 -1 -1 -1 H 30.075 c -0.552 0 -1 0.448 -1 1 S 29.522 32.021 30.075 32.021 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 53.304 44.816 c 0.156 0.369 0.519 0.608 0.92 0.608 s 0.764 -0.239 0.92 -0.608 l 5.702 -13.404 c 0.217 -0.508 -0.021 -1.096 -0.528 -1.312 c -0.507 -0.215 -1.096 0.021 -1.312 0.529 L 54.224 41.87 l -4.782 -11.241 c -0.215 -0.508 -0.803 -0.744 -1.312 -0.529 c -0.508 0.216 -0.745 0.804 -0.528 1.312 L 53.304 44.816 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 83.146 62.172 h -2.046 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 2.046 c 0.553 0 1 -0.447 1 -1 S 83.699 62.172 83.146 62.172 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Tivi</span>
                    </p>
                  ) : null}
                  {item.dieuHoa ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 84.542 19.486 H 5.458 C 2.448 19.486 0 21.934 0 24.944 v 25.887 c 0 3.01 2.448 5.458 5.458 5.458 h 6.362 h 66.361 h 6.361 c 3.01 0 5.458 -2.448 5.458 -5.458 V 24.944 C 90 21.934 87.552 19.486 84.542 19.486 z M 12.82 54.289 V 41.863 h 64.361 v 5.213 H 19.239 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 h 57.942 v 5.213 H 12.82 z M 88 50.831 c 0 1.907 -1.551 3.458 -3.458 3.458 h -5.361 V 40.863 c 0 -0.552 -0.447 -1 -1 -1 H 11.82 c -0.552 0 -1 0.448 -1 1 v 13.426 H 5.458 C 3.551 54.289 2 52.738 2 50.831 V 24.944 c 0 -1.907 1.551 -3.458 3.458 -3.458 h 79.084 c 1.907 0 3.458 1.551 3.458 3.458 V 50.831 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 43.236 26.853 H 11.82 c -0.552 0 -1 0.448 -1 1 s 0.448 1 1 1 h 31.417 c 0.552 0 1 -0.448 1 -1 S 43.789 26.853 43.236 26.853 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 78.181 26.853 h -5.271 c -0.553 0 -1 0.448 -1 1 s 0.447 1 1 1 h 5.271 c 0.553 0 1 -0.448 1 -1 S 78.733 26.853 78.181 26.853 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 45 61.618 c -0.552 0 -1 0.447 -1 1 v 6.896 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 v -6.896 C 46 62.065 45.552 61.618 45 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 56.225 61.618 c -0.553 0 -1 0.447 -1 1 v 6.896 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 v -6.896 C 57.225 62.065 56.777 61.618 56.225 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 73.69 68.515 c -2.89 0 -5.241 -2.352 -5.241 -5.242 v -0.654 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 0.654 c 0 3.993 3.248 7.242 7.241 7.242 c 0.553 0 1 -0.447 1 -1 S 74.243 68.515 73.69 68.515 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 33.775 61.618 c -0.552 0 -1 0.447 -1 1 v 6.896 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 v -6.896 C 34.775 62.065 34.328 61.618 33.775 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 22.551 61.618 c -0.552 0 -1 0.447 -1 1 v 0.654 c 0 2.891 -2.352 5.242 -5.242 5.242 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 c 3.993 0 7.242 -3.249 7.242 -7.242 v -0.654 C 23.551 62.065 23.104 61.618 22.551 61.618 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Điều hòa</span>
                    </p>
                  ) : null}
                  {item.wifi ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <circle
                            cx={45}
                            cy="38.85"
                            r={3}
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform="  matrix(1 0 0 1 0 0) "
                          />
                          <path
                            d="M 32.288 77.877 c -0.806 0 -1.539 -0.485 -1.849 -1.238 l -4.458 -10.815 l -4.458 10.815 c -0.327 0.794 -1.11 1.293 -1.983 1.233 c -0.857 -0.058 -1.582 -0.656 -1.8 -1.487 l -5.758 -21.946 c -0.28 -1.068 0.358 -2.162 1.427 -2.442 c 1.07 -0.281 2.162 0.358 2.442 1.427 l 4.246 16.182 l 4.036 -9.792 c 0.309 -0.749 1.039 -1.238 1.849 -1.238 s 1.541 0.489 1.849 1.238 l 4.036 9.792 l 4.246 -16.182 c 0.28 -1.068 1.374 -1.708 2.442 -1.427 c 1.068 0.28 1.707 1.374 1.427 2.442 l -5.758 21.946 c -0.218 0.831 -0.943 1.43 -1.8 1.487 C 32.377 77.875 32.333 77.877 32.288 77.877 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 47.221 77.877 c -1.104 0 -2 -0.896 -2 -2 V 53.931 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 21.946 C 49.221 76.981 48.325 77.877 47.221 77.877 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 67.979 51.931 H 58.25 c -1.104 0 -2 0.896 -2 2 v 21.946 c 0 1.104 0.896 2 2 2 s 2 -0.896 2 -2 v -8.973 h 4.364 c 1.104 0 2 -0.896 2 -2 s -0.896 -2 -2 -2 H 60.25 v -6.974 h 7.729 c 1.104 0 2 -0.896 2 -2 S 69.084 51.931 67.979 51.931 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 76.083 77.877 c -1.104 0 -2 -0.896 -2 -2 V 53.931 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 21.946 C 78.083 76.981 77.188 77.877 76.083 77.877 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 76.083 17.434 c -0.531 0 -1.063 -0.211 -1.455 -0.628 C 66.846 8.548 56.324 4 45 4 S 23.154 8.548 15.373 16.805 c -0.757 0.804 -2.022 0.843 -2.827 0.084 c -0.804 -0.757 -0.841 -2.023 -0.084 -2.827 C 21.007 4.994 32.563 0 45 0 s 23.993 4.994 32.538 14.062 c 0.758 0.804 0.721 2.07 -0.083 2.827 C 77.068 17.253 76.575 17.434 76.083 17.434 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 67.3 25.707 c -0.531 0 -1.063 -0.211 -1.456 -0.628 c -5.487 -5.824 -12.89 -9.031 -20.844 -9.031 s -15.356 3.207 -20.844 9.031 c -0.757 0.805 -2.022 0.843 -2.827 0.084 c -0.804 -0.757 -0.841 -2.023 -0.084 -2.827 C 27.496 15.701 35.933 12.047 45 12.047 s 17.504 3.653 23.756 10.288 c 0.757 0.804 0.72 2.07 -0.084 2.827 C 68.285 25.526 67.792 25.707 67.3 25.707 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 58.938 33.584 c -0.531 0 -1.063 -0.211 -1.455 -0.628 c -3.287 -3.488 -7.72 -5.409 -12.482 -5.409 c -4.762 0 -9.195 1.921 -12.482 5.409 c -0.757 0.805 -2.022 0.843 -2.827 0.084 c -0.804 -0.757 -0.841 -2.023 -0.084 -2.827 c 4.05 -4.298 9.517 -6.666 15.393 -6.666 s 11.343 2.367 15.393 6.666 c 0.758 0.804 0.721 2.07 -0.083 2.827 C 59.923 33.403 59.43 33.584 58.938 33.584 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 87.466 90 H 2.534 c -1.104 0 -2 -0.896 -2 -2 V 38.988 c 0 -1.104 0.896 -2 2 -2 h 31.389 c 1.104 0 2 0.896 2 2 s -0.896 2 -2 2 H 4.534 V 86 h 80.932 V 40.988 H 56.077 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 31.389 c 1.104 0 2 0.896 2 2 V 88 C 89.466 89.104 88.57 90 87.466 90 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Wifi</span>
                    </p>
                  ) : null}
                  {item.bep ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 38.6 57.111 c -0.091 0 -0.184 -0.013 -0.275 -0.038 c -7.615 -2.179 -13.716 -7.948 -16.321 -15.435 c -0.182 -0.521 0.094 -1.092 0.616 -1.273 c 0.523 -0.185 1.091 0.094 1.273 0.616 c 2.391 6.872 7.992 12.169 14.982 14.168 c 0.531 0.152 0.838 0.706 0.687 1.237 C 39.435 56.825 39.035 57.111 38.6 57.111 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 86.528 39.542 h -9.951 c 0.231 -1.391 0.37 -2.813 0.414 -4.258 h 0.481 c 2.728 0 4.946 -2.219 4.946 -4.946 V 29.44 c 0 -2.728 -2.219 -4.947 -4.946 -4.947 H 12.61 c -2.728 0 -4.946 2.219 -4.946 4.947 v 0.897 c 0 2.728 2.219 4.946 4.946 4.946 h 0.481 c 0.045 1.445 0.183 2.867 0.414 4.258 H 3.472 C 1.558 39.542 0 41.099 0 43.013 s 1.558 3.472 3.472 3.472 h 12.02 c 2.457 5.928 6.646 10.96 11.935 14.465 L 14.173 79.878 c -1.935 2.764 -1.261 6.587 1.503 8.522 c 1.066 0.746 2.289 1.104 3.5 1.104 c 1.931 -0.001 3.833 -0.91 5.021 -2.608 l 5.879 -8.396 h 29.93 l 5.879 8.396 c 0.938 1.339 2.34 2.233 3.95 2.517 c 0.358 0.063 0.718 0.095 1.075 0.095 c 1.244 0 2.456 -0.38 3.497 -1.107 c 2.763 -1.937 3.437 -5.76 1.502 -8.522 L 62.658 60.951 c 5.289 -3.505 9.478 -8.537 11.935 -14.466 h 11.936 c 1.914 0 3.472 -1.558 3.472 -3.472 S 88.442 39.542 86.528 39.542 z M 9.664 30.337 V 29.44 c 0 -1.625 1.322 -2.947 2.946 -2.947 h 64.863 c 1.625 0 2.946 1.322 2.946 2.947 v 0.897 c 0 1.625 -1.321 2.946 -2.946 2.946 h -1.456 H 14.066 H 12.61 C 10.986 33.283 9.664 31.961 9.664 30.337 z M 3.472 44.485 C 2.66 44.485 2 43.825 2 43.013 s 0.66 -1.472 1.472 -1.472 h 10.436 c 0.233 1 0.513 1.982 0.837 2.943 H 3.472 z M 22.56 85.75 c -1.302 1.861 -3.875 2.314 -5.736 1.012 c -1.86 -1.303 -2.314 -3.877 -1.011 -5.737 l 13.32 -19.023 c 2.422 1.396 5.04 2.489 7.806 3.214 L 22.56 85.75 z M 51.034 65.688 l 4.058 5.795 H 34.991 l 4.058 -5.795 c 1.943 0.37 3.944 0.571 5.993 0.571 C 47.091 66.259 49.092 66.057 51.034 65.688 z M 31.477 76.501 l 2.114 -3.019 h 22.902 l 2.114 3.019 H 31.477 z M 74.271 81.024 c 1.303 1.86 0.849 4.435 -1.011 5.737 c -0.9 0.631 -1.991 0.871 -3.078 0.683 c -1.083 -0.191 -2.027 -0.793 -2.658 -1.694 L 53.145 65.216 c 2.767 -0.725 5.384 -1.818 7.807 -3.214 L 74.271 81.024 z M 45.042 64.259 c -16.194 0 -29.429 -12.908 -29.959 -28.976 h 59.918 C 74.472 51.351 61.235 64.259 45.042 64.259 z M 86.528 44.485 H 75.339 c 0.325 -0.962 0.604 -1.943 0.837 -2.943 h 10.352 c 0.812 0 1.472 0.66 1.472 1.472 S 87.34 44.485 86.528 44.485 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 44.91 21.106 c -0.152 0 -0.306 -0.035 -0.451 -0.108 c -0.493 -0.25 -0.689 -0.852 -0.44 -1.344 c 1.653 -3.262 1.652 -6.167 -0.003 -8.878 c -1.72 -2.831 -1.704 -5.691 0.047 -8.502 c 0.292 -0.468 0.909 -0.612 1.377 -0.32 s 0.612 0.909 0.32 1.377 c -1.356 2.177 -1.368 4.212 -0.036 6.404 c 2.017 3.304 2.043 6.946 0.08 10.823 C 45.626 20.906 45.275 21.106 44.91 21.106 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 53.614 21.106 c -0.151 0 -0.306 -0.035 -0.451 -0.108 c -0.492 -0.25 -0.689 -0.851 -0.44 -1.344 c 1.306 -2.577 1.307 -4.866 0.005 -7 c -1.433 -2.359 -1.419 -4.74 0.039 -7.08 c 0.292 -0.468 0.907 -0.611 1.378 -0.32 c 0.469 0.292 0.611 0.909 0.319 1.377 c -1.056 1.693 -1.064 3.276 -0.028 4.982 c 1.668 2.733 1.693 5.743 0.071 8.943 C 54.331 20.906 53.979 21.106 53.614 21.106 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 36.239 21.106 c -0.152 0 -0.306 -0.035 -0.451 -0.108 c -0.493 -0.25 -0.689 -0.852 -0.44 -1.344 c 1.306 -2.576 1.307 -4.866 0.005 -6.999 c -1.433 -2.358 -1.419 -4.74 0.039 -7.08 c 0.292 -0.468 0.909 -0.611 1.377 -0.32 c 0.469 0.292 0.612 0.909 0.32 1.377 c -1.055 1.693 -1.064 3.276 -0.028 4.982 c 1.668 2.733 1.693 5.743 0.071 8.943 C 36.956 20.906 36.604 21.106 36.239 21.106 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bếp</span>
                    </p>
                  ) : null}
                  {item.doXe ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 21.004 11.102 h -5.398 c -0.82 0 -1.484 0.664 -1.484 1.484 v 9.366 v 6.968 c 0 0.82 0.664 1.484 1.484 1.484 c 0.82 0 1.484 -0.664 1.484 -1.484 v -5.484 h 3.914 c 3.006 0 5.452 -2.445 5.452 -5.451 v -1.43 C 26.456 13.547 24.011 11.102 21.004 11.102 z M 23.489 17.983 c 0 1.37 -1.115 2.484 -2.485 2.484 H 17.09 v -6.399 h 3.914 c 1.37 0 2.485 1.115 2.485 2.485 V 17.983 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 26.772 4.259 H 12.552 c -4.683 0 -8.493 3.81 -8.493 8.492 v 14.219 c 0 4.683 3.81 8.493 8.493 8.493 h 6.254 v 15.474 c 0 0.819 0.664 1.484 1.484 1.484 s 1.484 -0.664 1.484 -1.484 V 35.463 h 4.999 c 4.683 0 8.493 -3.81 8.493 -8.493 V 12.751 C 35.264 8.069 31.455 4.259 26.772 4.259 z M 32.297 26.971 c 0 3.047 -2.479 5.526 -5.526 5.526 H 12.552 c -3.047 0 -5.526 -2.479 -5.526 -5.526 V 12.751 c 0 -3.047 2.479 -5.525 5.526 -5.525 h 14.219 c 3.047 0 5.526 2.478 5.526 5.525 V 26.971 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 51.204 64.241 h -1.96 c -0.819 0 -1.484 -0.664 -1.484 -1.484 c 0 -0.819 0.664 -1.484 1.484 -1.484 h 1.96 c 0.819 0 1.484 0.664 1.484 1.484 C 52.688 63.577 52.024 64.241 51.204 64.241 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 86.378 56.411 l -6.726 -1.12 c -22.322 -10.422 -41.475 -9.969 -56.937 1.341 C 12.3 56.674 0.935 60.025 0.016 66.278 L 0 73.418 c 0 2.389 1.944 4.334 4.334 4.334 h 1.895 c 0.862 4.542 4.855 7.989 9.644 7.989 c 4.789 0 8.783 -3.447 9.645 -7.989 h 36.342 c 0.862 4.542 4.855 7.989 9.645 7.989 s 8.783 -3.447 9.645 -7.989 h 2.184 c 1.262 0 2.459 -0.549 3.282 -1.504 l 2.334 -2.708 C 89.626 72.752 90 71.748 90 70.709 V 60.686 C 90 58.558 88.477 56.761 86.378 56.411 z M 60.993 51.93 l -2.396 4.702 H 28.079 C 37.748 50.844 48.634 49.277 60.993 51.93 z M 12.708 60.749 c -0.539 0.569 -1.236 1.172 -2.103 1.745 c -1.073 0.708 -3.537 2.087 -6.334 2.019 C 5.916 62.968 8.955 61.637 12.708 60.749 z M 15.872 82.774 c -3.78 0 -6.855 -3.075 -6.855 -6.855 c 0 -3.779 3.075 -6.854 6.855 -6.854 c 3.78 0 6.855 3.075 6.855 6.854 C 22.728 79.698 19.653 82.774 15.872 82.774 z M 71.503 82.774 c -3.78 0 -6.855 -3.075 -6.855 -6.855 c 0 -3.779 3.075 -6.854 6.855 -6.854 c 3.78 0 6.855 3.075 6.855 6.854 C 78.359 79.698 75.284 82.774 71.503 82.774 z M 86.702 71.602 l -2.335 2.708 c -0.259 0.301 -0.636 0.474 -1.034 0.474 h -2.077 c -0.565 -4.882 -4.719 -8.688 -9.752 -8.688 c -5.032 0 -9.187 3.805 -9.752 8.688 H 25.624 c -0.565 -4.882 -4.719 -8.688 -9.752 -8.688 c -5.032 0 -9.186 3.805 -9.751 8.688 H 4.334 c -0.753 0 -1.367 -0.613 -1.367 -1.367 v -6.043 c 0.493 0.068 0.992 0.105 1.499 0.105 c 2.564 0 5.273 -0.859 7.773 -2.509 c 2.222 -1.467 3.828 -3.276 4.479 -4.953 c 1.98 -0.266 4.063 -0.419 6.189 -0.419 c 0.095 0 0.192 0 0.287 0.001 l 0.498 0.003 l 0.004 -0.003 h 33.437 l -4.628 9.5 c -0.358 0.737 -0.052 1.625 0.684 1.984 c 0.21 0.101 0.431 0.15 0.649 0.15 c 0.55 0 1.078 -0.306 1.335 -0.834 l 5.667 -11.633 c 0 0 0 -0.001 0 -0.001 l 3.119 -6.119 c 4.665 1.23 9.532 3.031 14.619 5.418 l 0.184 0.086 l 7.129 1.188 c 0.662 0.11 1.142 0.677 1.142 1.348 v 0.588 h -1.62 c -0.819 0 -1.484 0.664 -1.484 1.484 c 0 0.819 0.664 1.484 1.484 1.484 h 1.62 v 6.468 C 87.033 71.037 86.915 71.354 86.702 71.602 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 15.872 80.636 c -2.601 0 -4.718 -2.116 -4.718 -4.718 c 0 -2.601 2.116 -4.717 4.718 -4.717 s 4.718 2.116 4.718 4.717 C 20.591 78.52 18.474 80.636 15.872 80.636 z M 15.872 74.168 c -0.965 0 -1.751 0.785 -1.751 1.75 c 0 0.966 0.785 1.751 1.751 1.751 s 1.751 -0.785 1.751 -1.751 C 17.624 74.953 16.838 74.168 15.872 74.168 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 71.503 80.636 c -2.602 0 -4.718 -2.116 -4.718 -4.718 c 0 -2.601 2.116 -4.717 4.718 -4.717 c 2.602 0 4.718 2.116 4.718 4.717 C 76.221 78.52 74.105 80.636 71.503 80.636 z M 71.503 74.168 c -0.966 0 -1.751 0.785 -1.751 1.75 c 0 0.966 0.785 1.751 1.751 1.751 c 0.966 0 1.751 -0.785 1.751 -1.751 C 73.254 74.953 72.469 74.168 71.503 74.168 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bãi đỗ xe</span>
                    </p>
                  ) : null}
                  {item.hoBoi ? (
                    <p className="flex">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: 30,
                          width: 30,
                          fill: "currentcolor",
                        }}
                      >
                        <path d="M29 15v16h-2v-6h-6v6h-2v-6l.005-.15a2 2 0 0 1 1.838-1.844L21 23h6v-8zM5 15v8h6a2 2 0 0 1 1.995 1.85L13 25v6h-2v-6H5v6H3V15zM16 1a15 15 0 0 1 13.556 8.571 1 1 0 0 1-.79 1.423l-.113.006H17v8h8v2h-8v10h-2V21H7v-2h8v-8H3.347a1 1 0 0 1-.946-1.323l.043-.106A15 15 0 0 1 16 1zm0 2C11.71 3 7.799 5.097 5.402 8.468l-.197.284L5.042 9h21.915l-.162-.248a12.995 12.995 0 0 0-10.1-5.734l-.365-.014z" />
                      </svg>
                      <span className="ms-1">Hồ bơi</span>
                    </p>
                  ) : null}
                  {item.banUi ? (
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width={30}
                        height={30}
                        viewBox="0 0 256 256"
                        xmlSpace="preserve"
                      >
                        <defs></defs>
                        <g
                          style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                          }}
                          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                          <path
                            d="M 64.014 36.879 H 49.247 c -1.871 0 -3.658 0.894 -4.781 2.391 l -4.802 6.403 c -0.576 0.768 -0.667 1.779 -0.238 2.637 c 0.429 0.859 1.292 1.393 2.253 1.393 h 22.335 c 1.979 0 3.589 -1.61 3.589 -3.589 v -5.646 C 67.603 38.489 65.992 36.879 64.014 36.879 z M 65.603 46.114 c 0 0.876 -0.713 1.589 -1.589 1.589 H 41.679 c -0.29 0 -0.421 -0.2 -0.464 -0.287 c -0.043 -0.086 -0.125 -0.312 0.049 -0.543 l 4.803 -6.403 c 0.747 -0.996 1.936 -1.591 3.181 -1.591 h 14.767 c 0.876 0 1.589 0.713 1.589 1.589 V 46.114 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                          <path
                            d="M 89 62.886 c -3.432 0 -6.223 -2.792 -6.223 -6.224 v -12.75 c 0 -4.195 -3.16 -7.66 -7.224 -8.156 v -2.877 c 0 -1.196 -0.468 -2.32 -1.317 -3.167 c -0.852 -0.849 -2.019 -1.338 -3.185 -1.309 c -0.945 0.004 -1.866 0.011 -2.785 0.018 l -1.869 -4.483 c -0.776 -1.864 -2.584 -3.068 -4.604 -3.068 h -8 c -2.062 0 -3.937 1.295 -4.666 3.222 l -1.956 5.167 c -21.995 2.015 -33.384 8.592 -40.42 29.381 H 5.244 C 2.353 58.641 0 60.993 0 63.886 v 4.244 c 0 0.553 0.448 1 1 1 h 73.834 c 0.553 0 1 -0.447 1 -1 v -4.244 c 0 -2.893 -2.353 -5.245 -5.244 -5.245 h -1.218 c 0.84 -2.121 1.926 -3.657 3.245 -4.561 c 1.839 -1.259 2.937 -3.445 2.937 -5.85 V 37.777 c 2.957 0.481 5.224 3.045 5.224 6.135 v 12.75 c 0 4.534 3.688 8.224 8.223 8.224 c 0.553 0 1 -0.447 1 -1 S 89.553 62.886 89 62.886 z M 49.382 29.071 l 1.617 -4.27 c 0.437 -1.154 1.56 -1.93 2.795 -1.93 h 8 c 1.21 0 2.292 0.721 2.758 1.838 l 1.557 3.734 c -0.199 0.002 -0.386 0.006 -0.582 0.009 c -4.416 0.057 -8.523 0.171 -12.343 0.377 c -0.144 0.008 -0.287 0.016 -0.429 0.024 c -0.734 0.041 -1.458 0.086 -2.171 0.135 C 50.179 29.014 49.773 29.041 49.382 29.071 z M 73.834 63.886 v 3.244 H 2 v -3.244 c 0 -1.789 1.455 -3.245 3.244 -3.245 h 2.22 h 60.487 h 2.639 C 72.379 60.641 73.834 62.097 73.834 63.886 z M 73.554 48.23 c 0 1.744 -0.772 3.313 -2.066 4.199 c -1.839 1.259 -3.235 3.295 -4.257 6.211 H 8.857 c 6.789 -19.55 17.446 -25.618 38.965 -27.461 c 0.023 0.002 0.042 0.015 0.065 0.015 c 0.028 0 0.057 -0.001 0.086 -0.004 c 5.189 -0.446 11.43 -0.689 19.638 -0.764 c 0.005 0 0.009 -0.002 0.014 -0.002 c 1.124 -0.01 2.268 -0.017 3.435 -0.021 c 0.003 0 0.007 0 0.01 0 c 0.662 0 1.285 0.258 1.756 0.726 c 0.47 0.468 0.729 1.089 0.729 1.75 V 48.23 z"
                            style={{
                              stroke: "none",
                              strokeWidth: 1,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "rgb(0,0,0)",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                      <span className="ms-1">Bàn ủi</span>
                    </p>
                  ) : null}
                </div>
                <div className="mt-3 space-y-2 pb-4">
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: "650",
                    }}
                  >
                    Thông tin đặt phòng:
                  </span>
                  {listRoomBooking
                    .filter((booking) => booking.maPhong === item.id)
                    .map((booking) => {
                      const ngayDen = new Date(booking.ngayDen);
                      const ngayDi = new Date(booking.ngayDi);

                      const soNgay = differenceInDays(ngayDi, ngayDen);
                      const thanhTien = (() => {
                        const vatPercentage = 0.1;
                        const totalPriceWithVAT =
                          item.giaTien *
                          (soNgay === 0 ? 1 : soNgay) *
                          (1 + vatPercentage);
                        return totalPriceWithVAT.toFixed(3);
                      })();
                      return (
                        <div>
                          <div
                            key={booking.id}
                            className="grid grid-cols-3 gap-2 thongTinDatPhongUser"
                          >
                            <p>
                              Ngày đến:{" "}
                              {format(new Date(booking.ngayDen), "dd-MM-yyyy")}
                            </p>
                            <p>
                              Ngày đi:{" "}
                              {format(new Date(booking.ngayDi), "dd-MM-yyyy")}
                            </p>
                            <p>Số lượng khách: {booking.soLuongKhach}</p>
                            <p>
                              Đơn giá: ${item.giaTien}.000 x{" "}
                              {soNgay === 0 ? 1 : soNgay} đêm
                            </p>
                            <p>Thuế: 10%</p>
                            <p
                              style={{
                                fontSize: 15,
                                fontWeight: "650",
                              }}
                            >
                              Thành tiền: ${thanhTien}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryUser;
