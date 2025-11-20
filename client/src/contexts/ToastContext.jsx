import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/common/Toast';
import ConfirmDialog from '../components/common/ConfirmDialog';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const showSuccess = (message) => showToast(message, 'success');
  const showError = (message) => showToast(message, 'error');

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const confirm = (message, confirmText, cancelText) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        message,
        confirmText,
        cancelText,
        onConfirm: () => {
          setConfirmDialog(null);
          resolve(true);
        },
        onCancel: () => {
          setConfirmDialog(null);
          resolve(false);
        }
      });
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, confirm }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </ToastContext.Provider>
  );
};
