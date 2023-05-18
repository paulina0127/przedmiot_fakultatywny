import Select from "react-select";

import { ErrorMessage, useField } from "formik";

import "./SelectField.css";

const SelectField = ({ field, form, label, ...props }) => {
  const meta = useField(props);
  return (
    <div className="form-group mb-3">
      <label htmlFor={field.name} className="mx-2 my-2 text-muted">
        {label}
      </label>
      <Select
        classNamePrefix="selectField"
        className={`form-control rounded-pill border-2 shadow-sm px-4 ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        noOptionsMessage="Brak opcji"
        onChange={(selectedOption) =>
          form.setFieldValue(field.name, selectedOption)
        }
        onBlur={() => form.setFieldTouched(field.name, true)}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error mt-2 text-danger"
      />
    </div>
  );
};

export default SelectField;
