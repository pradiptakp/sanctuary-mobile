import React from "react";
import {View, ScrollView, Text} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {styles} from "./styles";
import {material} from "react-native-typography";
import {globalStyles} from "../../constants/globalStyles";

export const HostInput = () => {
  const [hostname, setHostname] = React.useState<string>("");

  return (
    <View style={styles.root}>
      <ScrollView style={styles.screenContainer}>
        <Text style={[material.title, styles.title]}>Set Hostname</Text>
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Email address"
            placeholder="Email address"
            autoCapitalize="none"
            selectionColor={globalStyles.colors.selection}
            value={hostname}
            onChangeText={text => setHostname(text)}
          />

          <Button dark={true} mode="contained" style={styles.button} onPress={() => {}}>
            Login
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default HostInput;
