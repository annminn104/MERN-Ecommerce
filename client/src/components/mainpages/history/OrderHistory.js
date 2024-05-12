import React from "react";
import { Link } from "react-router-dom";
import useHistory from "./useHistory";

function OrderHistory() {
    const { history } = useHistory();

    return (
        <div className="history-page">
            <div className="text-2xl uppercase text-center font-bold tracking-wide">History</div>
            <div className="text-xl uppercase text-center tracking-wide">You have {history.length} ordered </div>
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((items) => (
                        <tr key={items._id}>
                            <td>{items.paymentID}</td>
                            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/history/${items._id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderHistory;
