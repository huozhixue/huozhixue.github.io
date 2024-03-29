# 0475：供暖器（★）


> <u>**[力扣第 475 题](https://leetcode.cn/problems/heaters/)**</u>

## 题目

<p>冬季已经来临。 你的任务是设计一个有固定加热半径的供暖器向所有房屋供暖。</p>

<p>在加热器的加热半径范围内的每个房屋都可以获得供暖。</p>

<p>现在，给出位于一条水平线上的房屋 <code>houses</code> 和供暖器 <code>heaters</code> 的位置，请你找出并返回可以覆盖所有房屋的最小加热半径。</p>

<p><strong>说明</strong>：所有供暖器都遵循你的半径标准，加热的半径也一样。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> houses = [1,2,3], heaters = [2]
<strong>输出:</strong> 1
<strong>解释:</strong> 仅在位置2上有一个供暖器。如果我们将加热半径设为1，那么所有房屋就都能得到供暖。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> houses = [1,2,3,4], heaters = [1,4]
<strong>输出:</strong> 1
<strong>解释:</strong> 在位置1, 4上有两个供暖器。我们需要将加热半径设为1，这样所有房屋就都能得到供暖。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>houses = [1,5], heaters = [2]
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= houses.length, heaters.length <= 3 * 10<sup>4</sup></code></li>
<li><code>1 <= houses[i], heaters[i] <= 10<sup>9</sup></code></li>
</ul>


## 分析

将 heaters 排序，然后每个房屋二分查找最近的供暖器，更新半径即可。

还可以在 heaters 前后加上哨兵，方便处理边界。


## 解答


```python
def findRadius(self, houses: List[int], heaters: List[int]) -> int:
	A = [-inf]+sorted(heaters)+[inf]
	res = 0
	for h in houses:
		pos = bisect_left(A, h)
		w = min(A[pos]-h, h-A[pos-1])
		res = max(res, w)
	return res
```
时间 $O((N+M)logN)$，96 ms

