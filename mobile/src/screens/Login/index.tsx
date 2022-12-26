import React, {useContext} from 'react';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import AuthForm, { Auth } from '../../components/AuthForm';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import {Context as AuthContext} from '../../../context/AuthContext';

interface LoginProps{
    navigation: NativeStackNavigationProp<any,any>
}

export function Login({navigation}: LoginProps){
    const {login} = useContext(AuthContext);

    function handleRegisterClick(){
        navigation.navigate("Signup");
    }

    return(
        <>
            <AuthForm 
            formTitle='Faça login para começar'
            submitFormButtonText='Entrar'
            submitFormButtonAction={login}
            showNameInput={true}
            />
            <TouchableOpacity onPress={handleRegisterClick}>
                <Text style={styles.link}>Cadastre-se agora!</Text>
            </TouchableOpacity>
        </>
    );
}