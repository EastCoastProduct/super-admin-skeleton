export default function getChangedValues(values, initialValues) {
  let newValues = values.clear();
  values.forEach((val, key) => {
    if (val !== initialValues.get(key)) newValues = newValues.set(key, val);
  });
  return newValues;
}
