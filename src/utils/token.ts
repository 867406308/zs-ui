import Cookies from 'js-cookie';

const TokenKey = 'xinxin_admin_token';
/**
 * 获取token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}
/**
 * 设置token
 */
export function setToken(token) {
  Cookies.set(TokenKey, token);
}

/**
 * 移除token
 */
export function removeToken() {
  Cookies.remove(TokenKey);
}

export function hashToken() {
  return !!Cookies.get(TokenKey);
}
