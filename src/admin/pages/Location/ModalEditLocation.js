import React, { useEffect, useState } from "react";
import FormTemplate from "../components/FormTemplate";
import { message } from "antd";
import { locationServ } from "../../api/apiAdmin";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const validationSchema = yup.object().shape({
  tenViTri: yup.string().required("Vui lòng nhập vị trí"),
  tinhThanh: yup.string().required("Vui lòng nhập tỉnh thành"),
  quocGia: yup.string().required("Vui lòng nhập quốc gia"),
  hinhAnh: yup.string().required("Vui lòng nhập hình ảnh"),
});

const ModalEditLocation = ({ setIsOpen, isOpen, editData, getData }) => {
  const methods = useForm({
    defaultValues: {
      tenViTri: "",
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
    reset,
  } = methods;

  function closeModal() {
    setIsOpen(false);
  }

  const { id } = editData;

  const handleUpdateImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Upload the image
      const imageResponse = await locationServ.changeImageLocation(
        id,
        formData
      );

      const imageUrl = imageResponse.data.url;

      // Update the room details with the new image URL
      setValue("hinhAnh", imageUrl);

      message.success("Cập nhật hình ảnh thành công");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // Handle 403 error (Forbidden)
        message.warning("Không có quyền cập nhật hình ảnh");
      } else {
        message.success("Hãy reload trang để hình ảnh được cập nhật");
      }
    }
  };

  const onSubmit = (values) => {
    locationServ
      .editLocation(id, values)
      .then(() => {
        message.success("Cập nhật vị trí thành công");
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        setIsOpen(false);
        if (err.response && err.response.status === 403) {
          // Handle 403 error (Forbidden)
          message.warning("Không có quyền cập nhật vị trí");
        } else message.error("Cập nhật vị trí thất bại");
      });
  };

  useEffect(() => {
    if (editData) {
      reset({
        tenViTri: editData.tenViTri,
        tinhThanh: editData.tinhThanh,
        quocGia: editData.quocGia,
        hinhAnh: editData.hinhAnh,
      });
    }
  }, [editData, reset]);

  const [image, setImage] = useState("");

  return (
    <div>
      <FormTemplate
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Cập nhật vị trí"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="tenViTri"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              onChange={(e) => setValue("tenViTri", e.target.value)}
              {...register("tenViTri")}
            />
            {errors.tenViTri && (
              <p className="text-red-500">{errors.tenViTri.message}</p>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tên vị trí
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="tinhThanh"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="quocGia"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          <div className="relative z-0 w-full mb-6 group flex items-center">
            <img width={300} src={image || editData.hinhAnh} alt="" />
            <div className="flex flex-col ml-4">
              <button
                type="button"
                className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleUpdateImage}
                style={{ marginTop: "10px" }}
              >
                Cập nhật hình ảnh
              </button>
              <input
                type="file"
                name="hinhAnh"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  let file = e.target.files[0];

                  if (file) {
                    const urlImg = URL.createObjectURL(file);
                    console.log(urlImg);
                    setImage(urlImg);
                  }
                  locationServ.changeImageLocation(editData.id, file);
                  setValue("hinhAnh", file);
                }}
              />
              {errors.hinhAnh && (
                <p className="text-red-500">{errors.hinhAnh.message}</p>
              )}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Hình ảnh
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật vị trí
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

export default ModalEditLocation;
