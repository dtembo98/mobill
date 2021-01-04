import React from 'react';
import {useFormikContext} from 'formik'
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({name,width, func ,...otherProps }) {
   
    const barcode = otherProps.barcode
    
    const {
        touched,
        setFieldTouched,
        setFieldValue,
        values,
        errors
       } = useFormikContext()
    //     values.barcode = barcode
    //    console.log('this value is from listings barcode', values)
       
    return (
       <>
        <AppTextInput
        onBlur = {() =>setFieldTouched(name)}
        onChangeText = {func}
        value={values[name]}
        width={width}
        {...otherProps}
        />
        {/* <ErrorMessage error={errors[name]}  visible={touched[name]}/> */}
       </>
    );
}

export default AppFormField;