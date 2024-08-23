export const isAcceptedAnswer = (value: any): boolean => {
    if (
      value == null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      return false;
    } else return true;
  };