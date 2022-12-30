import React, { useReducer, ReactNode} from "react";
import api from "../src/services/api";
import jwt_decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { Auth, UserToken } from "../@types/auth";
import { Action } from "../@types/reduce";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IAuthContextProps{
    token?: string | null,
    user?: string | null,
    profile?: string | null,
    isLoading: boolean,
    errorMessage: string | null,
    login?: ()=>void,
    signup?: ()=>void,
    tryLocalLogin?: ()=>void,
    logout?: ()=>void
}

const defaultValue = {
    token: null,
    user: null,
    profile: null,
    isLoading: true,
    errorMessage: null
}

interface logoutProps{
    navigation: NativeStackNavigationProp<any,any>
}

const Context = React.createContext<IAuthContextProps>(defaultValue); 

const Provider = ({children} : {children: ReactNode}) =>{
    const reducer = (state: any,action: Action) =>{
        switch(action.type){
            case "login":
                return {
                    ...state,
                    ...action.payload,
                    errorMessage: null
                };
            case 'user_created':
                return {
                    ...state,
                    errorMessage: null
                };
            case 'add_error':
                return {
                    token: null,
                    profile: null,
                    user: null,
                    errorMessage: null
                };
            case 'logout':
                return {
                    ...state,
                    errorMessage: action.payload
                };
            default:
            return state
        } 
    }
    const [state, dispatch] = useReducer(reducer, defaultValue);


    const login = async ({user,password}: Auth) =>{
        try {
            const response = await api.post('/login', {user,password});
            const {accessToken} = response.data;
            const {profile, user: userName} = jwt_decode(accessToken) as UserToken;

            await SecureStore.setItemAsync('token', accessToken);
            await SecureStore.setItemAsync('user', userName);
            await SecureStore.setItemAsync('profile', profile);
            dispatch({
                type: "login",
                payload:{ token: accessToken, profile, user: userName}
            })
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'add_error',
                payload: "Erro no login"
            })
        }
    }

    const signup = async ({user,password}: Auth) =>{
        try {
            await api.post('/signup', {user,password});

            dispatch({
                type: "user_created",
                
            })
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'add_error',
                payload: "Erro na criação de usuário"
            })
        }
    }

    const tryLocalLogin = async() => {
        let token, user, profile;
        try {
            token = await SecureStore.getItemAsync("token");
            user = await SecureStore.getItemAsync("user");
            profile = await SecureStore.getItemAsync("profile");

            dispatch({type: 'login', payload: {token, profile, user}});
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async ({navigation}: logoutProps) =>{
        try {
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('user');
            await SecureStore.deleteItemAsync('profile');
            dispatch({
                type: "logout",
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Context.Provider value={{
            ...state,login, signup, tryLocalLogin, logout
        }}>{children}</Context.Provider>
    )
}

export {Provider,Context};