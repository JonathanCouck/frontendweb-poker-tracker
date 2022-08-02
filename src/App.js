import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { GamesProvider } from "./contexts/GamesProvider";
import { PlacesProvider } from "./contexts/PlacesProvider";
import { AuthProvider } from "./contexts/AuthProvider";

import NavMenu from "./components/NavMenu";
import PrivateRoute from "./components/PrivateRoute";
import Places from "./pages/Places";
import PlaceEditor from './pages/PlaceEditor';
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <PlacesProvider>
        <GamesProvider>
          <Router>
            <NavMenu />
            <Switch>
              <Route path="/" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>

              <PrivateRoute path="/games" exact>
                <Games />
              </PrivateRoute>
              <PrivateRoute path="/places" exact>
                <Places />
              </PrivateRoute>
              <PrivateRoute path="/places/add" exact>
                <PlaceEditor />
              </PrivateRoute>
              <PrivateRoute path="/places/edit/:id" exact>
                <PlaceEditor />
              </PrivateRoute>
            </Switch>
          </Router>
        </GamesProvider>
      </PlacesProvider>
    </AuthProvider>
  )
}

export default App;