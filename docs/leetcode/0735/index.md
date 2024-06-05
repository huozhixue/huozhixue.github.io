# 0735：小行星碰撞（★）


> <u>**[力扣第 735 题](https://leetcode.cn/problems/asteroid-collision/)**</u>

## 题目

<p>给定一个整数数组 <code>asteroids</code>，表示在同一行的小行星。</p>

<p>对于数组中的每一个元素，其绝对值表示小行星的大小，正负表示小行星的移动方向（正表示向右移动，负表示向左移动）。每一颗小行星以相同的速度移动。</p>

<p>找出碰撞后剩下的所有小行星。碰撞规则：两个小行星相互碰撞，较小的小行星会爆炸。如果两颗小行星大小相同，则两颗小行星都会爆炸。两颗移动方向相同的小行星，永远不会发生碰撞。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>asteroids = [5,10,-5]
<strong>输出：</strong>[5,10]
<b>解释：</b>10 和 -5 碰撞后只剩下 10 。 5 和 10 永远不会发生碰撞。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>asteroids = [8,-8]
<strong>输出：</strong>[]
<b>解释：</b>8 和 -8 碰撞后，两者都发生爆炸。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>asteroids = [10,2,-5]
<strong>输出：</strong>[10]
<b>解释：</b>2 和 -5 发生碰撞后剩下 -5 。10 和 -5 发生碰撞后剩下 10 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= asteroids.length &lt;= 10<sup>4</sup></code></li>
<li><code>-1000 &lt;= asteroids[i] &lt;= 1000</code></li>
<li><code>asteroids[i] != 0</code></li>
</ul>


## 分析

显然用栈，不过情况较多需要注意。

遍历到 cur 时，当 stack 非空且 cur < 0 < stack[-1] 时，会发生碰撞。
将 pre=stack[-1] 弹出，cur 更新为 cur 和 pre 碰撞后剩下的行星，如果相等，就将 cur 更新为 0。

循环直到不碰撞时，如果 cur 不为 0，就是还剩下的，入栈即可。

## 解答

```python
def asteroidCollision(self, asteroids: List[int]) -> List[int]:
	stack = []
	for cur in asteroids:
		while stack and cur < 0 < stack[-1]:
			pre = stack.pop()
			cur = 0 if abs(cur) == pre else max([cur, pre], key=abs)
		if cur != 0:
			stack.append(cur)
	return stack
```

60 ms

