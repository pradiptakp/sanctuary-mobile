import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {material} from 'react-native-typography';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FAB,
  Appbar,
  Snackbar,
  Title,
  Subheading,
  IconButton,
  Caption,
} from 'react-native-paper';
import {globalStyles} from '../../constants/globalStyles';
import {Icon} from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import {Switch} from 'react-native-gesture-handler';

const DeviceCard = ({item, index}: any) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(item.state === 'on' ? true : false);

  return (
    <View
      style={{
        marginLeft: index === 0 ? 20 : 16,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        width: 160,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, margin: 12}}>
          <IconM
            name="lightbulb-outline"
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
      <Text style={{marginLeft: 12}}>{item.id}</Text>
      <View style={{height: 8}} />
      <Switch
        value={state}
        thumbColor={state ? globalStyles.colors.primary : 'white'}
        onValueChange={() => {}}
        trackColor={{
          false: '#eee',
          true: '#eee',
        }}
      />
      <View style={{height: 8}} />
    </View>
  );
};

const Home: React.FC<any> = props => {
  const [rooms, setRooms] = React.useState<any>(null);
  const [selectedRoom, setSelectedRoom] = React.useState<any>(null);
  const [devices, setDevices] = React.useState<any>(null);

  const fetchRooms = () => {
    props.indexRooms(
      null,
      (res: any) => {
        setRooms([...res]);
        setSelectedRoom(res[0].id);
      },
      (err: any) => {
        console.log(err.response.data);
        // swal({
        //   icon: "error",
        //   title: "Error",
        //   text: err.response?.data ? err.response.data : err.message,
        // }).then(() => {
        //   if (err.response?.data === "Invalid token: access token is invalid") {
        //     // logout();
        //   } else {
        //     fetchRooms();
        //   }
        // });
      },
    );
  };

  React.useEffect(fetchRooms, []);

  const fetchDevices = () => {
    props.indexDevices(
      '&options=keyValues',
      (res: any) => {
        console.log(res);
        setDevices([...res]);
      },
      (err: any) => {
        console.log(err);
      },
    );
  };

  React.useEffect(fetchDevices, []);

  return (
    <View style={{flex: 1, backgroundColor: globalStyles.colors.lightGray}}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          elevation: 2,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Subheading style={{color: '#aaa'}}>Welcome home,</Subheading>
            <Title style={{marginTop: 0, lineHeight: 26}}>Angga Pradipta</Title>
          </View>
          <View>
            <IconButton
              icon="bell-outline"
              color={globalStyles.colors.primary}
            />
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
                      marginRight:
                        index === devices && devices.length - 1 ? 20 : 0,
                      backgroundColor:
                        selectedRoom === item.id
                          ? globalStyles.colors.primary
                          : 'white',
                      borderRadius: 8,
                      width: 160,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1, margin: 12}}>
                        <IconM
                          name="sofa"
                          size={28}
                          color={
                            selectedRoom === item.id
                              ? 'white'
                              : globalStyles.colors.primary
                          }
                        />
                      </View>
                      <IconButton
                        icon="dots-vertical"
                        onPress={() => {}}
                        rippleColor="#eee"
                        color={
                          selectedRoom === item.id
                            ? 'white'
                            : globalStyles.colors.primary
                        }
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 12,
                        color:
                          selectedRoom === item.id
                            ? 'white'
                            : globalStyles.colors.primary,
                      }}>
                      {item.name}
                    </Text>

                    <View style={{height: 12}} />
                  </View>
                  {selectedRoom === item.id ? (
                    <View
                      style={{
                        width: 0,
                        height: 0,
                        marginLeft: 32,
                        marginTop: -4,
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                        borderLeftWidth: 12,
                        borderRightWidth: 12,
                        borderTopWidth: 12,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
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
            data={devices}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={({name}) => name}
            renderItem={({index, item}) => (
              <DeviceCard item={item} index={index} />
            )}
          />
        </View>
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

export default Home;
