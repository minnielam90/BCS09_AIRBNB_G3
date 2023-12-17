import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { locationServ } from "../../api/apiAdmin";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Location = () => {
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
      title: "Tên vị trí",
      dataIndex: "tenViTri",
      key: "tenViTri",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      options: {
        filter: true,
        sort: false,
      },
      render: (data) => {
        return <img src={data} width="100" height="100" />;
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
        const locationId = record.id;
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
      <h2 className="text-2xl font-bold mb-5">Quản lý thông tin vị trí</h2>

      <Table
        columns={columns}
        dataSource={dataSorted}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default Location;
