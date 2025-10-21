const WORKER_SCRIPT_CONTENT = `
onmessage = function(e) {
    // 收到启动消息后
    postMessage("before"); // 1. 发送 T1 消息
    debugger;             // 2. 强制暂停/等待
    postMessage("after");  // 3. 发送 T2 消息
};
`;

/**
 * @param {number} threshold 检测阈值，单位：毫秒。超过此值即认为 DevTools 已打开。
 * @returns {Promise<boolean>} 解析为 true 表示检测到 开启了DevTools。
 */
const detectDevTools = async (threshold = 150): Promise<boolean> => {
  return new Promise((resolve) => {
    // 创建 Blob URL 来加载 Worker 脚本
    const blob = new Blob([WORKER_SCRIPT_CONTENT], { type: "text/javascript" });
    const workerURL = URL.createObjectURL(blob);
    const worker = new Worker(workerURL);

    let timeStart = 0; // 记录 T1 时间戳

    // 设置一个超时保护，防止 Worker 无限期暂停
    const timeoutId = setTimeout(() => {
      // 如果 500 毫秒后 'after' 消息还没收到，说明 Worker 被暂停
      worker.terminate();
      URL.revokeObjectURL(workerURL);
      resolve(true); // 判定为已打开
    }, 500);

    worker.onmessage = function (e) {
      const data = e.data;

      if (data === "before") {
        // 收到 T1 消息，记录时间
        timeStart = performance.now();
      } else if (data === "after") {
        // 收到 T2 消息，进行检测
        clearTimeout(timeoutId); // 清除超时保护

        const timeEnd = performance.now();
        const timeDiff = timeEnd - timeStart; // T2 - T1

        // 如果时间差大于阈值，判定为已打开
        if (timeDiff > threshold) {
          resolve(true); // 已打开
        } else {
          resolve(false); // 未打开
        }

        // 清理资源
        worker.terminate();
        URL.revokeObjectURL(workerURL);
      }
    };

    // 启动 Worker 脚本的 onmessage 事件
    worker.postMessage("");
  });
};
export { detectDevTools };
