import React, { useEffect, useState } from "react";
import { DatePicker, Table, theme } from "antd";
import "./booking.css";
import { getDatPhong } from "../../api/apiUser";
import moment from "moment";
const { RangePicker } = DatePicker;

const Booking = ({ maPhong }) => {
  console.log(maPhong);
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const [disabledDates, setDisabledDates] = useState([]);
  useEffect(() => {
    getDatPhong
      .getDatPhong()
      .then((res) => {
        setDisabledDates(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [dateRanges, setDateRanges] = useState(
    disabledDates.map((item) => ({
      start: moment(item.ngayDen),
      end: moment(item.ngayDi),
    }))
  );
  const disabledDate = (current) => {
    // Xử lý các ngày bị vô hiệu hóa nếu cần
    return false;
  };
  const getObjectById = (maPhong) => {
    return disabledDates.find((item) => item.maPhong === maPhong);
  };

  // Lấy đối tượng từ mảng dựa trên id
  const targetObject = getObjectById(maPhong);

  console.log("Target Object:", targetObject);
  const { token } = theme.useToken();
  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };
  const cellRender = React.useCallback(
    (current, info) => {
      if (info.type !== "date") {
        return info.originNode;
      }
      if (typeof current === "number") {
        return <div className="ant-picker-cell-inner">{current}</div>;
      }

      // Kiểm tra xem targetObject có tồn tại và có dữ liệu không
      if (targetObject && typeof targetObject === "object") {
        // Lấy thông tin từ targetObject dựa trên ngày hiện tại
        const targetDateInfo = targetObject[current.format("YYYY-MM-DD")];

        if (targetDateInfo) {
          return (
            <div className="ant-picker-cell-inner" style={style}>
              {current.date()}
            </div>
          );
        }
      }
    },
    [targetObject, style]
  );
  const data = [];
  const columns = [
    {
      title: "Mã đặt phòng",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      fixed: "left",
    },

    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      fixed: "left",
    },

    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      fixed: "left",
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      fixed: "left",
    },
    {
      title: "Số khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      fixed: "left",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      fixed: "left",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: "right",
    },
  ];
  return (
    <div className="booking_content">
      <div>
        <form action="">
          {/* Date */}
          <div>
            <div className="grid grid-cols-2 mt-4">
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: "650",
                }}
              >
                NHẬN PHÒNG
              </h3>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: "650",
                }}
              >
                TRẢ PHÒNG
              </h3>
            </div>
            {/* <RangePicker
              className="dateFromTo"
              style={{
                color: "red !important",
                marginTop: 10,
                padding: 10,
              }}
              showTime={{
                format: "HH:mm",
              }}
              format="DD-MM-YYYY | HH:mm"
              onChange={onChange}
              onOk={onOk}
              disabledDate={disabledDate}
              value={dateRanges.map((range) => [range.start, range.end])}
            /> */}
            {/* <DatePicker.RangePicker cellRender={cellRender} /> */}
            <Table columns={columns} dataSource={data} />;
          </div>
          {/* Khách */}
          <div>
            {/* number */}
            <div
              className="flex items-center"
              style={{
                borderRadius: "0 0 10px 10px",
                border: "1px solid black",
                borderTop: "none",
              }}
            >
              <label
                htmlFor="email"
                className="block"
                style={{
                  fontSize: 14,
                  fontWeight: "650",
                  padding: 10,
                }}
              >
                KHÁCH
              </label>
              <input
                type="number"
                id="email"
                name="email"
                className=" text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                style={{
                  fontSize: "20px",
                  padding: "10px",
                  borderRadius: "0 0 10px 10px",
                }}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.email}
              />
              {/* {errors.email && touched.email ? (
                  <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                ) : null} */}
            </div>
          </div>
          {/* Booking */}
          <div className="booKing_Button space-y-2">
            <button className="w-full py-3 mt-3 rounded-lg text-white text-lg font-semibold">
              Đặt phòng
            </button>
            <p>Bạn vẫn chưa bị trừ tiền</p>
          </div>
          {/* Price */}
          <div
            style={{
              borderBottom: "1px solid #E5E7EB",
              padding: "20px 0",
            }}
          >
            <div className="flex justify-between">
              <p>$17.000 / đêm</p>
              <p>0 $</p>
            </div>
            <div className="flex justify-between">
              <p>Phí dịch vụ</p>
              <p>0 $</p>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <h3
              style={{
                fontSize: 20,
                fontWeight: "650",
              }}
            >
              Tổng trước thuế
            </h3>
            <p
              style={{
                fontSize: 20,
                fontWeight: "650",
              }}
            >
              0 $
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
