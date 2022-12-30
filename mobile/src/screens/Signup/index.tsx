import React from 'react';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import api from '../../services/api';
import AuthForm, { Auth } from '../../components/AuthForm'
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface SignupProps{
    navigation: NativeStackNavigationProp<any,any>
}

export function Signup({navigation}: SignupProps){

    function handleLoginClick(){
        navigation.navigate("Login");
    }

    async function handleSignup(auth:Auth){
        try{
            await api.post('/signup',auth);
            navigation.navigate("Login");
        } catch (err){
            console.error(err);
        }
    }

    return(
        <>
            <AuthForm 
            formTitle='Faça login para começar'
            submitFormButtonText='Cadastrar'
            submitFormButtonAction={handleSignup}
            showNameInput={true}
            />
            <TouchableOpacity onPress={handleLoginClick}>
            <Text style={styles.link}>Ja possui uma conta? Entre agora!</Text>
            </TouchableOpacity>
        </>
    );
}