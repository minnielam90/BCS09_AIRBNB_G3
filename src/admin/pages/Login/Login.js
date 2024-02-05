import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./LoginAdmin.css";
import { userServ } from "../../api/apiAdmin";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/adminSlice";
import { userLocalStorage } from "../../api/localServiceAdmin";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { userRoute } from "../../../user/route/userRoute";
import adminRoute from "../../route/adminRoute";

const validationSchema = yup.object().shape({
  email: yup.string().required("Vui lòng điền email"),
  password: yup.string().required("Vui lòng điền mật khẩu"),
});
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = (values) => {
    userServ
      .login(values)
      .then((res) => {
        const response = res.data.content;
        const role = response.user.role;
        if (role === "ADMIN") {
          message.success("Đăng nhập thành công");
          dispatch(setLogin(response));
          userLocalStorage.set(response);

          window.location.href = adminRoute.user.path;
        } else {
          message.error("Tài khoản không có quyền truy cập trang quản trị!");
        }
      })
      .catch((err) => {
        message.error("Tài khoản hoặc mật khẩu không đúng!");
      });
  };

  const user = userLocalStorage.get()?.user;

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      navigate(userRoute.home.path);
    } else if (user && user.role === "ADMIN") {
      navigate(adminRoute.home.path);
    }
  }, [user, navigate]);

  return (
    !user && (
      <>
        <div className="form-content flex justify-center">
          <div className="container space-y-10">
            <h1>Đăng nhập Quản trị viên</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-0 w-full mb-12 group mt-5">
                <input
                  autoComplete="off"
                  type="text"
                  name="email"
                  className={`block py-2.5 px-1 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=""
                  onChange={(e) => setValue("email", e.target.value)}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email
                </label>
              </div>
              <div className="relative z-0 w-full mb-10 group mt-5">
                <input
                  type="password"
                  name="password"
                  className={`block py-2.5 px-1 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=""
                  onChange={(e) => setValue("password", e.target.value)}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 -top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Mật khẩu
                </label>
              </div>
              <button
                type="submit"
                className="border-2 border-white rounded-full text-white w-full py-3"
              >
                Đăng nhập
              </button>
            </form>

            {/* Link to the home page */}
            <p className="mt-4 text-white text-center">
              Bạn không phải là quản trị viên?{" "}
              <Link to={userRoute.home.path} className="text-blue-500">
                Trở về trang chủ
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  );
}
