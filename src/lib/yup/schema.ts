import * as yup from 'yup';

const hasNumber = /\p{N}/u;
const hasUpperCase = /\p{Lu}/u;
const hasLowerCase = /\p{Ll}/u;
const hasSpecialChar = /[^\p{L}\p{N}]/u;
const minLength = 8;

export const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(hasNumber, 'Password must contain at least 1 number')
    .matches(hasUpperCase, 'Password must contain at least 1 uppercase letter')
    .matches(hasLowerCase, 'Password must contain at least 1 lowercase letter')
    .matches(hasSpecialChar, 'Password must contain at least 1 special character')
    .min(minLength, `Password must be at least ${minLength} characters`)
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
