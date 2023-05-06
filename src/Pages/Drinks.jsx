import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipesList from '../components/RecipesList';

export default function Drinks() {
  return (
    <>
      <SearchBar />
      <RecipesList string="Drink" />
    </>
  );
}
