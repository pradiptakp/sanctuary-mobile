import React from "react";
import {View, Text, FlatList, ScrollView, Alert} from "react-native";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import {Title, Subheading, IconButton} from "react-native-paper";
import {globalStyles} from "../../constants/globalStyles";
import {Switch} from "react-native-gesture-handler";
import {Device, Room} from "../../types";
import {AppRoute} from "../../navigations/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteRoom, getRooms } from "../../redux/actions/roomActions";
import room from "../../redux/sagas/room";

const DeviceCard = ({item, index}: {item: Device; index: number}) => {
  const [state, setState] = React.useState(item.state === "on" ? true : false);

  return (
    <View
      style={{
        marginLeft: index === 0 ? 20 : 16,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 8,
        width: 160,
      }}>
      <View style={{flexDirection: "row"}}>
        <View style={{flex: 1, margin: 12}}>
          <IconM name="lightbulb-outline" size={28} color={globalStyles.colors.primary} />
        </View>
        <IconButton
          icon="dots-vertical"
          onPress={() => {}}
          rippleColor="#eee"
          color={globalStyles.colors.primary}
        />
      </View>
      <Text style={{marginLeft: 12}}>asdf</Text>
      <View style={{height: 8}} />
      <Switch
        value={state}
        thumbColor={state ? globalStyles.colors.primary : "white"}
        onValueChange={() => {
          setState(!state);
        }}
        trackColor={{
          false: "#eee",
          true: "#eee",
        }}
      />
      <View style={{height: 8}} />
    </View>
  );
};

const Home: AppScreen<AppRoute.HOME> = props => {
  const dispatch = useDispatch()
  const {user} = useSelector((state: RootState) => state.auth)
  const [selectedRoom, setSelectedRoom] = React.useState<Room>()
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchRooms = () => {
    setLoading(true);
    dispatch(
      getRooms.request({
        onSuccess: (res) => {
          setRooms(res);
          setLoading(false);
        },
        onFailure: () => {
          setLoading(false);
        },
      })
    );
  };

  React.useEffect(fetchRooms, []);

  const onDelete = (id: string) => {
    Alert.alert("Delete Room", "Room and its devices will be deleted, are you sure?", [
      {
        text: "Cancel"
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(
            deleteRoom.request({
              id,
              onSuccess: () => {
                
                setRooms([]);
                fetchRooms();
              },
              onFailure: (err) => {
                
              },
            })
          );
        }
      }
    ])
   
  };

  return (
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
          <View>
            <IconButton icon="bell-outline" color={globalStyles.colors.primary} />
          </View>
        </View>
        {/* <View style={{height: 12}} />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{color: '#aaa'}}>Monthly Power Usage</Text>
            <Title style={{marginTop: 0, lineHeight: 26, fontSize: 18}}>
              100 KWh
            </Title>
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: '#aaa'}}>Temperature</Text>
            <Title style={{marginTop: 0, lineHeight: 26, fontSize: 18}}>
              32°C
            </Title>
          </View>
        </View> */}
      </View>

      <ScrollView>
        {/* <View>
          <View style={{height: 12}} />
          <View style={{marginHorizontal: 20, marginBottom: 8}}>
            <Title>Recently Used</Title>
          </View>
          <FlatList
            data={devicesData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={({name}) => name}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginLeft: index === 0 ? 20 : 16,
                    marginRight: index === devicesData.length - 1 ? 20 : 0,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    width: 160,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, margin: 12}}>
                      <IconM
                        name={item.icon}
                        size={28}
                        color={globalStyles.colors.primary}
                      />
                    </View>
                    <IconButton
                      icon="dots-vertical"
                      onPress={() => {}}
                      rippleColor="#eee"
                      color={globalStyles.colors.primary}
                    />
                  </View>
                  <Text style={{marginLeft: 12}}>{item.name}</Text>
                  <View style={{height: 8}} />
                  <Switch
                    value={item.state}
                    thumbColor={
                      item.state ? globalStyles.colors.primary : 'white'
                    }
                    trackColor={{
                      false: '#eee',
                      true: '#eee',
                    }}
                  />
                  <View style={{height: 8}} />
                </View>
              );
            }}
          />
        </View> */}
        <View>
          <View style={{height: 20}} />
          <View style={{marginHorizontal: 20, marginBottom: 8}}>
            <Title>Rooms</Title>
          </View>
          <FlatList
            data={rooms}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={({name}) => name}
            renderItem={({item, index}) => {
              return (
                <View>
                  <View
                    style={{
                      marginLeft: index === 0 ? 20 : 16,
                      marginRight:  0,
                      backgroundColor:
                        selectedRoom?.id === item.id ? globalStyles.colors.primary : "white",
                      borderRadius: 8,
                      width: 160,
                    }}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flex: 1, margin: 12}}>
                        <IconM
                          name="sofa"
                          size={28}
                          color={selectedRoom?.id === item.id ? "white" : globalStyles.colors.primary}
                        />
                      </View>
                      <IconButton
                        icon="dots-vertical"
                        onPress={() => {}}
                        rippleColor="#eee"
                        color={selectedRoom?.id === item.id ? "white" : globalStyles.colors.primary}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 12,
                        color: selectedRoom?.id === item.id ? "white" : globalStyles.colors.primary,
                      }}>
                      {item.name}
                    </Text>

                    <View style={{height: 12}} />
                  </View>
                  {selectedRoom?.id === item.id ? (
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
              );
            }}
          />
        </View>
        <View>
          <View style={{height: 20}} />
          <View style={{marginHorizontal: 20, marginBottom: 8}}>
            <Title>Devices</Title>
          </View>
          <FlatList
            data={selectedRoom?.devices}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={({id}) => id}
            renderItem={({index, item}) => <DeviceCard item={item} index={index} />}
          />
        </View>
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

export default Home;
