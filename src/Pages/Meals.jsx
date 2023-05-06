import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipesList from '../components/RecipesList';

export default function Meals() {
  return (
    <>
      <SearchBar />
      <RecipesList string="Meals" />
    </>
  );
}
