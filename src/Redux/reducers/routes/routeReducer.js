import { ROLE, ROLELIST, LOGOUT } from 'Redux/actions';

export const initialState = {
  role: '',
  roleList: null
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLE: {
      return { ...state, role: action.value };
    }
    case ROLELIST: {
      return { ...state, roleList: action.value };
    }
    case LOGOUT: {
      return { initialState };
    }
    default: {
      return state;
    }
  }
};

export default routeReducer;