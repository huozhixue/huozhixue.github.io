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

- 假设两个工人的质量和期望分别是 q1、w1，q2、w2，考虑工资怎么发
	- 设工资分别是 p1、p2，按题意要满足
		- p1/q1 = p2/q2
		- p1>=w1，p2>=w2
	- 设 a = p1/q1，那么 a>=max(w1/q1,w2/q2)
	- 因此实际发工资以 w/q 最大的人为准
- 那么将工人按 w/q 排序，假设以第 i 个人为准，则在前 i 个人中选 k 个 q 最小的即可
- 维护前 k 个最小的，可以用堆实现
## 解答

```python
class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], k: int) -> float:
        A = sorted(zip(wage,quality),key=lambda p:p[0]/p[1])
        res = inf
        pq,s = [],0
        for i,(w,q) in enumerate(A):
            s += q
            heappush(pq,-q)
            if i>=k:
                s += heappop(pq)
            if i>=k-1:
                res = min(res,s*w/q)
        return res
```
35 ms

