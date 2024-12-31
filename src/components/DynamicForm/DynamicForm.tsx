import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TextInput from "../TextInput/TextInput";
import TextArea from "../TextArea/TextArea";
import RadioButton from "../RadioButton/RadioButton";
import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import Calendar from "../Calendar/Calendar";
import Uploader from "../Uploader/Uploader";
import Button from "../Button/Button";

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = React.useState<{ [key: string]: any }>(
    {}
  );

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <View style={styles.container}>
      {fields.map((field, index) => {
        const renderField = () => {
          switch (field.type) {
            case "text":
            case "email":
            case "password":
              return (
                <View key={index}>
                  {field.label && (
                    <Text style={styles.label}>{field.label}</Text>
                  )}
                  <TextInput
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    onChangeText={(value) => handleChange(field.name, value)}
                    secureTextEntry={field.type === "password"}
                    keyboardType={
                      field.type === "email" ? "email-address" : "default"
                    }
                  />
                </View>
              );

            case "textarea":
              return (
                <View key={index}>
                  {field.label && (
                    <Text style={styles.label}>{field.label}</Text>
                  )}
                  <TextArea
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    onChangeText={(value) => handleChange(field.name, value)}
                  />
                </View>
              );

            case "radio":
              return (
                <View key={index}>
                  {field.label && (
                    <Text style={styles.label}>{field.label}</Text>
                  )}
                  <RadioButton
                    options={field.options || []}
                    selected={formValues[field.name]}
                    onChange={(value: any) => handleChange(field.name, value)}
                  />
                </View>
              );

            case "checkbox":
              return (
                <View key={index}>
                  {field.label && (
                    <Text style={styles.label}>{field.label}</Text>
                  )}
                  <Checkbox
                    label={field.label || "Default Label"}
                    checked={!!formValues[field.name]}
                    onChange={(value: boolean) =>
                      handleChange(field.name, value)
                    }
                  />
                </View>
              );

            case "dropdown":
              const dropdownOptions = (field.options || []).map((option) => ({
                label: option,
                value: option,
              }));
              return (
                <View key={index}>
                  {field.label && (
                    <Text style={styles.label}>{field.label}</Text>
                  )}
                  <Dropdown
                    options={dropdownOptions}
                    selectedValue={formValues[field.name]}
                    onValueChange={(value) => handleChange(field.name, value)}
                  />
                </View>
              );

            case "calendar":
              return (
                <View key={index}>
                  {field.label && (
                    <Text style={styles.label}>{field.label}</Text>
                  )}
                  <Calendar
                    selectedDate={formValues[field.name]}
                    onDateChange={(value) => handleChange(field.name, value)}
                  />
                </View>
              );

            case "uploader":
              return (
                <View key={index}>
                  {field.label && (
                    <Text style={styles.label}>{field.label}</Text>
                  )}
                  <Uploader
                    label={field.label}
                    onUpload={(uri: string) => handleChange(field.name, uri)}
                    fileUri={formValues[field.name]}
                  />
                </View>
              );

            case "button":
              return (
                <Button
                  key={index}
                  title={field.label || "Submit"}
                  onPress={field.onPress ? field.onPress : handleSubmit}
                />
              );

            default:
              return null; // For unsupported field types
          }
        };

        return renderField();
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
});

export default DynamicForm;
