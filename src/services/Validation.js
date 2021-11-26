export const contactValidation = model => {
  let {contactName, phone} = model;
  let phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  let errors = {};
  let errorFound = false;
  if (!contactName) {
    errors.contactName = 'Please Enter Contact Name!';
    errorFound = true;
  }
  if (!phone) {
    errors.phone = 'Please Enter Phone Number';
    errorFound = true;
  }
  if (phone && !phone.match(phoneNumberRegex)) {
    errors.phone = 'Please Enter Valid Phone Number!';
    errorFound = true;
  }
  return {errors, errorFound};
};

export const duplicateRecord = (insertedData, list) => {
  let contactList = [...list];
  let isDuplicate = false;
  contactList?.forEach((item, i) => {
    if (item.phone === insertedData.phone) {
      isDuplicate = true;
      contactList.length = 0; //to break loop here
    }
  });
  return isDuplicate;
};
