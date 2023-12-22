import React, { useEffect, useState } from "react";
import { userServ } from "../../api/apiAdmin";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import MUIDataTable from "mui-datatables";
import ButtonSortToolbar from "../components/ButtonSortToolbar";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";

const User = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [listUser, setListUser] = useState([]);

  const getData = () => {
    userServ
      .getList()
      .then((res) => {
        setListUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const data = listUser?.map((user, index) => {
    let convertBirthday = dayjs(user.birthday, "DD/MM/YYYY");
    let convertBirthday2 = dayjs(user.birthday, "YYYY-MM-DD");
    let birthday = "";
    if (convertBirthday.isValid()) {
      birthday = convertBirthday.format("DD/MM/YYYY");
    } else if (convertBirthday2.isValid()) {
      birthday = convertBirthday2.format("DD/MM/YYYY");
    }

    return {
      id: user.id,
      key: user.id,
      stt: index + 1,
      name: user.name,
      email: user.email,
      birthday: birthday,
      role: user.role,
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
      label: "Tên tài khoản",
      dataIndex: "name",
      name: "name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Email",
      dataIndex: "email",
      name: "email",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      label: "Ngày sinh",
      dataIndex: "birthday",
      name: "birthday",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Vai trò",
      dataIndex: "role",
      name: "role",
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
          const userId = dataSorted[tableMeta.rowIndex]?.id;
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
      <ModalAddUser getData={getData} />
      <ModalEditUser getData={getData} />
      <MUIDataTable
        title={
          <div>
            <h2 className="text-2xl font-bold mb-5">
              Quản lý danh sách người dùng
            </h2>
          </div>
        }
        data={dataSorted}
        columns={columns}
        options={{
          selectableRows: "none",
          caseSensitive: true,
          pagination: true,
          rowsPerPage: 7,
          customToolbar: () => <ButtonSortToolbar reverseData={reverseData} />,
        }}
      />
    </div>
  );
};

export default User;
