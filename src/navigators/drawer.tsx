import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import CustomDrawer from '~/components/custom-drawer';
import { RootStackScreensParams } from '~/navigators/root-stack';
import Expenses from '~/screens/Expenses';
import Welcome from '~/screens/welcome';

export type DrawerScreensParams = {
  Welcome: undefined;
  Expenses: undefined;
};

export type DrawerScreens = keyof DrawerScreensParams;

export type DrawerScreenProp<T extends DrawerScreens> = CompositeScreenProps<
  DrawerScreenProps<DrawerScreensParams, T>,
  NativeStackScreenProps<RootStackScreensParams>
>;

const { Navigator, Screen } = createDrawerNavigator<DrawerScreensParams>();

const Drawer = () => (
  <Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      lazy: true,
      drawerStyle: styles.drawer,
    }}
  >
    <Screen name="Welcome" component={Welcome} options={{ drawerIcon: () => 'home' }} />
    <Screen name="Expenses" component={Expenses} options={{ drawerIcon: () => 'hand-coin' }} />
  </Navigator>
);

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
});

export default Drawer;
