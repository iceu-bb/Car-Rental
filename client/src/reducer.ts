export default function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload
      };
    case 'IS_AUTH':
      return {
        ...state,
        isAuth: payload
      };
    default:
      return state;
  }
}
