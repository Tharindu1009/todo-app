export const isLoggedIn = () => {
  if (localStorage.getItem('loggedIn') == 1 ) {
      return true;
  } else {
      return false;
  }
}
