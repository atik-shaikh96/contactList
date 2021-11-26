import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import LocalStorage from '../services/LocalStorage';
import ContactList from '../screens/Contact/list';
import {initialContacts} from '../config/constants';
const dbHelper = new LocalStorage();

//All Screens/Routes will go here
const Routes = () => {
  useEffect(() => {
    dbHelper.setData('contactList', initialContacts);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ContactList>Hello</ContactList>
    </SafeAreaView>
  );
};

export default Routes;
