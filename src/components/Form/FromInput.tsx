  
import React  from 'react';
import { FormikValues } from 'formik'
import { FormLabel, FormControl, Input, FormHelperText } from '@material-ui/core';

type FieldFormType = {
    name: string
    field: FormikValues
    form: FormikValues
    placeholder: string
    type?: string
    label: string
}

const FieldForm: React.FC<FieldFormType> = ({ name, field, placeholder, form, type }) => {
    console.log("Field",  field )
    console.log("Form error",  form.errors.name )
    const typeInput = type === "" ? "text" : "textarea"
    return (
        <FormControl>
                  <Input {...field} name={name} {...{placeholder}} type={typeInput} style={{ alignSelf: "center"}} />
                  <FormHelperText>{form.errors.name}</FormHelperText>
         </FormControl>
    );
};

export default FieldForm;