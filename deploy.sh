#!/bin/bash

# SCUM 私服官网部署脚本
# 使用方法: ./deploy.sh

set -e  # 遇到错误立即退出

# 配置
APP_NAME="scum-website"
APP_DIR="/var/www/scum-website"
GIT_REPO="https://github.com/topzjw2772/scum-website.git"
BACKUP_DIR="/var/www/scum-website-backup"
NGINX_CONFIG="/etc/nginx/sites-available/scum-website"
NGINX_ENABLED="/etc/nginx/sites-enabled/scum-website"

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root 用户
check_root() {
    if [ "$EUID" -ne 0 ]; then
        error "请使用 root 用户运行此脚本"
        exit 1
    fi
}

# 创建目录
create_dirs() {
    log "创建必要的目录..."
    mkdir -p $APP_DIR
    mkdir -p $BACKUP_DIR
}

# 备份当前版本
backup() {
    if [ -d "$APP_DIR" ] && [ "$(ls -A $APP_DIR)" ]; then
        log "备份当前版本..."
        timestamp=$(date +%Y%m%d_%H%M%S)
        backup_path="$BACKUP_DIR/$APP_NAME-$timestamp"
        cp -r $APP_DIR $backup_path
        log "备份已保存至: $backup_path"
    fi
}

# 克隆或更新代码
deploy_code() {
    if [ -d "$APP_DIR/.git" ]; then
        log "更新代码..."
        cd $APP_DIR
        git pull origin main
    else
        log "克隆代码仓库..."
        git clone $GIT_REPO $APP_DIR
    fi
}

# 安装依赖
install_deps() {
    log "安装项目依赖..."
    cd $APP_DIR
    npm ci --production
}

# 构建项目
build() {
    log "构建项目..."
    cd $APP_DIR
    npm run build
}

# 配置 Nginx
setup_nginx() {
    log "配置 Nginx..."
    
    # 创建软链接
    if [ ! -L "$NGINX_ENABLED" ]; then
        ln -s $NGINX_CONFIG $NGINX_ENABLED
        log "已创建 Nginx 配置软链接"
    fi
    
    # 测试 Nginx 配置
    nginx -t
    
    # 重载 Nginx
    systemctl reload nginx
    log "Nginx 已重新加载"
}

# 启动/重启服务
restart_pm2() {
    log "重启应用服务..."
    
    # 检查 pm2 是否安装
    if ! command -v pm2 &> /dev/null; then
        warn "PM2 未安装，安装中..."
        npm install -g pm2
    fi
    
    cd $APP_DIR
    
    # 停止旧进程
    pm2 stop $APP_NAME || true
    pm2 delete $APP_NAME || true
    
    # 启动新进程
    pm2 start npm --name $APP_NAME -- start
    
    # 保存 PM2 进程列表
    pm2 save
    
    # 设置开机自启
    pm2 startup
}

# 主函数
main() {
    log "开始部署 $APP_NAME..."
    
    check_root
    create_dirs
    backup
    deploy_code
    install_deps
    build
    setup_nginx
    restart_pm2
    
    log "部署完成!"
    log "应用正在运行于 http://localhost:3000"
    log "网站地址: https://scum.starord.com"
}

# 运行主函数
main
