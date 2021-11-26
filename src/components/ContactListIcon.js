import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ContactListIcon = ({iconLetters}) => {
  return (
    <View>
      <LinearGradient
        colors={['#fff', '#FFEBEE', '#EF9A9A']}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          padding: 10,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', color: '#795548'}}>
          {iconLetters}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ContactListIcon;
