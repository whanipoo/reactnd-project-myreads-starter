import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import './App.css';
import HomePage from "./components/HomePage.js";
import SearchPage from "./components/SearchPage.js";
import Provider, {MyContext} from "./Provider/"


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
//Render the app
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Provider>
            //Switch between homepage and the search page
            <Switch>
              //Rendering Homepage
              <Route
                exact
                path="/"
                render={() => (
                  <MyContext.Consumer>
                    {context => <HomePage {...context} />}
                  </MyContext.Consumer>
              )}
              />
            //Rendering search page
              <Route
                exact
                path="/search"
                render={() => (
                  <MyContext.Consumer>
                    {context => <SearchPage {...context} />}
                  </MyContext.Consumer>
              )}
              />
            </Switch>
        </Provider>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
