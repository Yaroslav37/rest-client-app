import { describe, it, expect } from 'vitest';
import { validationSchema } from '@/lib/yup/schema';

describe('validationSchema', () => {
  describe('email validation', () => {
    it('should reject empty email', async () => {
      await expect(validationSchema.validateAt('email', { email: '' })).rejects.toThrow(
        'validation.email.required',
      );
    });

    it('should reject invalid email format', async () => {
      await expect(
        validationSchema.validateAt('email', { email: 'invalid-email' }),
      ).rejects.toThrow('validation.email.invalid');
    });

    it('should accept valid email', async () => {
      await expect(
        validationSchema.validateAt('email', { email: 'valid@example.com' }),
      ).resolves.toBeTruthy();
    });
  });

  describe('password validation', () => {
    it('should reject empty password', async () => {
      const data = {
        email: 'test@example.com',
        password: '',
        passwordConfirm: 'anything',
      };

      await expect(validationSchema.validate(data)).rejects.toThrow(
        'validation.passwordConfirm.match',
      );
    });

    it('should reject password shorter than 8 characters', async () => {
      await expect(
        validationSchema.validateAt('password', { password: 'Short1!' }),
      ).rejects.toThrow('validation.password.minLength');
    });

    it('should reject password without numbers', async () => {
      await expect(
        validationSchema.validateAt('password', { password: 'Password!' }),
      ).rejects.toThrow('validation.password.hasNumber');
    });

    it('should reject password without uppercase letters', async () => {
      await expect(
        validationSchema.validateAt('password', { password: 'password1!' }),
      ).rejects.toThrow('validation.password.hasUpperCase');
    });

    it('should reject password without lowercase letters', async () => {
      await expect(
        validationSchema.validateAt('password', { password: 'PASSWORD1!' }),
      ).rejects.toThrow('validation.password.hasLowerCase');
    });

    it('should reject password without special characters', async () => {
      await expect(
        validationSchema.validateAt('password', { password: 'Password1' }),
      ).rejects.toThrow('validation.password.hasSpecialChar');
    });

    it('should accept valid password', async () => {
      await expect(
        validationSchema.validateAt('password', { password: 'ValidPass1!' }),
      ).resolves.toBeTruthy();
    });
  });

  describe('passwordConfirm validation', () => {
    it('should reject empty password confirmation', async () => {
      const data = {
        email: 'test@example.com',
        password: 'ValidPass1!',
        passwordConfirm: '',
      };

      await expect(validationSchema.validate(data)).rejects.toThrow(
        'validation.passwordConfirm.match',
      );
    });

    it('should reject when passwords do not match', async () => {
      await expect(
        validationSchema.validateAt('passwordConfirm', {
          password: 'ValidPass1!',
          passwordConfirm: 'Different1!',
        }),
      ).rejects.toThrow('validation.passwordConfirm.match');
    });

    it('should accept when passwords match', async () => {
      await expect(
        validationSchema.validateAt('passwordConfirm', {
          password: 'ValidPass1!',
          passwordConfirm: 'ValidPass1!',
        }),
      ).resolves.toBeTruthy();
    });
  });

  describe('full schema validation', () => {
    it('should validate complete valid form', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'ValidPass1!',
        passwordConfirm: 'ValidPass1!',
      };

      await expect(validationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should reject incomplete form', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'ValidPass1!',
        passwordConfirm: 'Different1!',
      };

      await expect(validationSchema.validate(invalidData)).rejects.toThrow(
        'validation.passwordConfirm.match',
      );
    });
  });
});
