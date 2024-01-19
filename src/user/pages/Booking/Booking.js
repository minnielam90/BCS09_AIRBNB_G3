import React from "react";
import { DatePicker, Space } from "antd";
import "./booking.css";

const { RangePicker } = DatePicker;
const Booking = ({ maPhong }) => {
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  return (
    <div className="booking_content">
      <div>
        <div>
          <RangePicker
            className="dateFromTo"
            style={{
              color: "red !important",
            }}
            showTime={{
              format: "HH:mm",
            }}
            format="DD-MM-YYYY | HH:mm"
            onChange={onChange}
            onOk={onOk}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Booking;
