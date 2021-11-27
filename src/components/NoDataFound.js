import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '../config/styles';

const NoDataFound = ({label}) => {
  return (
    <View style={{margin: 15}}>
      <Text style={globalStyles.mediumText}>No {label} Found!</Text>
    </View>
  );
};

export default NoDataFound;
