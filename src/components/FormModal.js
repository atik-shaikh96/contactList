import React, {useState} from 'react';
import {View, TextInput, Modal} from 'react-native';
import {initialContactForm} from '../config/constants';
import {globalStyles} from '../config/styles';
import {contactValidation, duplicateRecord} from '../services/Validation';
import CustomButton from './CustomButton';
import ErrorText from './ErrorText';

const FormModal = props => {
  let {visibleModal} = props;
  const [contactDetail, setContactDetail] = useState(initialContactForm);
  const [errors, setErrors] = useState(initialContactForm);
  let {contactName, phone} = contactDetail;

  const handleState = (field, value) => {
    let localState = {...contactDetail};
    localState[field] = value;
    setContactDetail(localState);
  };

  const handleCancel = () => {
    props.handleCancel();
  };

  const handleAdd = () => {
    let status = contactValidation(contactDetail);
    setErrors(status.errors);
    if (!status.errorFound) {
      let {list} = props;
      let isDuplicateRecord = duplicateRecord(contactDetail, list);
      if (isDuplicateRecord) {
        setErrors({...status.errors, phone: 'Phone Number Already Exists!'});
        return false;
      }
      props.handleAdd(contactDetail);
      setContactDetail(initialContactForm);
      setErrors(initialContactForm);
    }
  };

  return (
    <Modal transparent style={{flex: 1}} visible={visibleModal}>
      <View style={globalStyles.modalStyle}>
        <View style={globalStyles.modalContainer}>
          <TextInput
            style={globalStyles.textInput}
            placeholder="Enter Member Name"
            onChangeText={e => handleState('contactName', e)}
            value={contactName}
          />
          <ErrorText message={errors.contactName} />
          <TextInput
            style={globalStyles.textInput}
            placeholder="Enter Phone Number"
            onChangeText={e => handleState('phone', e)}
            value={phone}
            maxLength={14}
            keyboardType={'number-pad'}
          />
          <ErrorText message={errors.phone} />
          <View
            style={{
              borderRadius: 20,
              margin: 20,
            }}>
            <CustomButton title="Save" handleSubmit={handleAdd} />
            <CustomButton title="Cancel" handleSubmit={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FormModal;
