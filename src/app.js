import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Navbar from './components/utility/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/utility/ProtectedRoute';
import ListIndex from './components/lists/ListIndex';
import ListShow from './components/lists/ListShow';

import 'bootstrap-css-only';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

class App extends React.Component {
  constructor() {
    super();
    this.sate = {};
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <header>
            <h1><Link to="/lists">ReactIVE Lists</Link></h1>
            <h2>For when your <span>Lists</span> need to be reactive...</h2>
            <Navbar />
            <hr />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </header>
          <main>
            <ProtectedRoute exact path="/lists" component={ListIndex} />
            <ProtectedRoute excat path="/lists/:id" component={ListShow} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
