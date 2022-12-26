import React, {ReactElement, useReducer, ReactNode} from "react";
import api from "../src/services/api";
import jwt_decode from 'jwt-decode';

interface AuthContextProps extends ReactElement{

}

const defaultValue = {
    token: null,
    user: null,
    profile: null,
    isLoading: true,

}

const Context = React.createContext(defaultValue); 

const Provider = ({children} : {children: ReactNode}) =>{
    const reducer = (state,action) =>{
        switch(action.type){
            case "login":
            return {
                ...state,
                ...action.payload
            };
            default:
            return state
        } 
    }
    const [state, dispatch] = useReducer(reducer, defaultValue);


    const login = async ({user,password}) =>{
        try {
            const response = await api.post('/login', {user,password});
            const {accessToken} = response.data;
            const {profile, user:UserName} = jwt_decode(accessToken);

            dispatch({
                type: "login",
                payload:{ token: accessToken, profile, user: UserName}
            })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Context.Provider value={{...state,login,}}>{children}</Context.Provider>
    )
}

export {Provider,Context};