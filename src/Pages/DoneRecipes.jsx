import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" showSearchIcon={ false } />
      <CardDoneRecipes />
    </div>
  );
}

export default DoneRecipes;
