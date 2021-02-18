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

import { DrawerItems } from "react-navigation-drawer";
import db from "../config";
import firebase from "firebase";

export default class CustomSideBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DrawerItems {...this.props} /*style={styles.DrawerItemsContainer}*/ />
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
            style={styles.logOutButton}
          >
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  DrawerItemsContainer: { flex: 0.8 },
  logOutButton: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    padding: 10,
    marginTop: 300,

  },
  logOutText: { fontSize: 25, fontWeight: "bold" },
});
