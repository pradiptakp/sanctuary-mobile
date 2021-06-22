import {StyleSheet} from "react-native";
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
    padding: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  logo: {
    marginVertical: 12,
    width: 32,
  },
  title: {
    marginBottom: 28,
  },
  inputPassword: {
    marginVertical: 20,
  },
  button: {
    marginVertical: 8,
  },
  textButton: {},
  forgotPassword: {
    color: globalStyles.colors.primary,
  },
  formContainer: {
    marginBottom: 32,
    width: "100%",
  },
});
