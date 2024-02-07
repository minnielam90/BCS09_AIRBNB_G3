import React, { useEffect, useState } from "react";
import { Button, Popover, message } from "antd";
import { roomServ } from "../../api/apiAdmin";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MUIDataTable from "mui-datatables";
import ButtonSortToolbar from "../components/ButtonSortToolbar";
import ModalAddRoom from "./ModalAddRoom";
import ModalEditRoom from "./ModalEditRoom";
import "../components/Admin.css";

const Room = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listRooms, setListRooms] = useState([]);
  const [editData, setEditData] = useState({});
  const [popoverStates, setPopoverStates] = useState(
    listRooms.map(() => false)
  );

  const [modalEditRoomVisible, setModalEditRoomVisible] = useState(false);

  const hidePopover = (index) => {
    const newStates = [...popoverStates];
    newStates[index] = false;
    setPopoverStates(newStates);
  };

  const handleOpenPopover = (index) => {
    const newStates = [...popoverStates];
    newStates[index] = true;
    setPopoverStates(newStates);
  };

  const getData = () => {
    roomServ.getList().then((res) => {
      setListRooms(res.data.content);
      setIsOpen(true);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const data = listRooms.map((room, index) => ({
    id: room.id,
    key: room.id,
    stt: index + 1,
    hinhAnh: room.hinhAnh,
    tenPhong: room.tenPhong,
    khach: room.khach,
    phongNgu: room.phongNgu,
    giuong: room.giuong,
    phongTam: room.phongTam,
    moTa: room.moTa,
    giaTien: room.giaTien,
  }));

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
      label: "Hình Ảnh",
      dataIndex: "hinhAnh",
      name: "hinhAnh",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const imgUrl = value;
          return <img src={imgUrl} width="100" height="100" alt="" />;
        },
      },
    },
    {
      label: "Tên Phòng",
      dataIndex: "tenPhong",
      name: "tenPhong",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      label: "Khách",
      dataIndex: "khach",
      name: "khach",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Phòng ngủ",
      dataIndex: "phongNgu",
      name: "phongNgu",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Giường",
      dataIndex: "giuong",
      name: "giuong",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Phòng tắm",
      dataIndex: "phongTam",
      name: "phongTam",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Mô tả",
      dataIndex: "moTa",
      name: "moTa",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const index = tableMeta.rowIndex;
          const room = dataSorted[index];
          return (
            <Popover
              content={
                <div>
                  <p style={{ width: "200px" }}>{room.moTa}</p>
                  <Button
                    type="primary"
                    danger
                    onClick={() => hidePopover(index)}
                  >
                    Đóng
                  </Button>
                </div>
              }
              trigger="click"
              open={popoverStates[index]}
              placement="bottomRight"
              onOpenChange={(open) => {
                if (!open) hidePopover(index);
              }}
            >
              <Button
                type="link"
                onClick={() => handleOpenPopover(index)}
                className="-ml-4"
                style={{ border: "none", background: "none" }}
              >
                Xem chi tiết
              </Button>
            </Popover>
          );
        },
      },
    },
    {
      label: "Giá tiền",
      dataIndex: "giaTien",
      name: "giaTien",
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
          const roomId = data[tableMeta.rowIndex].id;
          return (
            <div>
              <Button
                classNames="button-edit"
                type="warning"
                icon={<EditOutlined />}
                className="mr-2 bg-orange-300 hover:bg-orange-400 text-gray-800"
                onClick={() => handleEditRoom(roomId)}
              ></Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteRoom(roomId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];

  const handleEditRoom = (roomId) => {
    roomServ
      .getDetailRoom(roomId)
      .then((res) => {
        setEditData(res.data.content);
        setModalEditRoomVisible(true);
      })
      .catch((err) => {
        message.error("Không có quyền sửa");
      });
  };
  const handleDeleteRoom = (roomId) => {
    roomServ
      .deleteRoom(roomId)
      .then(() => {
        setListRooms((prevListRooms) =>
          prevListRooms.filter((room) => room.id !== roomId)
        );
        message.success("Xóa thành công");
        getData();
      })
      .catch((err) => {
        message.error("Không có quyền xóa");
      });
  };

  return (
    <div className="responsive-table-container">
      <ModalAddRoom getData={getData} />
      <ModalEditRoom
        isOpen={modalEditRoomVisible}
        setIsOpen={setModalEditRoomVisible}
        editData={editData}
        getData={getData}
      />
      <MUIDataTable
        title={
          <div>
            <h2 className="text-2xl font-bold mb-5">Quản lý danh sách phòng</h2>
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

export default Room;
