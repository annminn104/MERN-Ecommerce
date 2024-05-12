import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHistory from "./useHistory";

function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState([]);
    const params = useParams();
    const { history } = useHistory();

    useEffect(() => {
        if (params.id) {
            history.forEach((item) => {
                if (item._id === params.id) setOrderDetails(item);
            });
        }
    }, [params.id, history]);

    if (orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails?.address && (
                        <tr>
                            <td>{orderDetails?.address?.name?.full_name || "---"}</td>
                            <td>{(orderDetails?.address?.address?.address_line_1 || "---") + ", " + (orderDetails?.address?.address?.admin_area_2 || "---") + ", " + (orderDetails?.address?.address?.admin_area_1 || "---")}</td>
                            <td>{orderDetails?.address?.address?.postal_code || "---"}</td>
                            <td>{orderDetails?.address?.address?.country_code || "---"}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <table style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.cart.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img src={item.images.url} alt="" />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderDetails;
