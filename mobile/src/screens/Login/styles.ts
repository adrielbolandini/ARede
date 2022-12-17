import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        marginTop: 48,
    },
    logo:{

        width: 150,
        height: 150
    },
    text:{
        color: THEME.COLORS.TEXT,
    }
});