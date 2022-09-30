import { SwitchInput } from "../SwitchInput";
import { PermissionsContainer, PermissionColumn } from "./styles";

export function UserPermissions() {
  const permissions = [
    {
      title: 'Geral',
      perms: [{ sigla: "0000", label: "Atividades gerais ao sistema" }]
    },
    {
      title: "Unidades",
      perms: [
        {
          sigla: "A001",
          label: "Cadastro novo"
        },
        {
          sigla: "A002",
          label: "Listar todos"
        },
        {
          sigla: "A003",
          label: "Visualizar registro"
        },
        {
          sigla: "A004",
          label: "Atualizar cadastro"
        },
        {
          sigla: "A005",
          label: "Desativar registro"
        }
      ]
    },
    {
      title: "Colaboradores",
      perms: [
        {
          sigla: "B001",
          label: "Cadastro novo"
        },
        {
          sigla: "B002",
          label: "Listar todos"
        },
        {
          sigla: "B003",
          label: "Visualizar registro"
        },
        {
          sigla: "B004",
          label: "Atualizar cadastro"
        },
        {
          sigla: "B005",
          label: "Desativar registro"
        }
      ]
    },
    {
      title: "Usuários",
      perms: [
        {
          sigla: "C001",
          label: "Cadastro novo"
        },
        {
          sigla: "C002",
          label: "Listar todos"
        },
        {
          sigla: "C003",
          label: "Visualizar registro"
        },
        {
          sigla: "C004",
          label: "Visualizar LOGs"
        },
        {
          sigla: "C005",
          label: "Atualizar cadastro"
        },
        {
          sigla: "C006",
          label: "Desativar registro"
        }
      ]
    },
    {
      title: "Fornecedores",
      perms: [
        {
          sigla: "D001",
          label: "Cadastro novo"
        },
        {
          sigla: "D002",
          label: "Listar todos"
        },
        {
          sigla: "D003",
          label: "Visualizar registro"
        },
        {
          sigla: "D004",
          label: "Atualizar cadastro"
        },
        {
          sigla: "D005",
          label: "Desativar registro"
        }
      ]
    },
    {
      title: "Parceiros",
      perms: [
        {
          sigla: "E001",
          label: "Cadastro novo"
        },
        {
          sigla: "E002",
          label: "Listar todos"
        },
        {
          sigla: "E003",
          label: "Visualizar registro"
        },
        {
          sigla: "E004",
          label: "Atualizar registro"
        },
        {
          sigla: "E005",
          label: "Desativar registro"
        }
      ]
    },
    {
      title: "Clientes",
      perms: [
        {
          sigla: "F001",
          label: "Cadastro novo"
        },
        {
          sigla: "F002",
          label: "Listar todos"
        },
        {
          sigla: "F003",
          label: "Visualizar registro"
        },
        {
          sigla: "F004",
          label: "Atualizar registro"
        },
        {
          sigla: "F005",
          label: "Desativar registro"
        },
        {
          sigla: "F006",
          label: "Auditar registro"
        }
      ]
    },
    {
      title: "Configurações",
      perms: [
        {
          sigla: "Z001",
          label: "Colaboradores: Departamentos"
        },
        {
          sigla: "Z002",
          label: "Colaboradores: Funções"
        },
        {
          sigla: "Z003",
          label: "Fornecedores: Serviços"
        },
        {
          sigla: "Z004",
          label: "Parceiros: Serviços"
        }
      ]
    }
  ];

  return (
    <PermissionsContainer>
      {permissions.map((permItem) => (
        <PermissionColumn key={permItem.title}>
          <strong>{permItem.title}</strong>
          {permItem.perms.map(item => (
            <div key={item.sigla}>
              <p>{item.sigla}</p>
              <SwitchInput
                valueLabel={item.label}
              />
            </div>
          ))}
        </PermissionColumn>
      ))}
    </PermissionsContainer>
  )
}