import React from "react";
import {View, ScrollView, Text, Keyboard, Alert} from "react-native";
import {material} from "react-native-typography";
import {styles} from "./styles";
import Image from "../../components/ScalableImage";
const Logo = require("../../assets/sanctuary-logo640.png");
import {TextInput, Button} from "react-native-paper";
import {globalStyles} from "../../constants/globalStyles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {AppRoute} from "../../navigations/routes";
import {postLogin} from "../../redux/actions/authActions";

const Login: AppScreen<AppRoute.LOGIN> = (props) => {
  const hostname = useSelector((state: RootState) => state.app.hostUrl);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onLogin = () => {
    Keyboard.dismiss();
    setLoading(true);
    dispatch(
      postLogin.request({
        data: {
          password,
          username: email,
        },
        onSuccess: () => {
          setLoading(false);
          props.navigation.replace("MainNavigator");
        },
        onFailure: () => {
          setLoading(false);
          Alert.alert("Error", "Login gagal");
        },
      }),
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.screenContainer} keyboardShouldPersistTaps="handled">
        <Image source={Logo} width={styles.logo.width} style={styles.logo} />
        <Text style={[material.title, styles.title]}>Sign In</Text>
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Email address"
            placeholder="Email address"
            autoCapitalize="none"
            selectionColor={globalStyles.colors.selection}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputPassword}
          />
          <Button
            loading={loading}
            disabled={loading || !email || !password}
            dark={true}
            mode="contained"
            style={styles.button}
            onPress={() => {
              onLogin();
            }}>
            Login
          </Button>
        </View>
        <Text style={[material.caption, {textAlign: "center"}]}>
          Current Hostname: <Text style={{fontWeight: "bold"}}>{hostname}</Text>
        </Text>
        <Button
          mode="text"
          uppercase={false}
          labelStyle={[material.button, styles.forgotPassword]}
          style={styles.button}
          onPress={() => props.navigation.navigate(AppRoute.INPUT_HOST)}>
          Change Host
        </Button>
      </ScrollView>
    </View>
  );
};

export default Login;
