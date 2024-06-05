# 2385：感染二叉树需要的总时间（1711 分）


> <u>**[力扣第 307 场周赛第 3 题](https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/)**</u>

## 题目

<p>给你一棵二叉树的根节点 <code>root</code> ，二叉树中节点的值 <strong>互不相同</strong> 。另给你一个整数 <code>start</code> 。在第 <code>0</code> 分钟，<strong>感染</strong> 将会从值为 <code>start</code> 的节点开始爆发。</p>

<p>每分钟，如果节点满足以下全部条件，就会被感染：</p>

<ul>
<li>节点此前还没有感染。</li>
<li>节点与一个已感染节点相邻。</li>
</ul>

<p>返回感染整棵树需要的分钟数<em>。</em></p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/06/25/image-20220625231744-1.png" style="width: 400px; height: 306px;">
<pre><strong>输入：</strong>root = [1,5,3,null,4,10,6,9,2], start = 3
<strong>输出：</strong>4
<strong>解释：</strong>节点按以下过程被感染：
- 第 0 分钟：节点 3
- 第 1 分钟：节点 1、10、6
- 第 2 分钟：节点5
- 第 3 分钟：节点 4
- 第 4 分钟：节点 9 和 2
感染整棵树需要 4 分钟，所以返回 4 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/06/25/image-20220625231812-2.png" style="width: 75px; height: 66px;">
<pre><strong>输入：</strong>root = [1], start = 1
<strong>输出：</strong>0
<strong>解释：</strong>第 0 分钟，树中唯一一个节点处于感染状态，返回 0 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[1, 10<sup>5</sup>]</code> 内</li>
<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
<li>每个节点的值 <strong>互不相同</strong></li>
<li>树中必定存在值为 <code>start</code> 的节点</li>
</ul>


## 分析

### #1

最简单的是改成图的表达形式，bfs即可。

```python
class Solution:
    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        g = defaultdict(list)
        sk = [root]
        while sk:
            u = sk.pop()
            for v in [u.left,u.right]:
                if v:
                    g[u.val].append(v.val)
                    g[v.val].append(u.val)
                    sk.append(v)
        Q = deque([(start,-1,0)])
        res = 0
        while Q:
            u,f,w = Q.popleft()
            for v in g[u]:
                if v!=f:
                    Q.append((v,u,w+1))
            res = w
        return res
```
364 ms

### #2

也可以用树的递归解决：
- 令 dfs 返回 <子树高度，子树是否含有 start> 
- 注意针对 start 节点，子树高度清零，即可递归

## 解答


```python
class Solution:
    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        def dfs(u):
            if not u:
                return 0,0
            l1,l2 = dfs(u.left)
            r1,r2 = dfs(u.right)
            if u.val==start:
                self.res = max(self.res,l1,r1)
                return 1,1
            if l2 or r2:
                self.res = max(self.res,l1+r1)
                return l1+1 if l2 else r1+1,1
            return max(l1,r1)+1,0
        self.res = 0
        dfs(root)
        return self.res
```
261 ms
