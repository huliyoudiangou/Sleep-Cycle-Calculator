## 一、项目名称：[Sleep Cycle Calculator](https://sleep.makifx.com)

## 二、项目介绍：

[Sleep Cycle Calculator](https://sleep.makifx.com)是由 gemini 打造的一款运行于cloudflare works 上的，睡眠周期计算器，不管你是想几点起床，还是几点入睡，都能科学的计算出你的睡眠周期

## 三、灵感来源：

看到如下贴文产生的灵感，并进行了一些功能上的优化与完善
https://www.v2ex.com/t/1139854

### 1.增加了中文支持

### 2.对样式排版进行了一些调整

### 3.计划起床栏，并不是生硬的以90分钟为一个周期，进行了如下调整

当预定的起床时间，小于五小时，会激活小睡模式，以解决介于两个周期之间，显示时间过少的问题。

 1）能量小睡 (Power Nap)：约25分钟，能有效恢复精力，且不易产生睡眠惰性。

 2）记忆小睡 (Memory Nap)：约60分钟，有助于学习和巩固短期记忆。

当大于5小时，则按照常规模式90分钟一个周期计算

### 4.在计划入睡栏加入自定义几点入睡，而不是简单的计算现在入睡的睡眠周期，使用起来更加的灵活

PS：所有的睡眠计算都是包含一个15分钟入睡的前提，例如：一个周期90 + 15 两个周期是90*2 + 15

## 四、界面预览

![](https://webp.makifx.com/202506201932015.webp)

## 五、部署方法

### 如何部署到 Cloudflare Workers

#### 1.登录您的 Cloudflare 仪表盘。

#### 2.在左侧菜单中，选择 Workers & Pages。

#### 3.点击 创建应用程序 (Create Application)，然后选择 创建 Worker (Create Worker)。

#### 4.为您 Worker 指定一个名称（例如 sleep-calculator），然后点击 部署 (Deploy)。

### 5.部署完成后，点击 编辑代码 (Edit code)。

### 6.将编辑器中预填充的示例代码全部删除。

#### 7.将上面提供的 Sleep Cycle Calculator.js 代码完整地复制并粘贴到编辑器中。

#### 8.点击右上角的 保存并部署 (Save and deploy) 按钮。

### 完成！现在，当您访问您的 Worker URL (例如 sleep-calculator.your-subdomain.workers.dev) 时，就会看到功能齐全的睡眠计算器页面了。
