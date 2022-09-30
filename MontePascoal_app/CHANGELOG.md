# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao Controle de [Versão Semântico](https://semver.org/spec/v2.0.0.html).

## [0.1.28] - 2022-03-11

- Atualizando versão do sistema

- Criando controller SessionsController

- Criando função SessionsController.sessionsLogin
- Criando função SessionsController.sessionsLogout

- Criando rota POST /auth/login
- Criando rota POST /auth/logout

- Criando função UsersController.patchPasswordReset

- Criando rota PATCH /api/users/password/reset

## [0.1.26] - 2022-03-11

- Atualizando versão do sistema

- Ajustando entidade USERS
- Ajustando Model USERS

- Ajustando migration USERS
- Ajustando seed para USERS

- Criando controller UsersController
- Criando função UsersController.post
- Criando função UsersController.getAll
- Criando função UsersController.get
- Criando função UsersController.getLogs
- Criando função UsersController.patchCompanies
- Criando função UsersController.passwordGenerate
- Criando função UsersController.patchPermission
- Criando função UsersController.patchNickname
- Criando função UsersController.patchStatus
- Criando função UsersController.validate
- Criando função UsersController.validatePermission
- Criando função UsersController.usersPermission

- Criando rota POST /api/users
- Criando rota GET /api/users
- Criando rota GET /api/users/:id
- Criando rota GET /api/users/:id/logs
- Criando rota PATCH /api/users/:id/companies
- Criando rota PATCH /api/users/:id/password/generate
- Criando rota PATCH /api/users/:id/permission
- Criando rota PATCH /api/users/:id/nickname
- Criando rota PATCH /api/users/:id/status

- Criando rota GET /api/auth
- Criando rota GET /api/users/permission/:usePerId

## [0.1.23] - 2022-02-20

- Atualizando versão do sistema

- Modelando entidade EMPLOYEES
- Criando Model COMPANIES

- Criando migration EMPLOYEES
- Criando seed para EMPLOYEES

- Refatorando migration USERS
- Refatorando Model USERS

- Ajustando migration CONFIG_EMPLOYEES_DEPARTMENTS
- Ajustando migration CONFIG_EMPLOYEES_OCCUPATIONS

- Ajustando Model CONFIG_EMPLOYEES_DEPARTMENTS
- Ajustando Model CONFIG_EMPLOYEES_OCCUPATIONS

- Ajustando migration CONFIG_STATES
- Ajustando migration CONFIG_CITIES
- Ajustando migration CONFIG_COUNTRIES

- Ajustando Model CONFIG_STATES
- Ajustando Model CONFIG_CITIES
- Ajustando Model CONFIG_COUNTRIES

- Criando controller EmployeesController
- Criando função EmployeesController.post
- Criando função EmployeesController.get
- Criando função EmployeesController.getAll
- Criando função EmployeesController.put
- Criando função EmployeesController.patch

- Criando rota POST /api/employees
- Criando rota GET /api/employees
- Criando rota GET /api/employees/{{id}}
- Criando rota PUT /api/employees/{{id}}
- Criando rota PATCH /api/employees/{{id}}
- Criando rota GET /api/employees/{{id}}/user

- Modelando entidade EMPLOYEES_FILES
- Criando Model EMPLOYEES_FILES

- Criando migration EMPLOYEES_FILES
- Criando seed para EMPLOYEES_FILES

- Criando controller EmployeesFilesController
- Criando função EmployeesFilesController.post
- Criando função EmployeesFilesController.get
- Criando função EmployeesFilesController.getAll
- Criando função EmployeesFilesController.patch

- Criando rota POST /api/employees/files
- Criando rota GET /api/employees/files
- Criando rota GET /api/employees/{{id}}/files/{{id}}
- Criando rota PUT /api/employees/{{id}}/files/{{id}}
- Criando rota PATCH /api/employees/{{id}}/files/{{id}}

- Criando rota GET /api/files/employees/{{path}}
- Criando rota GET /api/files/companies/{{path}}

- Criando função EmployeesFilesController.view
- Criando função CompaniesFilesController.view

## [0.1.19] - 2022-02-17

- Modelando entidade COMPANIES
- Criando Model COMPANIES

- Criando migration COMPANIES
- Criando seed para COMPANIES

- Criando controller CompaniesController
- Criando função CompaniesController.post
- Criando função CompaniesController.get
- Criando função CompaniesController.getAll
- Criando função CompaniesController.put
- Criando função CompaniesController.patch

- Criando rota POST /api/companies
- Criando rota GET /api/companies
- Criando rota GET /api/companies/{{id}}
- Criando rota PUT /api/companies/{{id}}
- Criando rota PATCH /api/companies/{{id}}

- Modelando entidade COMPANIES_REPRESENTATION
- Criando Model COMPANIES_REPRESENTATION

- Criando migration COMPANIES_REPRESENTATION
- Criando seed para COMPANIES_REPRESENTATION

- Criando controller CompaniesRepresentativesController
- Criando função CompaniesRepresentativesController.post
- Criando função CompaniesRepresentativesController.get
- Criando função CompaniesRepresentativesController.getAll
- Criando função CompaniesRepresentativesController.put
- Criando função CompaniesRepresentativesController.patch

- Criando rota POST /api/companies/{{id}}/representatives
- Criando rota GET /api/companies/{{id}}/representatives
- Criando rota GET /api/companies/{{id}}/representatives/{{id}}
- Criando rota PUT /api/companies/{{id}}/representatives/{{id}}
- Criando rota PATCH /api/companies/{{id}}/representatives/{{id}}

- Modelando entidade COMPANIES_FILES
- Criando Model COMPANIES_FILES

- Criando migration COMPANIES_FILES
- Criando seed para COMPANIES_FILES

- Criando controller CompaniesFilesController
- Criando função CompaniesFilesController.post
- Criando função CompaniesFilesController.get
- Criando função CompaniesFilesController.getAll
- Criando função CompaniesFilesController.patch

- Criando rota POST /api/companies/{{id}}/files
- Criando rota GET /api/companies/{{id}}/files
- Criando rota GET /api/companies/{{id}}/files/{{id}}
- Criando rota PUT /api/companies/{{id}}/files/{{id}}
- Criando rota PATCH /api/companies/{{id}}/files/{{id}}

## [0.1.18] - 2022-01-28

- Modelando entidade COMPANIES_MAIN
- Criando Model COMPANIES_MAIN

- Criando migration COMPANIES_MAIN
- Criando seed para COMPANIES_MAIN

- Criando controller CompaniesMainController
- Criando função CompaniesMainController.post
- Criando função CompaniesMainController.get

- Criando rota PUT /api/companies-main
- Criando rota GET /api/companies-main

## [0.1.17] - 2022-01-21

### Adicionado e refatorado

- Criando rota /api/public/countries
- Criando rota /api/public/states
- Criando rota /api/public/cities
- Criando rota /api/public/permissions
- Criado controller countriesGetAll
- Criado controller statesGetAll
- Criado controller citiesGetAll
- Criado controller permissionsGetAll

- Criando rota GET /api/public/employees/departments
- Criado controller Public departmentsGetAll

- Criando rota POST /api/config/employees/departments
- Criando rota GET /api/config/employees/departments
- Criando rota GET /api/config/employees/departments/{{id}}
- Criando rota PUT /api/config/employees/departments/{{id}}

- Criado controller departmentsPost
- Criado controller departmentsGetAll
- Criado controller departmentsGetId
- Criado controller departmentsPut

- Criando rota POST /api/config/employees/departments/:depId/occupations
- Criando rota GET /api/config/employees/departments/:depId/occupations
- Criando rota GET /api/config/employees/departments/:depId/occupations/:occId
- Criando rota PUT /api/config/employees/departments/:depId/occupations/:occId

- Criado controller occupationsPost
- Criado controller occupationsGetAll
- Criado controller occupationsGetId
- Criado controller occupationsPut

- Criando rota GET /api/public/employees/occupations
- Criado controller Public occupationsGetAll

- Criando rota GET /api/config/employees/occupations
- Criado controller Public getAll

- Criando relacionamento entre cities e states
- Na rota de cities retornar estado relacionado

## [0.1.14] - 2022-01-06

### Adicionado e refatorado

- Sedder para dados do sistema
- Refatorado utils, função de pegar data
- Criado controller systemGetAll
- Criando rota api/public/about
