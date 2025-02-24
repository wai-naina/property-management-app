const { AppError } = require('../utils/errors');

const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      const validationErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      next(new AppError('Validation failed', 400, validationErrors));
    }
  };
};

module.exports = validateRequest;