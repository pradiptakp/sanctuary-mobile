import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text} from 'react-native';
import {material} from 'react-native-typography';
import {styles} from './styles';
import {updateCount} from '../../actions/app';
import Image from '../../components/ScalableImage';
const Logo = require('../../assets/sanctuary-logo640.png');
import {TextInput, Button, Checkbox} from 'react-native-paper';
import {globalStyles} from '../../constants/globalStyles';

interface PropsType {
  count: number;
  updateCount: Function;
}

const Login: React.FC<PropsType> = props => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <View style={styles.root}>
      <ScrollView style={styles.screenContainer}>
        <Image source={Logo} width={styles.logo.width} style={styles.logo} />
        <Text style={[material.title, styles.title]}>Sign In with Email</Text>
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
            onPress={() => console.log('Pressed')}>
            Login
          </Button>
          <Button
            dark={true}
            mode="outlined"
            style={styles.button}
            onPress={() => console.log('Pressed')}>
            Sign Up
          </Button>
        </View>
        <Button
          mode="text"
          uppercase={false}
          labelStyle={[material.button, styles.forgotPassword]}
          style={styles.button}
          onPress={() => console.log('Pressed')}>
          Forgot Password
        </Button>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
