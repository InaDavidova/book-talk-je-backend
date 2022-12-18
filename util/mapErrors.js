function mapErrors(err) {
  if (err.name == "MongoServerError" && err.code == 11000) {
    const key = Object.keys(err.keyValue)[0];
    return [{ general: `This ${key} already exists!` }];

  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).reduce(
      (acc, e) => ([ ...acc, {general: e.message }]),
      []
    );

  } else if ( err.name == "customError") {
    return [{ general: err.message }];
    
  } else if (typeof err.message == "string") {
    return [{ general: err.message }];
    
  } else {
    return [{ general: "Request error" }];
  }
}

module.exports = mapErrors;