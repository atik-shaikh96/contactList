import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { globalStyles } from '../config/styles';

const ContactListIcon = ({iconLetters}) => {
  return (
    <View>
      <LinearGradient
        colors={['#fff', '#FFEBEE', '#EF9A9A']}
        style={globalStyles.listItemIcon}>
        <Text style={{fontSize: 20, fontWeight: '500', color: '#795548'}}>
          {iconLetters}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ContactListIcon;
