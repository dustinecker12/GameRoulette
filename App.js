import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import UserSettingsContextProvider from './context/UserSettingsContext';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import IdHelpScreen from './screens/IdHelpScreen';
import MyGamesScreen from './screens/MyGamesScreen';
import FriendsScreen from './screens/FriendsScreen';
import SettingsScreen from './screens/SettingsScreen';
import SharedGamesScreen from './screens/SharedGamesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="My Games"
        component={MyGamesScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="game-controller" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="user-friends" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="user-alt" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserSettingsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Shared Games" component={SharedGamesScreen} />
          <Stack.Screen
            name="SteamIdHelp"
            component={IdHelpScreen}
            options={{ title: false }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserSettingsContextProvider>
  );
}
