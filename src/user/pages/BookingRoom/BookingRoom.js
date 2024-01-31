import { Button, Modal, notification } from "antd";
import { addDays, differenceInDays } from "date-fns";
import React, { useMemo, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import Calendar from "../../components/Calendar/Calendar";
import { formattedDate } from "../../utils/dateUser";
import { roomServ } from "../../api/apiUser";
import { useSelector } from "react-redux";
import { POPUP_NAME, usePopup } from "../../components/Popup/hook/usePopup";
import dayjs from "dayjs";

const BookingRoom = ({ data }) => {
  console.log("Data prop:", data);
  const { giaTien, khach, id } = data || {};
  const { user } = useSelector((state) => state.userSlice?.user) || {};
  const popup = usePopup();

  const [guest, setGuest] = useState(0);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  const totalDays = useMemo(
    () => differenceInDays(dates?.[0]?.endDate, dates?.[0]?.startDate),
    [dates]
  );

  const totalPrice = useMemo(() => giaTien * totalDays, [giaTien, totalDays]);

  console.log("khach:", khach);

  const handleCountGuest = (type) => {
    console.log("Inside handleCountGuest", type);
    if (type === "plus") {
      //   if (guest < khach) {
      //     setGuest((prev) => prev + 1);
      //   }
      if (guest < khach) {
        setGuest((prev) => {
          console.log("Setting guest to:", prev + 1);
          return prev + 1;
        });
      }
      return;
    }
    // if (guest > 0) {
    //   setGuest((prev) => prev - 1);
    // }
    if (guest > 0) {
      setGuest((prev) => {
        console.log("Setting guest to:", prev - 1);
        return prev - 1;
      });
    }
  };

  const handleTogglePopup = () => {
    setToggleCalendar(!toggleCalendar);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (user?.id && guest) {
      try {
        const res = await roomServ.postBookingRoom({
          maPhong: id,
          ngayDen: dayjs(dates?.[0]?.startDate).add(7, "hours").format(),
          ngayDi: dayjs(dates?.[0]?.endDate).add(7, "hours").format(),
          soLuongKhach: guest,
          maNguoiDung: user?.id,
        });
        if (res.status === 201) {
          notification.success({
            message: "Đặt phòng thành công",
          });
          setGuest(0);
        }
      } catch (error) {
        notification.error({
          message: "Đặt phòng thất bại.",
        });
        throw error;
      }
    } else {
      popup.open(POPUP_NAME.LOGIN);
    }
  };

  return (
    <div className="booking w-full">
      <div className="sticky_class sticky top-28">
        <div className="box bg-white shadow-xl border rounded-xl p-6 w-full mx-auto">
          <div className="relative w-full">
            <div className="info_booking flex justify-between items-center mb-4">
              <div>
                <span>$ </span>
                <span className="text-xl font-semibold">{giaTien}</span>
                <span className="text-base"> / đêm</span>
              </div>
              <div>
                <span className="text-sm font-normal">
                  <StarFilled /> 5
                </span>
                {" - "}
                <span className="rating underline text-sm font-normal tracking-widest mx-1">
                  98 đánh giá
                </span>
              </div>
            </div>
            <div className="calendar flex flex-col border border-solid border-gray-400 rounded-md">
              <div
                onClick={handleTogglePopup}
                className="calendar_box flex w-full border-b border-solid border-gray-400"
              >
                <div className="date_left border-r border-solid border-gray-400 rounded-tl-md w-full p-2 cursor-pointer hover:bg-gray-100">
                  <div className="text-xs uppercase font-semibold">
                    Nhận phòng
                  </div>
                  <div className="m-1">
                    {formattedDate(dates?.[0]?.startDate)}
                  </div>
                </div>
                <div className="date_right rounded-tr-md w-full p-2 cursor-pointer hover:bg-gray-100">
                  <div className="text-xs uppercase font-semibold">
                    Trả phòng
                  </div>
                  <div className="m-1">
                    {formattedDate(dates?.[0]?.endDate)}
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className="guest uppercase text-xs font-semibold">
                  Khách
                </div>
                <div className="action flex justify-between items-center m-1">
                  <Button
                    className="button_book w-8 flex items-center justify-center h-8  disabled:bg-gray-300 bg-red-500 hover:bg-red-400 duration-200 rounded-xl text-white cursor-pointer"
                    disabled={guest === 0}
                    // onClick={() => handleCountGuest("minus")}
                    onClick={() => {
                      console.log("Minus Button Clicked");
                      handleCountGuest("minus");
                    }}
                  >
                    -
                  </Button>
                  <div>{guest || 0} khách</div>
                  <Button
                    disabled={guest >= khach}
                    // onClick={() => handleCountGuest("plus")}
                    onClick={() => {
                      console.log("Plus Button Clicked");
                      handleCountGuest("plus");
                    }}
                    className="button_book w-8 flex items-center justify-center h-8  disabled:bg-gray-300 bg-red-500 hover:bg-red-400 duration-200 rounded-xl text-white cursor-pointer"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="booking-button w-full disabled:bg-[linear-gradient(to_right,#d7d2cc_0%,#304352_100%)] bg-[linear-gradient(to_right,_rgb(230,30,77)0%,rgb(227,28,95)50%,rgb(215,4,102)100%)] py-3  mt-3 rounded-lg text-white text-lg font-semibold"
              disabled={!guest}
              //   onClick={handleBooking}
              onClick={() => {
                console.log("Booking Button Clicked");
                handleBooking();
              }}
            >
              Đặt phòng
            </button>
            <div className="border-b">
              <div className="price_item flex justify-between py-1 text-base">
                <div className="price_item_detail underline text-gray-600">
                  $ {giaTien} x {totalDays} đêm
                </div>
                <div>{totalPrice} $</div>
              </div>
              <div className="price_item flex justify-between py-1 text-base">
                <div className="price_item_detail underline text-gray-600">
                  Phí dịch vụ
                </div>
                <div>0 $</div>
              </div>
            </div>
            <div className="total_price flex justify-between items-center text-lg font-semibold pt-3">
              <div>Tổng trước thuế</div>
              <div>{totalPrice} $</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="!w-max"
        open={toggleCalendar}
        onCancel={handleTogglePopup}
        onOk={handleTogglePopup}
        okType="danger"
        centered
      >
        <Calendar dates={dates} setDates={setDates} />
      </Modal>
    </div>
  );
};

export default React.memo(BookingRoom);
