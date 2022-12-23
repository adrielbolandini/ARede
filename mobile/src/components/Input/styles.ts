import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: "100%",
        minWidth: 200,
        borderRadius: 10,
        backgroundColor: THEME.COLORS.BACKGROUND_600,
        padding: 8
    },
    input:{
        marginStart: 12,
        flex: 1,
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,

    },
})