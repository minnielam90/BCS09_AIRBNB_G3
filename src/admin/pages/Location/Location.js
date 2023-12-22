import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { locationServ } from "../../api/apiAdmin";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ButtonSortToolbar from "../components/ButtonSortToolbar";
import MUIDataTable from "mui-datatables";
import ModalEditLocation from "./ModalEditLocation";
import ModalAddLocation from "./ModalAddLocation";

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listLocation, setListLocation] = useState([]);

  const getData = () => {
    locationServ
      .getList()
      .then((res) => {
        setListLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const data = listLocation.map((location, index) => ({
    id: location.id,
    key: location.id,
    stt: index + 1,
    tenViTri: location.tenViTri,
    tinhThanh: location.tinhThanh,
    quocGia: location.quocGia,
    hinhAnh: location.hinhAnh,
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
      label: "Tên vị trí",
      dataIndex: "tenViTri",
      name: "tenViTri",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      label: "Tỉnh thành",
      dataIndex: "tinhThanh",
      name: "tinhThanh",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Quốc gia",
      dataIndex: "quocGia",
      name: "quocGia",
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
      label: "Hành động",
      dataIndex: "action",
      name: "action",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const locationId = data[tableMeta.rowIndex].id;
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
      <ModalAddLocation getData={getData} />
      {/* <ModalEditLocation /> */}
      <MUIDataTable
        title={
          <div>
            <h2 className="text-2xl font-bold mb-5">
              Quản lý thông tin vị trí
            </h2>
          </div>
        }
        data={dataSorted}
        columns={columns}
        options={{
          selectableRows: "none",
          caseSensitive: true,
          pagination: true,
          rowsPerPage: 5,
          customToolbar: () => <ButtonSortToolbar reverseData={reverseData} />,
        }}
      />
    </div>
  );
};

export default Location;
