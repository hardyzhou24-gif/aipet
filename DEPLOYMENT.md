# 宠物领养全端 App 项目运行与部署指南

本项目作为一套包含核心功能还原的跨终端系统，经过 Flutter 的一次编写，现已完美抽离了 **Web (网页端)** 与 **Android (移动端)** 两套互相独立又统一的代码构建策略。

为了能更加合理、高效地进行功能的演示和上架，请按照以下文档顺序，先进行云端/本地服务的 Web 版本部署以确立服务器接口连通性，再进行移动端 App 的系统级测试。

---

## 0. 项目核心目录结构指南

项目功能逻辑全部统一集中于 `lib/` 目录下，并以功能模块化划分：

```text
lib/
├── config/       # 全局配置清单（例如 ApiConfig 接口常量映射表）
├── models/       # 数据层抽象类模型 (Pet, Shelter 等)
├── providers/    # 全局状态管理控制器 (基于 ChangeNotifier 的 Auth / Pet 拦截缓存)
├── screens/      # 用户可见的屏幕端交互界面 (Home, Detail, Login, Adoption 申请等表单)
├── services/     # 对接后端 Supabase 引擎的核心网络逻辑 (AuthService, PetService)
├── widgets/      # 可高度复用与解耦的自定义组件 (自定义圆角输入框、统一骨架屏宠物卡片)
└── main.dart     # 应用入口及路由配置注册器 (GoRouter)
```

---

## 1. 基础环境与配置初始化

无论您倾向验证 Web 还是 Android 打包，都需先确保本地已建立包含 Flutter SDK 的基础开发环境和 Supabase 配置关联。

- **SDK 要求**: Flutter 3.24+ | Dart 3.5+
- **安装依赖包**:
  ```bash
  flutter pub get
  ```

**配置 Supabase 环境变量**
此项目的数据（宠物种类、收藏、用户 Auth 验证等）均由后端的 [Supabase](https://supabase.com/) 接管。
在项目根目录下创建 `.env` 文件，内容如下：
```env
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```
> **备用降级机制**: 若此文件未被创建或远端 Supabase 无法握手，项目也会自动 Fallback （降级加载）内部集成的假数据（Mock Data）来保证页面排版不断裂。

---

## 2. 优先：Web 应用版的打包与部署验证

鉴于 Web 网页的无痕性，强烈推荐首先进行 Web 应用验证所有业务逻辑和界面的表现形式。

### 2.1 哪些接口与功能在 Web 端处于可用状态？
目前代码的所有功能（无论 Web/App 层）完全对等，在 Web 端部署后，以下接口操作完全可用：
1. **获取数据视图 (`pet_service.dart`)**：可根据分类过滤渲染首页瀑布流；可查阅详情大图及数据包中的避暑特征。
2. **表单类操作 (`pet_service.dart`)**：多步式的领养申请表、包含本地浏览器照片上传的宠物发布。
3. **用户认证体系 (`auth_service.dart`)**：可真实使用 Supabase Auth 发送 Email 以及登录，体验用户登入态和登出。如果不想注册，使用内部测试的管理员身份 `admin@admin.com` 和密码 `admin123` 即可绕过一切验证强制以登录态使用。

### 2.2 构建静态 Web 网页
使用以下命令行指令开始项目的全量 Tree-shaking 和构建（时间约两分钟）：
```bash
flutter build web --release 
```

### 2.3 Web 的宿主与一键部署方案
Flutter 编译 Web 后的完全产出处于 `build/web/` 目录中。它其实就是个没有任何服务器语言依赖的纯前端 SPA (单页面应用程序) 压缩包。

**简单预览（本地预览推荐）**
使用 Python 临时启动：
```bash
cd build/web
python -m http.server 8080
```
或使用 Node 环境的 serve：
```bash
npx serve build/web
```
此时在浏览器访问 `localhost:8080` 或指定端口即可。

**生产级部署 (Nginx / Vercel)**
由于 SPA 本质，如果您想要发布至公网服务器，对于包含路由重定向（GoRouter 驱动的如 `/pet/123`, `/login` 路径）防止 404 的问题：
      }
  }
  ```

**一键托管服务部署 (以 Vercel 为例教程)**
如果您打算在 Vercel 自动化构建并代理这款 Web 单页面应用：

1. **准备配置文件**: 在您的项目根目录下新建一个名为 `vercel.json` 的文件，填入如下内容进行全局路由重写，以彻底解决用户直接访问非 `/` 路径时引起的由于 Flutter 托管产生的 `404 Not Found` 错误：
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
2. **通过平台关联提交**:
   - 将本项目上传同步至您个人的 GitHub 仓库。
   - 打开 Vercel 面板，点击 `Add New Project`，导入当前代码库。
   - **Framework Preset**: 选择 `Other` 。
   - **Build Command**: 填写 `flutter build web --release` 。
   - **Output Directory**: 填写 `build/web` 。
   - **Environment Variables**: 把您本地的 `.env` 内容即 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 分列加入进去。
3. **点击 Deploy**: 稍等几分钟，Vercel 将全权帮您自动化产出并绑定到一个可供世界上任何人访问的安全 HTTPS 域名上。

---

## 3. 进阶：Android App 端的打包与真机测试

如果 Web 版测试一切表现优良，即证明远端环境与 UI 结构皆无问题。此时我们可以将其原封不动地移植至原生操作系统的 App 内。

### 3.1 前置检查
编译安卓应用相比 Web 开发要求大量诸如 Gradle 与 Java 环境参与：
请确保通过 `flutter doctor -v` 检查到 `Android toolchain` 打全了勾（包含 Android SDK、NDK 及同意相关授权等）。

### 3.2 编译与产出
在包含 Android SDK 环境加持的终端里，发出构建指令：
```bash
flutter build apk --release
```
如果顺利，系统将自动利用自带的 `assembleRelease` 脚手架帮项目自动签名（调试指纹），最终会在本地产生一个单独的安装包文件，其地址位于：
`build/app/outputs/flutter-apk/app-release.apk`

### 3.3 部署与安装安卓真机
不同于 Web 端需要寻找可对外开放的服务器托管机，APK 测试主要围绕分发：
1. **开发连线安装**：将手机打开「开发者模式的 USB 调试」，连上电脑直接执行 `flutter install`。
2. **三方平台发布分发**：直接将输出的 `app-release.apk` 发送至目标手机并安装，您也可以把该文件上传至各大蒲公英云盘方便用户独立下载。

> 提示：Android 端的操作接口体验和 Web 端是高度对齐的，所有的滚动、回弹等手势动画会根据安卓原生 Material 系统自动获得优化和转换。
