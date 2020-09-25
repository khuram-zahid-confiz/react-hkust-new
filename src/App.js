import React, { useState } from 'react';
import './App.css';
import Menu from './components/MenuComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import { DISHES } from './shared/dishes';

export default function App () {
  const [state, setState] = useState({
    dishes: DISHES
  });
  return (
    <div>
      <Header />
      <Menu {...state} />
      <Footer />
    </div>
  );
}