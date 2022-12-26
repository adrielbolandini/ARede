import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface SpacerProps{
    children ?: ReactNode;
}

export function Spacer(props: SpacerProps){
    return (
        <View>
            {props.children}
        </View>
);
}
