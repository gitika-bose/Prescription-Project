import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';

import { Icon, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker} from 'native-base';
import firebase from 'firebase';

import GenerateForm from 'react-native-form-builder';

const tempFields = [
  {
    type: 'text',
    name: 'medName',
    required: true,
    icon: 'ios-person',
    label: 'Medicine Name',
  },
  {
    type: 'date',
    name: 'startDate',
    mode: 'date',
    required: true,
    label: 'Start Date',
    maxDate: new Date(2300, 7, 15),
    minDate: new Date(1880, 7, 15),
  },
  {
    type: 'date',
    name: 'endDate',
    mode: 'date',
    required: true,
    label: 'End Date',
    maxDate: new Date(2300, 7, 15),
    minDate: new Date(1880, 7, 15),
  },
  {
    type: 'select',
    name: 'Days',
    required: true,
    multiple: true,
    label: 'Days',
    options: ['Everyday', 'Alternate Days'],
  },
  {
    type: 'group',
    name: 'Times',
    required: true,
    label: 'Choose Times',
    fields: [
      {
        type: 'date',
        name: 'Time1',
        mode: 'time',
        label: 'Time',
      },
      {
        type: 'date',
        name: 'Time2',
        mode: 'time',
        label: 'Time',
      },
      {
        type: 'date',
        name: 'Time3',
        mode: 'time',
        label: 'Time',
      },
      {
        type: 'date',
        name: 'Time4',
        mode: 'time',
        label: 'Time',
      }

    ]
  },

]

var form;

export default class MedicineFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };
  componentWillMount() {
    if(this.props.navigation.state.params.newVar.hasOwnProperty('data')){
      var name = (this.props.navigation.state.params.newVar.name);
      form = this.props.navigation.state.params.newVar.data[name];
    }
  }

  constructor(props) {
    super(props);
    var i = 0;
    this.state = {fields: tempFields, selected1: 'ADD', doc: "", patientName: "", date: null}
  }

  confirm = () => {

    const formValues = this.formGenerator.getValues();

    var data = this.props.navigation.state.params.newVar.data
    var name = this.props.navigation.state.params.newVar.name
    var medicinesList = this.props.navigation.state.params.newVar.medicinesList
    data[name] = formValues
    if(!(medicinesList.indexOf(name) >= 0)){
      console.log('a')
      medicinesList.push(name);
    }
    var newVar =
    {
      data,
      medicinesList
    }
    this.props.navigation.navigate('AddNew', {newVar})
  }

  render() {

    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

          </View>
          <View>
            <GenerateForm
              ref={(c) => {
                this.formGenerator = c;
              }}
              fields={this.state.fields}
              formData = { form }
            />
          </View>

          <View style={styles.submitButton}>
            <Button block onPress={() => this.confirm()}>
              <Text>Save</Text>
            </Button>
          </View>

        </Content>

      </Container>

    );
  }

}

const styles = StyleSheet.create({
  ListViewOdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:1,
    backgroundColor: '#ffffff'

  },
  ListViewEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:1,
    backgroundColor: '#eae0ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
    submitButton: {
      paddingHorizontal: 10,
      paddingTop: 20,
    },

});
