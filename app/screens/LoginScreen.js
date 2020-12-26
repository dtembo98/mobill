import React from 'react';
import Screen from '../components/Screen'
import { Image, StyleSheet } from 'react-native'
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {Formik} from 'formik'
import * as yup from 'yup'
import AppText from '../components/AppText';
import ErrorMessage from '../components/ErrorMessage';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';
import AppForm from '../components/AppForm';

const validationSchema = yup.object().shape({
    email:yup.string().required().email().label("Email"),
    password:yup.string().required().min(4).label("Password")
})

function LoginScreen(props) {

    
    return (
    <Screen style={styles.container}>
        <Image 
        style={styles.logo}
        source={require("../assets/mm_logo.png")}/>



<AppForm
        initialValues={{email:'',password:''}}
        onSubmit={values =>console.log(values)}
        validationSchema={validationSchema}
        >
            <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        icon="email"
        name="email"
        placeholder="Email"
        textContentType="emailAddress"
        
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
      
      {/* <Formik
        initialValues={{email:'',password:''}}
        onSubmit={values =>console.log(values)}
        validationSchema={validationSchema}
        >
            {
                ({handleSubmit})=>(
                      <>
         <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        icon="email"
        name="email"
        placeholder="Email"
        textContentType="emailAddress"
        
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
      
                      </>
                )
            }

        </Formik> */}
        
      
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
        marginTop:50,
        marginBottom:20
    
    }
    
})
export default LoginScreen;