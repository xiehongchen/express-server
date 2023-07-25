// Web Worker中执行的代码
// 接收主线程的消息
self.onmessage = (event) => {
  if (event.data === 'calculate') {
    // 在Web Worker中执行斐波那契数列计算
    const startTime = performance.now();
    const result = fibonacci(40);
    const endTime = performance.now();

    // 向主线程发送计算结果
    self.postMessage({ result, duration: endTime - startTime });
  }
};

// 斐波那契数列计算函数
function fibonacci(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
