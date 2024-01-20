import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormTemplate from "../components/FormTemplate";
import { DatePicker, message } from "antd";
import * as yup from "yup";
import { bookingRoomServ } from "../../api/apiAdmin";

const validationSchema = yup.object().shape({
  maPhong: yup.string().required("Vui lòng nhập mã phòng"),
  ngayDen: yup.string().required("Vui lòng nhập ngày đến"),
  ngayDi: yup.string().required("Vui lòng nhập ngày đi "),
  soLuongKhach: yup.string().required("Vui lòng nhập số lượng khách"),
  maNguoiDung: yup.string().required("Vui lòng nhập mã người dùng"),
});

const ModalEditBooking = ({ setIsOpen, isOpen, editData, getData }) => {
  const methods = useForm({
    defaultValues: {
      maPhong: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
      maNguoiDung: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    trigger,
  } = methods;
  function closeModal() {
    setIsOpen(false);
  }
  const { id } = editData;
  const onSubmit = (values) => {
    const roomData = {
      ...values,
      id,
      ngayDen: dayjs(values.ngayDen).format(),
      ngayDi: dayjs(values.ngayDi).format(),
    };
    bookingRoomServ
      .editBookingRoom(id, roomData)
      .then((res) => {
        setIsOpen(false);
        message.success("Cập nhật thành công");
        getData();
      })
      .catch((err) => {
        message.error("Cập nhật thất bại");
        setIsOpen(false);
      });
  };

  const handleDate = (dateTarget, date) => {
    let convertDate = dayjs(date).isValid()
      ? dayjs(date).startOf("day").format()
      : "";
    setValue(dateTarget, convertDate);
    trigger(dateTarget);
  };

  useEffect(() => {
    if (editData) {
      reset({
        maPhong: editData.maPhong,
        ngayDen: editData.ngayDen,
        ngayDi: editData.ngayDi,
        soLuongKhach: editData.soLuongKhach,
        maNguoiDung: editData.maNguoiDung,
      });
    }
  }, [editData, reset]);

  return (
    <div>
      <FormTemplate
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Cập nhật đặt phòng"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="modal-booking">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="maPhong"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("maPhong", e.target.value)}
              {...register("maPhong")}
            />
            {errors.maPhong && (
              <p className="text-red-500">{errors.maPhong.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Mã phòng
            </label>
          </div>
          <div className="flex w-full relative">
            <div className=" z-0 w-full mb-6 group flex">
              <div className="flex w-full flex-col mr-3 ">
                <div className="date-picker-booking">
                  <DatePicker
                    defaultValue={dayjs(editData.ngayDen)}
                    name="ngayDen"
                    onChange={(date, dateString) => {
                      handleDate("ngayDen", date);
                    }}
                    className="w-full mt-5"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                {errors.ngayDen && (
                  <p className="text-red-500">{errors.ngayDen.message}</p>
                )}
              </div>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ngày đến
              </label>
            </div>
            <div className=" z-0 w-full mb-6 group flex">
              <div className="flex w-full flex-col">
                <div className="date-picker-booking">
                  <DatePicker
                    defaultValue={dayjs(editData.ngayDi)}
                    name="ngayDi"
                    onChange={(date, dateString) => handleDate("ngayDi", date)}
                    className="w-full mt-5"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                {errors.ngayDi && (
                  <p className="text-red-500">{errors.ngayDi.message}</p>
                )}
              </div>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Ngày đi
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="soLuongKhach"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setValue("soLuongKhach", e.target.value)}
              {...register("soLuongKhach")}
            />
            {errors.soLuongKhach && (
              <p className="text-red-500">{errors.soLuongKhach.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Số lượng khách
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="maNguoiDung"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setValue("maNguoiDung", e.target.value)}
              {...register("maNguoiDung")}
            />
            {errors.maNguoiDung && (
              <p className="text-red-500">{errors.maNguoiDung.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Mã người dùng
            </label>
          </div>
          <button
            type="submit"
            className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Đóng
          </button>
        </form>
      </FormTemplate>
    </div>
  );
};

export default ModalEditBooking;
