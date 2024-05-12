import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const onTransaction = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      {
        cart,
        paymentID,
        address,
      },
      { headers: { Authorization: token, "Content-Type": "application/json" } }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return <div className="text-2xl text-center">Cart Empty</div>;

  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />
          <div className="box-detail">
            <div className="text-4xl font-bold text-blue-600 tracking-wide">
              {product.title}
            </div>
            <div className="text-sm font-bold">#ID: {product.product_id}</div>

            <div className="text-2xl">${product.price * product.quantity}</div>
            <p>{product.description}</p>
            <p>{product.context}</p>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div
              className="delete"
              onClick={() => {
                removeProduct(product._id);
              }}
            >
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <div className="text-2xl text-red-700 font-bold">Total: $ {total}</div>
        {/* <PaypalButton total={total} tranSuccess={tranSuccess} /> */}
        {total && (
          <PayPalScriptProvider
            options={initialOptions}
            clientId="Ab4weP1KINtDasQ3ZrMZN92bg26ZLOOiIfeS4WaTDv0tmJay1A4_Ti8TDY7H3JUOX2ztceiVWjIDSJaj"
          >
            <PaypalButton total={total} onTransaction={onTransaction} />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );
}

export default Cart;
