import { useEffect, useState } from "react";
import { useUserConversation } from "../../context/UserConversationContext";
import { generateTitleUsingCompromise } from "../../../comon.lib";
import _ from "lodash";

const ListingHistory = ({ setSelectedConversation }) => {
  const [list, setList] = useState([]);
  const userConversationContext = useUserConversation();
  const { conversations } = userConversationContext;

  useEffect(() => {
    if (
      conversations &&
      _.isArray(conversations) &&
      conversations?.length > 0
    ) {
      const sortedList = _.sortBy(conversations, ["created_at"]).reverse();
      const titlesList =
        sortedList && _.isArray(sortedList) && sortedList?.length > 0
          ? sortedList?.map((item) => ({
              title: item?.title || item?.messages[0]?.prompt,
              created_at: item?.created_at,
              conversation_id: item?.conversation_id,
            }))
          : [];
      setList(titlesList);
    } else {
      setList([]);
    }
  }, [conversations]);

  return (
    <div
      className="overflow-auto flex-grow-1 mb-3 listing-history custom-scrollbar"
      style={{
        maxHeight: "70vh",
        // scrollbarWidth: "none",
        // msOverflowStyle: "none",
      }}
    >
      {list &&
        _.isArray(list) &&
        list?.length > 0 &&
        list?.map((item, index) => (
          <>
            <div className="text-muted mb-1">{item?.created_at}</div>
            <button
              className="btn text-start text-white p-2 mb-2 w-100 d-flex justify-content-between rounded chat-layout-button"
              onClick={() => {
                let findItem = conversations?.find(
                  (conversation) =>
                    conversation.conversation_id == item?.conversation_id
                );
                setSelectedConversation(findItem);
              }}
            >
              <span>
                {generateTitleUsingCompromise(item?.title) || conversations}
              </span>
            </button>
          </>
        ))}
    </div>
  );
};

export default ListingHistory;
