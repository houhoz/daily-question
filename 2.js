Object.prototype.map = function (handleFn, thisValue) {
  const obj = this;
  let res = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      res[prop] = handleFn.call(thisValue, obj[prop], prop, obj);
    }
  }
  return res;
};
// 测试用例
var obj = {
  name: "sunny",
  sex: "man",
};
var res = obj.map(
  function (val, prop, obj) {
    console.log(this);
    console.log(val, prop, obj);
    return prop + "--" + val;
  },
  { name: "thisthis" }
);
console.log("res:", res);
