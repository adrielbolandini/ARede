import React, { useReducer, ReactNode} from "react";
import api from "../src/services/api";
import jwt_decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { Auth, UserToken } from "../@types/auth";
import { Action } from "../@types/reduce";
import { getAuthHeader } from "../src/services/auth";
import { navigate } from "../src/screens/RootNavigation";

const defaultValue ={
    posts: [], 
    errorMessage: null
}

const Context = React.createContext(defaultValue);

const Provider =({children}:{children: ReactNode})=>{
    const reducer = (state: any, action: Action) =>{
        switch (action.type) {
            case "create_post":
                return {...state, posts:[action.payload, ...state.posts]};
            case "show_posts":
                return {...state, posts: action.payload};
            case "like_post":
                const newPostsLike = state.posts;
                const [postLike, ..._] = newPostsLike.filter((post)=> post._id === action.payload.id);
                postLike.likes.push(action.payload.profile)
                return {...state, posts: [...newPostsLike]};
            case "unlike_post":
                const newPostsUnlike = state.posts;
                const [postUnlike, ...rest] = newPostsUnlike.filter((post)=> post._id === action.payload.id);
                const index = postUnlike.likes.indexOf(action.payload.profile);
                postUnlike.likes.splice(index,1);
                return {...state, posts: [...newPostsUnlike]};
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultValue);

    const getPosts = async()=>{
        try{
            const authHeader = await getAuthHeader();
            const response = await api.get('v1/feed', authHeader)
            dispatch({
                type: 'show_posts',
                payload: response.data
            })
        } catch (err){
            console.error(err)
            
        }
    }
    const likePost = async({postId})=>{
        const authHeader = await getAuthHeader();
        try{
            await api.post(`v1/posts/${postId}/like`, null, authHeader);
            const profile = await SecureStore.getItemAsync('profile')
            dispatch({type: 'like_post', payload: {id: postId, profile:profile}})
        } catch (err){
            console.error(err)
            
        }
    }
    const unlikePost = async({postId})=>{
        const authHeader = await getAuthHeader();
        try{
            await api.post(`v1/posts/${postId}/unlike`, null, authHeader);
            const profile = await SecureStore.getItemAsync('profile')
            dispatch({type: 'unlike_post', payload: {id: postId, profile:profile}})
        } catch (err){
            console.error(err)
            
        }
    }
    const createPost = async({title, description})=>{
        const authHeader = await getAuthHeader();
        try{
            const response = await api.post('v1/posts', {title,description}, authHeader);
            dispatch({type: 'create_post', payload: response.data});
            navigate('Home');
        } catch (err){
            console.error(err)
            
        }
    }

    return(
        <Context.Provider
            value={{...state,
            getPosts,
            createPost,
            likePost,
            unlikePost}}
        >
            {children}
        </Context.Provider>
    )
}

export {Provider,Context};