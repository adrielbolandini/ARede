import React from 'react';
import { View, Image } from 'react-native';
import {Heading} from '../../components/Heading';

import {favicon} from '../../../assets/images/favicon.png';

import {styles} from './styles';

export function Login(){
    return(
        <View style={styles.container}>
            <Image source={favicon} style={styles.logo} resizeMethod='scale'/>
            <Heading title="ARede" subtitle='Faça o login e comece a usar' />
        </View>
    );
}