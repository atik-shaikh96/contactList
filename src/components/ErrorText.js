import React from 'react';
import {View, Text} from 'react-native';
import { globalStyles } from '../config/styles';

const ErrorText = ({message}) => {
  if (!message) {
    return <></>;
  }
  return (
    <View style={globalStyles.errorMessageContainer}>
      <Text style={globalStyles.errorMessageText}>{message}</Text>
    </View>
  );
};

export default ErrorText;
