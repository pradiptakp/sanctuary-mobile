import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {material} from 'react-native-typography';
import {styles} from './styles';

interface PropsType {}

const Profile: React.FC<PropsType> = () => {
  return (
    <View style={styles.root}>
      <View style={styles.screenContainer}>
        <Text style={material.subheading}>Profile</Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
