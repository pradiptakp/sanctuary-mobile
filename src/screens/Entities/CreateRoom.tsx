import React from "react";
import {View, ScrollView, Text} from "react-native";
import {TextInput, Button, IconButton, Appbar} from "react-native-paper";
import {material} from "react-native-typography";
import {globalStyles} from "../../constants/globalStyles";
import {useDispatch} from "react-redux";
import {AppRoute} from "../../navigations/routes";
import {getRoom, postRoom, updateRoom} from "../../redux/actions/roomActions";

export const CreateRoom: AppScreen<AppRoute.ADD_ROOM> = ({route: {params}, ...props}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [roomDescription, setRoomDescription] = React.useState("");

  React.useEffect(() => {
    if (params.id) {
      setLoading(true);
      dispatch(
        getRoom.request({
          id: params.id,
          onSuccess: (res) => {
            setLoading(false);
            setRoomName(res.name);
            setRoomDescription(res.description);
          },
          onFailure: () => {},
        }),
      );
    }
  }, []);

  const onCreate = () => {
    setLoading(true);
    dispatch(
      postRoom.request({
        data: {
          name: roomName,
          description: roomDescription,
        },
        onSuccess: () => {
          setLoading(false);
          if (params.onGoBack) {
            params.onGoBack();
          }
        },
        onFailure: () => {},
      }),
    );
  };

  const onUpdate = () => {
    setLoading(true);
    if (params.id) {
      dispatch(
        updateRoom.request({
          id: params.id,
          data: {
            name: roomName,
            description: roomDescription,
          },
          onSuccess: () => {
            setLoading(false);
            if (params.onGoBack) {
              params.onGoBack();
              props.navigation.goBack();
            }
          },
          onFailure: () => {},
        }),
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        width: "100%",
      }}>
      <Appbar.Header style={{backgroundColor: "white"}}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title={params.id ? "Update Room" : "Create Room"} />
      </Appbar.Header>
      <ScrollView
        style={{
          backgroundColor: "white",
          flex: 1,
          width: "100%",
          padding: 20,
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            marginBottom: 32,
            width: "100%",
          }}>
          <TextInput
            mode="outlined"
            label="Room Name"
            placeholder="Room Name"
            autoCapitalize="none"
            selectionColor={globalStyles.colors.selection}
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
            style={{marginBottom: 20}}
          />
          <TextInput
            mode="outlined"
            label="Room Description (Optional)"
            placeholder="Room Description"
            autoCapitalize="none"
            selectionColor={globalStyles.colors.selection}
            value={roomDescription}
            onChangeText={(text) => setRoomDescription(text)}
            style={{marginBottom: 20}}
          />

          <Button
            dark={true}
            loading={loading}
            mode="contained"
            disabled={!roomName}
            style={{
              marginVertical: 8,
            }}
            onPress={() => {
              if (params.id) {
                onUpdate();
              } else {
                onCreate();
              }
            }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateRoom;
