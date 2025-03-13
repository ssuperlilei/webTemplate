# MQTT 客户端封装类

## 简介

MQTT（Message Queuing Telemetry Transport）是一种轻量级的消息传输协议，适用于物联网（IoT）和需要低带宽、高延迟或不可靠网络环境下的通信。本文档提供了一个基于TypeScript的MQTT客户端封装类，简化MQTT连接和消息处理。

## 特性

- 自动连接和重连机制
- 简化的订阅和发布API
- 支持消息回调处理
- 支持自定义配置选项

## 代码实现

```typescript
import mqtt, { MqttClient as Client, IClientOptions } from 'mqtt'; // 引入mqtt依赖

// 定义消息回调函数类型
type OnMessageCallback = (topic: string, message: any, otherInfo: any) => void;

/**
 * MQTT客户端封装类
 */
class MqttClient {
  connectBaseUrl: string; // MQTT服务器连接URL
  onMessage: OnMessageCallback; // 消息回调函数
  userInfo: any; // 用户自定义信息
  otherInfo: any; // 其他附加信息
  clientId: string; // 客户端唯一标识
  myOptions: IClientOptions; // MQTT连接选项
  client: Client; // MQTT客户端实例

  /**
   * 构造函数
   * @param connectBaseUrl MQTT服务器连接URL
   * @param onMessage 消息回调函数
   * @param userInfo 用户自定义信息（可选）
   * @param otherInfo 其他附加信息（可选）
   */
  constructor(connectBaseUrl: string, onMessage: OnMessageCallback, userInfo = {}, otherInfo = {}) {
    this.connectBaseUrl = connectBaseUrl;
    this.onMessage = onMessage;
    this.userInfo = userInfo;
    this.otherInfo = otherInfo;
    this.clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    this.myOptions = {
      clean: true, // 清除会话
      connectTimeout: 4000, // 连接超时时间（毫秒）
      reconnectPeriod: 1000, // 重连间隔（毫秒）
      clientId: this.clientId,
      ...this.userInfo,
    };
    this.client = mqtt.connect(`${this.connectBaseUrl}`, this.myOptions);

    // 注册事件处理函数
    this.client.on('connect', this.handleConnect.bind(this));
    this.client.on('message', this.handleMessage.bind(this));
    this.client.on('close', this.handleClose.bind(this));
  }

  /**
   * 连接成功处理函数
   * @param topic 要订阅的主题
   */
  handleConnect(topic: string) {
    console.log('已经连接成功');
    this.client.subscribe([topic], () => {
      console.log(`订阅了主题 ${topic}`);
    });
  }

  /**
   * 消息处理函数
   * @param topic 消息主题
   * @param message 消息内容
   */
  handleMessage(topic: string, message: Buffer) {
    const data = JSON.parse(message.toString());
    console.log('返回的数据：', data);
    if (this.onMessage) {
      this.onMessage(topic, data, this.otherInfo);
    }
  }

  /**
   * 发布消息
   * @param topic 目标主题
   * @param message 消息内容
   */
  handlePublish(topic: string, message: string) {
    this.client.publish(topic, message);
  }

  /**
   * 连接关闭处理函数
   */
  handleClose() {
    console.log('已断开连接');
  }

  /**
   * 结束MQTT连接
   */
  endMqtt() {
    this.client.end();
  }
}

export default MqttClient;
```

## 使用示例

### 基本使用

```typescript
import MqttClient from './MqttClient';

// 定义消息回调函数
const handleMessage = (topic, message, otherInfo) => {
  console.log(`收到来自主题 ${topic} 的消息:`, message);
  console.log('附加信息:', otherInfo);
};

// 创建MQTT客户端实例
const mqttClient = new MqttClient(
  'mqtt://broker.emqx.io:1883', // MQTT服务器地址
  handleMessage, // 消息回调函数
  { username: 'user', password: 'pass' }, // 连接凭证（如需要）
  { deviceId: 'device_001' }, // 其他信息
);

// 连接成功后发布消息
setTimeout(() => {
  mqttClient.handlePublish('my/test/topic', JSON.stringify({ data: 'Hello MQTT!' }));
}, 2000);

// 应用结束时断开连接
// mqttClient.endMqtt();
```

### 错误处理

```typescript
const mqttClient = new MqttClient('mqtt://broker.emqx.io:1883', handleMessage);

// 监听错误
mqttClient.client.on('error', (err) => {
  console.error('MQTT错误:', err);
});

// 监听重连
mqttClient.client.on('reconnect', () => {
  console.log('正在尝试重新连接...');
});
```

## API参考

### 构造函数

```typescript
constructor(
  connectBaseUrl: string,      // MQTT服务器URL
  onMessage: OnMessageCallback, // 消息回调函数
  userInfo?: object,           // 用户信息，可包含username/password等连接选项
  otherInfo?: object           // 其他附加信息，会在消息回调中传递
)
```

### 方法

| 方法名        | 参数                           | 说明                               |
| ------------- | ------------------------------ | ---------------------------------- |
| handleConnect | topic: string                  | 连接成功后调用，订阅指定主题       |
| handleMessage | topic: string, message: Buffer | 收到消息时调用，解析消息并执行回调 |
| handlePublish | topic: string, message: string | 发布消息到指定主题                 |
| handleClose   | 无                             | 连接关闭时调用                     |
| endMqtt       | 无                             | 主动关闭MQTT连接                   |

## 注意事项

- 确保在应用退出前调用 `endMqtt()` 方法关闭连接
- 消息内容应为JSON格式，否则需要修改 `handleMessage` 方法中的解析逻辑
- 默认情况下会自动重连，可通过 `reconnectPeriod` 选项调整重连间隔

## 参考资源

- [MQTT官方文档](https://mqtt.org/)
- [mqtt.js GitHub仓库](https://github.com/mqttjs/MQTT.js)
