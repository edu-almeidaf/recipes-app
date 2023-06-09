import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

export default function Meals() {
  return (
    <>
      <Header title="Meals" showSearchIcon />
      <Recipes string="Meal" />
      <Footer />
    </>
  );
}
