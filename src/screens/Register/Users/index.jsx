import { useEffect, useState } from "react";
import { PageHeader } from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import { StatusBadge, ActionButtons } from "../../../components/UI";
import { Modal } from "../../../components/Modal";
import { UserForm } from "./UserForm";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import { useAlert } from "../../../contexts/AlertContext";
import { useConfirm } from "../../../contexts/ConfirmationContext";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { showAlert } = useAlert();
  const confirm = useConfirm();

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      showAlert(
        "Não foi possível carregar os usuários. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = async (skipConfirmation) => {
    if(skipConfirmation === true){
      setEditingUser(null);
      setModalOpen(false);
      return
    }
    const confirmed = await confirm(`Tem certeza que deseja sair?`, "Sair");
    if (confirmed) {
      setEditingUser(null);
      setModalOpen(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        showAlert("Usuário atualizado com sucesso!", "Sucesso");
      } else {
        await createUser(formData);
        showAlert("Usuário criado com sucesso!", "Sucesso");
      }
      handleCloseModal(true);
      loadUsers();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Ocorreu um erro ao salvar o usuário.";
      // NestJS retorna um array de mensagens para erros de validação
      const displayMsg = Array.isArray(errorMsg)
        ? errorMsg.join(", ")
        : errorMsg;
      showAlert(displayMsg);
    }
  };

  const handleDelete = async (user) => {
    const confirmed = await confirm(
      `Tem certeza que deseja excluir o usuário "${user.name}"? Esta ação não pode ser desfeita.`,
      "Confirmar Exclusão"
    );

    if (confirmed) {
      try {
        await deleteUser(user.id);
        showAlert("Usuário excluído com sucesso!", "Sucesso");
        loadUsers(); // Recarrega a lista
      } catch (error) {
        showAlert(
          error.response?.data?.message || "Ocorreu um erro ao excluir."
        );
      }
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Nome", accessor: "name" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Status",
      accessor: "status",
      // Função de renderização customizada para mostrar um badge
      Cell: ({ value }) => <StatusBadge status={value}>{value}</StatusBadge>,
    },
    {
      Header: "Ações",
      align: "center",
      Cell: ({ row }) => (
        <ActionButtons>
          <button onClick={() => handleOpenModal(row)}>✏️</button>
          <button onClick={() => handleDelete(row)}>🗑️</button>
        </ActionButtons>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Usuários"
        buttonLabel="Adicionar Usuário"
        onClickButton={() => handleOpenModal()}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <DataTable data={users} columns={columns} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingUser
            ? `Editar Usuário: ${editingUser.name}`
            : "Adicionar Novo Usuário"
        }
      >
        <UserForm
          initialData={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default UsersScreen;
