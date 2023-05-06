import Footer from '../components/Footer';
import React from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

export default function Drinks() {
  return (
    <>
      <Header title="Drinks" showSearchIcon />
      <Recipes string="Drink" />
      <Footer />
    </>
  );
}
