import { DeleteOutlined } from "@ant-design/icons";
import { Button, Radio, Skeleton } from "antd";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeItem, deleteItem } from "../../../../store/CartSlice/cartSlice";

import style from "../../style.module.css";
import CartItemCotent from "./component/cartiItemContent";
function CartItem({ item, index, cartError, setCartError }) {
  const [cartItem, setCartItem] = useState();
  const [error, setError] = useState(false);
  const disPatch = useDispatch();

  useEffect(() => {
    setCartItem(item);

    if (item.info.type.includes("trang phục") && item.size === undefined) {
      setError(true);
      if (!cartError.includes(item.cartId)) {
        setCartError((prv) => [...prv, item.cartId]);
      }
    } else if (item.type === "souvenir" && item.souvenirOption === undefined) {
      setError(true);
      if (!cartError.includes(item.cartId)) {
        setCartError((prv) => [...prv, item.cartId]);
      }
    } else {
      if (cartError.includes(item.cartId)) {
        setCartError((prv) => prv.filter((id) => id !== item.cartId));
      }
    }
  }, [item, error]);

  useEffect(() => {
    if (cartItem !== undefined) {
      disPatch(changeItem({ index, item: cartItem }));
    }
  }, [cartItem]);

  return (
    <>
      <div className={style.cartItem}>
        <Link to={`/post/item${item.id}`} className={style.cartItemImgWrapper}>
          <img
            src={
              item.souvenirOption !== undefined
                ? item.info.img[item.souvenirOption]
                : item.img
            }
            alt="item image"
          ></img>
        </Link>
        <CartItemCotent
          type={item.type}
          item={item}
          setCart={setCartItem}
          cart={cartItem}
          error={error}
        />
        <Button
          onClick={() => disPatch(deleteItem(item.cartId))}
          className={style.deleteBtn}
          type="primary"
          danger
        >
          <DeleteOutlined />
        </Button>
      </div>
    </>
  );
}
export default memo(CartItem);
