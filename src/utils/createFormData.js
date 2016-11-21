export default function createFormData(iterable) {
  const formData = new FormData();
  iterable.forEach((val, key) =>
    formData.append(key, val instanceof FileList ? val[0] : val),
  );
  return formData;
}
