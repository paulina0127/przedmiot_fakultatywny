import { ErrorMessage, Field, useField } from "formik";

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <Field
        as="textarea"
        className={`form-control rounded border-2 shadow-sm px-4 ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error mt-2 text-danger"
      />
    </div>
  );
};
