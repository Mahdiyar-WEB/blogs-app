import Joi from "joi";
import createHttpError from "http-errors";

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

export async function validateSignupSchema(data: unknown): Promise<SignupInput> {
  const signupSchema = Joi.object<SignupInput>({
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

export async function validateSigninSchema(data: unknown): Promise<SigninInput> {
  const signinSchema = Joi.object<SigninInput>({
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
