// src\components\burger-ingredient\burger-ingredient.tsx

import React, { FC, memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedIngredient } from '../../services/ingredientsSlice';
import { setConstructorItems } from '../../services/burgerConstructorSlice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(setConstructorItems(ingredient));
    };

    const handleSelect = () => {
      dispatch(setSelectedIngredient(ingredient));
    };

    return (
      <div>
        <Link
          to={`/ingredients/${ingredient._id}`}
          state={{ background: location }}
          onClick={handleSelect}
        >
          <img src={ingredient.image} alt={ingredient.name} />
        </Link>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </div>
    );
  }
);
