# mason

浏览器里直接玩的第一人称射击。切断港区三处中继，突破封锁，登船撤离。

在线试玩：<https://3a.mwcpool.uk/>

相关站点：<https://chainfuel.tap365.org>

## 本地打开

整页是一个静态文件，没有构建步骤。`index.html` 里已经带上渲染和关卡。`sw.js` 是离线回退用的 service worker，只在 http(s) 页面上注册。

```bash
python3 -m http.server 8080
```

然后打开 <http://127.0.0.1:8080/>。用 `file://` 直接双击时，service worker 不会生效，游戏本身仍可玩。

## 操作

| 键 | 作用 |
|---|---|
| WASD | 移动 |
| 鼠标 | 视角 |
| 左键 / 右键 | 开火 / 瞄准 |
| R | 换弹 |
| E | 切断中继 |
| Space / Shift / C | 跳 / 冲刺 / 蹲 |
| Esc | 暂停 |

触屏用左手移动、右手转视角。设置里可以改画质、灵敏度和视野。

分辨率按屏幕、像素比和是否触屏选取。卡顿时会自动降一档，并记在本页内存、当前标签和本机三层缓存里。

## 许可

[Apache License 2.0](LICENSE)。
