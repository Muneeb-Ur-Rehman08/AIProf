import { useEffect } from 'react';
import { useUserConversation } from '../../context/UserConversationContext';
import { generateTitleUsingCompromise } from '../../../comon.lib';
import _ from 'lodash';

const ListingHistory = ({ setSelectedConversation }) => {
    const userConversationContext = useUserConversation();
    const { conversations, fetchHistory } = userConversationContext;

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div
            className="overflow-auto flex-grow-1 mb-3 listing-history"
            style={{ maxHeight: "60vh" }}
        >
            {conversations && _.isArray(conversations) && conversations?.length > 0 && conversations?.map((item, index) => (
                <>
                    <div className="text-muted mb-1">{item?.created_at}</div>
                    <button
                        className="btn text-start text-white p-2 mb-2 w-100 d-flex justify-content-between"
                        style={{ background: "#3f3f41", borderRadius: "8px" }}
                        onClick={() => {
                            setSelectedConversation(item);
                        }}
                    >
                        <span>{generateTitleUsingCompromise(item?.title || item?.messages[0]?.prompt)}</span>
                    </button>
                </>
            ))}
        </div>
    );
}

export default ListingHistory;