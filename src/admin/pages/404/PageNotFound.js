import React from "react";
import adminRoute from "../../route/adminRoute";
import "./PageNotFound.css";
import { userRoute } from "../../../user/route/userRoute";

const PageNotFound = () => {
  return (
    <div>
      <section className="page_404">
        <div className="w-full">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <h1 className="text-center font-bold text-red-500">Page 404</h1>
                <div className="four_zero_four_bg"></div>
                <div className="contant_box_404">
                  <h3>Có vẻ như bạn đã đi lạc rồi</h3>
                  <p>Trang này không tồn tại!</p>
                  <div className="space-x-3">
                    <a href={adminRoute.home.path} className="link_404 rounded">
                      Về trang admin
                    </a>
                    <a href={userRoute.home.path} className="link_404 rounded">
                      Về trang chủ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
