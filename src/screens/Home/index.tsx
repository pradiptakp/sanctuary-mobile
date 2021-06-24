import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Alert,
  RefreshControl,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Title,
  Subheading,
  IconButton,
  ActivityIndicator,
  Caption,
  Provider,
  Button,
  Switch,
  Menu,
  Divider,
} from "react-native-paper";
import io from "socket.io-client";
import {globalStyles} from "../../constants/globalStyles";
import {Device, Room} from "../../types";
import {AppRoute} from "../../navigations/routes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {deleteRoom, getRooms} from "../../redux/actions/roomActions";
import {useNavigation} from "@react-navigation/native";
import {deleteDevice, switchDevice} from "../../redux/actions/deviceActions";
//@ts-ignore
import SwitchToggle from "react-native-switch-toggle";

const DeviceCard = ({
  item,
  index,
  fetchRooms,
  ws,
}: {
  item: Device;
  index: number;
  fetchRooms: () => void;
  ws: any;
}) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(item.state === "on" ? true : false);
  const [temperature, setTemperature] = React.useState(item.temperature);

  React.useEffect(() => {
    ws.on("switch", (s: {id: string; state: boolean}) => {
      if (s.id === item.id) {
        setState(s.state);
      }
    });

    ws.on("update_temperature", (s: {id: string; temperature: string}) => {
      if (s.id === item.id) {
        setTemperature(s.temperature);
      }
    });
  }, []);

  const onDelete = () => {
    Alert.alert("Delete Device", "Device will be deleted, are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(
            deleteDevice.request({
              id: item.id,
              onSuccess: () => {
                ToastAndroid.show("Device Deleted!", ToastAndroid.SHORT);
                fetchRooms();
              },
              onFailure: (err) => {
                ToastAndroid.show(err, ToastAndroid.SHORT);
              },
            }),
          );
        },
      },
    ]);
  };

  const onSwitch = (newState: boolean) => {
    dispatch(
      switchDevice.request({
        id: item.id,
        data: {
          state: newState,
        },
        onFailure: () => {
          setState(!newState);
        },
        onSuccess: () => {},
      }),
    );
  };

  return (
    <View
      style={{
        marginLeft: index === 0 ? 20 : 16,
        backgroundColor: "white",
        borderRadius: 8,
        width: 160,
      }}>
      <View style={{flexDirection: "row"}}>
        <View style={{flex: 1, margin: 12}}>
          <IconM
            name={
              item.id.includes("Lamp")
                ? "lightbulb-outline"
                : item.id.includes("Lock")
                ? "lock-outline"
                : "thermometer"
            }
            size={28}
            color={globalStyles.colors.primary}
          />
        </View>
        <IconButton
          icon="trash-can"
          onPress={() => {
            onDelete();
          }}
          rippleColor="#eee"
          color={globalStyles.colors.error}
        />
      </View>
      <View style={{paddingLeft: 12}}>
        <Text style={{}}>{item.id.replace("urn:ngsi-ld:", "")}</Text>
        <View style={{height: 8}} />
        {item.id.includes("Lamp") || item.id.includes("Lock") ? (
          <SwitchToggle
            switchOn={state}
            onPress={() => onSwitch(!state)}
            circleColorOff="#fff"
            circleColorOn={globalStyles.colors.primary}
            backgroundColorOn="#eee"
            backgroundColorOff="#ddd"
            containerStyle={{
              marginVertical: 16,
              width: 48,
              height: 24,
              borderRadius: 25,
              padding: 4,
            }}
            circleStyle={{
              width: 20,
              height: 20,
              borderRadius: 20,
            }}
          />
        ) : (
          <View>
            <Caption>Temperature</Caption>
            <Text>{temperature}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const RoomCard = ({
  room,
  index,
  selected,
  select,
  fetchRooms,
  onDelete,
}: {
  room: Room;
  index: number;
  selected: boolean;
  fetchRooms: () => void;
  select: (room: Room) => void;
  onDelete: (id: string) => void;
}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => select(room)}>
      <View>
        <View
          style={{
            marginLeft: index === 0 ? 20 : 16,
            marginRight: 0,
            backgroundColor: selected ? globalStyles.colors.primary : "white",
            borderRadius: 8,
            width: 160,
          }}>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1, margin: 12}}>
              <IconM
                name="sofa"
                size={28}
                color={selected ? "white" : globalStyles.colors.primary}
              />
            </View>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(!menuVisible)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={() => {
                    setMenuVisible(!menuVisible);
                  }}
                  rippleColor="#eee"
                  color={selected ? "white" : globalStyles.colors.primary}
                />
              }>
              <Menu.Item
                icon="pencil"
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate(AppRoute.ADD_ROOM, {
                    id: room.id,
                    onGoBack: () => {
                      fetchRooms();
                      ToastAndroid.show("Room updated!", ToastAndroid.SHORT);
                    },
                  });
                }}
                title="Edit"
              />
              <Divider />
              <Menu.Item
                icon="trash-can"
                onPress={() => {
                  setMenuVisible(false);
                  onDelete(room.id);
                }}
                title="Delete"
              />
            </Menu>
          </View>
          <Text
            style={{
              marginLeft: 12,
              color: selected ? "white" : "black",
            }}>
            {room.name}
          </Text>

          <View style={{height: 12}} />
          <Caption
            style={{
              marginLeft: 12,
              color: selected ? "white" : globalStyles.colors.placeholder,
            }}>
            Device Total
          </Caption>
          <Text
            style={{
              marginLeft: 12,
              color: selected ? "white" : undefined,
            }}>
            {room.devices.length}
          </Text>
          <View style={{height: 12}} />
        </View>
        {selected ? (
          <View
            style={{
              width: 0,
              height: 0,
              marginLeft: 32,
              marginTop: -4,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 12,
              borderRightWidth: 12,
              borderTopWidth: 12,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: globalStyles.colors.primary,
            }}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const Home: AppScreen<AppRoute.HOME> = (props) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  const {hostUrl} = useSelector((state: RootState) => state.app);
  const [selectedRoom, setSelectedRoom] = React.useState<Room>();
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [ws] = React.useState(io(hostUrl));

  React.useEffect(() => {
    ws.on("connect", () => {
      console.log("asolole");
    });
  });

  const fetchRooms = () => {
    setLoading(true);
    dispatch(
      getRooms.request({
        onSuccess: (res) => {
          setRooms(res);
          setSelectedRoom(undefined);
          setLoading(false);
        },
        onFailure: () => {
          setLoading(false);
        },
      }),
    );
  };

  React.useEffect(fetchRooms, []);

  const onDelete = (id: string) => {
    Alert.alert("Delete Room", "Room will be deleted, are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setLoading(true);
          dispatch(
            deleteRoom.request({
              id,
              onSuccess: () => {
                setRooms([]);
                fetchRooms();
              },
              onFailure: (err) => {
                Alert.alert("Error", err);
              },
            }),
          );
        },
      },
    ]);
  };

  return (
    <Provider>
      <View style={{flex: 1, backgroundColor: globalStyles.colors.lightGray}}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            elevation: 2,
          }}>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1}}>
              <Subheading style={{color: "#aaa"}}>Welcome,</Subheading>
              <Title style={{marginTop: 0, lineHeight: 26}}>{user?.userData.username}</Title>
            </View>
          </View>
        </View>

        <ScrollView
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchRooms()} />}>
          <View>
            <View style={{height: 20}} />
            <View
              style={{
                marginHorizontal: 20,
                marginBottom: 4,
                display: "flex",
                flexDirection: "row",
              }}>
              <Title style={{flex: 1}}>Rooms</Title>
              <IconButton
                onPress={() => {
                  props.navigation.navigate(AppRoute.ADD_ROOM, {
                    onGoBack: () => {
                      props.navigation.goBack();
                      fetchRooms();
                      ToastAndroid.show("Room created !", ToastAndroid.SHORT);
                    },
                  });
                }}
                icon="plus"
                color={globalStyles.colors.primary}
              />
            </View>
            {rooms.length > 0 ? (
              <FlatList
                data={rooms}
                ListFooterComponent={<View style={{width: 20}} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={({name}) => name}
                renderItem={({item, index}) => {
                  return (
                    <RoomCard
                      room={item}
                      fetchRooms={fetchRooms}
                      index={index}
                      selected={selectedRoom?.id === item.id}
                      select={setSelectedRoom}
                      onDelete={onDelete}
                    />
                  );
                }}
              />
            ) : loading ? (
              <View style={{height: 40}}>
                <ActivityIndicator color={globalStyles.colors.primary} />
              </View>
            ) : (
              <View
                style={{
                  height: 40,
                  paddingVertical: 20,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}>
                <Text>There is no room yet</Text>
              </View>
            )}
          </View>
          {selectedRoom ? (
            <View>
              <View style={{height: 20}} />
              <View
                style={{
                  marginHorizontal: 20,
                  marginBottom: 8,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <Title style={{flex: 1}}>Devices</Title>
                <IconButton
                  onPress={() => {
                    props.navigation.navigate(AppRoute.ADD_DEVICE, {
                      onGoBack: () => {
                        props.navigation.goBack();
                        fetchRooms();
                        ToastAndroid.show("Room created !", ToastAndroid.SHORT);
                      },
                      roomId: selectedRoom.id,
                    });
                  }}
                  icon="plus"
                  color={globalStyles.colors.primary}
                />
              </View>
              {selectedRoom.devices.length > 0 ? (
                <FlatList
                  data={selectedRoom?.devices}
                  ListFooterComponent={<View style={{width: 20}} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={({id}) => id}
                  renderItem={({index, item}) => (
                    <DeviceCard item={item} index={index} fetchRooms={fetchRooms} ws={ws} />
                  )}
                />
              ) : (
                <View
                  style={{
                    height: 40,
                    paddingVertical: 20,
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <Text>There is no device yet</Text>
                </View>
              )}
            </View>
          ) : null}

          <View style={{height: 20}} />
        </ScrollView>
      </View>
    </Provider>
  );
};

export default Home;
