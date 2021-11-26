import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const ActivityIndicatorLoader = ({isLoading}) => {
  return (
    <View style={{position: 'absolute', bottom: 30, left: 0, right: 0}}>
      <ActivityIndicator size="large" color="#841584" />
    </View>
  );
};

export default ActivityIndicatorLoader;
