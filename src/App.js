import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { TournamentsProvider } from "./contexts/TournamentsProvider";
import { CashgamesProvider } from "./contexts/CashgamesProvider";
import { PlacesProvider } from "./contexts/PlacesProvider";
import { AuthProvider } from "./contexts/AuthProvider";

import NavMenu from "./components/NavMenu";
import PrivateRoute from "./components/PrivateRoute";
import Places from "./pages/Places";
import Cashgames from "./pages/Cashgames";
import Tournaments from "./pages/Tournaments";
import Login from "./pages/Login";
import Register from "./pages/Register"

function App() {
  return (
    <AuthProvider>
      <PlacesProvider>
        <TournamentsProvider>
          <CashgamesProvider>
            <Router>
              <NavMenu />
              <Switch>

                <Route path="/" exact>
                  <Login />
                </Route>
                <Route path="/register" exact>
                  <Register />
                </Route>

                <PrivateRoute path="/tournaments" exact>
                  <Tournaments />
                </PrivateRoute>
                <PrivateRoute path="/cashgames" exact>
                  <Cashgames />
                </PrivateRoute>
                <PrivateRoute path="/places" exact>
                  <Places />
                </PrivateRoute>
                
              </Switch>
            </Router>
          </CashgamesProvider>
        </TournamentsProvider>
      </PlacesProvider>
    </AuthProvider>
  )
}

export default App;