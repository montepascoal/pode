import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Pages from '../pages/Pages';
import Demo from '../pages/Demo';
import Login from '../pages/Auth/Login';
import Logout from '../pages/Auth/Logout';
import Reset from '../pages/Auth/Reset';
import Main from '../pages/Main';
import Test from '../pages/Test';
/* Companies */
import CompaniesList from '../pages/Companies/List';
import CompaniesCreate from '../pages/Companies/Create';
import ViewCompany from '../pages/Companies/View';
/* End Companies */
import Error500 from '../pages/Errors/500';
import Error404 from '../pages/Errors/404';
/* Employees */
import EmployeesCreate from '../pages/Employees/Create';
import EmployeesList from '../pages/Employees/List';
/* About */
import About from '../pages/About';
/* Config */
import Places from '../pages/Config/Places';
import Permissions from '../pages/Config/Permissions';
import Employees from '../pages/Config/Employees';
import ConfigViewCompany from '../pages/Config/Companies/View';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/paginas" exact component={Pages} />
      <Route path="/demo" exact component={Demo} />
      <Route path="/login" exact component={Login} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/reset" exact component={Reset} />
      <Route path="/" exact component={Main} />
      <Route path="/test" exact component={Test} />
      <Route path="/unidades/listar" exact component={CompaniesList} />
      <Route path="/unidades/cadastrar" exact component={CompaniesCreate} />
      <Route path="/unidades/visualizar/:id" exact component={ViewCompany} />
      <Route path="/colaboradores/listar" exact component={EmployeesList} />
      <Route path="/colaboradores/cadastrar" exact component={EmployeesCreate} />
      <Route path="/error500" exact component={Error500} />
      <Route path="/sobre" component={About} />
      <Route path="/configuracoes/localidades" component={Places} />
      <Route path="/configuracoes/permissoes" component={Permissions} />
      <Route path="/configuracoes/colaboradores" component={Employees} />
      <Route path="/configuracoes/empresas" component={ConfigViewCompany} />
      <Route path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
