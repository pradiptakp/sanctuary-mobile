import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {View} from "react-native";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import {Appbar, Caption, Text, Title, TouchableRipple} from "react-native-paper";
import {globalStyles} from "../../constants/globalStyles";
import {RootState} from "../../redux/store";
import {setUser} from "../../redux/actions/authActions";
import {AppRoute} from "../../navigations/routes";

interface PropsType {}

const Profile: AppScreen<AppRoute.PROFILE> = (props) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(setUser());
    props.navigation.reset({
      routes: [
        {
          name: AppRoute.LOGIN,
        },
      ],
    });
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: "white", elevation: 0}}>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={{backgroundColor: "white", padding: 20, paddingTop: 0}}>
        <Title style={{fontSize: 16, marginBottom: 0, lineHeight: 26}}>
          {user?.userData.username}
        </Title>
        <Caption>{user?.userData.email}</Caption>
      </View>
      <View style={{height: 12}} />
      <Title style={{paddingHorizontal: 20, fontSize: 16}}>Information</Title>

      <View
        style={{
          backgroundColor: "white",
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          padding: 20,
          paddingVertical: 8,
        }}>
        <Text>Version</Text>
        <Caption>v1.0.0</Caption>
      </View>
      <View style={{height: 20}} />
      <TouchableRipple
        style={{backgroundColor: "white"}}
        onPress={() => {
          onLogout();
        }}>
        <View
          style={{
            backgroundColor: "white",
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            padding: 20,
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Text style={{flex: 1}}>Logout</Text>
          <IconM name="chevron-right" size={20} color={globalStyles.colors.primary} />
        </View>
      </TouchableRipple>
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
