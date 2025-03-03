# Git 使用

## 1. 加 github 代理

```bash
git config --global http.proxy 127.0.0.1:<代理端口>
git config --global https.proxy 127.0.0.1:<代理端口>

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```
