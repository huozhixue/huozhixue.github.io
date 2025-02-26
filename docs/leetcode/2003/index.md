# 2003：每棵子树内缺失的最小基因值（2415 分）


> <u>**[力扣第 258 场周赛第 4 题](https://leetcode.cn/problems/smallest-missing-genetic-value-in-each-subtree/)**</u>

## 题目

<p>有一棵根节点为 <code>0</code> 的 <strong>家族树</strong> ，总共包含 <code>n</code> 个节点，节点编号为 <code>0</code> 到 <code>n - 1</code> 。给你一个下标从 <strong>0</strong> 开始的整数数组 <code>parents</code> ，其中 <code>parents[i]</code> 是节点 <code>i</code> 的父节点。由于节点 <code>0</code> 是 <strong>根</strong> ，所以 <code>parents[0] == -1</code> 。</p>

<p>总共有 <code>10<sup>5</sup></code> 个基因值，每个基因值都用 <strong>闭区间</strong> <code>[1, 10<sup>5</sup>]</code> 中的一个整数表示。给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> ，其中 <code>nums[i]</code> 是节点 <code>i</code> 的基因值，且基因值 <strong>互不相同</strong> 。</p>

<p>请你返回一个数组<em> </em><code>ans</code> ，长度为 <code>n</code> ，其中 <code>ans[i]</code> 是以节点 <code>i</code> 为根的子树内 <b>缺失</b> 的 <strong>最小</strong> 基因值。</p>

<p>节点 <code>x</code> 为根的 <strong>子树 </strong>包含节点 <code>x</code> 和它所有的 <strong>后代</strong> 节点。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/08/23/case-1.png" style="width: 204px; height: 167px;"></p>

<pre><b>输入：</b>parents = [-1,0,0,2], nums = [1,2,3,4]
<b>输出：</b>[5,1,1,1]
<b>解释：</b>每个子树答案计算结果如下：
- 0：子树包含节点 [0,1,2,3] ，基因值分别为 [1,2,3,4] 。5 是缺失的最小基因值。
- 1：子树只包含节点 1 ，基因值为 2 。1 是缺失的最小基因值。
- 2：子树包含节点 [2,3] ，基因值分别为 [3,4] 。1 是缺失的最小基因值。
- 3：子树只包含节点 3 ，基因值为 4 。1是缺失的最小基因值。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/08/23/case-2.png" style="width: 247px; height: 168px;"></p>

<pre><b>输入：</b>parents = [-1,0,1,0,3,3], nums = [5,4,6,2,1,3]
<b>输出：</b>[7,1,1,4,2,1]
<b>解释：</b>每个子树答案计算结果如下：
- 0：子树内包含节点 [0,1,2,3,4,5] ，基因值分别为 [5,4,6,2,1,3] 。7 是缺失的最小基因值。
- 1：子树内包含节点 [1,2] ，基因值分别为 [4,6] 。 1 是缺失的最小基因值。
- 2：子树内只包含节点 2 ，基因值为 6 。1 是缺失的最小基因值。
- 3：子树内包含节点 [3,4,5] ，基因值分别为 [2,1,3] 。4 是缺失的最小基因值。
- 4：子树内只包含节点 4 ，基因值为 1 。2 是缺失的最小基因值。
- 5：子树内只包含节点 5 ，基因值为 3 。1 是缺失的最小基因值。
</pre>

<p><strong>示例 3：</strong></p>

<pre><b>输入：</b>parents = [-1,2,3,0,2,4,1], nums = [2,3,4,5,6,7,8]
<b>输出：</b>[1,1,1,1,1,1,1]
<b>解释：</b>所有子树都缺失基因值 1 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == parents.length == nums.length</code></li>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li>对于 <code>i != 0</code> ，满足 <code>0 &lt;= parents[i] &lt;= n - 1</code></li>
<li><code>parents[0] == -1</code></li>
<li><code>parents</code> 表示一棵合法的树。</li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
<li><code>nums[i]</code> 互不相同。</li>
</ul>




## 分析

### #1

- 暴力的做法是直接得到子树的值集合，然后找最小的缺失值 x
- 注意到节点 u 对应的 x 必然 >= 其子节点 v 对应的 x
- 因此，令 dfs(u) 返回 u 的值集合和对应的 x，即可递推
- 合并值集合采用启发式合并，保证时间不会退化到 O(N^2)

```python
class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1]*n
        if 1 not in nums:
            return res
        g = [[] for _ in range(n)]
        for v in range(1,n):
            g[parents[v]].append(v)

        def dfs(u):
            vis = {nums[u]}
            for v in g[u]:
                cvis,x = dfs(v)
                res[u] = max(res[u],x)
                if len(cvis)>len(vis):
                    vis,cvis = cvis,vis
                vis.update(cvis)
            while res[u] in vis:
                res[u] += 1
            return vis,res[u]
        dfs(0)
        return res
```
488 ms

### #2

- 还可以直接观察性质
- 显然若 1 不在树中，所有 res 都为 1
- 若 1 对应的节点为 i，那么除了 i 和 i 的祖先，其它的 res 都为 1
- 然后递推 i 往上一直到根节点，维护值集合即可
## 解答

```python
class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1]*n
        if 1 not in nums:
            return res
        g = [[] for _ in range(n)]
        for v in range(1,n):
            g[parents[v]].append(v)
        i = nums.index(1)        
        vis,x = set(),2
        
        def dfs(u):
            vis.add(nums[u])
            for v in g[u]:
                if nums[v] not in vis:
                    dfs(v)
        while i>=0:
            dfs(i)
            while x in vis:
                x += 1
            res[i] = x
            i = parents[i]
        return res
```
254 ms
