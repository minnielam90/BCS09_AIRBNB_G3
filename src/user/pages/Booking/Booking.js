import React, { useEffect, useMemo, useState } from "react";
import { DatePicker, message } from "antd";
import "./booking.css";
import { getDatPhong, postDatPhong } from "../../api/apiUser";
import {
  differenceInDays,
  format,
  isWithinInterval,
  parse,
  parseISO,
} from "date-fns";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./responsiteBooking.css";

const Booking = ({ data }) => {
  const { user } = useSelector((state) => state.userSlice);
  const [filteredDatPhongList, setFilteredDatPhongList] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [ngayDenVL, setNgayDenVL] = useState([]);
  const [ngayDiVL, setNgayDiVL] = useState([]);
  const [slKhach, setSLKhach] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const key = "updatable";
  // getDatPhong
  useEffect(() => {
    getDatPhong
      .getDatPhong()
      .then((res) => {
        const filteredList = res.data.content.filter(
          (datPhong) => datPhong.maPhong === data.id
        );
        setFilteredDatPhongList(filteredList);
      })
      .catch((err) => {});
  }, [data.id]);
  // chuyenDoiDate
  const disabledDate = (current) => {
    return filteredDatPhongList.some((datPhong) => {
      const startDate = parseISO(datPhong.ngayDen);
      const endDate = parseISO(datPhong.ngayDi);
      return isWithinInterval(current.toDate(), {
        start: startDate,
        end: endDate,
      });
    });
  };
  const [count, setCount] = useState(1);
  // - khach
  const handleMinusClick = (event) => {
    event.preventDefault();
    setCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, 1);
      setSLKhach(newCount);
      return newCount;
    });
  };
  // + khach
  const handlePlusClick = (event) => {
    event.preventDefault();
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      setSLKhach(newCount);
      return newCount;
    });
  };
  // totalDay
  const totalPrice = useMemo(
    () => data.giaTien * totalDays,
    [data.giaTien, totalDays]
  );
  const totalPriceVAT = useMemo(() => {
    // Thực hiện tính toán giá trị VAT (10% của totalPrice)
    const vatPercentage = 0.1; // 10%
    const totalPriceWithVAT = totalPrice * (1 + vatPercentage);

    // Làm tròn giá trị tới 3 đơn vị
    return totalPriceWithVAT.toFixed(3);
  }, [totalPrice]);
  useEffect(() => {
    setFieldValue("maPhong", data.id);
  }, [data.id]);
  useEffect(() => {
    setFieldValue("ngayDen", ngayDenVL);
  }, [ngayDenVL]);
  useEffect(() => {
    setFieldValue("ngayDi", ngayDiVL);
  }, [ngayDiVL]);
  useEffect(() => {
    if (slKhach !== undefined && slKhach !== null) {
      setFieldValue("soLuongKhach", slKhach);
    }
  }, [slKhach]);
  // booking
  const formik = useFormik({
    initialValues: {
      maPhong: data.id,
      ngayDen: ngayDenVL,
      ngayDi: ngayDiVL,
      soLuongKhach: slKhach,
      maNguoiDung: user ? user.id : null,
    },
    onSubmit: (values, { resetForm }) => {
      if (values.maNguoiDung === null) {
        // Nếu maNguoiDung là null, chuyển hướng về trang đăng nhập
        navigate("/login");
        return; // Dừng xử lý onSubmit ngay tại đây để không tiếp tục đặt phòng
      }
      postDatPhong
        .postDatPhong(values)
        .then((res) => {
          messageApi.open({
            key,
            type: "loading",
            content: "Đang đặt phòng...",
          });
          setTimeout(() => {
            messageApi.open({
              key,
              type: "success",
              content: "Đặt phòng thành công",
              duration: 2,
            });
          }, 1000);
          setTimeout(() => {
            navigate(`/personalPage/${user.id}`);
          }, 2000);
        })
        .catch((err) => {});
    },
  });
  const { handleChange, handleBlur, handleSubmit, setFieldValue } = formik;
  return (
    <div className="w-5/6 sticky top-28 wBS">
      {contextHolder}

      <div className="mx-auto p-6 bg-white shadow-xl border rounded-xl w-full ml-9 contentBookingUser">
        <div>
          <div className="flex justify-between">
            <div className="flex space-x-1 items-end justify-between">
              <span>$</span>
              <p
                style={{
                  fontWeight: "650",
                  fontSize: 22,
                }}
              >
                {data.giaTien}.000
              </p>
              <p>đêm</p>
            </div>
            <div>
              <p className="underline">đánh giá</p>
            </div>
          </div>
        </div>
        {/* đặt phòng */}
        <div>
          <div className="booking_content">
            <div>
              <form action="" onSubmit={handleSubmit}>
                {/* Date */}
                <div className="userBooking mt-2">
                  <div className="grid grid-cols-2 mt-2">
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: "650",
                        paddingLeft: 10,
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
                  <DatePicker.RangePicker
                    className="dateFromTo"
                    style={{
                      color: "red !important",
                      marginTop: 10,
                      padding: 10,
                    }}
                    disabledDate={disabledDate}
                    format="DD-MM-YYYY"
                    onChange={(value, dateString) => {
                      if (
                        dateString &&
                        dateString.length === 2 &&
                        dateString.every(Boolean)
                      ) {
                        const formattedNgayDen = format(
                          parse(dateString[0], "dd-MM-yyyy", new Date()),
                          "yyyy-MM-dd"
                        );
                        const formattedNgayDi = format(
                          parse(dateString[1], "dd-MM-yyyy", new Date()),
                          "yyyy-MM-dd"
                        );

                        setNgayDenVL(formattedNgayDen);
                        setNgayDiVL(formattedNgayDi);

                        const start = parse(
                          dateString[0],
                          "dd-MM-yyyy",
                          new Date()
                        );
                        const end = parse(
                          dateString[1],
                          "dd-MM-yyyy",
                          new Date()
                        );
                        const days = differenceInDays(end, start);
                        setTotalDays(days);
                      } else {
                        setNgayDenVL("");
                        setNgayDiVL("");
                        setTotalDays(0);
                      }
                    }}
                  />
                </div>
                {/* Khách */}
                <div>
                  {/* number */}
                  <div
                    style={{
                      borderRadius: "0 0 10px 10px",
                      border: "1px solid black",
                      borderTop: "none",
                    }}
                  >
                    <label
                      htmlFor="soLuongKhach"
                      className="block"
                      style={{
                        fontSize: 14,
                        fontWeight: "650",
                        padding: 10,
                      }}
                    >
                      KHÁCH
                    </label>
                    <div className="number flex justify-between">
                      <button
                        type="button"
                        className="minus flex items-center justify-center"
                        onClick={handleMinusClick}
                      >
                        <i className="fa-solid fa-minus text-sm text-white" />
                      </button>
                      <div className="flex justify-center">
                        <input
                          className="soLuongKhachBooking"
                          id="soLuongKhach"
                          name="soLuongKhach"
                          type="text"
                          value={`${count} khách`}
                          readOnly
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <button
                        type="button"
                        className="plus flex items-center justify-center"
                        onClick={handlePlusClick}
                      >
                        <i className="fa-solid fa-plus text-sm text-white" />
                      </button>
                    </div>
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
                  className="space-y-1"
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                    padding: "20px 0",
                  }}
                >
                  <div className="flex justify-between">
                    <p>
                      ${data.giaTien}.000 x {totalDays} đêm
                    </p>
                    <p>${totalPrice}.000</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Thuế</p>
                    <p>10%</p>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: "650",
                    }}
                  >
                    Tổng đã có VAT
                  </h3>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: "650",
                    }}
                  >
                    ${totalPriceVAT}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
