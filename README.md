# 简易 Markdown 转 HTML 工具 (aicode)

这是一个基于 TypeScript 编写的轻量级命令行工具，用于将本地的 Markdown 文件转换为 HTML 文件。本工具支持基础的 Markdown 语法（如标题、列表、粗体、斜体、链接等）。

## 依赖环境
- Node.js (v18+)
- TypeScript
- Docker (可选)

## 项目特点
- 支持基础的 Markdown 语法（标题、列表、粗体、斜体、链接）。
- **[新特性]** 支持多行代码块（```）转换。
- **[新特性]** 使用 `commander` 构建的 CLI 界面，支持 `-o` 指定输出目录。
- 完整包含 Dockerfile，支持云端部署与自动化流水线。

## 本地运行

1. 安装依赖：
```bash
npm install
```

2. 编译并运行：
```bash
# 使用 ts-node 直接运行，指定输出目录到 out
npx ts-node index.ts test.md -o ./out

# 或者编译为 js 后运行
npx tsc
node index.js test.md --output ./out
```

## Docker 容器化运行

本项目支持 Docker 部署。你可以通过 Docker 将本工具作为容器运行。

1. 构建镜像：
```bash
docker build -t markdown-converter .
```

2. 运行容器：
通过 `-v` 将你的本地目录挂载到容器中进行文件转换。例如，要转换当前目录下的 `test.md`：
```bash
docker run --rm -v $(pwd):/data markdown-converter /data/test.md
```
这将在当前目录生成对应的 `.html` 文件。

## 项目特点
- 无需复杂配置，开箱即用。
- 完整包含 Dockerfile，支持云端部署与自动化流水线。
- 采用面向 AI 的纯函数逻辑设计，易于扩展。
