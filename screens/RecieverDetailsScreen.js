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

import { Header, Card, Icon } from "react-native-elements";
//import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";

export default class RecieverDeatils extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      recieverId: this.props.navigation.getParam("Details")["email_id"],
      requestId: this.props.navigation.getParam("Details")["request_id"],
      bookName: this.props.navigation.getParam("Details")["book_name"],
      reasonForRequest: this.props.navigation.getParam("Details")[
        "reason_to_request"
      ],
      recieverName: "",
      recieverContact: "",
      recieverAddress: "",
      recieverRequestDocId: "",
    };
  }

  getRecieverDetails = () => {
    db.collection("users")
      .where("email_id", "==", this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().first_name,
            recieverContact: doc.data().contact,
            recieverAddress: doc.data().address,
          });
        });
      });
    db.collection("requested_books")
      .where("request_id", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverRequestDocId: doc.id,
          });
        });
      });
  };

  updateBookStatus = () => {
    db.collection("AllDonations").add({
      book_name: this.state.bookName,
      request_id: this.state.requestId,
      requestBy: this.state.recieverName,
      DonorId: this.state.userId,
      requestStatus: "A Donor is Intrested",
    });
  };

  componentDidMount = () => {
    this.getRecieverDetails();
  };

  render() {
    return (
      <View style={styles.contanier}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="blue"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            }
            centerComponent={{
              text: "Donate Books",
              style: { color: "Black", fontSize: 20, fontWeight: "bold" },
            }}
          />
        </View>
        <View style={{flex:0.1}}>
          <Card title={'Book Information'} titleStyle={{fontSize:20}}>
            <Card>
              <Text style={{fontWeight:"bold"}}>
                Name:{this.state.bookName}
              </Text>
            </Card>
            <Card>
              <Text style={{fontWeight:"bold",}}>
                Reason:{this.state.reasonForRequest}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
        <Card title={'Reciever Information'} titleStyle={{fontSize:20,}}>
        <Card>
              <Text style={{fontWeight:"bold",}}>
                Name:{this.state.recieverName}
              </Text>
            </Card>
            <Card>
              <Text style={{fontWeight:"bold",}}>
                Contact:{this.state.recieverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{fontWeight:"bold",}}>
                Address:{this.state.address}
              </Text>
            </Card>
            </Card>
        </View>
        <View style={styles.buttonContanier}>
          {this.state.recieverId !== this.state.userId?(
            <TouchableOpacity style={styles.button} onPress={()=>{
              this.updateBookStatus()
              this.props.navigation.navigate('MyDonation')
            }}>
              <Text>
                I Would Like To Donate
              </Text>
            </TouchableOpacity>
          ):null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { flex:1, }, buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } })
