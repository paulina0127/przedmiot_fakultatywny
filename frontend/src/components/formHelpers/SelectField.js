import Select from "react-select";

import { ErrorMessage, useField } from "formik";

import "./SelectField.css";

const SelectField = ({ label, ...props }) => {
  const [field, meta, { setTouched }] = useField(props?.field.name);

  return (
    <div className="form-group mb-3">
      <label htmlFor={field.name} className="mx-2 my-2 text-muted">
        {label}
      </label>
      <Select
        classNamePrefix="selectField"
        className={`form-control rounded-pill border-2 shadow-sm px-4 py-0 ${
          meta.touched && meta.error && "is-invalid"
        }`}
        noOptionsMessage={() => "Brak opcji"}
        {...props}
        onBlur={setTouched}
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
