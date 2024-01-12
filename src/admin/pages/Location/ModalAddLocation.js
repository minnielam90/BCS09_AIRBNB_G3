import React, { useState } from "react";
import FormTemplate from "../components/FormTemplate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import * as yup from "yup";
import { locationServ } from "../../api/apiAdmin";

const validationSchema = yup.object().shape({
  id: yup.number().required("Vui lòng nhập id"),
  tenVitri: yup.string().required("Vui lòng nhập vị trí"),
  tinhThanh: yup.string().required("Vui lòng nhập tỉnh thành"),
  quocGia: yup.string().required("Vui lòng nhập quốc gia"),
  hinhAnh: yup.string().required("Vui lòng nhập hình ảnh"),
});

const ModalAddLocation = ({ getData }) => {
  let [isOpen, setIsOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      id: 0,
      tenVitri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = methods;
  function closeModal() {
    setIsOpen(false);
  }

  // const onSubmit = (values) => {
  //   const formData = new FormData();
  //   for (let key in values) {
  //     if (key == "hinhAnh") {
  //       formData.append("File", values[key]);
  //     } else {
  //       formData.append(key, values[key]);
  //     }
  //   }

  //   locationServ
  //     .addLocation(values)
  //     .then(() => {
  //       getData();
  //       message.success("Thêm vị trí thành công");
  //     })
  //     .catch((err) => {
  //       message.error("Thêm vị trí thất bại");
  //       console.log(err);
  //     });
  //   setIsOpen(false);
  // };

  const onSubmit = async (values) => {
    try {
      const locationData = {
        id: values.id,
        tenVitri: values.tenVitri,
        tinhThanh: values.tinhThanh,
        quocGia: values.quocGia,
      };

      // Call addLocation API
      await locationServ.addLocation(locationData);

      // Display success message
      message.success("Thêm vị trí thành công");

      // Refresh data
      getData();

      // Check if there is an image to upload
      if (values.hinhAnh) {
        const formData = new FormData();
        formData.append("hinhAnh", values.hinhAnh);

        // Call addLocationImage API
        await locationServ.addLocationImage(formData);
      }

      // Close the modal
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      message.error("Thêm vị trí thất bại");
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [image, setImage] = useState("");

  return (
    <div>
      <div className="items-center justify-center mb-5">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-red-400 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
        >
          Thêm vị trí
        </button>
      </div>
      <FormTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Thêm vị trí">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden relative z-0 w-full mb-6 group mr-3">
            <input
              disabled
              type="number"
              name="id"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("id", e.target.value)}
              {...register("id")}
            />
            {errors.id && <p className="text-red-500">{errors.id.message}</p>}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Id
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="tenVitri"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("tenVitri", e.target.value)}
              {...register("tenVitri")}
            />
            {errors.tenVitri && (
              <p className="text-red-500">{errors.tenVitri.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tên vị trí
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="tinhThanh"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("tinhThanh", e.target.value)}
              {...register("tinhThanh")}
            />
            {errors.tinhThanh && (
              <p className="text-red-500">{errors.tinhThanh.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tỉnh thành
            </label>
          </div>{" "}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="quocGia"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("quocGia", e.target.value)}
              {...register("quocGia")}
            />
            {errors.quocGia && (
              <p className="text-red-500">{errors.quocGia.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Quốc gia
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <img width={300} src={image} alt="" />
            <input
              type="file"
              name="hinhAnh"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              accept="image/*"
              // onChange={(e) => setValue("hinhAnh", e.target.value)}
              // {...register("hinhAnh")}
              onChange={(event) => {
                // lấy dữu liệu về file được gửi lên
                // console.log(event.target.files[0]);
                const img = event.target.files[0];
                console.log(img);
                // tạo ra 1 đường dẫn cho tấm hình và lưu trữ vào state
                if (img) {
                  const urlImg = URL.createObjectURL(img);
                  console.log(urlImg);
                  setImage(urlImg);
                }
                setValue("hinhAnh", img);
              }}
            />
            {errors.hinhAnh && (
              <p className="text-red-500">{errors.hinhAnh.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Hình ảnh
            </label>
          </div>
          <button
            type="submit"
            className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm vị trí
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

export default ModalAddLocation;
