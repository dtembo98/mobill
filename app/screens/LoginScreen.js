import React,{useState,useContext} from 'react';
import Screen from '../components/Screen'
import { Image, StyleSheet } from 'react-native'
import * as yup from 'yup'
import {ErrorMessage ,AppForm,AppFormField,SubmitButton } from '../components/forms/index'
import authApi from '../api/auth'
import useAuth from '../auth/useAuth';

const validationSchema = yup.object().shape({
    phone:yup.string().required().label("Phone number"),
    password:yup.string().required().min(4).label("Password")
})

function LoginScreen(props) {
const {logIn} = useAuth()
const [loginFailed,setLoginFailed] = useState(false)

    const handleSubmit = async({phone,password}) =>
    {
    
      const result = await authApi.login(phone,password) 
      console.log(result)
      if(!result.ok) return setLoginFailed(true)
      setLoginFailed(false)
      logIn(result.data.token)
    
      

    }
    
    return (
    <Screen style={styles.container}>
        <Image 
        style={styles.logo}
        source={require("../assets/MM_logo.jpg")}/>



<AppForm
        initialValues={{phone:'',password:''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        >

          <ErrorMessage error="invalid email and/or password" visible={loginFailed}/>  
        <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        icon="phone"
        name="phone"
        placeholder="Mobile"
        
        
        />
        <AppFormField
       
       autoCapitalize="none"
         autoCorrect={false}
         icon="lock"
         name="password"
         placeholder="password"
         secureTextEntry
         textContentType="password"
          />
       <SubmitButton title="Login"/>
           
        </AppForm>
        
      
    
      
    </Screen>
    );
}
const styles = StyleSheet.create({
    container:{
        padding:10
    },
    logo:{
        width:80,
        height:80,
        alignSelf:'center',
        marginTop:10,
        marginBottom:0
    
    }
    
})
export default LoginScreen;