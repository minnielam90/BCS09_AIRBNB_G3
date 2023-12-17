import React, { useEffect, useState } from "react";
import { bookingRoomServ } from "../../api/apiAdmin";
import { Button, Table } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MUIDataTable from "mui-datatables";
import ButtonSortToolbar from "../components/ButtonSortToolbar";

const Booking = () => {
  let [isOpen, setIsOpen] = useState(false);
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
  const reverseData = () => {
    setSortToggle(!sortToggle);
  };

  const columns = [
    {
      label: "STT",
      dataIndex: "stt",
      name: "stt",
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
                className="mr-2 mb-3 bg-orange-300 hover:bg-orange-400 text-white"
                // onClick={() => handleEditRoom(roomId)}
              ></Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                // onClick={() => handleDeleteRoom(roomId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div>
      <MUIDataTable
        title={"Quản lý đặt phòng"}
        data={dataSorted}
        columns={columns}
        options={{
          selectableRows: "none",
          caseSensitive: true,
          pagination: true,
          rowsPerPage: 8,
          customToolbar: () => <ButtonSortToolbar reverseData={reverseData} />,
        }}
      />
    </div>
  );
};

export default Booking;
