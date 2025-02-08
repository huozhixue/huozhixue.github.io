# 0936：戳印序列（2583 分）


> <u>**[力扣第 109 场周赛第 4 题](https://leetcode.cn/problems/stamping-the-sequence/)**</u>

## 题目

<p>你想要用<strong>小写字母</strong>组成一个目标字符串 <code>target</code>。 </p>

<p>开始的时候，序列由 <code>target.length</code> 个 <code>&#39;?&#39;</code> 记号组成。而你有一个小写字母印章 <code>stamp</code>。</p>

<p>在每个回合，你可以将印章放在序列上，并将序列中的每个字母替换为印章上的相应字母。你最多可以进行 <code>10 * target.length</code>  个回合。</p>

<p>举个例子，如果初始序列为 &quot;?????&quot;，而你的印章 <code>stamp</code> 是 <code>&quot;abc&quot;</code>，那么在第一回合，你可以得到 &quot;abc??&quot;、&quot;?abc?&quot;、&quot;??abc&quot;。（请注意，印章必须完全包含在序列的边界内才能盖下去。）</p>

<p>如果可以印出序列，那么返回一个数组，该数组由每个回合中被印下的最左边字母的索引组成。如果不能印出序列，就返回一个空数组。</p>

<p>例如，如果序列是 &quot;ababc&quot;，印章是 <code>&quot;abc&quot;</code>，那么我们就可以返回与操作 &quot;?????&quot; -&gt; &quot;abc??&quot; -&gt; &quot;ababc&quot; 相对应的答案 <code>[0, 2]</code>；</p>

<p>另外，如果可以印出序列，那么需要保证可以在 <code>10 * target.length</code> 个回合内完成。任何超过此数字的答案将不被接受。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>stamp = &quot;abc&quot;, target = &quot;ababc&quot;
<strong>输出：</strong>[0,2]
（[1,0,2] 以及其他一些可能的结果也将作为答案被接受）
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>stamp = &quot;abca&quot;, target = &quot;aabcaca&quot;
<strong>输出：</strong>[3,0,1]
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= stamp.length &lt;= target.length &lt;= 1000</code></li>
<li><code>stamp</code> 和 <code>target</code> 只包含小写字母。</li>
</ol>




## 分析

- 显然最后一次印章必然和 stamp 完全匹配，考虑逆向推导
	- 先将 target 中和 stamp 完全匹配的子数组都替换为 '?'
	- 接着，假如 target 的某个子数组除了 '?' 部分，都和 stamp 匹配，那么也都可以替换为 '?'
	- 依此类推，假如最后 target 都变成了 '?'，即代表成功
- 考虑如何实现
	- 将 target 所有长为 len(stamp) 的子数组看作节点
	- 子数组中和 stamp 不匹配的个数看作节点的度
	- 从度为 0 的节点 u 开始遍历
		- u 这个子数组覆盖的下标都变成 '?' 
		- 遍历覆盖的每个下标 x
		- 假如其它某节点 v 覆盖了 x，且 x 贡献了 v 的度，那么 v 的度减 1
		- 如果 v 的度减为 0，即可作为下一轮遍历的节点
	- 这个过程非常类似拓扑排序，只是节点不直接相连，而是通过下标 x 的中介
	- 建图时，记录每个下标 x 产生贡献的节点列表即可
	- 注意下标 x 遍历后，要清除 x 的列表，因为贡献已减去了

## 解答


```python
class Solution:
    def movesToStamp(self, stamp: str, target: str) -> List[int]:
        m,n = len(target),len(stamp)
        g = [[] for _ in range(m)]
        deg = [0]*(m-n+1)
        for u in range(m-n+1):
            for x in range(u,u+n):
                if target[x]!=stamp[x-u]:
                    g[x].append(u)
                    deg[u] += 1
        Q = deque([u for u in range(m-n+1) if deg[u]==0])
        res = []
        while Q:
            u = Q.popleft()
            res.append(u)
            for x in range(u,u+n):
                for v in g[x]:
                    deg[v] -= 1
                    if deg[v]==0:
                        Q.append(v)
                g[x].clear()
        return res[::-1] if all(a==0 for a in deg) else []
```
71 ms
