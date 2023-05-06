import React from 'react';
import RecipesList from '../components/RecipesList';
import Header from '../components/Header';

export default function Meals() {
  return (
    <>
      <Header title="Meals" showSearchIcon />
      <RecipesList string="Meal" />
    </>
  );
}
