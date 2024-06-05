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

显然若基因值 1 不在树中，所有 ans 都为 1。
若基因值 1 在树中，对应的节点为 x，那么除了 x 和 x 的所有祖先，其它的 ans 都为 1。

然后可以递推 x 和 x 的祖先的 ans。
设 y 是 x 的父节点，那么从 ans[x] 遍历找到第一个不存在于 y 的子树的基因集合内的正整数即为 ans[y]。

在求 y 的子树的基因集合时，x 的子树无需再遍历。因此求基因集合的操作总共是 O(N) 时间。

递推 x 和 x 的祖先的 ans 时，ans 是递增的，因此遍历求 ans 的操作总共是 O(S) 时间（本题数据范围 S 等于节点个数范围 N)


## 解答

```python
def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
    n = len(nums)
    if 1 not in nums:
        return [1] * n
    nxt = defaultdict(list)
    for v, u in enumerate(parents):
        nxt[u].append(v)
    i = nums.index(1)
    ans, vis, cur = [1]*n, set(), 1
    while i != -1:
        queue = [i]
        while queue:
            vis |= {nums[u] for u in queue}
            queue = [v for u in queue for v in nxt[u] if nums[v] not in vis]
        while cur in vis:
            cur += 1
        ans[i] = cur
        i = parents[i]
    return ans
```
时间复杂度 O(N)，520 ms
