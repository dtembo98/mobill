import React from 'react';
import { View ,StyleSheet} from 'react-native';
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";


const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function CheckOutScreen(props) { 



   return (
<Screen style={styles.container}>
      <AppForm
        initialValues={{ quantity: "", phone: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
      
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="calculator"
          keyboardType="numeric"
          name="quantity"
          placeholder="quantity"
       
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          name="phone"
          placeholder="customer mobile number"
          keyboardType="numeric"
        
        />
        <SubmitButton title="Checkout" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop:80
  },
});

export default CheckOutScreen;