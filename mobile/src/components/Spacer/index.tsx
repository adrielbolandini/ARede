import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { styles } from './style';

interface SpacerProps{
    children ?: ReactNode;
}

export function Spacer(props: SpacerProps){
    return (
        <View style={styles.container}>
            {props.children}
        </View>
);
}
