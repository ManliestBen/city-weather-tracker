import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import userService from '../../services/userService';
import CityListPage from '../CityListPage/CityListPage';
import SearchPage from '../SearchPage/SearchPage';
import CityDetailsPage from '../CityDetailsPage/CityDetailsPage';

class App extends Component {
  state = {
    user: userService.getUser()
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  render () {
    return (
      <>
        <NavBar 
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <Route exact path='/signup' render={({ history }) => 
          <SignupPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>
        <Route exact path='/login' render={({ history }) => 
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>
        <Route exact path='/cities' render={({ history }) => 
          <CityListPage
          history={history}
          user={this.state.user}
          />
        }/>
        <Route exact path='/search' render={({ history }) => 
         <SearchPage
         history={history}
         user={this.state.user}
         />
        }/>
        <Route exact path='/city/:id' render={({ history, location, match }) => 
         <CityDetailsPage
         match={match}
         history={history}
         user={this.state.user}
         location={location}
         />
        }/>
      </>
    );
  }
}

export default App;
