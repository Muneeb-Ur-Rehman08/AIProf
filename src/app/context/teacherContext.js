import { createContext, useState, useContext } from "react";

export const TeacherContext = createContext();

export const useTeacherContext = () => {
    return useContext(TeacherContext);
};

export const TeacherProvider = ({ children }) => {
    const [qna, setQna] = useState([]);
    const [doc_id, setDocId] = useState('');
    const [doc_name, setDocName] = useState('');

    const addNewQna = (newQna) => {
        console.log(newQna, "newQna", qna);
        setQna(prev => [...prev, newQna]);
    }


    return (
        <TeacherContext.Provider value={{ qna, setQna, doc_id, setDocId, addNewQna, doc_name, setDocName }}>
            {children}
        </TeacherContext.Provider>
    );
};