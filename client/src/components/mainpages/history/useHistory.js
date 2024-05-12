import { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

const useHistory = () => {
    const state = useContext(GlobalState);
    const [history, setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get("/api/payment", {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                } else {
                    const res = await axios.get("/user/history", {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                }
            };
            getHistory();
        }
    }, [token, isAdmin, setHistory]);
    return {
        history,
    };
};

export default useHistory;

