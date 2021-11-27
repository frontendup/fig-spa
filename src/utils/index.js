export const isFunc = v => typeof v === 'function';
export const assert = (condition, msg) => {
  if (!condition) throw new Error(`[dashboard]${msg}`);
};
export const toThousands = num => {
  let number = (num || 0).toString();
  let result = '';

  while (number.length > 3) {
    result = `,${number.slice(-3)}${result}`;

    number = number.slice(0, number.length - 3);
  }

  if (number) {
    result = number + result;
  }
  return result;
};

export const timingFun = (func = () => {}, interval = 1, defaultCall = true) => {
  assert(isFunc(func), `${func} is not function`);
  const m = interval * 60 * 1000;
  if (defaultCall) func();
  const time = window.setInterval(() => {
    func();
  }, m);
  return time;
};

export const isChinese = str => {
  if (escape(str).indexOf('%u') < 0) return false;
  return true;
};

export const emoj2str = str => {
  return unescape(escape(str).replace(/%uD.{3}/g, ''));
};

export const handleText = str => {
  let res = emoj2str(str);
  if (isChinese(res)) {
    res = res.length > 4 ? `${res.slice(0, 6)}...` : res;
  } else {
    res = res.length > 7 ? `${res.slice(0, 7)}...` : res;
  }
  return res;
};

// pc端七牛缩略图，指定宽
export const getPcThumbImg = ({ url, width, height }) => {
  let newUrl = `${url}?imageView2/2/w/${width || 200}`;
  if (height) {
    newUrl += `/h/${height}`;
  }
  return newUrl;
};

// 移动端七牛缩略图，指定宽
export const getMobileThumbImg = ({ url, width, height }) => {
  let newUrl = `${url}?imageView2/0/w/${width || 200}`;
  if (height) {
    newUrl += `/h/${height}`;
  }
  return newUrl;
};