import React, { useEffect, useState } from 'react'
import { detailRoom } from '../../api/apiUser';

const DetailItem = () => {
    const [listItem, setListItem] = useState([]);
  useEffect(() => {
    detailRoom
      .getRoomDetail()
      .then((res) => {
        console.log(res)
        setListItem(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
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
  )
}

export default DetailItem