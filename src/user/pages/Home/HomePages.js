import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./homePage.css";
import { getLocation, itemKS } from "../../api/apiUser";
import { NavLink } from "react-router-dom";
const contentStyle = {
  height: "30px",
  color: "gray",
  lineHeight: "30px",
  textAlign: "center",
};
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-['']`}
      style={{
        ...style,
        display: "block",
        insetInlineEnd: "0px",
        fontSize: 15,
        color: "gray",
        marginTop: "-20px",
      }}
      onClick={onClick}
    >
      <i
        className="fa-solid fa-angle-right"
        style={{
          borderRadius: "100%",
          border: "1px solid gray",
          padding: "2px 5px",
        }}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-['']`}
      style={{
        ...style,
        display: "block",
        insetInlineStart: "0px",
        zIndex: 2,
        fontSize: 15,
        color: "gray",
        marginTop: "-20px",
      }}
      onClick={onClick}
    >
      <i
        className="fa-solid fa-angle-left"
        style={{
          borderRadius: "100%",
          border: "1px solid gray",
          padding: "2px 5px",
        }}
      />
    </div>
  );
}
const HomePages = () => {
  const setting = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: false,
    speed: "500",
  };
  const [listItem, setListItem] = useState([]);
  useEffect(() => {
    itemKS
      .getAllItem()
      .then((res) => {
        console.log(res)
        setListItem(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [location, setLocation] = useState([]);
  useEffect(() => {
    getLocation
      .getLocation()
      .then((res) => {
        // console.log(res)
        setLocation(res.data.content.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="mt-16 mb-6">
        <Carousel {...setting}>
          {location.map((item, index) => {
            return (
              <div className="item_nav">
                <img
                  src={item.hinhAnh}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 200,
                    height: 100,
                    borderRadius: 20,
                  }}
                />
                <h3 style={contentStyle}>{item.tenViTri}</h3>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-4">
          {listItem.map((item, index) => {
            return (
              <NavLink to={`./detailItem/${item.id}`}>
                <div className="content_item" key={index}>
                  <img src={item.hinhAnh} alt="" />
                  <i class="fa-regular fa-heart"></i>
                  <h4>{item.tenPhong}</h4>
                  <p>
                    <span>${item.giaTien}</span> đêm
                  </p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePages;
