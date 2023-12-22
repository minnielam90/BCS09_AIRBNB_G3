import React, { useState } from "react";
import FormTemplate from "../components/FormTemplate";

const ModalAddLocation = () => {
  let [isOpen, setIsOpen] = useState(false);

  // const methods = useForm({
  //   defaultValues: {
  //     id: 0,
  //     tenVitri: "",
  //     tinhThanh: "",
  //     quocGia: "",
  //     hinhAnh: "",
  //   },
  //   resolver: yupResolver(validationSchema),
  // });

  // const {
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  //   register,
  // } = methods;
  // function closeModal() {
  //   setIsOpen(false);
  // }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
      <FormTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Thêm phòng">
        <form
        // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between">
            <div className="hidden relative z-0 w-full mb-6 group mr-3">
              <input
                disabled
                type="number"
                name="id"
                className={`block py-2.5 px-0 w-full text-sm text-gray-950 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
                // onChange={(e) => setValue("id", e.target.value)}
                // {...register("id")}
              />
              {/* <ErrorMessage err={errors.id} /> */}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Id
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="tenViTri"
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
                // onChange={(e) => setValue("tenPhong", e.target.value)}
                // {...register("tenPhong")}
              />
              {/* <ErrorMessage err={errors.tenPhong} /> */}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Tên vị trí
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="relative z-0 w-full mb-6 group mr-3">
              <input
                type="text"
                name="tinhThanh"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // onChange={(e) => setValue("khach", e.target.value)}
                // {...register("khach")}
              />
              {/* <ErrorMessage err={errors.khach} /> */}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Tỉnh thành
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="quocGia"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // onChange={(e) => setValue("phongNgu", e.target.value)}
                // {...register("phongNgu")}
              />
              {/* <ErrorMessage err={errors.phongNgu} /> */}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Quốc gia
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              name="hinhAnh"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // onChange={(e) => setValue("hinhAnh", e.target.value)}
              // {...register("hinhAnh")}
            />
            {/* <ErrorMessage err={errors.hinhAnh} /> */}
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
