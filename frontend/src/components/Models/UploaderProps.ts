interface UploaderProps {
  onUpload: (uri: string) => void;
  fileUri?: string;
  label?: string;
}
