import React from "react";
import {View, ScrollView, Text} from "react-native";
import {TextInput, Button, IconButton, Appbar, Caption} from "react-native-paper";
import {globalStyles} from "../../constants/globalStyles";
import {DropdownMenu} from "../../components/DropdownMenu";
import {useDispatch} from "react-redux";
import {AppRoute} from "../../navigations/routes";
import {getRoom, postRoom, updateRoom} from "../../redux/actions/roomActions";
import {DeviceType} from "../../types";
import {getDevice, postDevice, updateDevice} from "../../redux/actions/deviceActions";

const deviceTypeOptions: {value: DeviceType; title: string}[] = [
  {
    value: "Lamp",
    title: "Lamp",
  },
  {
    value: "Lock",
    title: "Door Lock",
  },
  {
    value: "Temperature",
    title: "Temperature Sensor",
  },
];

export const CreateDevice: AppScreen<AppRoute.ADD_DEVICE> = ({route: {params}, ...props}) => {
  const {deviceId, roomId} = params;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState<DeviceType>("Lamp");
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  React.useEffect(() => {
    if (deviceId) {
      dispatch(
        getDevice.request({
          id: deviceId,
          onSuccess: (res) => {
            setDeviceType(res.type);
          },
          onFailure: (err) => {},
        }),
      );
    }
  }, []);

  const onCreate = () => {
    setLoading(true);
    if (deviceType && roomId) {
      dispatch(
        postDevice.request({
          data: {
            type: deviceType,
            roomId,
          },
          onFailure: (err) => {},
          onSuccess: () => {
            setLoading(false);
            if (params.onGoBack) {
              params.onGoBack();
            }
          },
        }),
      );
    }
  };

  const onUpdate = () => {
    setLoading(true);
    if (deviceId && deviceType) {
      dispatch(
        updateDevice.request({
          id: deviceId,
          data: {
            type: deviceType,
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
        <Appbar.Content title={deviceId ? "Update Device" : "Create Device"} />
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
          <Caption>Room ID</Caption>
          <Text>{roomId}</Text>
          <View style={{marginVertical: 20}}>
            <Caption>Device Type</Caption>
            <DropdownMenu
              isMenuVisible={isMenuVisible}
              setIsMenuVisible={setIsMenuVisible}
              selectedData={
                deviceType === "Lock"
                  ? "Door Lock"
                  : deviceType === "Temperature"
                  ? "Temperature Sensor"
                  : "Lamp"
              }
              setSelectedData={setDeviceType}
              dropdownData={deviceTypeOptions}
            />
          </View>
          <Button
            dark={true}
            loading={loading}
            mode="contained"
            style={{
              marginVertical: 8,
            }}
            onPress={() => {
              if (deviceId) {
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

export default CreateDevice;
