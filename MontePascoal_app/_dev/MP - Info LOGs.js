// ### post
LogsController.logsCreate(useId, perId, logMsg, `=> ${useId} # Usuário: Cadastrado ## [${objData.id}] ${objData.data.useNickname}`, objData.id);

// ### get all
LogsController.logsCreate(useId, perId, logMsg, `=> ${useId} # Usuário: Listagem geral ## [geral]`, null);

// ### get id
LogsController.logsCreate(useId, perId, logMsg, `=> ${useId} # Usuário: Consultado ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);

// ### put
LogsController.logsCreate(useId, perId, logMsg, `=> ${useId} # Usuário: Atualizado ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);

// ### patch
LogsController.logsCreate(useId, perId, logMsg, `=> ${useId} # Usuário: Atualizado [status] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);

// ### delete
LogsController.logsCreate(useId, perId, logMsg, `=> ${useId} # Usuário: Deletado ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);


==================================================================================

const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

==================================================================================

utils.devLog(0, `${logMsg} Start`, null);
`${logMsg} Success`
`${logMsg} Error`

==================================================================================

# Clientes: Cadastrado ##
# Clientes: Listagem geral ##
# Clientes: Consultado ##
# Clientes: Atualizado ##
# Clientes: Atualizado [status] ##

---------------

# Clientes: Colaboradores: Cadastrado ##
# Clientes: Colaboradores: Listagem geral ##
# Clientes: Colaboradores: Consultado ##
# Clientes: Colaboradores: Atualizado ##
# Clientes: Colaboradores: Atualizado [status] ##
---
# Clientes: Colaboradores: Arquivos: Consultado (todos arquivos) ##
# Clientes: Colaboradores: Arquivos: Atualizado [habilitado/desabilitado] ##
# Clientes: Colaboradores: Arquivos: Upload ##
# Clientes: Colaboradores: Arquivos: Download ##

---------------

# Membros: Listagem geral ##

# Clientes: Colaboradores: Membros: Cadastrado ##
# Clientes: Colaboradores: Membros: Listagem geral ##
# Clientes: Colaboradores: Membros: Consultado ##
# Clientes: Colaboradores: Membros: Atualizado ##
# Clientes: Colaboradores: Membros: Atualizado [status] ##
---
# Clientes: Colaboradores: Membros: Arquivos: Consultado (todos arquivos) ##
# Clientes: Colaboradores: Membros: Arquivos: Atualizado [habilitado/desabilitado] ##
# Clientes: Colaboradores: Membros: Arquivos: Upload ##
# Clientes: Colaboradores: Membros: Arquivos: Download ##

==================================================================================