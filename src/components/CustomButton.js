import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {globalStyles} from '../config/styles';

const CustomButton = props => {
  const handleSubmit = () => {
    props.handleSubmit();
  };

  return (
    <TouchableOpacity onPress={handleSubmit}>
      <View style={globalStyles.buttonContainer}>
        <Text style={globalStyles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
