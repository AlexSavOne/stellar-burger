// src\components\burger-constructor-element\burger-constructor-element.tsx

import React, { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/burgerConstructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = useCallback(() => {
      dispatch(moveIngredientDown(index));
    }, [dispatch, index]);

    const handleMoveUp = useCallback(() => {
      dispatch(moveIngredientUp(index));
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(removeIngredient(index));
    }, [dispatch, index]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
