export default function createFormData(iterable) {
  const formData = new FormData();
  for (const [key, value] of iterable) {
    formData.append(key, value instanceof FileList ? value[0] : value);
  }
  return formData;
}
