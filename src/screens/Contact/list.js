import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ActivityIndicator from '../../components/ActivityIndicator';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import FormModal from '../../components/FormModal';
import ListItem from '../../components/ListItem';
import LocalStorage from '../../services/LocalStorage';
import {getUniqueId} from '../../services/utils';
const dbHelper = new LocalStorage();

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [displayContacts, setDisplayContacts] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      let contactListFromDB = await dbHelper.getData('contactList');
      setContacts(contactListFromDB);
      let fetchedData =
        contactListFromDB.length > 10
          ? contactListFromDB.slice(0, 10)
          : contactListFromDB;

      setDisplayContacts(fetchedData);
    };
    getContacts();
  }, []);

  useEffect(() => {
    const handleUpdateDB = async () => {
      let contactListFromDB = await dbHelper.getData('contactList');
      if (!contacts.length && contactListFromDB?.length > 0) {
        setContacts(contactListFromDB);
        let fetchedData =
          contactListFromDB.length > 10
            ? contactListFromDB.slice(0, 10)
            : contactListFromDB;
        setDisplayContacts(fetchedData);
      }
      if (contacts && contacts?.length !== contactListFromDB?.length) {
        dbHelper.setData('contactList', contacts);
      }
    };
    handleUpdateDB();
  }, [contacts]);

  const renderListItem = (item, i) => {
    return <ListItem item={item} itemIndex={i} handleDelete={handleDelete} />;
  };

  const handleAddForm = () => {
    handleVisibleModal(true);
  };

  const handleVisibleModal = flag => {
    setVisibleModal(flag);
  };

  const handleAdd = item => {
    let newContacts = contacts && contacts.length > 0 ? [...contacts] : [];
    let id = getUniqueId();
    newContacts = [{...item, id}, ...newContacts];
    setContacts(newContacts);
    let newDisplayContacts = [{...item, id}, ...displayContacts];
    setDisplayContacts(newDisplayContacts);
    handleVisibleModal(false);
  };

  const handleCancel = () => {
    handleVisibleModal(false);
  };

  const handleDelete = deletedItem => {
    let newContacts = [...contacts];
    newContacts = newContacts?.filter((item, i) => item.id !== deletedItem.id);
    setContacts(newContacts);
    newContacts.slice(0, displayContacts.length - 1);
    setDisplayContacts(newContacts);
  };

  const handleRemove = item => {
    dbHelper.clearData('contactList');
    setContacts([]);
    setDisplayContacts([]);
  };

  const handleFetch = () => {
    let newPageSize = pageSize;
    if (newPageSize < contacts.length) {
      setLoading(true);
      let newContacts = contacts.slice(newPageSize, newPageSize + 5);
      if (newContacts) {
        let newDisplayContacts = [...displayContacts, ...newContacts];
        setDisplayContacts(newDisplayContacts);
        setPageSize(newPageSize + 5);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const renderList = () => {
    return (
      <View style={{marginVertical: 15}}>
        <FlatList
          style={{backgroundColor: 'white', height: '100%'}}
          data={displayContacts}
          renderItem={({item, index}) => renderListItem(item, index)}
          onEndReached={() => handleFetch()}></FlatList>
      </View>
    );
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
      return <ActivityIndicator isLoading={isLoading} />;
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <CustomHeader title="Team members" iconName="account-group-outline" />
      <View style={{flex: 1}}>{renderList()}</View>
      {!isLoading ? (
        <>
          {/* <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 80,
                left: 0,
                right: 0,
                margin: 30,
                borderRadius: 10,
              }}>
              <CustomButton
                title="Remove All Member"
                handleSubmit={handleRemove}
              />
            </View> */}
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 30,
              left: 0,
              right: 0,
              borderRadius: 10,
            }}>
            <CustomButton title="Add members" handleSubmit={handleAddForm} />
          </View>
        </>
      ) : null}
      {renderModalForm()}
      {renderLoader()}
    </View>
  );
};

export default ContactList;
