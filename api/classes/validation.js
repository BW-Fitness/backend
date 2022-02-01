const Joi = require('joi');

const classesSchema = Joi.object({
  class_name: Joi.string().trim().required(),
  class_type: Joi.string().trim().required(),
  class_start_time: Joi.string().trim().required(),
  class_duration: Joi.string().trim().required(),
  class_intensity: Joi.string().trim().required(),
  class_location: Joi.string().trim().required(),
  class_registered_attendees: Joi.string().default('0'),
  class_max_size: Joi.string().trim().required()
});

module.exports = classesSchema;
