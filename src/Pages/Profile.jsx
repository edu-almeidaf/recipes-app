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
      <div
        className="card-side bg-base-100 shadow-xl text-info text-center"
      >
        <p data-testid="profile-email">{`Bem vindo, usuário ${emailUser?.email}`}</p>
        <button
          className="btn w-36 btn-outline btn-primary shadow-xl m-1 p-2 text-center"
          data-testid="profile-done-btn"
          onClick={ handleDoneRecipes }
        >
          Done Recipes

        </button>
        <button
          className="btn w-36 btn-outline btn-primary shadow-xl m-1 p-2 text-center"
          data-testid="profile-favorite-btn"
          onClick={ handleFavorites }
        >
          Favorite Recipes

        </button>
        <button
          className="btn w-36 btn-outline btn-primary shadow-xl m-1 p-2 text-center"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
