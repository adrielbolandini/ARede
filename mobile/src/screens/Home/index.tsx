import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { Chat, Heart, UserCircle } from 'phosphor-react-native';

import { Context as AuthContext } from '../../../context/AuthContext';

import { styles } from './styles';

export function Home(){
    const {user} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <View style={styles.heading}>
                <UserCircle color='white' size={48} weight='thin'/>
                <Text style={styles.userNametext}>{user}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.post}>
                    <View style={styles.postHeading}>
                        <UserCircle color='white' size={48} weight='thin'/>
                        <Text style={styles.postUserText}>Home</Text>
                    </View>
                    <View style={styles.contentText}>
                        <Text style={styles.contentBody}>Home</Text>
                    </View>
                    <View style={styles.footer}>
                        <Chat size={24} color='white' weight='thin'/>
                        <Text style={styles.number}>321</Text>
                        <Heart size={24} color='white' weight='thin'/>
                        <Text style={styles.number}>123</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}