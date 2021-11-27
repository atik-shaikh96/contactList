import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import ContactList from '../screens/Contact/list';
import ActivityIndicatorLoader from '../components/ActivityIndicator';

//All Screens/Routes will go here
const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);

  //Like Splash screen we are waiting here for 1 sec. for safely initialize our App.(Like LocalStorage,etc.)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <ActivityIndicatorLoader isLoading={isLoading} position="center" />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ContactList />
    </SafeAreaView>
  );
};

export default Routes;
