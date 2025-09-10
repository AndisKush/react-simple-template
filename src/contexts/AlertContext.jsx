import { createContext, useState, useContext } from 'react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
    title: 'Alerta',
  });

  const showAlert = (message, title = 'Erro') => {
    setAlertState({ isOpen: true, message, title });
  };

  const hideAlert = () => {
    setAlertState({ isOpen: false, message: '', title: '' });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Modal isOpen={alertState.isOpen} onClose={hideAlert} title={alertState.title}>
        <p>{alertState.message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button onClick={hideAlert}>OK</Button>
        </div>
      </Modal>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);