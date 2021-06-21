import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {material} from 'react-native-typography';
import {styles} from './styles';
import Image from '../../components/ScalableImage';
const Logo = require('../../assets/sanctuary-logo640.png');
import {TextInput, Button, Checkbox} from 'react-native-paper';
import {globalStyles} from '../../constants/globalStyles';
import {AppRoute} from '../../navigations/routes';

const Login = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <View style={styles.root}>
      <ScrollView style={styles.screenContainer}>
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
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.inputPassword}
          />
          <Button
            dark={true}
            mode="contained"
            style={styles.button}
            onPress={() => {}}>
            Login
          </Button>
        </View>
        <Text style={{textAlign: 'center'}}>Host: http://localhost</Text>
        <Button
          mode="text"
          uppercase={false}
          labelStyle={[material.button, styles.forgotPassword]}
          style={styles.button}
          onPress={() => console.log('Pressed')}>
          Change Host
        </Button>
      </ScrollView>
    </View>
  );
};

export default Login;
