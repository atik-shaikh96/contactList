import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {globalStyles} from '../config/styles';

const ActivityIndicatorLoader = props => {
  let {isLoading, position} = props;
  let indicatorStyle = null;
  switch (position) {
    case 'bottom':
      indicatorStyle = globalStyles.absoluteBottom;
      break;
    default:
      indicatorStyle = globalStyles.absoluteCenter;
  }

  return (
    <View style={indicatorStyle}>
      <ActivityIndicator animating={isLoading} size="large" color="#841584" />
    </View>
  );
};

export default ActivityIndicatorLoader;
