# 部署到 Vercel 指南

这个项目使用了 Vite + React + TypeScript 进行构建，非常适合部署到前端托管平台 Vercel 上。由于您的项目代码已经推送到了 GitHub，只需点按几次即可完成全自动的持续集成（CI/CD）部署。

下面是为您整理的极简部署步骤：

## 1. 登录 Vercel

1. 打开 [Vercel 官网](https://vercel.com/)。
2. 点击右上角的 **Log In** 或 **Sign Up**。
3. 选择 **Continue with GitHub**，并授权 Vercel 访问您的 GitHub 仓库。

## 2. 导入您的 GitHub 仓库

1. 登录成功后，在 Vercel 控制台 (Dashboard) 点击右上角的黑色按钮 **Add New...**，然后选择 **Project**。
2. 在 "Import Git Repository" 列表中，找到您刚刚上传的项目 **`aipet`**。
   - *(如果在列表中找不到，可能需要点击底部的 "Adjust GitHub App Permissions" 去 GitHub 给该仓库授权)*
3. 找到后，点击它右侧的 **Import** 按钮。

## 3. 配置部署选项

在导入项目后的 Project Setup 页面，按以下说明确认配置，绝大部分 Vercel 会自动为您识别好：

*   **Project Name**: \`aipet\` (保持默认即可)
*   **Framework Preset**: 选择 **Vite** (Vercel 通常会自动探测出来)
*   **Root Directory**: 保持为 \`./\`
*   **Build and Output Settings** (保持默认):
    *   Build Command: \`npm run build\`
    *   Output Directory: \`dist\`
    *   Install Command: \`npm install\`

### 3.1 环境变量配置 (Environment Variables)

尽管我们在代码中也加入了本地假数据的降级处理（Fallback），但如果您想让应用在线上尝试连接您准备好的真实 Supabase 数据库：

1. 点击 **Environment Variables** 展开面板。
2. 依次添加以下两条环境变量（它们原本存在于您的项目根目录的 \`.env.local\` 中，由于安全原因，它们并未被推送到 GitHub）。

| Key | Value |
| :--- | :--- |
| \`VITE_SUPABASE_URL\` | [您的 Supabase URL 链接] |
| \`VITE_SUPABASE_ANON_KEY\` | [您的 Supabase anon_key 密钥] |

（注：如果没有填写这些变量也不影响应用的构建和线上运行，前端界面会自动使用本地预设的 Mock 动物数据做展示和验证。）

## 4. 开始部署（Deploy）

1. 配置完毕后，点击正下方的 **Deploy** 按钮。
2. Vercel 将帮您自动获取代码、执行构建打包的流程（大约需要 30 秒至 1 分钟）。
3. 部署完成后，屏幕会洒下礼花碎纸效果展示：🎉 **Congratulations!**

## 5. 访问您的网站

在恭喜页面的截图卡片处点击 **Continue to Dashboard**。在这个项目的面板上，您就可以看到 Vercel 给您自动分配的以 \`.vercel.app\` 结尾的线上访问公网链接了（例如 \`https://aipet.vercel.app\`）。

您可以把这个链接直接发送到手机微信，或者分享给朋友。

---

*💡 拓展：每次有新修改的代码，在终端执行 `git add .`、`git commit` 继而 `git push` 给到 GitHub，Vercel 只要检测到您的 GitHub 更新，就会在后台全自动热乎乎地重置部署一遍最新的网站！简直是完美组合！*
