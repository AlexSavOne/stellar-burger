import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
