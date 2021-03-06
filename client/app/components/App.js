import React from 'react'
import { Component } from 'react'

import { fetchArticles, getFilteredArticles } from '../actions'

import { Sidebar } from './Sidebar';
import { Search } from './Search';
import { Main } from './Main';
import { Footer } from './Footer';

require('es6-promise').polyfill();
require('isomorphic-fetch');  


export class App extends Component {
  //TODO: what is purpose of constructor?
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    const { store } = this.props;

    //re-render App on any changes to the state in store
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );

    store.dispatch(fetchArticles());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  

  render() {
    const { store } = this.props;
    const state = store.getState();
    //TODO: create nextFilter here,
    //pass down to Sidebar & Main

    console.log('state: ', state);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Search store={store} />

        <main className="mdl-layout__content">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--3-col">
              <Sidebar store={store} />
            </div>
            <div className="mdl-cell mdl-cell--9-col graybox">
              <Main store={store} articles={state.articles}
              />
            </div>
          </div>
        </main>

        <Footer />

      </div>
    );
  }
}
