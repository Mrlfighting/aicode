# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# 安装依赖
RUN npm install

# 复制项目所有文件
COPY . .

# 编译 TypeScript 为 JavaScript
RUN npx tsc

# 默认运行命令（需要通过 docker run -v 挂载文件目录来使用）
ENTRYPOINT ["node", "index.js"]
