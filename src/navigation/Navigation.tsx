import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';

import {
  AdminPanel,
  CartScreen,
  HomeScreen,
  LoginScreen,
  ProductDetail,
  WishlistScreen,
  EditScreen,
} from '../scenes';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ProductDetail: { id: number };
  AdminPanel: undefined;
  Cart: undefined;
  Wishlist: undefined;
  EditScreen: { id: number };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const myDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
    text: '#fff',
    primary: '#fff',
  },
};

const myLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#000',
    primary: '#000',
  },
};

export default function Navigation() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? myDarkTheme : myLightTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ headerShown: true }} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
