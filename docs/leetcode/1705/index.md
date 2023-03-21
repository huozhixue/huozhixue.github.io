# 1705：吃苹果的最大数目（★）


> <u>**[力扣第 221 场周赛第 2 题](https://leetcode.cn/problems/maximum-number-of-eaten-apples/)**</u>

## 题目

<p>有一棵特殊的苹果树，一连 <code>n</code> 天，每天都可以长出若干个苹果。在第 <code>i</code> 天，树上会长出 <code>apples[i]</code> 个苹果，这些苹果将会在 <code>days[i]</code> 天后（也就是说，第 <code>i + days[i]</code> 天时）腐烂，变得无法食用。也可能有那么几天，树上不会长出新的苹果，此时用 <code>apples[i] == 0</code> 且 <code>days[i] == 0</code> 表示。</p>

<p>你打算每天 <strong>最多</strong> 吃一个苹果来保证营养均衡。注意，你可以在这 <code>n</code> 天之后继续吃苹果。</p>

<p>给你两个长度为 <code>n</code> 的整数数组 <code>days</code> 和 <code>apples</code> ，返回你可以吃掉的苹果的最大数目<em>。</em></p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>apples = [1,2,3,5,2], days = [3,2,1,4,2]
<strong>输出：</strong>7
<strong>解释：</strong>你可以吃掉 7 个苹果：
- 第一天，你吃掉第一天长出来的苹果。
- 第二天，你吃掉一个第二天长出来的苹果。
- 第三天，你吃掉一个第二天长出来的苹果。过了这一天，第三天长出来的苹果就已经腐烂了。
- 第四天到第七天，你吃的都是第四天长出来的苹果。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>apples = [3,0,0,0,0,2], days = [3,0,0,0,0,2]
<strong>输出：</strong>5
<strong>解释：</strong>你可以吃掉 5 个苹果：
- 第一天到第三天，你吃的都是第一天长出来的苹果。
- 第四天和第五天不吃苹果。
- 第六天和第七天，你吃的都是第六天长出来的苹果。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>apples.length == n</code></li>
<li><code>days.length == n</code></li>
<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= apples[i], days[i] &lt;= 2 * 10<sup>4</sup></code></li>
<li>只有在 <code>apples[i] = 0</code> 时，<code>days[i] = 0</code> 才成立</li>
</ul>


## 分析

直觉来说，每天应该先吃最早坏的苹果。（可以证明该策略每一步都不比最优策略差，因此就是最优策略）

可以用堆来维护有序列表，按 [腐烂时间, 苹果个数] 入堆，堆顶即是最早坏的苹果。
注意 n 天之后可以继续吃苹果，因此要遍历到第 max(i+d for i,d in enumerate(days)) 天。


## 解答

```python
def eatenApples(self, apples: List[int], days: List[int]) -> int:
	end = max(i+d for i, d in enumerate(days))
	res, pq = 0, []
	for i in range(end):
		if i < len(days) and apples[i] > 0:
			heappush(pq, [i+days[i], apples[i]])
		while pq and pq[0][0] <= i:
			heappop(pq)
		if pq:
			pq[0][1] -= 1
			if pq[0][1] == 0:
				heappop(pq)
			res += 1
	return res
```

340 ms


