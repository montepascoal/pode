import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Main from '../pages/Main';
import Error500 from '../pages/Errors/500';
import Error404 from '../pages/Errors/404';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/error500" exact component={Error500} />
      <Route path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
