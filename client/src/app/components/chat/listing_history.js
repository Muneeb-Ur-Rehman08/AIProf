import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../../../comon.lib';
const ListingHistory = ({setSelectedConversation}) => {
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
            {history.map((item, index) => (
              <>
            <div className="text-muted mb-1">{item.created_at}</div>
            <button
              className="btn text-start text-white p-2 mb-2 w-100 d-flex justify-content-between"
              style={{ background: "#3f3f41", borderRadius: "8px" }}
                onClick={() => {
                  setSelectedConversation(item);
                }}
            >
              <span>{item.title}</span>
            </button>
            </>
            ))}
          </div>
    )
}

export default ListingHistory;