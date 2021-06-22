export enum AppRoute {
  INPUT_HOST = "HostInputScreen",
  LOGIN = "LoginScreen",
  NAVIGATOR = "MainNavigator",
  HOME = "HomeScreen",
  ROOMS = "RoomScreen",
  ADD_ROOM = "AddRoomScreen",
  DEVICE = "DeviceScreen",
  ADD_DEVICE = "AddDeviceScreen",
  EDIT_DEVICE = "EditDeviceScreen",
  PROFILE = "ProfileScreen",
}

export type AppStackParamList = {
  HostInputScreen: undefined;
  LoginScreen: undefined;
  MainNavigator: undefined;
  HomeScreen: undefined;
  RoomScreen: undefined;
  AddRoomScreen: {
    id?: string;
    onGoBack?: () => void;
  };
  DeviceScreen: undefined;
  AddDeviceScreen: {
    roomId: string;
    deviceId?: string;
    onGoBack?: () => void;
  };
  EditDeviceScreen: undefined;
  ProfileScreen: undefined;
};
