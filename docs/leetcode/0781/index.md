# 0781：森林中的兔子（1453 分）


> <u>**[力扣第 781 题](https://leetcode.cn/problems/rabbits-in-forest/)**</u>

## 题目

<p>森林中有未知数量的兔子。提问其中若干只兔子<strong> "还有多少只兔子与你（指被提问的兔子）颜色相同?"</strong> ，将答案收集到一个整数数组 <code>answers</code> 中，其中 <code>answers[i]</code> 是第 <code>i</code> 只兔子的回答。</p>

<p>给你数组 <code>answers</code> ，返回森林中兔子的最少数量。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>answers = [1,1,2]
<strong>输出：</strong>5
<strong>解释：</strong>
两只回答了 "1" 的兔子可能有相同的颜色，设为红色。
之后回答了 "2" 的兔子不会是红色，否则他们的回答会相互矛盾。
设回答了 "2" 的兔子为蓝色。
此外，森林中还应有另外 2 只蓝色兔子的回答没有包含在数组中。
因此森林中兔子的最少数量是 5 只：3 只回答的和 2 只没有回答的。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>answers = [10,10,10]
<strong>输出：</strong>11
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= answers.length &lt;= 1000</code></li>
<li><code>0 &lt;= answers[i] &lt; 1000</code></li>
</ul>


## 分析

显然相同颜色的兔子的回答相同，且等于该颜色兔子个数减 1。

因此若回答某一数字 x 的频数 freq 大于 x+1，不可能是同一颜色，至少应该有  (freq-1)//(x+1) + 1 种颜色。
于是数字 x 至少对应 ((freq-1)//(x+1) + 1) * (x+1) 只兔子。

而回答不同数字的兔子必然是不同颜色。因此遍历不同数字，求和即可。


## 解答

```python
def numRabbits(self, answers: List[int]) -> int:
	return sum((freq+x)//(x+1)*(x+1)  for x, freq in Counter(answers).items()) 
```

52 ms


