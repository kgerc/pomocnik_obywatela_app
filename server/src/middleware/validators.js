import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Błąd walidacji',
      errors: errors.array()
    });
  }
  next();
};

export const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Podaj prawidłowy adres email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Hasło musi mieć minimum 6 znaków'),
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Imię musi mieć minimum 2 znaki'),
  validateRequest
];

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Podaj prawidłowy adres email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Hasło jest wymagane'),
  validateRequest
];

export const personalizationValidation = [
  body('liczba_dzieci')
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage('Liczba dzieci musi być liczbą od 0 do 20'),
  body('dochod_na_osobe')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Dochód musi być liczbą nieujemną'),
  body('niepelnosprawnosc')
    .optional()
    .isBoolean()
    .withMessage('Niepełnosprawność musi być wartością true/false'),
  body('status_zawodowy')
    .optional()
    .isIn(['zatrudniony', 'bezrobotny', 'student', 'emeryt'])
    .withMessage('Nieprawidłowy status zawodowy'),
  validateRequest
];

export const favoriteValidation = [
  body('itemType')
    .isIn(['swiadczenie', 'pismo', 'dotacja'])
    .withMessage('Nieprawidłowy typ elementu'),
  body('itemId')
    .notEmpty()
    .withMessage('ID elementu jest wymagane'),
  validateRequest
];

export default {
  validateRequest,
  registerValidation,
  loginValidation,
  personalizationValidation,
  favoriteValidation
};