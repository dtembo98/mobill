import React,{useState} from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from "../components/forms";
import userApi from '../api/users'
import useAuth from "../auth/useAuth";
import authApi from '../api/auth'
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";



const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  phone: Yup.string().required().label("Phone number"),
  password: Yup.string().required().min(4).label("Password"),
});


function RegisterScreen() {

  const registerApi = useApi(userApi.register)
  const loginApi = useApi(authApi.login)

  const auth = useAuth()
  const [error,setError] = useState()

  const handleSubmit = async(userInfo) =>
  {
    const result = await registerApi.request(userInfo)
    console.log("from registration screen",result)
    if(!result.ok) 
    {
      if(result.data) setError(result.data.error)
      else{
        setError("An unexpected error occured.")
        console.log(result)
      }
      return
    }
    // const {data} = await authApi.login(userInfo.phone,userInfo.password)
    // auth.logIn(data.token)

    const {data} = await loginApi.request(userInfo.phone,userInfo.password)
    auth.logIn(data.token)


  }


  return (
    <Screen style={styles.container}>

      <ActivityIndicator visible={registerApi.loading || loginApi.loading}/>
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
