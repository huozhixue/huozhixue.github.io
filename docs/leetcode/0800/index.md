# 0800：相似 RGB 颜色（★）


> <u>**[力扣第 800 题](https://leetcode.cn/problems/similar-rgb-color/)**</u>

## 题目

<p>RGB 颜色 <code>"#AABBCC"</code> 可以简写成 <code>"#ABC"</code> 。</p>

<ul>
<li>例如，<code>"#15c"</code> 其实是 <code>"#1155cc"</code> 的简写。</li>
</ul>

<p>现在，假如我们分别定义两个颜色 <code>"#ABCDEF"</code> 和 <code>"#UVWXYZ"</code>，则他们的相似度可以通过这个表达式 <code>-(AB - UV)^2 - (CD - WX)^2 - (EF - YZ)^2</code> 来计算。</p>

<p>那么给你一个按 <code>"#ABCDEF"</code> 形式定义的字符串 <code>color</code> 表示 RGB 颜色，请你以字符串形式，返回一个与它相似度最大且可以简写的颜色。（比如，可以表示成类似 <code>"#XYZ"</code> 的形式）</p>

<p><strong>任何</strong> 具有相同的（最大）相似度的答案都会被视为正确答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>color = "#09f166"
<strong>输出：</strong>"#11ee66"
<strong>解释：</strong>
因为相似度计算得出 -(0x09 - 0x11)^2 -(0xf1 - 0xee)^2 - (0x66 - 0x66)^2 = -64 -9 -0 = -73
这已经是所有可以简写的颜色中最相似的了
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>color = "#4e3fe1"
<strong>输出：</strong>"#5544dd"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>color.length == 7</code></li>
<li><code>color[0] == '#'</code></li>
<li>对于任何 <code>i &gt; 0</code>，<code>color[i]</code> 都是一个在范围 <code>['0', 'f']</code> 内的 16 进制数</li>
</ul>


## 分析

显然 XYZ 的取值是相互独立的。对于 AB，在 (A-1)%16,A,(A+1)%16 中找 X 使得 XX 和 AB 最近即可。

## 解答


```python
def similarRGB(self, color: str) -> str:
	def find(pair):
		a, b = int(pair[0], 16), int(pair[1], 16)
		x = min([a,(a-1)%16,(a+1)%16], key=lambda x: abs(x*16+x-a*16-b))
		return hex(x)[2:]*2
	
	return '#'+find(color[1:3])+find(color[3:5])+find(color[5:])
```

28 ms
