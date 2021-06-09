import React from 'react';
import {connect} from 'react-redux';
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

interface PropsType {
  count: number;
  updateCount: Function;
}

const Home: React.FC<PropsType> = props => {
  const devicesData = [
    {
      name: 'Lamp 1',
      icon: 'lightbulb-outline',
      state: false,
    },
    {
      name: 'Lamp 2',
      icon: 'lightbulb-outline',
      state: true,
    },
    {
      name: 'Lamp 3',
      icon: 'lightbulb-outline',
      state: false,
    },
  ];
  const roomsData = [
    {
      name: 'Living Room',
      icon: 'sofa',
      selected: true,
    },
    {
      name: 'Bedroom',
      icon: 'sofa',
      selected: false,
    },
  ];

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
        <View style={{height: 12}} />
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
        </View>
      </View>

      <ScrollView>
        <View>
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
        </View>
        <View>
          <View style={{height: 20}} />
          <View style={{marginHorizontal: 20, marginBottom: 8}}>
            <Title>Rooms</Title>
          </View>
          <FlatList
            data={roomsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={({name}) => name}
            renderItem={({item, index}) => {
              return (
                <View>
                  <View
                    style={{
                      marginLeft: index === 0 ? 20 : 16,
                      marginRight: index === devicesData.length - 1 ? 20 : 0,
                      backgroundColor: item.selected
                        ? globalStyles.colors.primary
                        : 'white',
                      borderRadius: 8,
                      width: 160,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1, margin: 12}}>
                        <IconM
                          name={item.icon}
                          size={28}
                          color={
                            item.selected
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
                          item.selected ? 'white' : globalStyles.colors.primary
                        }
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 12,
                        color: item.selected
                          ? 'white'
                          : globalStyles.colors.primary,
                      }}>
                      {item.name}
                    </Text>

                    <View style={{height: 12}} />
                  </View>
                  {item.selected ? (
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
        </View>
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
