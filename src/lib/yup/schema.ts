import * as yup from 'yup';

const hasNumber = /\p{N}/u;
const hasUpperCase = /\p{Lu}/u;
const hasLowerCase = /\p{Ll}/u;
const hasSpecialChar = /[^\p{L}\p{N}]/u;
const minLength = 8;

export const validationSchema = yup.object().shape({
  email: yup.string().email('validation.email.invalid').required('validation.email.required'),
  password: yup
    .string()
    .matches(hasNumber, 'validation.password.hasNumber')
    .matches(hasUpperCase, 'validation.password.hasUpperCase')
    .matches(hasLowerCase, 'validation.password.hasLowerCase')
    .matches(hasSpecialChar, 'validation.password.hasSpecialChar')
    .min(minLength, 'validation.password.minLength')
    .required('validation.password.required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'validation.passwordConfirm.match')
    .required('validation.passwordConfirm.required'),
});
