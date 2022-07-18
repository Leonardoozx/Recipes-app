import { SEND_MEALS } from '../Actions';

const INITAL_STATE = {
  recipes: { meals: [], drinks: [] },
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
  default:
    return { ...state };
  }
};

export default mealsReducer;
