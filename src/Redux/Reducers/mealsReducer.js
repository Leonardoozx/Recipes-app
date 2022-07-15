import { SEND_MEALS } from '../Actions';

const INITAL_STATE = {
  meals: [{}],
};

const mealsReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case SEND_MEALS:
    return {
      ...state,
      meals: action.payload,
    };
  default:
    return { ...state };
  }
};

export default mealsReducer;
