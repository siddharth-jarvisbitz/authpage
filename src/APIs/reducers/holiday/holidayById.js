import { GET_HOLIDAY_ID_DATA_SUCCESS } from '../../constants';

const initialState = {};

export default function holidayByIdReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOLIDAY_ID_DATA_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}