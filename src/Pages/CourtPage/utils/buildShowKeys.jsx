const getDepthValue = (fieldValues) =>
  (fieldValues.find((one) => one.checked) || { labe: "n/a" }).label;

export const buildShowKeys = (cofileData) => {
  const showKeys = cofileData
    .filter((item) => {
      const { keyName } = item;

      return !["image", "screenName"].includes(keyName);
    })
    .map((item) => {
      const { keyName, value = "n/a", text, fieldValues = {} } = item;

      const keyValue = keyName == "depth" ? getDepthValue(fieldValues) : value;

      return {
        name: keyName,
        value: keyValue || "n/a",
        label: text,
      };
    });

  return showKeys;
};
