import { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  padding-right: 40px; /* espaço pro ícone */
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, error }) =>
        error ? "rgba(220, 53, 69, 0.25)" : `rgba(0, 123, 255, 0.25)`};
  }

  ${({ error, theme }) =>
    error &&
    `
    border-color: ${theme.colors.error};
  `}
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export function InputPassword({ value, onChange, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputWrapper>
      <StyledInput
        {...props}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
      />
      <ToggleButton
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </ToggleButton>
    </InputWrapper>
  );
}
