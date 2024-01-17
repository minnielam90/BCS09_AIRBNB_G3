import * as Yup from "yup";
export const validationUser = Yup.object({
  birthday: Yup.string().required("Vui lòng không bỏ trống thông tin"),
  name: Yup.string().required("Vui lòng không bỏ trống thông tin"),
  phone: Yup.string()
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Vui lòng nhập đúng định dạng số điện thoại"
    )
    .required("Vui lòng không bỏ trống"),
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng không bỏ trống"),
  password: Yup.string().required("Vui lòng không bỏ trống thông tin"),
  gender: Yup.string().required("Vui lòng không bỏ trống thông tin"),
});
