
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import App from './App';

//Reducers
const initialState = {decks:[], cards:[], SelectedDeck:null};

const reduxFlashCards = ((state = initialState, action)=>{
  if (action.type === "UPDATE_DECKS"){
    return Object.assign({}, state, action.newData);
  }
  return state;
});

export const store = createStore(combineReducers(
  {
    reduxFlashCards : reduxFlashCards
  }
), compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
