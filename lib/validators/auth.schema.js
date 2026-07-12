import Joi from "joi";
import createHttpError from "http-errors";

export async function validateSignupSchema(data) {
  const signupSchema = Joi.object({
    name: Joi.string()
      .required()
      .min(5)
      .max(50)
      .error(createHttpError.BadRequest("نام کاربری وارد شده صحیح نمی باشد")),
    email: Joi.string()
      .required()
      .email()
      .error(createHttpError.BadRequest("ایمیل وارد شده صحیح نمی باشد")),
    password: Joi.string()
      .min(8)
      .required()
      .error(createHttpError.BadRequest("رمز عبور باید حداقل 8 کاراکتر باشد")),
  });
  return await signupSchema.validateAsync(data);
}

export async function validateSigninSchema(data) {
  const signinSchema = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .error(createHttpError.BadRequest("ایمیل وارد شده صحیح نمی باشد")),
    password: Joi.string()
      .min(8)
      .required()
      .error(createHttpError.BadRequest("رمز عبور باید حداقل 8 کاراکتر باشد")),
  });
  return await signinSchema.validateAsync(data);
}
