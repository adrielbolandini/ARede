import { UserCircle } from 'phosphor-react-native';
import React, {useContext} from 'react';
import { Text, View } from 'react-native';

import { Context as AuthContext } from '../../../context/AuthContext';
import Button from '../../components/Button';

import { styles } from './styles';

export function Profile(){
    const {user, logout} = useContext(AuthContext);
    return(
        <View style={styles.container}>
           <View style={styles.heading}>
                <UserCircle color='white' size={48} weight='thin'/>
                <Text style={styles.userNametext}>{user}</Text>
            </View>
            <Button onPress={logout} title="Sair" />
        </View>
    );
}