import React from 'react';
import {useFormikContext} from 'formik'
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({name,width,...otherProps }) {
    const {touched,setFieldTouched,errors,handleChange} = useFormikContext()
    return (
       <>
        <AppTextInput
      
        onBlur = {() =>setFieldTouched(name)}
        onChangeText = {handleChange(name)}
        width={width}
        {...otherProps}
        />
        <ErrorMessage error={errors[name]}  visible={touched[name]}/>
       </>
    );
}

export default AppFormField;