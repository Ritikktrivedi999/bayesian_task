import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flight Search</h1>
      </header>
      <main>
        <SearchForm />
      </main>
    </div>
  );
}

export default App;
