import React, { useState } from "react";
import FormTemplate from "../components/FormTemplate";
import { Checkbox, message } from "antd";
import { useForm } from "react-hook-form";
import { roomServ } from "../../api/apiAdmin";
import * as yup from "yup";
import ErrorMessage from "../components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  id: yup.number().required("Vui lòng nhập id"),
  tenPhong: yup.string().required("Vui lòng nhập tên phòng"),
  khach: yup
    .number()
    .typeError("Vui lòng nhập số lượng khách là chữ số")
    .min(0, "Số lượng khách phải lớn hơn hoặc bằng 0")
    .required("Vui lòng nhập số lượng khách"),
  phongNgu: yup
    .number()
    .typeError("Vui lòng nhập số lượng phòng ngủ là chữ số")
    .min(0, "Số lượng phòng ngủ phải lớn hơn hoặc bằng 0")
    .required("Vui lòng nhập số lượng phòng ngủ"),
  giuong: yup
    .number()
    .typeError("Vui lòng nhập số lượng giường là chữ số")
    .min(0, "Số lượng giường phải lớn hơn hoặc bằng 0")
    .required("Vui lòng nhập số lượng giường"),
  phongTam: yup
    .number()
    .typeError("Vui lòng nhập số lượng phòng tắm là chữ số")
    .min(0, "Số lượng phòng tắm phải lớn hơn hoặc bằng 0")
    .required("Vui lòng nhập số lượng phòng tắm"),
  moTa: yup.string().required("Vui lòng nhập mô tả"),
  giaTien: yup
    .number()
    .typeError("Vui lòng nhập giá tiền là chữ số")
    .min(0, "Giá tiền phải lớn hơn hoặc bằng 0")
    .required("Vui lòng nhập giá tiền"),
  mayGiat: yup.boolean().required("Vui lòng nhập máy giặt"),
  banLa: yup.boolean().required("Vui lòng nhập ban la"),
  tivi: yup.boolean().required("Vui lòng nhập tivi"),
  dieuHoa: yup.boolean().required("Vui lòng nhập điều hòa"),
  wifi: yup.boolean().required("Vui lòng nhập wifi"),
  bep: yup.boolean().required("Vui lòng nhập bếp"),
  doXe: yup.boolean().required("Vui lòng nhập đỗ xe"),
  hoBoi: yup.boolean().required("Vui lòng nhập hồ bơi"),
  banUi: yup.boolean().required("Vui lòng nhập bàn ủi"),
  maViTri: yup.number().required("Vui lòng nhập mã vị trí"),
  hinhAnh: yup.string().required("Vui lòng nhập hình ảnh"),
});

const ModalAddRoom = ({ getData }) => {
  let [isOpen, setIsOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      id: 0,
      tenPhong: "",
      khach: null,
      phongNgu: null,
      giuong: null,
      phongTam: null,
      moTa: "",
      giaTien: null,
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: 0,
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

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit = (values) => {
    const formData = new FormData();

    for (let key in values) {
      if (key == "hinhAnh") {
        // Append the image file to FormData
        formData.append("file", values[key]);
      } else {
        // Append other form fields
        formData.append(key, values[key]);
      }
    }
    console.log("FormData:", formData);

    const updateValues = {
      ...values,
      mayGiat: values.mayGiat !== "" ? values.mayGiat : false,
      banLa: values.banLa !== "" ? values.banLa : false,
      tivi: values.tivi !== "" ? values.tivi : false,
      dieuHoa: values.dieuHoa !== "" ? values.dieuHoa : false,
      wifi: values.wifi !== "" ? values.wifi : false,
      bep: values.bep !== "" ? values.bep : false,
      doXe: values.doXe !== "" ? values.doXe : false,
      hoBoi: values.hoBoi !== "" ? values.hoBoi : false,
      banUi: values.banUi !== "" ? values.banUi : false,
    };

    console.log("Request Payload:", updateValues);

    roomServ
      .addRoom(updateValues)
      .then(() => {
        message.success("Thêm phòng thành công");
        getData();
      })
      .catch((err) => {
        message.error("Thêm phòng thất bại");
        console.error("API Error:", err.response.data);
        console.log(err);
      });
    setIsOpen(false);

    roomServ
      .addRoomImage(formData)
      .then((res) => {
        // Handle the response, e.g., get the image URL
        // const imageUrl = res.data.url;
        setImage("");

        // Add the image URL to your form data or use it as needed
        // formData.append("imageUrl", imageUrl);
      })
      .catch((err) => {
        // Handle image upload error
        console.error("Image Upload Error:", err);
      });
  };

  const onChange = (e, fieldName) => {
    setValue(fieldName, e.target.checked);
  };

  const CustomCheckbox = ({ name, title, onchange }) => {
    return (
      <div className="relative z-0 w-full mb-6 group mr-3">
        <Checkbox
          rootClassName="custom-checkbox"
          name={name}
          onChange={(e) => onchange(e, name)}
          className="text-gray-950"
        >
          {title}
        </Checkbox>
      </div>
    );
  };

  const [image, setImage] = useState("");

  return (
    <div>
      <div className="items-center justify-center mb-5">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-red-400 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
        >
          Thêm phòng
        </button>
      </div>
      <FormTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Thêm phòng">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="hidden relative z-0 w-full mb-6 group mr-3">
              <input
                disabled
                type="text"
                name="id"
                className={`block py-2.5 px-0 w-full text-sm text-gray-950 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
                onChange={(e) => setValue("id", e.target.value)}
                {...register("id")}
              />
              <ErrorMessage err={errors.id} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Id
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="tenPhong"
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
                onChange={(e) => setValue("tenPhong", e.target.value)}
                {...register("tenPhong")}
              />
              <ErrorMessage err={errors.tenPhong} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Tên Phòng
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="relative z-0 w-full mb-6 group mr-3">
              <input
                type="number"
                name="khach"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setValue("khach", e.target.value)}
                {...register("khach")}
              />
              <ErrorMessage err={errors.khach} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Khách
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="phongNgu"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setValue("phongNgu", e.target.value)}
                {...register("phongNgu")}
              />
              <ErrorMessage err={errors.phongNgu} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phòng Ngủ
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="relative z-0 w-full mb-6 group mr-3">
              <input
                type="number"
                name="giuong"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setValue("giuong", e.target.value)}
                {...register("giuong")}
              />
              <ErrorMessage err={errors.giuong} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Giường
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="phongTam"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setValue("phongTam", e.target.value)}
                {...register("phongTam")}
              />
              <ErrorMessage err={errors.phongTam} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phòng Tắm
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="relative z-0 w-full mb-6 group mr-3">
              <input
                type="text"
                name="moTa"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setValue("moTa", e.target.value)}
                {...register("moTa")}
              />
              <ErrorMessage err={errors.moTa} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Mô tả
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="giaTien"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setValue("giaTien", e.target.value)}
                {...register("giaTien")}
              />
              <ErrorMessage err={errors.giaTien} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Giá tiền
              </label>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <CustomCheckbox
              name="mayGiat"
              title="Máy giặt"
              onchange={onChange}
            />
            <CustomCheckbox name="banLa" title="Bàn là" onchange={onChange} />
            <CustomCheckbox name="tivi" title="Tivi" onchange={onChange} />
          </div>
          <div className="flex justify-between items-center">
            <CustomCheckbox
              name="dieuHoa"
              title="Điều hòa"
              onchange={onChange}
            />
            <CustomCheckbox name="wifi" title="Wifi" onchange={onChange} />
            <CustomCheckbox name="bep" title="Bếp" onchange={onChange} />
          </div>
          <div className="flex justify-between items-center">
            <CustomCheckbox name="doXe" title="Đỗ xe" onchange={onChange} />
            <CustomCheckbox name="hoBoi" title="Hồ bơi" onchange={onChange} />
            <CustomCheckbox name="banUi" title="Bàn ủi" onchange={onChange} />
          </div>
          <div className="flex justify-between">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="maViTri"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setValue("maViTri", e.target.value)}
                {...register("maViTri")}
              />
              {errors.maViTri && (
                <p className="text-red-500">{errors.maViTri.message}</p>
              )}
              <ErrorMessage err={errors.maViTri} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Mã vị trí
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Hình ảnh
            </label>
            <img className="pt-5" width={300} src={image} alt="" />
            <input
              type="file"
              name="hinhAnh"
              placeholder=" "
              accept="image/*"
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
            <ErrorMessage err={errors.hinhAnh} />
          </div>
          <button
            type="submit"
            className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm phòng
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

export default ModalAddRoom;
