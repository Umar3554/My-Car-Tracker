// Field
interface Field {
  type:
    | "button"
    | "textarea"
    | "text"
    | "email"
    | "password"
    | "radio"
    | "checkbox"
    | "dropdown"
    | "calendar"
    | "uploader";
  name: string;
  placeholder?: string;
  label?: string;
  options?: string[]; // For dropdown, radio
  value?: string;
  onChange?: (value: string) => void;
  onPress?: () => void; // For button
}
