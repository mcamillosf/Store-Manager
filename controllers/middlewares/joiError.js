const joi = require('joi');

module.exports = (error, req, res, next) => {
  if (!joi.isError(error)) {
    return next(error);
  }
  
  // if (error.details[0].type === 'number.base') {
  //   console.log(error, 'number base');
  //   // console.log(error.details[0].type, 'joierror');
  //   return res.status(400).json({ message: error.message })
  // }
  // if (error.details[0].type === 'string.min') {
  //   console.log(error, 'string min');
  //   return res.status(400).json({ message: error.message })
  // }

  res.status(422).json({ code: 'unprocessable_entity', message: error.message });
};
