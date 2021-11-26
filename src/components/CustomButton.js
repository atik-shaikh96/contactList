import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomButton = props => {
  const handleSubmit = () => {
    props.handleSubmit();
  };
  return (
    <TouchableOpacity onPress={handleSubmit}>
      <View
        style={{
          width: 270,
          backgroundColor: '#AE0000',
          padding: 10,
          margin: 5,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
