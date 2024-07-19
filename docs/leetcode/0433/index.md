# 0433：最小基因变化（★）


> <u>**[力扣第 433 题](https://leetcode.cn/problems/minimum-genetic-mutation/)**</u>

## 题目

<p>基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 <code>'A'</code>、<code>'C'</code>、<code>'G'</code> 和 <code>'T'</code> 之一。</p>

<p>假设我们需要调查从基因序列 <code>start</code> 变为 <code>end</code> 所发生的基因变化。一次基因变化就意味着这个基因序列中的一个字符发生了变化。</p>

<ul>
<li>例如，<code>"AACCGGTT" --&gt; "AACCGGTA"</code> 就是一次基因变化。</li>
</ul>

<p>另有一个基因库 <code>bank</code> 记录了所有有效的基因变化，只有基因库中的基因才是有效的基因序列。（变化后的基因必须位于基因库 <code>bank</code> 中）</p>

<p>给你两个基因序列 <code>start</code> 和 <code>end</code> ，以及一个基因库 <code>bank</code> ，请你找出并返回能够使 <code>start</code> 变化为 <code>end</code> 所需的最少变化次数。如果无法完成此基因变化，返回 <code>-1</code> 。</p>

<p>注意：起始基因序列 <code>start</code> 默认是有效的，但是它并不一定会出现在基因库中。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
<strong>输出：</strong>2
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>start = "AAAAACCC", end = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>start.length == 8</code></li>
<li><code>end.length == 8</code></li>
<li><code>0 &lt;= bank.length &lt;= 10</code></li>
<li><code>bank[i].length == 8</code></li>
<li><code>start</code>、<code>end</code> 和 <code>bank[i]</code> 仅由字符 <code>['A', 'C', 'G', 'T']</code> 组成</li>
</ul>


**相似问题：**
- [0127：单词接龙](/leetcode/0127)


## 分析

- 典型的 bfs，数据量较大时，可以类似 {{< lc "0127" >}}
	- 将单词的某一位改为 ‘.’ 作为单词的 key
	- 每个单词按所有的 key 存在哈希表中
	- 搜索时，取所有 key 对应的列表即可
## 解答


```python
class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        d = defaultdict(list)
        for w in bank:
            for i in range(len(w)):
                d[w[:i]+'*'+w[i+1:]].append(w)
        Q,vis = deque([(startGene,0)]), {startGene}
        while Q:
            u,w = Q.popleft()
            if u==endGene:
                return w
            for i in range(len(u)):
                for v in d[u[:i]+'*'+u[i+1:]]:
                    if v not in vis:
                        Q.append((v,w+1))
                        vis.add(v)
        return -1
```
33 ms
