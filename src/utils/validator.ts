/**
 * 手机号验证
 */
export const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s);
};

/**
 * 邮箱验证
 */
export const isEmail = (s) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

/**
 * 密码验证
 */
export const isPassword = (s) => {
  // return /^(?![0-9a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*?_-]{6,12}$/.test(s);
  return s.length >= 6;
};

/**
 * 电话号码验证
 */
export const isPhone = (s) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

/**
 * 是否是数组
 */
export const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
