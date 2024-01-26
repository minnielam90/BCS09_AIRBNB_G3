import React from "react";
import "./footer.css";
import "./responsiteFooter.css";
const Footer = () => {
  return (
    <div className="bg-gray-100">
      <div className="container">
        <footer>
          <div className="w-full">
            <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900">
                  Hỗ trợ
                </h2>
                <ul className="text-gray-500 ">
                  <li className="mb-4">
                    <a href="#" className=" hover:underline">
                      Trung tâm trợ giúp
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      AirCover
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Thông tim an toàn
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Hỗ trợ người khuyết tật
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Các tùy chọn hủy
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Báo cáo lo ngại của hàng xóm
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900">
                  Cộng đồng
                </h2>
                <ul className="text-gray-500 ">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Airbnb.org: nhà ở cứu trợ
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Hỗ trợ dân tị nạn Afghanistan
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Chống phân biệt đối xử
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900">
                  Đón tiếp khách
                </h2>
                <ul className="text-gray-500 ">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Thử đón tiếp khách
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      AirCover cho Chủ nhà
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Xem tài nguyên đón tiếp khách
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Truy cập diễn đàn cộng đồng
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Đón tiếp khách có trách nhiệm
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900">
                  Airbnb
                </h2>
                <ul className="text-gray-500">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Trang tin tức
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Tìm hiểu các tính năng mới
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Thư ngỏ từ các nhà sáng lập
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Cơ hội nghề nghiệp
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Nhà đầu tư
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div className="px-4 py-2 bg-white  md:flex md:items-center md:justify-between footer">
        <div className="container flex justify-between items-center footerBot">
          <span className="text-sm text-gray-500 sm:text-center space-x-4 userFooter">
            <span>© 2022 Airbnb, Inc.</span>
            <button>Quyền riêng tư</button>
            <span className="spanUserFooter">.</span>
            <button>Điều khoản</button>
            <span className="spanUserFooter">.</span>
            <button>Sơ đồ trang web</button>
            <span className="spanUserFooter">.</span>
          </span>
          <div className="text-gray-500">Hỗ trợ tài nguyên</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
