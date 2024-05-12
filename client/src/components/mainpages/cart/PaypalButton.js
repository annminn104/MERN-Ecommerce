import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useCallback } from "react";

export function PaypalButton({ total, onTransaction }) {
  const [{ isPending }] = usePayPalScriptReducer();

  const onCreateOrder = useCallback(
    (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: `${total}`,
              },
            },
          ],
        })
        .then((orderID) => {
          return orderID;
        });
    },
    [total]
  );

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const shipping = details?.purchase_units[0]?.shipping;
      details && onTransaction({ paymentID: details?.id, address: shipping });
    });
  };

  return (
    <>
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={onCreateOrder}
          onApprove={onApproveOrder}
          forceReRender={[total]}
        />
      )}
    </>
  );
}
export default PaypalButton;
