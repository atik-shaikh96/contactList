import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = ({title, iconName}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          padding: 10,
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <Icon name={iconName} style={{marginRight: 15}} size={30} />
        <Text style={{fontSize: 24, fontWeight: '600'}}>{title}</Text>
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
