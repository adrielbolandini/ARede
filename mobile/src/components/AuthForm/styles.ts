import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 200,
    },
    containerPosition:{
        alignItems: 'center',
    },
    logo:{

        width: 100,
        height: 100
    },
    text:{
        color: THEME.COLORS.TEXT,
    },
    link:{
        color: THEME.COLORS.CAPTION_400,
        fontSize: THEME.FONT_SIZE.MD,
        textAlign: 'center',
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        textDecorationLine: "underline"
    }
});