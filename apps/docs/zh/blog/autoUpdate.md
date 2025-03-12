# uni-app 自动更新

## 1. 安卓自动更新

检查版本更新，下载新版本，安装新版本，重启应用。

```js
function download() {
  const url = `${存放新版本exe的服务器地址}`;
  // #ifdef APP-PLUS
  const task = plus.downloader.createDownload(url, {}, (d, status) => {
    if (status === 200) {
      plus.runtime.install(d.filename, {
        force: true,
      }); // 安装新版本
    } else {
      // 下载失败
      console.log(`Download failed:${status}`);
    }
  });
  task.start();
}
```

## 2. windows自动更新

同样的检查版本更新，下载新版本，安装新版本，重启应用。

### 2.1. 检查版本更新，调用windows api

```js
function download() {
  const url = `${存放新版本exe的服务器地址}`;
  window?.autoUpdate?.update(url);
}
```

### 2.2. 下载新版本，安装重启

```js
function download() {
  const url = `${存放新版本exe的服务器地址}`;
  window?.autoUpdate?.update(url);
}
```

### 2.3. windows api 注册

```js
contextBridge.exposeInMainWorld('autoUpdate', {
  update: (link) => {
    return ipcRenderer.invoke('update', link);
  },
});
```

### 2.4. windows api 实现

```js
ipcMain.handle('update', async (event, link) => {
  try {
    const savePath = path.join(app.getPath('temp'), 'Bmos.exe');
    const request = net.request(link);
    const file = fs.createWriteStream(savePath);

    request.on('response', (response) => {
      response.on('data', (chunk) => file.write(chunk));
      response.on('end', () => {
        file.end();
        shell.openPath(savePath); // 打开安装程序
        app.quit();
      });
    });
    request.end();
  } catch (error) {
    console.error(error);
  }
});
```
