import React from 'react';
import {View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getIconLetters} from '../services/utils';
import ContactListIcon from './ContactListIcon';

const ListItem = props => {
  let {item} = props;
  const handleDelete = () => {
    Alert.alert(
      'Delete Member!',
      'Are you sure you want to delete Member?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => props.handleDelete(item)},
      ],
      {cancelable: false},
    );
  };

  let iconLetters = getIconLetters(item.contactName);

  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 3,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <View style={{flex: 0.2}}>
          <ContactListIcon iconLetters={iconLetters} />
        </View>
        <View style={{flex: 0.8}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            {item.contactName}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', paddingTop: 3}}>
            <Icon
              name="phone-in-talk-outline"
              size={18}
              style={{marginRight: 3, color: '#757575'}}
              onPress={handleDelete}
            />
            <Text style={{fontSize: 15, color: '#757575'}}>{item.phone}</Text>
          </View>
        </View>
        <Icon
          name="delete-outline"
          size={30}
          style={{color: '#AE0000'}}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

export default React.memo(ListItem);
