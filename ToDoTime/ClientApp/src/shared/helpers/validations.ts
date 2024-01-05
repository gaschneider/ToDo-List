export const validateListName = (listName: string) => {
  const result: { isValid: boolean; message?: string } = {
    isValid: true
  };

  if (listName.length < 5) {
    result.isValid = false;
    result.message = "Field name should have at least 5 characters.";
  } else if (listName.length > 20) {
    result.isValid = false;
    result.message = "Field name should have up to 20 characters.";
  }

  return result;
};
