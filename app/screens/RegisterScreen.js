import React,{useState} from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from "../components/forms";
import userApi from '../api/users'
import useAuth from "../auth/useAuth";
import authApi from '../api/auth'
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  phone: Yup.string().required().label("Phone number"),
  password: Yup.string().required().min(4).label("Password"),
});


function RegisterScreen() {
  const auth = useAuth()
const [error,setError] = useState()

  const handleSubmit = async(userInfo) =>
  {
    const result = await userApi.register(userInfo)
    if(!result.ok) 
    {
      if(result.data) setError(result.data.error)
      else{
        setError("An unexpected error occured.")
        console.log(result)
      }
      return
    }
    const {data} = await authApi.login(userInfo.phone,userInfo.password)
    console.log("fro reg scren",data.token)
    auth.logIn(data.token)


  }


  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ name: "", phone: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
      {error &&   <ErrorMessage error={error} visible={true}/> }
        <AppFormField
          autoCorrect={false} 
          icon="account"
          name="name"
          placeholder="Name"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          keyboardType="numeric"
          name="phone"
          placeholder="Mobile number"
         
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
