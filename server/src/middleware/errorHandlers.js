export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Błąd walidacji
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Błąd walidacji',
      errors: err.errors
    });
  }

  // Błąd autoryzacji
  if (err.name === 'UnauthorizedError' || err.status === 401) {
    return res.status(401).json({
      success: false,
      message: 'Brak autoryzacji'
    });
  }

  // Błąd dostępu
  if (err.status === 403) {
    return res.status(403).json({
      success: false,
      message: 'Brak uprawnień'
    });
  }

  // Błąd nie znaleziono
  if (err.status === 404) {
    return res.status(404).json({
      success: false,
      message: 'Zasób nie znaleziony'
    });
  }

  // Domyślny błąd serwera
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Błąd serwera',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default { errorHandler, asyncHandler };