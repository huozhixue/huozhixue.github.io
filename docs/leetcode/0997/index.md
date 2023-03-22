# 0997：找到小镇的法官


> <u>**[力扣第 125 场周赛第 1 题](https://leetcode.cn/problems/find-the-town-judge/)**</u>

## 题目

<p>小镇里有 <code>n</code> 个人，按从 <code>1</code> 到 <code>n</code> 的顺序编号。传言称，这些人中有一个暗地里是小镇法官。</p>

<p>如果小镇法官真的存在，那么：</p>

<ol>
<li>小镇法官不会信任任何人。</li>
<li>每个人（除了小镇法官）都信任这位小镇法官。</li>
<li>只有一个人同时满足属性 <strong>1</strong> 和属性 <strong>2</strong> 。</li>
</ol>

<p>给你一个数组 <code>trust</code> ，其中 <code>trust[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 表示编号为 <code>a<sub>i</sub></code> 的人信任编号为 <code>b<sub>i</sub></code> 的人。</p>

<p>如果小镇法官存在并且可以确定他的身份，请返回该法官的编号；否则，返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2, trust = [[1,2]]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3, trust = [[1,3],[2,3]]
<strong>输出：</strong>3
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 3, trust = [[1,3],[2,3],[3,1]]
<strong>输出：</strong>-1
</pre>


<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
<li><code>0 &lt;= trust.length &lt;= 10<sup>4</sup></code></li>
<li><code>trust[i].length == 2</code></li>
<li><code>trust</code> 中的所有<code>trust[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> <strong>互不相同</strong></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li><code>1 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n</code></li>
</ul>


## 分析

显然法官被 N-1 个人信任且自己信任 0 人，所以记录每个人被多少人信任和自己信任多少人即可。

本题也可以看作是一个图问题。将人作为顶点，信任关系作为边，即是求有向图中入度 N-1 且出度 0 的节点。

## 解答

```python
def findJudge(self, n: int, trust: List[List[int]]) -> int:
    indeg, outdeg = [0] * (n+1), [0] * (n+1)
    for u, v in trust:
        indeg[v] += 1
        outdeg[u] += 1
    for i in range(1, n+1):
        if indeg[i] == n-1 and outdeg[i] == 0:
            return i
    return -1
```
120 ms
