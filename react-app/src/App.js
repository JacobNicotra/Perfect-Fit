import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import Landing from './components/Landing';
import Footer from './components/Footer';
import Puzzle from './components/PuzzlePage';
import PuzzleDetails from './components/PuzzleDetailsPage';
import Swaps from './components/Swap.js';
import Intro from './components/Intro';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <NavBar />
          <Landing />
          <Footer notLanding={false} />
        </Route>
        <Route path='/login' exact={true}>
          <NavBar />
          <LoginForm />
          <Footer notLanding={true} />
        </Route>
        <Route path='/sign-up' exact={true}>
          <NavBar />
          <SignUpForm />
          <Footer notLanding={true} />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
          <Footer notLanding={true} />
        </ProtectedRoute>
        <ProtectedRoute path='/swaps' exact={true} >
          <NavBar />
          <Swaps />
          <Footer notLanding={true} />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
          <Footer notLanding={true} />
        </ProtectedRoute>
        <Route path='/puzzles' exact>
          <div className='PuzzlesContainer'>
            {/* <Intro /> */}
            <NavBar />
            <Puzzle />
            <Footer notLanding={true} />
          </div>
        </Route>
        <Route path='/puzzles/:puzzleId' exact>
          <div className='PuzzleDetailsContainer'>
            <NavBar />
            <PuzzleDetails />
            <Footer notLanding={true} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
