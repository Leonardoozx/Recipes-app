import { SEND_MEALS, SEND_CATEGORIES, SEARCH_BAR } from '../Actions';

const INITAL_STATE = {
  recipes: { meals: [], drinks: [], isCategory: false },
};

const mealsReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case SEND_MEALS:
    return {
      ...state,
      recipes: {
        ...state.recipes,
        ...action.payload,
      },
    };
  case SEND_CATEGORIES:
    return {
      ...state,
      recipes: {
        ...state.recipes,
        isCategory: true,
      },
    };

  case SEARCH_BAR:
    return {
      ...state,
      recipes: {
        ...state.recipes,
        isCategory: false,
      },
    };

  default:
    return { ...state };
  }
};

export default mealsReducer;
