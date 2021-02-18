import React from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import db from "../config";
import firebase from "firebase";
import MyDonation from '../screens/MyDonationScreen'
import { AppTabNavigator } from "./AppTabNavigator";
import { createDrawerNavigator } from "react-navigation-drawer";
import CustomSideBar from "./CustomSideBarMenu";
import Settings from "../screens/Settings";

export const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppTabNavigator },
    Settings: { screen: Settings },
    MyDonation:{screen: MyDonation},
  },
  { contentComponent: CustomSideBar },
  { initialRouteName: "Home" }
);
