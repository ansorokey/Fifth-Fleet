import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { restoreUser } from './store/session';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  useEffect(() => {
    async function init() {
      await dispatch(restoreUser());
      setIsLoaded(true);
    }

    init();
  }, [dispatch]);

  // only returns content of initial load after useEffect has run
  return (<>
    <Navigation isLoaded={isLoaded} currentUser={currentUser}/>
    {isLoaded ? <>
    <Switch>
      <Route exact path="/login">
        <LoginFormPage />
      </Route>

      <Route exact path="/signup">
        <SignupFormPage />
      </Route>

      <Route exact path="/">
        <h1>Hello from Homepage</h1>
      </Route>
    </Switch></> : <h1> Loading...</h1>}
  </>);
}

export default App;
