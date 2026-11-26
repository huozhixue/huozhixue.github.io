# 博客 - Shortcodes


**LoveIt** 主题在 Hugo 内置的 shortcode 的基础上提供多个扩展的 shortcode.

<!--more-->

## 1 link

{{< version 0.2.0 >}}

`link` shortcode 是 Markdown 链接语法 的替代.
`link` shortcode 可以提供一些其它的功能并且可以在代码块中使用.

{{< version 0.2.10 >}} 支持[本地资源引用](../hugo-content#contents-organization)的完整用法.

`link` shortcode 有以下命名参数:

* **href** *[必需]* (**第一个**位置参数)

    链接的目标.

* **content** *[可选]* (**第二个**位置参数)

    链接的内容, 默认值是 **href** 参数的值.

    *支持 Markdown 或者 HTML 格式.*

* **title** *[可选]* (**第三个**位置参数)

    HTML `a` 标签 的 `title` 属性, 当悬停在链接上会显示的提示.

* **rel** *[可选]*

    HTML `a` 标签 的 `rel` 补充属性.

* **class** *[可选]*

    HTML `a` 标签 的 `class` 属性.

一个 `link` 示例:

```markdown
{{</* link "https://assemble.io" */>}}
或者
{{</* link href="https://assemble.io" */>}}

{{</* link "mailto:contact@revolunet.com" */>}}
或者
{{</* link href="mailto:contact@revolunet.com" */>}}

{{</* link "https://assemble.io" Assemble */>}}
或者
{{</* link href="https://assemble.io" content=Assemble */>}}
```

呈现的输出效果如下:

* {{< link "https://assemble.io" >}}
* {{< link "mailto:contact@revolunet.com" >}}
* {{< link "https://assemble.io" Assemble >}}

一个带有标题的 `link` 示例:

```markdown
{{</* link "https://github.com/upstage/" Upstage "Visit Upstage!" */>}}
或者
{{</* link href="https://github.com/upstage/" content=Upstage title="Visit Upstage!" */>}}
```

呈现的输出效果如下 (将鼠标悬停在链接上，会有一行提示):

{{< link "https://github.com/upstage/" Upstage "Visit Upstage!" >}}

## 2 image {#image}

{{< version 0.2.0 changed >}}

`image` shortcode 是 `figure` shortcode 的替代. 
`image` shortcode 可以充分利用 [lazysizes](https://github.com/aFarkas/lazysizes) 
和 [lightgallery.js](https://github.com/sachinchoolur/lightgallery.js) 两个依赖库.

{{< version 0.2.10 >}} 支持[本地资源引用](../hugo-content#contents-organization)的完整用法.

`image` shortcode 有以下命名参数:

* **src** *[必需]* (**第一个**位置参数)

    图片的 URL.

* **alt** *[可选]* (**第二个**位置参数)

    图片无法显示时的替代文本, 默认值是 **src** 参数的值.

    *支持 Markdown 或者 HTML 格式.*

* **caption** *[可选]* (**第三个**位置参数)

    图片标题.

    *支持 Markdown 或者 HTML 格式.*

* **title** *[可选]*

    当悬停在图片上会显示的提示.

* **class** *[可选]*

    HTML `figure` 标签的 `class` 属性.

* **src_s** *[可选]*

    图片缩略图的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.

* **src_l** *[可选]*

    高清图片的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.

* **height** *[可选]*

    图片的 `height` 属性.

* **width** *[可选]*

    图片的 `width` 属性.

* **linked** *[可选]*

    图片是否需要被链接, 默认值是 `true`.

* **rel** *[可选]*

    HTML `a` 标签 的 `rel` 补充属性, 仅在 **linked** 属性设置成 `true` 时有效.

一个 `image` 示例:

```markdown
{{</* image src="https://hugoloveit.com/images/lighthouse.jpg" caption="Lighthouse (`image`)"  */>}}
```

呈现的输出效果如下:

{{< image src="https://hugoloveit.com/images/lighthouse.jpg" caption="Lighthouse (`image`)" >}}

## 3 admonition

`admonition` shortcode 支持 **12** 种 帮助你在页面中插入提示的横幅.

*支持 Markdown 或者 HTML 格式.*

{{< admonition >}}
一个 **注意** 横幅
{{< /admonition >}}

{{< admonition abstract >}}
一个 **摘要** 横幅
{{< /admonition >}}

{{< admonition info >}}
一个 **信息** 横幅
{{< /admonition >}}

{{< admonition tip >}}
一个 **技巧** 横幅
{{< /admonition >}}

{{< admonition success >}}
一个 **成功** 横幅
{{< /admonition >}}

{{< admonition question >}}
一个 **问题** 横幅
{{< /admonition >}}

{{< admonition warning >}}
一个 **警告** 横幅
{{< /admonition >}}

{{< admonition failure >}}
一个 **失败** 横幅
{{< /admonition >}}

{{< admonition danger >}}
一个 **危险** 横幅
{{< /admonition >}}

{{< admonition bug >}}
一个 **Bug** 横幅
{{< /admonition >}}

{{< admonition example >}}
一个 **示例** 横幅
{{< /admonition >}}

{{< admonition quote >}}
一个 **引用** 横幅
{{< /admonition >}}

`admonition` shortcode 有以下命名参数:

* **type** *[必需]* (**第一个**位置参数)

    `admonition` 横幅的类型, 默认值是 `note`.

* **title** *[可选]* (**第二个**位置参数)

    `admonition` 横幅的标题, 默认值是 **type** 参数的值.

* **open** *[可选]* (**第三个**位置参数) {{< version 0.2.0 changed >}}

    横幅内容是否默认展开, 默认值是 `true`.

一个 `admonition` 示例:

```markdown
{{</* admonition type=tip title="This is a tip" open=false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
或者
{{</* admonition tip "This is a tip" false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
```

呈现的输出效果如下:

{{< admonition tip "This is a tip" false >}}
一个 **技巧** 横幅
{{< /admonition >}}

## 4 music

`music` shortcode 基于 [APlayer](https://github.com/MoePlayer/APlayer) 和 
[MetingJS](https://github.com/metowolf/MetingJS) 提供了一个内嵌的响应式音乐播放器.

有三种方式使用 `music` shortcode.

### 4.1 自定义音乐 URL {#custom-music-url}

{{< version 0.2.10 >}} 支持[本地资源引用](../hugo-content#contents-organization)的完整用法.

`music` shortcode 有以下命名参数来使用自定义音乐 URL:

* **server** *[必需]*

    音乐的链接.

* **type** *[可选]*

    音乐的名称.

* **artist** *[可选]*

    音乐的创作者.

* **cover** *[可选]*

    音乐的封面链接.

一个使用自定义音乐 URL 的 `music` 示例:

```markdown
{{</* music url="https://hugoloveit.com/music/Wavelength.mp3" name=Wavelength artist=oldmanyoung 
cover="http://p1.music.126.net/ehaqkehdaCgDmkTtWZ7V5g==/109951165477782965.jpg" */>}}
```

呈现的输出效果如下:

{{< music url="https://hugoloveit.com/music/Wavelength.mp3" name=Wavelength artist=oldmanyoung 
cover="http://p1.music.126.net/ehaqkehdaCgDmkTtWZ7V5g==/109951165477782965.jpg" >}}

### 4.2 音乐平台 URL 的自动识别 {#automatic-identification}

`music` shortcode 有一个命名参数来使用音乐平台 URL 的自动识别:

* **auto** *[必需]]* (**第一个**位置参数)

    用来自动识别的音乐平台 URL, 支持 `netease`, `tencent` 和 `xiami` 平台.

一个使用音乐平台 URL 的自动识别的 `music` 示例:

```markdown
{{</* music auto="https://y.qq.com/n/yqq/album/001Di11N41SEdY.html" */>}}
或者
{{</* music "https://y.qq.com/n/yqq/album/001Di11N41SEdY.html" */>}}
```

呈现的输出效果如下:

{{< music auto="https://y.qq.com/n/yqq/album/001Di11N41SEdY.html" >}}

### 4.3 自定义音乐平台, 类型和 ID {#custom-server}

`music` shortcode 有以下命名参数来使用自定义音乐平台:

* **server** *[必需]* (**第一个**位置参数)

    [`netease`, `tencent`, `kugou`, `xiami`, `baidu`]

    音乐平台.

* **type** *[必需]* (**第二个**位置参数)

    [`song`, `playlist`, `album`, `search`, `artist`]

    音乐类型.

* **id** *[必需]* (**第三个**位置参数)

    歌曲 ID, 或者播放列表 ID, 或者专辑 ID, 或者搜索关键词, 或者创作者 ID.

一个使用自定义音乐平台的 `music` 示例:

```markdown
{{</* music server="netease" type="song" id="28151052" */>}}
或者
{{</* music netease song 28151052 */>}}
```

呈现的输出效果如下:

{{< music netease song 28151052 >}}

### 4.4 其它参数 {#other-parameters}

`music` shortcode 有一些可以应用于以上三种方式的其它命名参数:

* **theme** *[可选]*

    {{< version 0.2.0 changed >}} 音乐播放器的主题色, 默认值是 `#aaaaaa`.

* **fixed** *[可选]*

    是否开启固定模式, 默认值是 `false`.

* **mini** *[可选]*

    是否开启迷你模式, 默认值是 `false`.

* **autoplay** *[可选]*

    是否自动播放音乐, 默认值是 `false`.

* **volume** *[可选]*

    第一次打开播放器时的默认音量, 会被保存在浏览器缓存中, 默认值是 `0.7`.

* **mutex** *[可选]*

    是否自动暂停其它播放器, 默认值是 `true`.

`music` shortcode 还有一些只适用于音乐列表方式的其它命名参数:

* **loop** *[可选]*

    [`all`, `one`, `none`]

    音乐列表的循环模式, 默认值是 `none`.

* **order** *[可选]*

    [`list`, `random`]

    音乐列表的播放顺序, 默认值是 `list`.

* **list-folded** *[可选]*

    初次打开的时候音乐列表是否折叠, 默认值是 `false`.

* **list-max-height** *[可选]*

    音乐列表的最大高度, 默认值是 `340px`.

## 5 bilibili

{{< version 0.2.0 changed >}}

`bilibili` shortcode 提供了一个内嵌的用来播放 bilibili 视频的响应式播放器.

如果视频只有一个部分, 则仅需要视频的 BV `id`, 例如:

```code
https://www.bilibili.com/video/BV1Sx411T7QQ
```

一个 `bilibili` 示例:

```markdown
{{</* bilibili BV15t411E7hf */>}}
或者
{{</* bilibili id=BV15t411E7hf */>}}
```

呈现的输出效果如下:

{{< bilibili id=BV15t411E7hf >}}

如果视频包含多个部分, 则除了视频的 BV `id` 之外, 还需要 `p`, 默认值为 `1`, 例如:

```code
https://www.bilibili.com/video/BV1Zt411f7ga?p=9
```

一个带有 `p` 参数的 `bilibili` 示例:

```markdown
{{</* bilibili BV17W411y74a 55 */>}}
或者
{{</* bilibili id=BV17W411y74a p=55 */>}}
```

呈现的输出效果如下:

{{< bilibili id=BV17W411y74a p=55 >}}


