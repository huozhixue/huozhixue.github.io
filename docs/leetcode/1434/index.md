# 1434：每个人戴不同帽子的方案数（2273 分）


> <u>**[力扣第 25 场双周赛第 4 题](https://leetcode.cn/problems/number-of-ways-to-wear-different-hats-to-each-other/)**</u>

## 题目

<p>总共有 <code>n</code> 个人和 <code>40</code> 种不同的帽子，帽子编号从 <code>1</code> 到 <code>40</code> 。</p>

<p>给你一个整数列表的列表 <code>hats</code> ，其中 <code>hats[i]</code> 是第 <code>i</code> 个人所有喜欢帽子的列表。</p>

<p>请你给每个人安排一顶他喜欢的帽子，确保每个人戴的帽子跟别人都不一样，并返回方案数。</p>

<p>由于答案可能很大，请返回它对 <code>10^9 + 7</code> 取余后的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>hats = [[3,4],[4,5],[5]]
<strong>输出：</strong>1
<strong>解释：</strong>给定条件下只有一种方法选择帽子。
第一个人选择帽子 3，第二个人选择帽子 4，最后一个人选择帽子 5。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>hats = [[3,5,1],[3,5]]
<strong>输出：</strong>4
<strong>解释：</strong>总共有 4 种安排帽子的方法：
(3,5)，(5,3)，(1,3) 和 (1,5)
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>hats = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]
<strong>输出：</strong>24
<strong>解释：</strong>每个人都可以从编号为 1 到 4 的帽子中选。
(1,2,3,4) 4 个帽子的排列方案数为 24 。
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>hats = [[1,2,3],[2,3,5,6],[1,3,7,9],[1,8,9],[2,5,7]]
<strong>输出：</strong>111
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == hats.length</code></li>
<li><code>1 &lt;= n &lt;= 10</code></li>
<li><code>1 &lt;= hats[i].length &lt;= 40</code></li>
<li><code>1 &lt;= hats[i][j] &lt;= 40</code></li>
<li><code>hats[i]</code> 包含一个数字互不相同的整数列表。</li>
</ul>


**相似问题：**
- [1994：好子集的数目（2464 分）](/leetcode/1994)


## 分析

- 由于 n 很小，考虑递推人的集合
- 按最后一顶帽子分给谁，递推戴帽子的人的集合的方案数即可

## 解答


```python
class Solution:
    def numberWays(self, hats: List[List[int]]) -> int:
        mod = 10**9+7
        n = len(hats)
        d = defaultdict(list)
        for i,A in enumerate(hats):
            for a in A:
                d[a].append(i)
        f = defaultdict(int)
        f[0] = 1
        for a in d:
            for u,w in list(f.items()):
                for i in d[a]:
                    if not u&1<<i:
                        v = u|1<<i
                        f[v] = (f[v]+w)%mod
        return f[(1<<n)-1]
```
111 ms
