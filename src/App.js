import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, applyRouterMiddleware, Redirect, Switch } from 'react-router';
import GoalListPage from './containers/GoalListPage';
import GoalEditingPage from './containers/GoalEditingPage';
import GoalDetailsPage from './containers/GoalDetailsPage';
import NewGoal from './components/NewGoal';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

let store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <header>
      </header>
      <main className="container">
        <BrowserRouter>
          <Route path="/" component={App}>
            <Redirect to="/users/1"/>
            <Switch>
              <Route path="/users/:userId/newGoal" component={NewGoal}/>
              <Route path="/users/:userId/goals/:goalId/edit" component={GoalEditingPage}/>
              <Route path="/users/:userId/goals/:goalId" component={GoalDetailsPage}/>
              <Route path="/users/:userId">
                <Route component={GoalListPage}/>
              </Route>
            </Switch>
          </Route>
        </BrowserRouter>
      </main>
    </Provider>


  );
}

export default App;
