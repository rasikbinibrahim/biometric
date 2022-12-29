import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Alert, View, BackHandler } from "react-native";
import TouchID from 'react-native-touch-id';

const App = () => {
const [isAuth, setISAuth] = useState(false);

var optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

  useEffect(() => {
    handleBiometric
  });

  const handleBiometric = () => {
    TouchID.isSupported(optionalConfigObject).then(biometricype => {
      console.log(biometricype);
      if (biometricype == false){
        console.log('false')
      } else  {
        console.log('TouchID or FaceID is Support')
        if (isAuth){
          return null
        }
        TouchID.authenticate("",optionalConfigObject).then((success) => {
          console.log("Success",success);
          setISAuth(success);
        }).catch((err) => {
          Alert(err);
          // BackHandler.exitApp();
        })
      }
    });

    
  };




  return(
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={() => handleBiometric()} title='Press Me' />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},
buttonContainer: {
  margin: 20,
},
alternativeLayoutButtonContainer: {
  margin: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
});
