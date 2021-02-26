const list = [1, 2, 3]
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

function test() {
  list.forEach(async x=> {
    const res = await square(x)
    console.log(res)
  })
}
test()
// 解答
// forEach是不能阻塞的，默认是请求并行发起，所以是同时输出1、4、9。
async function test() {
  for (let i = 0; i < list.length; i++) {
    const x = list[i];
    const res = await square(x);
    console.log(res);
  }
}
// 也可以使用for of 语法
async function test() {
  for (const x of list) {
    const res = await square(x);
    console.log(res);
  }
}

// 还有一个更硬核点的，也是 axios 源码里所用到的，利用 promise 本身的链式调用来实现串行。
let promise = Promise.resolve()
function test(i = 0) {
  if (i === list.length) return
  promise = promise.then(() => square(list[i]))
  test(i + 1)
}
test()
