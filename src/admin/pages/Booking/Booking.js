import React, { useEffect, useState } from "react";
import { bookingRoomServ } from "../../api/apiAdmin";
import { Button, Table } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Booking = () => {
  const [listBookingRoom, setListBookingRoom] = useState([]);

  const getData = () => {
    bookingRoomServ
      .getList()
      .then((res) => {
        setListBookingRoom(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const data = listBookingRoom.map((room, index) => {
    return {
      id: room.id,
      key: room.id,
      stt: index + 1,
      maPhong: room.maPhong,
      ngayDen: moment(room.ngayDen).format("DD/MM/YYYY "),
      ngayDi: moment(room.ngayDi).format("DD/MM/YYYY"),
      soLuongKhach: room.soLuongKhach,
      maNguoiDung: room.maNguoiDung,
    };
  });

  const [sortToggle, setSortToggle] = useState(true);
  const dataSorted = sortToggle ? data : data.reverse();

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Số lượng khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      options: {
        filter: true,
        sort: false,
      },
      render: (value, record) => {
        const bookingRoomId = record.id;
        return (
          <div>
            <Button
              classNames="button-edit"
              type="warning"
              icon={<EditOutlined />}
              className="mr-2 mb-3 bg-orange-300 hover:bg-orange-400 text-white"
              // onClick={() => handleEditRoom(roomId)}
            ></Button>
            <Button
              className="button-delete"
              type="primary"
              danger
              icon={<DeleteOutlined />}
              // onClick={() => handleDeleteRoom(roomId)}
            ></Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Quản lý thông tin đặt phòng</h2>

      <Table
        columns={columns}
        dataSource={dataSorted}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Booking;
