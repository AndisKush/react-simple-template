import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- 1. IMPORTADO AQUI
import styled, { keyframes } from "styled-components";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from '../../contexts/AuthContext';

// ... (todo o código de styled-components e keyframes permanece o mesmo)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.surface}
  );
`;

const LoginForm = styled.form`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 0.5s ease-out;
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;


const LoginScreen = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // <-- 2. INICIALIZADO O HOOK
  const [email, setEmail] = useState("admin@teste.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login({ email, password });

    // --- 3. LÓGICA ATUALIZADA ---
    if (result.success) {
      // Se o login for bem-sucedido, navegamos para a rota principal.
      // O AuthContext já atualizou o estado, então a rota estará protegida.
      navigate('/');
    } else {
      // Se falhar, mostramos o erro e paramos o loading.
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>AUTOPEÇAS SYS</Title>
        <InputGroup>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginScreen;