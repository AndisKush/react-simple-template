import { createContext, useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";

// Estilos para os botões do diálogo
const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ConfirmationContext = createContext(null);

export const ConfirmationProvider = ({ children }) => {
  const [options, setOptions] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  // O 'resolver' é a chave da nossa lógica. Ele guardará a função 'resolve' da Promise.
  const [resolver, setResolver] = useState(null);

  // Esta é a função que nossos componentes irão chamar.
  // Ela retorna uma Promise que será resolvida com 'true' ou 'false'.
  const confirm = useCallback(
    (message, title = "Confirmação", buttonText = title) => {
      return new Promise((resolve) => {
        setOptions({
          isOpen: true,
          title,
          message,
          buttonText,
        });
        // Armazenamos a função 'resolve' no estado para usá-la nos botões.
        setResolver(() => resolve);
      });
    },
    []
  );

  const handleConfirm = () => {
    if (resolver) {
      resolver(true); // Resolve a Promise com 'true'
    }
    setOptions({ isOpen: false, title: "", message: "" });
  };

  const handleCancel = () => {
    if (resolver) {
      resolver(false); // Resolve a Promise com 'false'
    }
    setOptions({ isOpen: false, title: "", message: "" });
  };

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}
      <Modal
        isOpen={options.isOpen}
        onClose={handleCancel}
        title={options.title}
      >
        <p>{options.message}</p>
        <DialogActions>
          <Button onClick={handleCancel} style={{ backgroundColor: "#6c757d" }}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            style={{ backgroundColor: "#DC3545" }}
          >
            {options.buttonText}
          </Button>
        </DialogActions>
      </Modal>
    </ConfirmationContext.Provider>
  );
};

// Nosso hook customizado para usar o diálogo facilmente
export const useConfirm = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirm deve ser usado dentro de um ConfirmationProvider"
    );
  }
  return context;
};
