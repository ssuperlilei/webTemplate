# iframe 作为微前端的实现问题处理

## 通信与数据共享

在微前端架构中，通信与数据共享是关键。可以封装一个公共方法来实现统一处理。

首先在主应用中创建一个 `IFrameCommunication` 类，用于处理 iframe 通信。

```typescript
// iframe-communication.ts

interface IFrameMessage {
  type: string;
  payload: any;
}

export class IFrameCommunication {
  private iframe: HTMLIFrameElement;
  private messageListeners: Map<string, (message: IFrameMessage) => void>;

  constructor(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
    this.messageListeners = new Map();
    this.init();
  }

  private init() {
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  private handleMessage(event: MessageEvent) {
    // 验证消息来源
    if (event.origin !== this.iframe.origin) {
      return;
    }

    const message: IFrameMessage = event.data;
    if (this.messageListeners.has(message.type)) {
      this.messageListeners.get(message.type)?.(message);
    }
  }

  // 向 iframe 发送消息
  public sendMessage(type: string, payload: any) {
    this.iframe.contentWindow?.postMessage({ type, payload }, this.iframe.src);
  }

  // 监听来自 iframe 的消息
  public onMessage(type: string, listener: (message: IFrameMessage) => void) {
    this.messageListeners.set(type, listener);
  }

  // 移除消息监听
  public offMessage(type: string) {
    this.messageListeners.delete(type);
  }
}
```

然后创建一个hooks

```typescript
// useIFrameCommunication.ts

import { ref, onMounted, onBeforeUnmount } from 'vue';
import { IFrameCommunication } from './iframe-communication';

export function useIFrameCommunication(iframeRef: any) {
  const iframeComm = ref<IFrameCommunication | null>(null);

  // 初始化通信
  onMounted(() => {
    if (iframeRef.value) {
      iframeComm.value = new IFrameCommunication(iframeRef.value);
    }
  });

  // 清理资源
  onBeforeUnmount(() => {
    iframeComm.value?.offMessage('init');
  });

  // 发送消息到 iframe
  const sendMessageToIFrame = (type: string, payload: any) => {
    iframeComm.value?.sendMessage(type, payload);
  };

  // 接收来自 iframe 的消息
  const onMessageFromIFrame = (type: string, callback: (message: any) => void) => {
    iframeComm.value?.onMessage(type, callback);
  };

  return {
    sendMessageToIFrame,
    onMessageFromIFrame,
  };
}
```

在主应用中使用

```vue
<template>
  <div>
    <iframe ref="iframe" src="https://your-iframe-url.com" width="600" height="400"></iframe>
    <button @click="sendToIframe">Send Message to Iframe</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useIFrameCommunication } from './useIFrameCommunication';

export default defineComponent({
  name: 'IframeComponent',
  setup() {
    const iframeRef = ref<HTMLIFrameElement | null>(null);
    const { sendMessageToIFrame, onMessageFromIFrame } = useIFrameCommunication(iframeRef);

    onMounted(() => {
      // 监听来自 iframe 的消息
      onMessageFromIFrame('routeChange', (message) => {
        console.log('Received from iframe:', message.payload);
      });
    });

    const sendToIframe = () => {
      sendMessageToIFrame('changeRoute', {
        path: '/about',
      });
    };

    return {
      iframeRef,
      sendToIframe,
    };
  },
});
</script>
```

在自应用中也是一样，不过建议把消息的 type 和 payload 的类型定义在一个公共的地方，方便维护。

## 路由保持，比如刷新路由， iframe 也能保持当前路由

在子应用中，监听路由变化，然后发送消息到主应用，主应用接收到消息后，可以更新 path 以及 缓存当前路由，刷新后再次加载 iframe 时，可以根据缓存的路由来初始化 iframe。

```typescript
import { onMounted } from 'vue';
import { useIFrameCommunication } from './useIFrameCommunication';

export default {
  setup() {
    const iframeRef = ref<HTMLIFrameElement | null>(null);
    const { sendMessageToIFrame, onMessageFromIFrame } = useIFrameCommunication(iframeRef);

    onMounted(() => {
      watch(
        () => currentRoute,
        (newRoute) => {
          sendMessageToIFrame('routeChange', { payload: { path: newRoute.path } });
        },
      );
    });
  },
};
```

主应用中监听来自 iframe 的消息，然后根据消息更新路由。

```typescript
onMessageFromIFrame('changeRoute', (message) => {
  // 拿到 path, localStorage.setItem('currentRoute', message.payload.path);
  localStorage.setItem('currentRoute', message.payload.path);

  // 利用 history.pushState 来更新路由
  history.pushState(null, null, message.payload.path);
});

// 刷新页面后，根据缓存的路由来初始化 iframe
```

## 遮罩层的问题

因为子应用的遮罩层只能显示在子应用的范围内。
解决办法就是子应用打开有遮罩层的比如 modal 时，发送消息到主应用，主应用显示一个全局的遮罩层。

需要注意的是层级问题，主应用的遮罩层要比 iframe 的层级高。所以需要把iframe的层级设置比遮罩层高。
