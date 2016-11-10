export default function createFormData(iterable) {
  const formData = new FormData();
  const entries = Object.entries(iterable);
  entries.forEach(elm =>
    formData.append(elm[0], elm[1] instanceof FileList ? elm[1][0] : elm[1]),
  );
  return formData;
}
