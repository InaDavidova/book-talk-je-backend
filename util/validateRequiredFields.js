function validateRequiredFields(input) {
  const result = {
    name: "ValidationError",
    errors: {},
    length: 0,
  };
  for (let key in input) {
    if (!input[key]) {
      result.errors[key] = {
        path: key,
        message: `This field is required!`,
      };
      result.length += 1;
    }
  }
  return result;
}

module.exports = validateRequiredFields;
