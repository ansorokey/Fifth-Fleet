import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { restoreUser } from './store/session';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Guilds from './components/Guilds';
import Lobbies from './components/Lobbies';
import GuildPage from './components/Guilds/GuildPage';
import LobbyPage from './components/Lobbies/LobbyPage';
import { loadMonsters, loadGreetings, loadQuestTypes } from './store/utils';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  let currentUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  useEffect(() => {
    async function init() {
      await dispatch(restoreUser());
      await dispatch(loadMonsters());
      await dispatch(loadGreetings());
      await dispatch(loadQuestTypes());
      setIsLoaded(true);
    }

    init();
  }, [dispatch]);

  // only returns content of initial load after useEffect has run
  return (<>
    <Navigation isLoaded={isLoaded} currentUser={currentUser}/>
    {isLoaded ? <>
    <Switch>
      <Route path="/guilds/:guildId">
        <GuildPage />
      </Route>

      <Route path="/lobbies/:lobbyId">
        <LobbyPage />
      </Route>

      <Route exact path="/login">
        <LoginFormPage />
      </Route>

      <Route exact path="/signup">
        <SignupFormPage />
      </Route>


      <Route path="/guilds">
        <Guilds />
      </Route>

      <Route path="/lobbies">
        <Lobbies />
      </Route>

      <Route path="/lost">
        <h1>The requested resource couldn't be found...</h1>
      </Route>

      <Route exact path="/">
        <LandingPage user={currentUser}/>
      </Route>
    </Switch></> : <h1> Loading...</h1>}
  </>);
}

export default App;
