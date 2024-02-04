import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { locationServ } from "../../api/apiAdmin";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ButtonSortToolbar from "../components/ButtonSortToolbar";
import MUIDataTable from "mui-datatables";
import ModalEditLocation from "./ModalEditLocation";
import ModalAddLocation from "./ModalAddLocation";
import "../components/Admin.css";

const Location = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [listLocation, setListLocation] = useState([]);

  const getData = () => {
    locationServ.getList().then((res) => {
      setListLocation(res.data.content);
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
                className="mr-2 bg-orange-300 hover:bg-orange-400 text-gray-800"
                onClick={() => handleEditLocation(locationId)}
              ></Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteLocation(locationId)}
              ></Button>
            </div>
          );
        },
      },
    },
  ];

  const handleEditLocation = (locationId) => {
    locationServ.getDetailLocation(locationId).then((res) => {
      setEditData(res.data.content);
      setIsOpen(true);
    });
  };
  const handleDeleteLocation = (locationId) => {
    locationServ
      .deleteLocation(locationId)
      .then(() => {
        setListLocation((prevListLocation) =>
          prevListLocation.filter((location) => location.id !== locationId)
        );
        getData();
        message.success("Xóa thành công!");
      })
      .catch((err) => {
        message.error("Xảy ra lỗi");
      });
  };

  return (
    <div className="responsive-table-container">
      <ModalAddLocation getData={getData} />
      <ModalEditLocation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getData={getData}
        editData={editData}
      />
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
          rowsPerPage: 10,
          customToolbar: () => <ButtonSortToolbar reverseData={reverseData} />,
        }}
      />
    </div>
  );
};

export default Location;
