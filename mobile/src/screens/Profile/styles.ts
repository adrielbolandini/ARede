import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
    },
    heading:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:12,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
    },
    userNametext:{
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        marginStart: 12
    },
});