import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 12
    },
    userNametext:{
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        marginStart: 12
    },
    heading:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingBottom:12,
        borderBottomColor: THEME.COLORS.BORDER,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        borderBottomWidth: 1
    },
}) 