import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../config/styles';

const CustomHeader = ({title, iconName}) => {
  return (
    <View style={globalStyles.headerContainer}>
      <View style={globalStyles.headerContent}>
        <Icon name={iconName} style={{marginRight: 15}} size={30} />
        <Text style={globalStyles.headerText}>{title}</Text>
      </View>
      <View>
        <Icon
          name={'information'}
          style={{marginRight: 15}}
          color="#43A047"
          size={30}
        />
      </View>
    </View>
  );
};

export default CustomHeader;
