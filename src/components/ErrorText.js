import React from 'react';
import {View, Text} from 'react-native';

const ErrorText = ({message}) => {
  if (!message) {
    return <></>;
  }
  return (
    <View style={{marginLeft: 10, marginTop: -5}}>
      <Text style={{color: '#df4759'}}>{message}</Text>
    </View>
  );
};

export default ErrorText;
