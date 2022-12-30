import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserCircle } from 'phosphor-react-native';
import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as AuthContext } from '../../../context/AuthContext';
import Button from '../../components/Button';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { THEME } from '../../theme';

import { styles } from './styles';

export function Profile(){
    const {user, logout} = useContext(AuthContext);

    return(
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar 
            barStyle='light-content'
            backgroundColor={THEME.COLORS.BACKGROUND_800}
            />
           <View style={styles.heading}>
                <UserCircle color='white' size={48} weight='thin'/>
                <Text style={styles.userNametext}>{user}</Text>
            </View>
            <Button onPress={logout} title="Sair" />
        </SafeAreaView>
    );
}