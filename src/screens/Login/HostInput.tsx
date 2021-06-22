import React from "react";
import {View, ScrollView, Text} from "react-native";
import {TextInput, Button, IconButton} from "react-native-paper";
import {styles} from "./styles";
import {material} from "react-native-typography";
import {globalStyles} from "../../constants/globalStyles";
import {useDispatch, useSelector} from "react-redux";
import {setHostUrl} from "../../redux/actions/appActions";
import {AppRoute} from "../../navigations/routes";
import {RootState} from "../../redux/store";

export const HostInput: AppScreen<AppRoute.INPUT_HOST> = props => {
  const dispatch = useDispatch();
  const hostUrl = useSelector((state: RootState) => state.app.hostUrl);
  const [hostname, setHostname] = React.useState<string>("");

  const onSave = () => {
    dispatch(setHostUrl(hostname));
    props.navigation.replace(AppRoute.LOGIN);
  };

  return (
    <View style={styles.root}>
      <IconButton icon="arrow-left" onPress={() => props.navigation.goBack()} />
      <ScrollView style={styles.screenContainer} keyboardShouldPersistTaps="handled">
        <Text style={[material.title, styles.title]}>Set Hostname</Text>
        <Text style={[material.body1, {marginBottom: 8}]}>
          Input Hostname / Host URL of your Sanctuary server here
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Hostname"
            placeholder="Ex: http://localhost:3002"
            autoCapitalize="none"
            selectionColor={globalStyles.colors.selection}
            value={hostname}
            onChangeText={text => setHostname(text)}
            style={{marginBottom: 20}}
          />

          <Button
            dark={true}
            mode="contained"
            disabled={!hostname}
            style={styles.button}
            onPress={() => {
              onSave();
            }}>
            Save
          </Button>
        </View>
        <Text style={[material.caption, {textAlign: "center"}]}>
          Current Hostname: <Text style={{fontWeight: "bold"}}>{hostUrl}</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default HostInput;
