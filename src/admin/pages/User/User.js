import React, { useEffect, useState } from "react";
import { userServ } from "../../api/apiAdmin";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";

const User = () => {
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
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
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
        const userId = record.id;
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
      <h2 className="text-2xl font-bold mb-5">Quản lý danh sách người dùng</h2>
      <Table
        columns={columns}
        dataSource={dataSorted}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default User;
