import { createContext } from "react";
import { doctors } from "../assets/assets";
import { beds } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = 'NRs';

    const value = {
        doctors,
        currencySymbol,
        beds
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;