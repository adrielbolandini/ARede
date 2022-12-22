import React from 'react';
import { View, Image } from 'react-native';
import {Heading} from '../../components/Heading';
import {User} from 'phosphor-react-native';

import {icon} from '../../../assets/images/icon.png';

import {styles} from './styles';
import { Input } from '../../components/Input';
import { THEME } from '../../theme';

export function Login(){
    return(
        <View style={styles.container}>
            <Image source={icon} style={styles.logo} resizeMethod='scale'/>
            <Heading title="ARede" subtitle='Faça o login e comece a usar' />
            <Input.Root>
                <Input.Icon>
                    <User color={THEME.COLORS.INPUT} />
                </Input.Icon>
                <Input.Input>
                
                </Input.Input>
            </Input.Root>
        </View>
    );
}