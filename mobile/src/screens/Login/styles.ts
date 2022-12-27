import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    link:{
        color: THEME.COLORS.CAPTION_400,
        fontSize: THEME.FONT_SIZE.MD,
        textAlign: 'center',
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        textDecorationLine: "underline"
    },
    errorMessage:{
        color: THEME.COLORS.ERROR,
        textAlign: 'center',
    }
});