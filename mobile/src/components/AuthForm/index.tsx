import { Lock, User } from 'phosphor-react-native';
import { KeyboardAvoidingView, Platform, Text, Image } from 'react-native';
import { THEME } from '../../theme';
import Button from '../Button';
import { Heading } from '../Heading';
import { Input } from '../Input';
import { Spacer } from '../Spacer';
import {styles} from './styles';
import React, { useState } from 'react';

import {logo} from '../../../assets/images/icon.png';

import { Auth } from '../../../@types/auth';
interface AuthFormProps{
    formTitle: string;
    submitFormButtonText: string;
    submitFormButtonAction: (auth:Auth) => void;
    showNameInput: boolean
}

function AuthForm({formTitle,submitFormButtonText,submitFormButtonAction}:AuthFormProps){
    const [user,setUser] = useState("");
    const [password,setPassword] = useState("");

    return(
        <KeyboardAvoidingView 
        style={styles.container} 
        contentContainerStyle={styles.containerPosition}
        behavior={Platform.OS ==='ios' ? 'padding': 'position'}>
            <Image source={logo} style={styles.logo} resizeMethod='scale'/>
            <Heading title="ARede" subtitle={formTitle} />
            <Input.Root>
                <Input.Icon>
                    <User color={THEME.COLORS.INPUT}/>
                </Input.Icon>
                <Input.Input 
                value={user}
                onChangeText={setUser}
                placeholder='Usuário' 
                placeholderTextColor={THEME.COLORS.INPUT}
                autoCapitalize='none'
                autoCorrect={false}
                />
            </Input.Root>
            <Spacer />
            <Input.Root>
                <Input.Icon>
                    <Lock color={THEME.COLORS.INPUT}/>
                </Input.Icon>
                <Input.Input 
                value={password}
                onChangeText={setPassword}
                placeholder='Senha' 
                placeholderTextColor={THEME.COLORS.INPUT}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry/>
            </Input.Root>
            <Spacer />
            <Button onPress={()=>submitFormButtonAction({user,password})} title={submitFormButtonText} />
            <Spacer />
            

        </KeyboardAvoidingView>
    )
}

export default AuthForm;