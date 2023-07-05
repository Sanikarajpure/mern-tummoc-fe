import { LOGIN_USER, SIGNOUT_USER } from "../Actions/types";
let userDefault = {
  user: {
    firstname: null,
    lastname: null,
    email: null,
  },
  auth: null,
};
const userReducer = (state = { loginInfo: userDefault }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginInfo: { ...action.payload },
      };
    case SIGNOUT_USER:
      return {
        ...state,
        loginInfo: { ...userDefault },
      };

    default:
      return state;
  }
};

export default userReducer;
