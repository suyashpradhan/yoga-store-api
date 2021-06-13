const errorHandler = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email id already exists, please try logging in";
    return errors;
  }

  if (err.message === "invalid") {
    errors.email = "Invalid Credentials, please try again";
  }

  if (err.message.includes("User validation failed:")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = errorHandler;
