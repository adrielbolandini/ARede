import * as React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface Props extends StatusBarProps{

}

export function FocusAwareStatusBar(props: Props){
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null
}