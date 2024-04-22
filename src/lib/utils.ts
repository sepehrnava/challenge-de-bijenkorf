export const cx = (
  ...classes: (string | Record<string, boolean>)[]
): string => {
  return classes
    .map((cls) => {
      if (typeof cls === "string") {
        return cls;
      } else {
        return Object.entries(cls)
          .filter(([_, value]) => value)
          .map(([key, _]) => key)
          .join(" ");
      }
    })
    .join(" ");
};
