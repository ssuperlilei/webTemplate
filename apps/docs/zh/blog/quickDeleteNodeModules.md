#

## 快速删除node_modules

### 1. 使用rimraf

```bash
npm install rimraf -g
rimraf node_modules
```

### 2. 使用find

```bash
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```

### 3. 使用rm

```bash
rm -rf node_modules
```
