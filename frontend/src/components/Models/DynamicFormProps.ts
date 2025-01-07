// DynamicFormProps
interface DynamicFormProps {
  fields: Field[];
  onSubmit: (values: { [key: string]: string }) => void;
}
