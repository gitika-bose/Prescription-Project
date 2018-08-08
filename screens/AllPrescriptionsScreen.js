import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
import firebase from 'firebase';
const window = Dimensions.get('window');

var dataPatient = [];



var counter = 0;
export default class AllPrescriptionsScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state={
        loaded: false,
        dataPatient2: []
      }
  }

  renderRow(dataPatient) {
    counter = counter +1;
    var newVar = {
      medicines: [],
      appointments: {},
      diagnosis: {},
      testres: {}
    }
    var i;

    for (i=0; i < dataPatient.amounts.medicines; i++) {
      var med = "Medicine"+i;
      newVar.medicines.push(dataPatient[med])
    }
    var i;

    for (i=0; i < dataPatient.amounts.appointments; i++) {
      var app = "Appointment"+i;
      newVar.appointments[app] = (dataPatient[app])
    }
    var i;

    for (i=0; i < dataPatient.amounts.diagnosis; i++) {
      var dia = "Diagnosis"+i;
      newVar.diagnosis[dia] = (dataPatient[dia])
    }
    var i;

    for (i=0; i < dataPatient.amounts.testResults; i++) {
      var tr = "testres"+i;
      newVar.testres[tr] = (dataPatient[tr])
    }

    if (counter % 2 == 0 )
      {return (
        <ImageBackground style={{width: window.width, height: 100}} source={require('../assets/images/purpleBackground.png')} >

        <View style={styles.ListViewEven}>

          <View>
            <Text style={{fontWeight: "bold"}}>{dataPatient.docName}</Text>
            <Text>{dataPatient.patientName}</Text>
            <Text>{dataPatient.date}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Button block style={{backgroundColor: "#c1514d"}}
              onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date, newVar.medicines, newVar.appointments, newVar.diagnosis, newVar.testres)}>
              <Text>Press</Text>
            </Button>
          </View>
        </View>
        </ImageBackground>

      );
    }

    else {return (

      <View style={styles.ListViewOdd}>
        <View>
          <Text style={{fontWeight: "bold"}}>{dataPatient.docName}</Text>
          <Text>{dataPatient.patientName}</Text>
          <Text>{dataPatient.date}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Button block style={{backgroundColor: "#c1514d"}}
            onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date, newVar.medicines, newVar.appointments, newVar.diagnosis, newVar.testres)}>
            <Text>Press</Text>
          </Button>
        </View>
      </View>

    );

    }
  }

  componentWillMount() {
    var userId = firebase.auth().currentUser.uid;
    var that = this;
    console.log(userId);
    firebase.database().ref("users/" + userId+ "/data/Prescriptions/").on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {

        var childData = childSnapshot.val();
        // dataPatient.push(childData);
        that.setState({loaded: true});
        that.setState(prevState => {
          return {
            dataPatient2: prevState.dataPatient2.concat(childData)
          };
        });
      });
    });
  }

  render() {
     if (!this.state.loaded) return <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />;
     return (

         <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

           <Content>
             <View style={{paddingVertical: 20}}>
             <Button block style={{backgroundColor: "#c1514d"}} onPress={this._addNew}>
               <Text>Add New</Text>
             </Button>
             </View>

             <ListView
               data={this.state.dataPatient2}
               renderRow={this.renderRow.bind(this)}
             />
           </Content>

         </Container>


     );
   }

  _addNew = () => {
    newVar = {   }
    this.props.navigation.navigate('AddNew', {newVar});
  };

  _seePrescription = (doc, patient, date, medicines, appointments, diagnosis, testres) => {
    var newVar = {
      docName: doc,
      patientName: patient,
      date: date,
      medicines: medicines,
      appointments: appointments,
      diagnosis: diagnosis,
      testres: testres
    }


    this.props.navigation.navigate('SinglePrescription', {newVar});
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({
  ListViewOdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:0,
    backgroundColor: '#fbf5f3',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ListViewEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:0,
    // backgroundColor: '#edb0a2',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },

});
