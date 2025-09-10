import { useMemo } from "react";

export const buildLineKeysFromObject = (keyList, data) => {
  const builtKeys = keyList.map((keydata) => {
    const { name, label, parse } = keydata;

    return {
      parse,
      name,
      label,
      value: data[name] || "n/a",
    };
  });

  return builtKeys;
};

export const useLineKeys = (keyList, data) => {
  const keys = useMemo(() => {
    const builtKeys = buildLineKeysFromObject(keyList, data);

    return [...builtKeys];
  }, [data, keyList]);

  return keys;
};
