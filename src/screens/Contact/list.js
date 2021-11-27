import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ActivityIndicator from '../../components/ActivityIndicator';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import FormModal from '../../components/FormModal';
import ListItem from '../../components/ListItem';
import NoDataFound from '../../components/NoDataFound';
import {initialContacts} from '../../config/constants';
import {globalStyles} from '../../config/styles';
import LocalStorage from '../../services/LocalStorage';
import {
  handleAddItemToList,
  handleDeleteItemFromList,
  handleFetchPagination,
  startingTenRecord,
} from '../../services/utils';
const dbHelper = new LocalStorage();

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [displayContacts, setDisplayContacts] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);

  // Hook for first time initialize All contacts. If Contacts already exits the we are store in local state to display.
  // Note: We are using two states here, Like we are using "contacts" state for storing all DB records(In future we can fetch from Mobile device or API).
  // And Second state "displayContacts" we are using for listing Contacts by Pagination.
  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      let contactListFromDB = await dbHelper.getData('contactList');
      if (contactListFromDB?.length > 0) {
        updateContactList(contactListFromDB);
      } else {
        updateContactList(initialContacts);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getContacts();
  }, []);

  //This hooks we are using for updating our Local Storage(AsyncStorage/Local DB) by comparing Local State.
  //Whenever Local State update, it will update Local DB.
  useEffect(() => {
    const handleUpdateDB = async () => {
      let contactListFromDB = await dbHelper.getData('contactList');
      if (!contacts.length && contactListFromDB?.length > 0) {
        updateContactList(contactListFromDB);
      }
      if (contacts && contacts?.length !== contactListFromDB?.length) {
        dbHelper.setData('contactList', contacts);
      }
    };
    handleUpdateDB();
  }, [contacts]);

  const updateContactList = contactListFromDB => {
    setContacts(contactListFromDB);
    // Here we are first showing 10 record because screen size is much big and showing 5 records only is not looking good.
    // So for first time we are displaying 10 and then whenever user reached bottom of the list next 5 record will display.
    let initialDisplayList = startingTenRecord(contactListFromDB);
    setDisplayContacts(initialDisplayList);
  };

  const handleAddForm = () => {
    handleVisibleModal(true);
  };

  const handleVisibleModal = flag => {
    setVisibleModal(flag);
  };

  const handleAdd = item => {
    let {newList, newListToDisplay} = handleAddItemToList(
      item,
      contacts,
      displayContacts,
    );
    setContacts(newList);
    setDisplayContacts(newListToDisplay);
    handleVisibleModal(false);
  };

  const handleCancel = () => {
    handleVisibleModal(false);
  };

  const handleDelete = deletedItem => {
    let {newList, displayedList} = handleDeleteItemFromList(
      deletedItem,
      contacts,
      displayContacts.length,
    );
    setContacts(newList);
    setDisplayContacts(displayedList);
  };

  //Pagination Event
  const handleFetch = () => {
    if (pageSize < contacts.length) {
      setLoading(true);
      let status = handleFetchPagination(pageSize, contacts, displayContacts);
      if (status) {
        let {newPageSize, newListToDisplay} = status;
        setDisplayContacts(newListToDisplay);
        setPageSize(newPageSize);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const renderListItem = (item, i) => {
    return <ListItem item={item} itemIndex={i} handleDelete={handleDelete} />;
  };

  const renderList = () => {
    if (displayContacts && displayContacts.length > 0) {
      return (
        <View style={{marginVertical: 15}}>
          <FlatList
            style={{backgroundColor: 'white', height: '100%'}}
            data={displayContacts}
            renderItem={({item, index}) => renderListItem(item, index)}
            onEndReached={() => handleFetch()}></FlatList>
        </View>
      );
    }
    return <>{!isLoading ? <NoDataFound label="Contacts" /> : null}</>;
  };

  const renderModalForm = () => {
    return (
      <FormModal
        visibleModal={visibleModal}
        handleAdd={handleAdd}
        handleCancel={handleCancel}
        list={[...contacts]}></FormModal>
    );
  };

  const renderLoader = () => {
    if (isLoading) {
      return <ActivityIndicator isLoading={isLoading} position="bottom" />;
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <CustomHeader title="Team members" iconName="account-group-outline" />
      <View style={{flex: 1}}>{renderList()}</View>
      {!isLoading ? (
        <View style={globalStyles.buttonWrapper}>
          <CustomButton title="Add members" handleSubmit={handleAddForm} />
        </View>
      ) : null}
      {renderModalForm()}
      {renderLoader()}
    </View>
  );
};

export default ContactList;
