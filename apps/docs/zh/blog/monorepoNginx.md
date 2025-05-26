# Monorepo 项目的 Nginx 配置指南

## 简介

Monorepo（单一代码库）架构允许在一个代码仓库中管理多个相关项目。这种架构在前端开发中变得越来越流行，特别是对于组件库和微前端应用。本文将介绍如何配置 Nginx 来有效地部署和服务 Monorepo 项目。

## Monorepo 的 Nginx 配置挑战

在 Monorepo 中部署多个应用时，我们面临以下挑战：

1. 多个子项目需要不同的路由规则
2. 静态资源的缓存策略需要统一管理
3. API 代理可能需要根据不同应用进行配置
4. 特殊连接（如 SSE）需要特定的 Nginx 设置

## 完整配置示例

以下是一个针对 Monorepo 项目的完整 Nginx 配置示例：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name localhost;

    # 全局设置
    client_max_body_size 600m;
    root /usr/share/nginx/html;
    index index.html index.htm;

    # 全局缓存控制 - 针对不同内容类型调整缓存策略
    # 静态资源可以缓存，动态内容避免缓存
    location ~* \.(css|js)$ {
        access_log off;
        add_header Cache-Control "public, max-age=86400"; # 1天
    }

    location ~* \.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        access_log off;
        add_header Cache-Control "public, max-age=604800"; # 7天
    }

    location ~* \.(html|htm)$ {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # 设置变量以减少重复
    set $html_root "/usr/share/nginx/html";
    set $api_server "http://172.0.0.1:60300";

    # 应用路由规则 - 使用正则简化配置
    location ~ ^/app/ll-([^/]+)/(.*)$ {
        alias $html_root/$1/dist/$2;
        try_files $uri $uri/ /app/ll-$1/index.html;

        # 启用gzip压缩
        gzip on;
        gzip_min_length 1k;
        gzip_comp_level 6;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }

    # 平台或者首页特殊路由
    location /app/ll-platform/ll/ {
        alias $html_root/platform/dist/ll/;
        try_files $uri $uri/ /index.html;
    }

    # 默认重定向至平台或者首页
    location = / {
        return 301 /app/ll-platform/ll/;
    }

    # API 代理
    location /api/app/ {
        proxy_pass $api_server/api/app/;

        # 通用代理头设置
        include /etc/nginx/proxy_params;

        # 自定义超时设置
        proxy_read_timeout 180s;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;

        # 跨域支持
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE, PATCH' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization' always;

        # OPTIONS 预检请求处理
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }

    # SSE 特殊代理配置
    location /api/app/agent/chat/sse/ {
        proxy_pass $api_server/api/app/agent/chat/sse/;

        # 必要的SSE代理设置
        include /etc/nginx/proxy_params;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_buffering off;

        # 长连接支持
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
        keepalive_timeout 65;
        keepalive_requests 100;

        chunked_transfer_encoding on;
        proxy_cache off;
        add_header Cache-Control no-cache;
    }

    # 错误页面
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

    # 限制某些敏感文件的访问
    location ~ /\.(?!well-known) {
        deny all;
    }
}

# 建议在http块中(此配置外部)增加以下全局优化配置：
# http {
#     # TCP优化
#     sendfile on;
#     tcp_nopush on;
#     tcp_nodelay on;
#
#     # 连接优化
#     keepalive_timeout 65;
#     keepalive_requests 100;
#
#     # 工作进程配置
#     # worker_processes auto;
#     # worker_connections 1024;
#
#     # GZIP全局设置
#     gzip on;
#     gzip_min_length 1k;
#     gzip_comp_level 6;
#     gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
#     gzip_vary on;
# }
```

## 配置说明

### 1. 静态资源缓存策略

针对不同类型的静态资源，我们设置了不同的缓存策略：

- CSS 和 JS 文件缓存 1 天
- 图片和字体文件缓存 7 天
- HTML 文件不缓存，确保内容实时更新

```nginx
location ~* \.(css|js)$ {
    access_log off;
    add_header Cache-Control "public, max-age=86400"; # 1天
}
```

### 2. 多应用路由配置

使用正则表达式匹配不同应用的路由，并将请求重定向到对应的目录：

```nginx
location ~ ^/app/ll-([^/]+)/(.*)$ {
    alias $html_root/$1/dist/$2;
    try_files $uri $uri/ /app/ll-$1/index.html;

    # 启用gzip压缩...
}
```

这个配置允许我们通过 URL 路径区分不同的应用，例如：

- `/app/ll-project1/` 会指向 `/usr/share/nginx/html/project1/dist/`
- `/app/ll-project2/` 会指向 `/usr/share/nginx/html/project2/dist/`

### 3. API 代理配置

所有 API 请求通过 Nginx 代理到后端服务：

```nginx
location /api/app/ {
    proxy_pass $api_server/api/app/;
    # 其他代理设置...
}
```

特别是对于 SSE（Server-Sent Events）等特殊连接，我们需要进行特殊配置：

```nginx
location /api/app/agent/chat/sse/ {
    # SSE 特殊配置...
    proxy_buffering off;
    proxy_read_timeout 3600s;
    # 其他设置...
}
```

### 4. 全局 HTTP 优化

在 `http` 块中，我们建议添加以下优化配置：

```nginx
# TCP优化
sendfile on;
tcp_nopush on;
tcp_nodelay on;

# 连接优化
keepalive_timeout 65;
keepalive_requests 100;

# GZIP全局设置
gzip on;
gzip_min_length 1k;
# 其他gzip设置...
```

## Monorepo 项目的 Nginx 部署最佳实践

1. **使用变量减少配置重复**：通过设置变量（如 `$html_root`）来减少配置中的重复内容

2. **使用正则表达式简化路由**：针对多个类似的应用，使用正则表达式可以大幅简化配置

3. **分离关注点**：将静态资源缓存、API 代理、错误处理等配置分开管理

4. **启用 GZIP 压缩**：对于前端应用，启用 GZIP 压缩可以显著提高加载速度

5. **合理设置超时时间**：根据不同服务的特性（如 SSE）设置合适的超时时间

## 结论

在 Monorepo 项目中，一个精心配置的 Nginx 可以帮助我们高效地部署和管理多个应用。通过本文介绍的配置和最佳实践，你可以为你的 Monorepo 项目构建一个稳定、高效的部署环境。

---

希望这份配置指南对你的 Monorepo 项目有所帮助。如果你有任何问题或改进建议，欢迎讨论交流。
