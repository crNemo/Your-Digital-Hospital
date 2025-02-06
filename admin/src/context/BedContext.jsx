import { createContext, useState, useContext } from 'react';

export const BedContext = createContext();

const BedContextProvider = (props) => {
    const [beds, setBeds] = useState([]);

    const value = {
        beds,
        setBeds,
    };

    return (
        <BedContext.Provider value={value}>
            {props.children}
        </BedContext.Provider>
    );
};

export default BedContextProvider;