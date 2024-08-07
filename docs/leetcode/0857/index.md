# 0857：雇佣 K 名工人的最低成本（2259 分）


> <u>**[力扣第 90 场周赛第 4 题](https://leetcode.cn/problems/minimum-cost-to-hire-k-workers/)**</u>

## 题目

<p>有 <code>n</code> 名工人。 给定两个数组 <code>quality</code> 和 <code>wage</code> ，其中，<code>quality[i]</code> 表示第 <code>i</code> 名工人的工作质量，其最低期望工资为 <code>wage[i]</code> 。</p>

<p>现在我们想雇佣 <code>k</code> 名工人组成一个 <strong>工资组</strong><em>。</em>在雇佣 一组 <code>k</code> 名工人时，我们必须按照下述规则向他们支付工资：</p>

<ol>
<li>对工资组中的每名工人，应当按其工作质量与同组其他工人的工作质量的比例来支付工资。</li>
<li>工资组中的每名工人至少应当得到他们的最低期望工资。</li>
</ol>

<p>给定整数 <code>k</code> ，返回 <em>组成满足上述条件的付费群体所需的最小金额 </em>。与实际答案误差相差在 <code>10<sup>-5</sup></code> 以内的答案将被接受。</p>



<ol>
</ol>

<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入： </strong>quality = [10,20,5], wage = [70,50,30], k = 2
<strong>输出： </strong>105.00000
<strong>解释：</strong> 我们向 0 号工人支付 70，向 2 号工人支付 35。</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入： </strong>quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
<strong>输出： </strong>30.66667
<strong>解释： </strong>我们向 0 号工人支付 4，向 2 号和 3 号分别支付 13.33333。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == quality.length == wage.length</code></li>
<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= quality[i], wage[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [2542：最大子序列的分数（2056 分）](/leetcode/2542)


## 分析

### #1

定义期望单价 = 工人期望工资 / 工作质量，实际单价 = 工人实际工资 / 工作质量。对于任意 K 名工人，按照规则应该有：

	K 名工人的 实际单价 相等
	每名工人的 实际单价 大于等于 期望单价

因此实际单价最小为 ratio=max(每名工人的期望单价)，这 K 名工人最少花费 ratio * 工作质量总和

显然遍历 K 名工人的集合太费时间，有个巧妙的想法是最终 ratio 必然是某个工人的期望单价，所以可以遍历 ratio。
而 ratio 固定时，显然应该找期望单价小于等于 ratio 且工作质量最小的工人，使花费最少。

可以先将工人按 ratio 排序，遍历时从前面找工作质量最小的工人即可。
	
```python
def mincostToHireWorkers(self, quality: List[int], wage: List[int], K: int) -> float:
	A = sorted((w/q, q) for q, w in zip(quality, wage))
	return min(A[i][0] * sum(nsmallest(K, [A[j][1] for j in range(i+1)])) for i in range(K-1, len(A)))
```

超时了

### #2

显然每次重新求工作质量最小的 K 个工人有很多重复计算，可以用 list 或者大顶堆来维护。
还可以添加一个变量 s 维护元素之和。
	
## 解答

```python
def mincostToHireWorkers(self, quality: List[int], wage: List[int], K: int) -> float:
	A = sorted((w/q, q) for q, w in zip(quality, wage))
	res, pq, s = float('inf'), [], 0
	for i in range(len(A)):
		heappush(pq, -A[i][1])
		s += A[i][1]
		if i >= K:
			s += heappop(pq)
		if i >= K-1:
			res = min(res, A[i][0] * s)
	return res
```

240 ms

