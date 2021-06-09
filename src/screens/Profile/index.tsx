import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Caption, Text, Title} from 'react-native-paper';
import {globalStyles} from '../../constants/globalStyles';

interface PropsType {}

const Profile: React.FC<PropsType> = () => {
  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white', elevation: 0}}>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={{backgroundColor: 'white', padding: 20, paddingTop: 0}}>
        <Title style={{fontSize: 16, marginBottom: 0, lineHeight: 26}}>
          Angga Pradipta
        </Title>
        <Caption>anggaa.pradipta@gmail.com</Caption>
      </View>
      <View style={{height: 12}} />
      <Title style={{paddingHorizontal: 20, fontSize: 16}}>Information</Title>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          padding: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{flex: 1}}>About</Text>
        <IconM
          name="chevron-right"
          size={20}
          color={globalStyles.colors.primary}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          padding: 20,
          paddingVertical: 8,
        }}>
        <Text>Version</Text>
        <Caption>v1.0.0</Caption>
      </View>
      <View style={{height: 20}} />
      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          padding: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{flex: 1}}>Logout</Text>
        <IconM
          name="chevron-right"
          size={20}
          color={globalStyles.colors.primary}
        />
      </View>
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
