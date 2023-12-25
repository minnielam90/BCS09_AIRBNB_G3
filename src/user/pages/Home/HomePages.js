import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./homePage.css";
import { itemKS } from "../../api/apiUser";
const contentStyle = {
  // marginLeft: '5px',
  height: "30px",
  color: "gray",
  lineHeight: "30px",
  textAlign: "center",
  // background: "#364d79",
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
        setListItem(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="mt-16 mb-6">
        <Carousel {...setting}>
          <div className="item_nav">
            <img
              src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"
              width={25}
              height={25}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h3 style={contentStyle}>Thật ấn tượng</h3>
          </div>
          <div className="item_nav">
            <img
              src="https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg"
              width={25}
              height={25}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h3 style={contentStyle}>Công viên quốc gia</h3>
          </div>
          <div className="item_nav">
            <img
              src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"
              width={25}
              height={25}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h3 style={contentStyle}>Hồ bơi tuyệt vời</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Đảo</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Bãi biển</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Nhà nhỏ</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Thiết kế</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Bắc cực</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Cabin</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Ven hồ</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Chơi golf</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Khung cảnh tuyệt vời</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Hang động</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Lướt sóng</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Khung nhà chữ A</h3>
          </div>
          <div className="item_nav">
            <img
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg"
              width={25}
              height={25}
            />
            <h3 style={contentStyle}>Nhà dưới lòng đất</h3>
          </div>
        </Carousel>
      </div>
      <div>
        {listItem.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.hinhAnh} alt="" />
              <h4></h4>
              <p></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePages;
