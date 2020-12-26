import React from 'react';
import {Formik} from 'formik'
function AppForm({initialValues,onSubmit,validationSchema,chidren}) {
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
     {() =>(
         <>
            {chidren}
         </>
     )}
     </Formik>
    );
}

export default AppForm; 