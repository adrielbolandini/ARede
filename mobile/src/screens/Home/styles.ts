import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 12
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
    content:{
        flex: 1,

    },
    post:{
        borderBottomColor: THEME.COLORS.BORDER,
        borderBottomWidth: 1,
        paddingBottom:12,
    },
    userNametext:{
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        marginStart: 12
    },
    postHeading:{
        flexDirection: 'row',
        alignItems: 'center',
        padding:12,
    },
    postUserText:{
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        marginStart: 12
    },
    contentText:{
        color: THEME.COLORS.TEXT,
        marginBottom: 12
    },
    contentBody:{
        paddingHorizontal: 24
    },
    footer:{
        flexDirection: 'row',
        paddingHorizontal: 24,
        alignItems: 'center'
    },
    number:{
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.SM,
        padding: 4,
        marginEnd: 24
    }
});