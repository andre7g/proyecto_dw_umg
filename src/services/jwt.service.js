const ID_TOKEN_KEY = "id_token";
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};
export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};
export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};
export const saveUserId = userId  => {
  window.localStorage.setItem('uId', userId);
};
export const getUserId = () => {
  return window.localStorage.getItem('uId');
};
export const saveRolId = rolId  => {
  window.localStorage.setItem('rolId', rolId);
};
export const getRolId = () => {
  return window.localStorage.getItem('rolId');
};
export default { getToken, saveToken, destroyToken, saveUserId, getUserId, saveRolId, getRolId };
