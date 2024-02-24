import React from 'react';
import PlanetsPage from './pages/PlanetsPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app">
      <Header />
      <PlanetsPage />
      <Footer />
    </div>
  );
};

export default App;
