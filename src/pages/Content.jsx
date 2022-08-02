import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavMenu from "../components/NavMenu";
import PrivateRoute from "../components/PrivateRoute";
import Places from "./Places";
import PlaceForm from './PlaceForm';
import Games from "./Games";
import Login from "./Login";
import Register from "./Register";

import { useGames } from '../contexts/GamesProvider';
import { usePlaces } from '../contexts/PlacesProvider';

const Content = () => {
  const { initialLoad:initialGameLoad  } = useGames();
  const { initialLoad: initialPlaceLoad } = usePlaces();
  return (
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
          <PrivateRoute pat="/places/edit/:id" exact>
            <PlaceForm />
          </PrivateRoute>
          
        </Switch>
      </Router>
  )
}

export default Content