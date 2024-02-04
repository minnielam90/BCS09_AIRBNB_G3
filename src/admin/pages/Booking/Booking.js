import React, { useEffect, useState } from "react";
import { bookingRoomServ } from "../../api/apiAdmin";
import { Button, message } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MUIDataTable from "mui-datatables";
import ButtonSortToolbar from "../components/ButtonSortToolbar";
import ModalAddBooking from "./ModalAddBooking";
import ModalEditBooking from "./ModalEditBooking";
import "../components/Admin.css";

const Booking = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [listBookingRoom, setListBookingRoom] = useState([]);

  const getData = () => {
    bookingRoomServ.getList().then((res) => {
      setListBookingRoom(res.data.content);
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
  const reverseData = () => {
    setSortToggle(!sortToggle);
  };

  const columns = [
    {
      label: "STT",
      dataIndex: "id",
      name: "id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Mã phòng",
      dataIndex: "maPhong",
      name: "maPhong",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      label: "Ngày đến",
      dataIndex: "ngayDen",
      name: "ngayDen",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Ngày đi",
      dataIndex: "ngayDi",
      name: "ngayDi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Số lượng khách",
      dataIndex: "soLuongKhach",
      name: "soLuongKhach",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Mã người dùng",
      dataIndex: "maNguoiDung",
      name: "maNguoiDung",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Hành động",
      dataIndex: "action",
      name: "action",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const roomId = dataSorted[tableMeta.rowIndex].id;
          return (
            <div>
              <Button
                type="warning"
                icon={<EditOutlined />}
                className="mr-2 bg-orange-300 hover:bg-orange-400 text-gray-800"
                onClick={() => handleEditBookingRoom(roomId)}
              ></Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteBookingRoom(roomId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];

  const handleEditBookingRoom = (roomId) => {
    bookingRoomServ.getDetailBookingRoom(roomId).then((res) => {
      const editedNgayDen = moment(res.data.content.ngayDen).startOf("day");
      const editedNgayDi = moment(res.data.content.ngayDi).startOf("day");

      const editedData = {
        ...res.data.content,
        ngayDen: editedNgayDen,
        ngayDi: editedNgayDi,
      };

      setEditData(editedData);
      setIsOpen(true);
    });
  };
  const handleDeleteBookingRoom = (roomId) => {
    bookingRoomServ
      .deleteBookingRoom(roomId)
      .then(() => {
        setListBookingRoom((prevListBookingRoom) =>
          prevListBookingRoom.filter((room) => room.id !== roomId)
        );
        getData();
        message.success("Xóa thành công!");
      })
      .catch((err) => {
        message.error("Xảy ra lỗi!");
      });
  };

  return (
    <div className="responsive-table-container">
      <ModalAddBooking getData={getData} />
      <ModalEditBooking
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={getData}
        editData={editData}
      />
      <MUIDataTable
        title={
          <div>
            <h2 className="text-2xl font-bold mb-5">
              Quản lý thông tin đặt phòng
            </h2>
          </div>
        }
        data={dataSorted}
        columns={columns}
        options={{
          selectableRows: "none",
          caseSensitive: true,
          pagination: true,
          rowsPerPage: 10,
          customToolbar: () => <ButtonSortToolbar reverseData={reverseData} />,
        }}
      />
    </div>
  );
};

export default Booking;
