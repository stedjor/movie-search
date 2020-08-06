import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App container">
      <h1>Search Movies</h1>
      <SearchForm />
    </div>
  );
}

export default App;
