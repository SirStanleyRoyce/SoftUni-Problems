import { useState } from 'react';

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
  const [view, setView] = useState('/home');

  const viewHandler = (path) => {
    setView(path);
  }

  const router = (path) => {
    let [, root, arg] = path.split('/');

    const routes = {
      'home': <Home viewHandler={viewHandler} />,
      'games': <GamesCatalog viewHandler={viewHandler} />,
      'details': <GameDetails id={arg} />,
      'create-game': <CreateGame />,
      'login': <Login />,
      'register': <Register />,
    }

    return routes[root];
  }

  return (
    <div id="box">
      <Header viewHandler={viewHandler} />

      <main id="main-content">
        {router(view) || <ErrorPage />}
      </main>
    </div>
  );
}

export default App;
