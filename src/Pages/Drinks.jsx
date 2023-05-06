import React from 'react';
import RecipesList from '../components/RecipesList';
import Header from '../components/Header';

export default function Drinks() {
  return (
    <>
      <Header title="Drinks" showSearchIcon />
      <RecipesList string="Drink" />
    </>
  );
}
