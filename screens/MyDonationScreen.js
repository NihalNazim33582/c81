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
import BookDonateScreen from "../screens/BookDonateScreen";
import RecieverDeatils from "../screens/RecieverDetailsScreen";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";

export default class MyDonation extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <View>
            </View>
        )
    }
}