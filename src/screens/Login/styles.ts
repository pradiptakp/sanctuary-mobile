import {StyleSheet} from "react-native";
import {scale, verticalScale} from "react-native-size-matters";
import {globalStyles} from "../../constants/globalStyles";

export const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
  },
  screenContainer: {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    padding: scale(20),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  logo: {
    marginVertical: verticalScale(12),
    width: verticalScale(32),
  },
  title: {
    marginBottom: verticalScale(28),
  },
  inputPassword: {
    marginVertical: verticalScale(20),
  },
  button: {
    marginVertical: verticalScale(8),
  },
  textButton: {},
  forgotPassword: {
    color: globalStyles.colors.primary,
  },
  formContainer: {
    marginBottom: verticalScale(32),
    width: "100%",
  },
});
