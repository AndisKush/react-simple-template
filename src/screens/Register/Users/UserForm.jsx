import { useState } from "react";
import styled from "styled-components";
import { Input } from "../../../components/Input";
import { InputPassword } from "../../../components/InputPassword";
import { Button } from "../../../components/Button";
import { useAlert } from "../../../contexts/AlertContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div``;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const UserForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
    confirmPassword: "",
    status: initialData?.status || "ativo",
  });
  const [showPassword, setShowPassword] = useState(!initialData); // Mostra senha se for novo usuário
  const { showAlert } = useAlert();

  const isEditing = !!initialData;

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "ativo" : "inativo") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showPassword && formData.password !== formData.confirmPassword) {
      showAlert("As senhas não são iguais");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Nome</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Email</label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      {isEditing && (
        <label>
          <input
            name="status"
            type="checkbox"
            checked={formData.status === "ativo"}
            onChange={handleChange}
          />
          Ativo
        </label>
      )}

      {isEditing && (
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Alterar Senha
        </label>
      )}

      {showPassword && (
        <>
          <FormGroup>
            <label>Senha (mínimo 6 caracteres)</label>
            <InputPassword
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditing}
            />
          </FormGroup>
          <FormGroup>
            <label>Confirmar Senha</label>
            <InputPassword
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!isEditing}
            />
          </FormGroup>
        </>
      )}

      <Actions>
        <Button
          type="button"
          onClick={onCancel}
          style={{ backgroundColor: "#6c757d" }}
        >
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </Actions>
    </Form>
  );
};
