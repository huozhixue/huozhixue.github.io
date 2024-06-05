# 1041：困于环中的机器人（1521 分）


> <u>**[力扣第 136 场周赛第 1 题](https://leetcode.cn/problems/robot-bounded-in-circle/)**</u>

## 题目

<p>在无限的平面上，机器人最初位于 <code>(0, 0)</code> 处，面朝北方。注意:</p>

<ul>
<li><strong>北方向</strong> 是y轴的正方向。</li>
<li><strong>南方向</strong> 是y轴的负方向。</li>
<li><strong>东方向</strong> 是x轴的正方向。</li>
<li><strong>西方向</strong> 是x轴的负方向。</li>
</ul>

<p>机器人可以接受下列三条指令之一：</p>

<ul>
<li><code>"G"</code>：直走 1 个单位</li>
<li><code>"L"</code>：左转 90 度</li>
<li><code>"R"</code>：右转 90 度</li>
</ul>

<p>机器人按顺序执行指令 <code>instructions</code>，并一直重复它们。</p>

<p>只有在平面中存在环使得机器人永远无法离开时，返回 <code>true</code>。否则，返回 <code>false</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>instructions = "GGLLGG"
<strong>输出：</strong>true
<strong>解释：</strong>机器人最初在(0,0)处，面向北方。
“G”:移动一步。位置:(0,1)方向:北。
“G”:移动一步。位置:(0,2).方向:北。
“L”:逆时针旋转90度。位置:(0,2).方向:西。
“L”:逆时针旋转90度。位置:(0,2)方向:南。
“G”:移动一步。位置:(0,1)方向:南。
“G”:移动一步。位置:(0,0)方向:南。
重复指令，机器人进入循环:(0,0)——&gt;(0,1)——&gt;(0,2)——&gt;(0,1)——&gt;(0,0)。
在此基础上，我们返回true。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>instructions = "GG"
<strong>输出：</strong>false
<strong>解释：</strong>机器人最初在(0,0)处，面向北方。
“G”:移动一步。位置:(0,1)方向:北。
“G”:移动一步。位置:(0,2).方向:北。
重复这些指示，继续朝北前进，不会进入循环。
在此基础上，返回false。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>instructions = "GL"
<strong>输出：</strong>true
<strong>解释：</strong>机器人最初在(0,0)处，面向北方。
“G”:移动一步。位置:(0,1)方向:北。
“L”:逆时针旋转90度。位置:(0,1).方向:西。
“G”:移动一步。位置:(- 1,1)方向:西。
“L”:逆时针旋转90度。位置:(- 1,1)方向:南。
“G”:移动一步。位置:(- 1,0)方向:南。
“L”:逆时针旋转90度。位置:(- 1,0)方向:东方。
“G”:移动一步。位置:(0,0)方向:东方。
“L”:逆时针旋转90度。位置:(0,0)方向:北。
重复指令，机器人进入循环:(0,0)——&gt;(0,1)——&gt;(- 1,1)——&gt;(- 1,0)——&gt;(0,0)。
在此基础上，我们返回true。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= instructions.length &lt;= 100</code></li>
<li><code>instructions[i]</code> 仅包含 <code>'G', 'L', 'R'</code></li>
</ul>


## 分析

先模拟走完一轮：
- 假如回到原点，显然进入循环
- 假如走到另外一个点 <i,j>，方向依然向北，显然没有循环
- 假如方向不再向北，那么走四轮就会回到原点（比如下图）

	![](https://pic.leetcode.cn/1666772163-pgHuuT-%E7%BB%98%E5%9B%BE2.png)

## 解答


```python
def isRobotBounded(self, instructions: str) -> bool:
	x, y, dx, dy = 0, 0, -1, 0
	for c in instructions:
		if c=='G':
			x, y = x+dx, y+dy
		else:
			dx, dy = (dy, -dx) if c=='R' else (-dy, dx)
	return x==y==0 or (dx,dy)!=(-1, 0)
```
36 ms
