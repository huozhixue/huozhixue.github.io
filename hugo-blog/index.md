# 博客搭建过程


根据 hugo 主题 **LoveIt** 搭建博客的过程。

<!--more-->
 

## 1. 安装 hugo

### #1 下载

[官网](https://gohugo.io/) 上下载 hugo 最新版本 [:(far fa-file-archive fa-fw): > 0.62.0](https://gohugo.io/getting-started/installing/) 并解压。


### #2 环境变量

按顺序打开：此电脑右键 -> 属性 -> 高级系统设置 -> 环境变量 -> 系统变量的 Path 

添加上一步的目录，即 `;E:\hugo_0.70.0_Windows-64bit`
	
> 前面的分号必须要加，为了和前面的其它路径隔开

### #3 测试

选择一个目录，例如 E:\，在地址栏输入 cmd 并回车进入命令行模式，然后输入:

```bash	
hugo version
```

查看 hugo 版本，有信息则说明成功

## 2. 启动 demo

### #1 生成站点

在选定目录下输入：

```bash
hugo new site Ian
```
	
该目录下会生成 Ian 文件夹，里面包含 content、layouts、themes 等基础文件

### #2 安装主题

在博客主目录（这里是 E:\Ian）下输入：

```bash
cd themes
git clone https://github.com/varkai/hugo-theme-zozo.git zozo --depth=1
```
	
然后用 `/themes/zozo/exampleSite/config.toml` 文件替换掉 `/config.toml` 文件
	
### #3 本地启动

在主目录下输入：

```bash
hugo server
```

可以访问主页了： {{< link "http://localhost:1313/" >}}

## 3. 基本页面

### #1 “关于”页面

目前只有首页，右上角导航栏的链接都无法访问，需要再添加页面

CTRL+C 停止 `hugo server`，然后在主目录下输入：
	
```bash
hugo new about.md
```
	
会生成 `/content/about.md` 文件

编辑内容，将 `draft: true` 改为 `draft: false`，再重新运行：
	
```bash
hugo server
```

首页的“关于”链接可以访问了

### #2 文章

同理，在主目录下输入

```bash
hugo new posts/first.md
```

生成 `/content/posts/first.md` 文件，并将 `draft: true` 改为 `draft: false`

现在首页会显示文章，且 “归档”、“标签”链接都可以访问了

## 4. 个性设置

### #1 基本元素

在 config.toml 中：

- title： 网站标题
- [params]： 网站副标题和页脚等
- [social]：导航栏下方的社交链接
- [params.valine]：评论系统
	- 先按照 {{< link "官方网站" "https://valine.js.org/quickstart.html" >}} 操作得到 APP ID 和 APP Key
	- 然后将 `enable = false` 改为 `enable = true`，并填入申请到的 appId 和 appKey
	- 若加载卡顿，可以将 `/themes/zozo/layouts/partials/comments.html` 中引用的 js 下载到本地，改为本地调用

在 `/themes/zozo/layouts/partials/header.html` 中找到：

```html
<img src="{{ "images/logo.svg" | absURL }}"/>
```

该 img 即是左上角的 logo，路径是 `/themes/zozo/static/images/logo.svg`

### #2 插入音乐和视频

hugo 不建议文章中直接插入 html 代码，需要借助 shortcodes，具体见 {{< link "hugo：插入音乐和视频" "/hugo_insert" >}}

效果：

{{< music auto="https://music.163.com/#/song?id=5005767" loop="none" >}}
 
{{< bilibili BV15t411E7hf 1 >}}

## 5. 部署到github

1）在 github 上新建仓库，命名为 `[用户名].github.io` （这里是 `huozhixue.github.io`）

2）文件 `/themes/zozo/layouts/partials/head.html` 的 `<head>` 标签中添加一行代码：

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```html

3）在博客主目录下运行：

```bash
hugo --baseUrl="http://huozhixue.github.io" -d ../github
cd ../github
git init
git remote add origin git@github.com:[用户名]/[用户名].github.io.git
git add -A
git commit -m "first commit"
git push -f origin master
```
	
4）浏览器访问地址 `https://[用户名].github.io` (这里是 {{< link "https://huozhixue.github.io" >}})

> github 有一定延迟，需要等一会才能看到效果

