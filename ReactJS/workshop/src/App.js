import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home/Home';
import GamesCatalog from './components/GamesCatalog/GamesCatalog';
import GameDetails from './components/GameDetails';
import CreateGame from './components/CreateGame';
import EditGame from './components/EditGame';
import Login from './components/Login';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <div id="box">
      <Header />

      <main id="main-content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/games" exact component={GamesCatalog} />
          <Route path="/games/:gameId" component={GameDetails} />
          <Route path="/create-game" component={CreateGame} />
          <Route path="/edit-game/:gameId" component={EditGame} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" render={({ history }) => {
            console.log('Logged out.');
            history.push('/');
          }} />

          <Route path="/" component={ErrorPage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
