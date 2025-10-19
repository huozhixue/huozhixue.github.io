# 3383：施法所需最低符文数量（★★）


> <u>**[力扣第 3383 题](https://leetcode.cn/problems/minimum-runes-to-add-to-cast-spell/)**</u>

## 题目

<p>Alice 刚刚从巫师学校毕业，并且希望施展一个魔法咒语来庆祝。魔法咒语包含某些需要集中魔力的焦点，其中一些焦点含有作为咒语能量源的魔法水晶。焦点可以通过 <strong>有向符文</strong> 进行连接，这些符文将魔力流从一个焦点传输到另一个焦点。</p>

<p>给定一个整数 <code>n</code> 表示焦点的数量，以及一个整数数组 <code>crystals</code>，其中 <code>crystals[i]</code> 表示有魔法水晶的焦点。同时给定两个整数数组 <code>flowFrom</code> 和 <code>flowTo</code>，表示存在的 <strong>有向符文</strong>。第 <code>i<sup>th</sup></code> 个符文允许魔力流从焦点 <code>flowFrom[i]</code> 传输到焦点 <code>flowTo[i]</code>。</p>

<p>你需要找到 Alice 必须添加到她的咒语中的定向符文数量，使得每个焦点要么：</p>

<ul>
<li><strong>包含</strong> 一个魔法水晶。</li>
<li>从其它焦点 <strong>接收</strong> 魔力流。</li>
</ul>

<p>返回她所需要添加的 <strong>最少</strong> 有向符文数量。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">n = 6, crystals = [0], flowFrom = [0,1,2,3], flowTo = [1,2,3,0]</span></p>

<p><span class="example-io"><b>输出：</b>2</span></p>

<p><b>解释：</b></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/11/08/runesexample0.png" style="width: 250px; height: 252px;" /></p>

<p>添加两个有向符文：</p>

<ul>
<li>从焦点 0 到焦点 4。</li>
<li>从焦点 0 到焦点 5。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>n = 7, crystals = [3,5], flowFrom = [0,1,2,3,5], flowTo = [1,2,0,4,6]</span></p>

<p><span class="example-io"><b>输出：</b>1</span></p>

<p><b>解释：</b></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/11/08/runesexample1.png" style="width: 250px; height: 250px;" /></p>

<p>添加从焦点 4 到焦点 2 的有向符文。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= crystals.length &lt;= n</code></li>
<li><code>0 &lt;= crystals[i] &lt;= n - 1</code></li>
<li><code>1 &lt;= flowFrom.length == flowTo.length &lt;= min(2 * 10<sup>5</sup>, (n * (n - 1)) / 2)</code></li>
<li><code>0 &lt;= flowFrom[i], flowTo[i] &lt;= n - 1</code></li>
<li><code>flowFrom[i] != flowTo[i]</code></li>
<li>所有的有向符文 <strong>互不相同</strong>。</li>
</ul>


**相似问题：**
- [1568：使陆地分离的最少天数（2208 分）](/leetcode/1568)
- [2846：边权重均等查询（2507 分）](/leetcode/2846)


## 分析

- 按强连通分量缩点后，统计没有符文的根即可

## 解答


```python
# 非递归 tarjan 求有向图强连通分量
def tarjan(g,n):
	def dfs(u):
		nonlocal i,j
		dq = [u]
		while dq:
			u = dq.pop()
			if p[u]==0:
				dfn[u] = low[u] = i = i+1
				sk.append(u)
			if p[u]<len(g[u]):
				dq.append(u)
				v = g[u][p[u]]
				if not dfn[v]:
					dq.append(v)
				p[u] += 1
			else:
				for v in g[u]:
					if not scc[v]:
						low[u] = min(low[u],low[v])
				if low[u]==dfn[u]:
					j += 1
					v = -1
					while v!=u:
						v = sk.pop()
						scc[v] = j

	dfn,low= [0]*n,[0]*n
	sk,p = [],[0]*n
	scc = [0]*n
	i,j = 0,0
	for u in range(n):
		if not dfn[u]:
			dfs(u)
	return scc

class Solution:
    def minRunesToAdd(self, n: int, crystals: List[int], flowFrom: List[int], flowTo: List[int]) -> int:
        g = [[] for _ in range(n)]
        for u,v in zip(flowFrom,flowTo):
            g[u].append(v)
        scc = tarjan(g,n)
        deg = [0]*(max(scc)+1)
        for u,v in zip(flowFrom,flowTo):
            if scc[u]!=scc[v]:
                deg[scc[v]] += 1
        for x in crystals:
            deg[scc[x]] += 1
        return sum(x==0 for x in deg[1:])
```
515 ms
