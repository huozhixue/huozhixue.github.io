# 1276：不浪费原料的汉堡制作方案（1386 分）


> <u>**[力扣第 165 场周赛第 2 题](https://leetcode.cn/problems/number-of-burgers-with-no-waste-of-ingredients/)**</u>

## 题目

<p>圣诞活动预热开始啦，汉堡店推出了全新的汉堡套餐。为了避免浪费原料，请你帮他们制定合适的制作计划。</p>

<p>给你两个整数 <code>tomatoSlices</code> 和 <code>cheeseSlices</code>，分别表示番茄片和奶酪片的数目。不同汉堡的原料搭配如下：</p>

<ul>
<li><strong>巨无霸汉堡：</strong>4 片番茄和 1 片奶酪</li>
<li><strong>小皇堡：</strong>2 片番茄和 1 片奶酪</li>
</ul>

<p>请你以 <code>[total_jumbo, total_small]</code>（[巨无霸汉堡总数，小皇堡总数]）的格式返回恰当的制作方案，使得剩下的番茄片 <code>tomatoSlices</code> 和奶酪片 <code>cheeseSlices</code> 的数量都是 <code>0</code>。</p>

<p>如果无法使剩下的番茄片 <code>tomatoSlices</code> 和奶酪片 <code>cheeseSlices</code> 的数量为 <code>0</code>，就请返回 <code>[]</code>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>tomatoSlices = 16, cheeseSlices = 7
<strong>输出：</strong>[1,6]
<strong>解释：</strong>制作 1 个巨无霸汉堡和 6 个小皇堡需要 4*1 + 2*6 = 16 片番茄和 1 + 6 = 7 片奶酪。不会剩下原料。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>tomatoSlices = 17, cheeseSlices = 4
<strong>输出：</strong>[]
<strong>解释：</strong>只制作小皇堡和巨无霸汉堡无法用光全部原料。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>tomatoSlices = 4, cheeseSlices = 17
<strong>输出：</strong>[]
<strong>解释：</strong>制作 1 个巨无霸汉堡会剩下 16 片奶酪，制作 2 个小皇堡会剩下 15 片奶酪。
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>tomatoSlices = 0, cheeseSlices = 0
<strong>输出：</strong>[0,0]
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>tomatoSlices = 2, cheeseSlices = 1
<strong>输出：</strong>[0,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= tomatoSlices &lt;= 10^7</code></li>
<li><code>0 &lt;= cheeseSlices &lt;= 10^7</code></li>
</ul>




## 分析

经典的鸡兔同笼问题。

## 解答


```python
def numOfBurgers(self, tomatoSlices: int, cheeseSlices: int) -> List[int]:
	x = tomatoSlices-2*cheeseSlices
	if x<0 or x&1 or x//2>cheeseSlices:
		return []
	return [x//2, cheeseSlices-x//2]
```
36 ms
