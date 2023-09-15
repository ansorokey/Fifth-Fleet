import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import { useEffect, useState } from 'react';
import { restoreUser } from './store/session';
import { useDispatch } from 'react-redux';

function App() {
  const [initalLoad, setInitialLoad] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    async function init() {
      await dispatch(restoreUser());
      setInitialLoad(true);
    }

    init();
  }, [dispatch]);

  // only returns content of initial load after useEffect has run
  return (
    initalLoad ? <>
    <Switch>
      <Route exact path="/login">
        <LoginFormPage />
      </Route>

      <Route exact path="/">
        <h1>Hello from Homepage</h1>
      </Route>
    </Switch></> : <h1> Loading...</h1>
  );
}

export default App;
