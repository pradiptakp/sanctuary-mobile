import React from "react";
import {TouchableWithoutFeedback, ViewProps, View, Dimensions} from "react-native";
import {Menu, Text} from "react-native-paper";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import {globalStyles} from "../constants/globalStyles";

export const DropdownMenu = (
  props: ViewProps & {
    isMenuVisible: boolean;
    setIsMenuVisible: (isModalVisible: boolean) => void;
    selectedData: string | number;
    setSelectedData: (selectedData: any) => void;
    dropdownData: {
      value: string;
      title: string;
    }[];
    onPress?: () => void;
  },
) => {
  return (
    <Menu
      visible={props.isMenuVisible}
      onDismiss={() => props.setIsMenuVisible(false)}
      style={{width: Dimensions.get("window").width - 40, borderRadius: 12}}
      anchor={
        <TouchableWithoutFeedback onPress={() => props.setIsMenuVisible(true)}>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 16,
              height: 48,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: "#eee",
              overflow: "hidden",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Text
              style={{
                flex: 1,
                fontStyle: "normal",
                fontSize: 16,
                color: "black",
              }}>
              {props.selectedData}
            </Text>
            <IconM name="chevron-down" color={globalStyles.colors.primary} size={28} />
          </View>
        </TouchableWithoutFeedback>
      }>
      {props.dropdownData.map((v, i) => {
        return (
          <TouchableWithoutFeedback
            key={`dropdown menu key: ${i}`}
            onPress={() => {
              props.setSelectedData(v.value);
              props.setIsMenuVisible(false);
            }}>
            <View style={{padding: 12}}>
              <Text>{v.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </Menu>
  );
};
