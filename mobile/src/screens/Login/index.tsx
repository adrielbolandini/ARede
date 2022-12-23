import React from 'react';

import api from '../../services/api';
import AuthForm, { Auth } from '../../components/AuthForm';

export function Login(){
    async function handleLogin(auth:Auth){
        try{
            const response = await api.post('/login',auth);
            console.log(response.data)

        } catch (err){
            console.error(err);
        }
    }

    return(
        <AuthForm 
        formTitle='Faça login para começar'
        submitFormButtonText='Entrar'
        submitFormButtonAction={handleLogin}
        linkDescription='Cadastre-se agora!'
        routeName=''
        showNameInput={true}
        />
    );
}