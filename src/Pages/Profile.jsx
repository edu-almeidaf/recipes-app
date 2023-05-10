import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const getLocalStorage = localStorage.getItem('user');
  const emailUser = JSON.parse(getLocalStorage);
  const history = useHistory();
  const handleDoneRecipes = () => history.push('/done-recipes');
  const handleFavorites = () => history.push('/favorite-recipes');
  const handleLogout = () => {
    history.push('/');
    localStorage.clear('user');
  };
  return (
    <div>
      <Header title="Profile" showSearchIcon={ false } />
      <div>
        <p data-testid="profile-email">{`Bem vindo, usuário ${emailUser?.email}`}</p>
        <button
          data-testid="profile-done-btn"
          onClick={ handleDoneRecipes }
        >
          Done Recipes

        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ handleFavorites }
        >
          Favorite Recipes

        </button>
        <button data-testid="profile-logout-btn" onClick={ handleLogout }>Logout</button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
