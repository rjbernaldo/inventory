import { SET_LINE } from '../actions/highlight';

const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LINE: {
      return Object.assign({}, state, {
        line: action.line,
      });
    }
    default: {
      return state;
    }
  }
}

