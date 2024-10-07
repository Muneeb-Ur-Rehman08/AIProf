import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../../../comon.lib';
const ListingHistory = () => {
    const [history, setHistory] = useState([]);

    const userData = getUser();

    useEffect(() => {
        if (userData?.user?.id) {
        const fetchHistory = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/conversations`, {
                params: {
                    user_id: userData?.user?.id
                }
            });
            if (response?.data?.code == 0) {
                setHistory(response?.data?.result);
            }
        };
        fetchHistory();
        }
    }, []);

    return (
        <div
            className="overflow-auto flex-grow-1 mb-3 listing-history"
            style={{ maxHeight: "60vh" }}
          >
            <div className="text-muted mb-1">Today</div>
            <button
              className="btn text-start text-white p-2 mb-2 w-100 d-flex justify-content-between"
              style={{ background: "#3f3f41", borderRadius: "8px" }}
            >
              <span>Supabase Auth in Nodejs</span>
            </button>
            <button
              className="btn text-start text-white p-2 mb-2 w-100 d-flex justify-content-between"
              style={{ background: "#3f3f41", borderRadius: "8px" }}
            >
              <span>सुनने की बातचीत</span>
            </button>
            <div className="text-muted mb-1">Yesterday</div>
            <button
              className="btn text-start text-white p-2 mb-2 w-100 d-flex justify-content-between"
              style={{ background: "#3f3f41", borderRadius: "8px" }}
            >
              <span>Only Thing Summary</span>
            </button>
            <button
              className="btn text-start text-white p-2 mb-2 w-100 d-flex justify-content-between"
              style={{ background: "#3f3f41", borderRadius: "8px" }}
            >
              <span>Gracias</span>
            </button>
          </div>
    )
}

export default ListingHistory;