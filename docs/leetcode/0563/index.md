# 0563：二叉树的坡度


> <u>**[力扣第 563 题](https://leetcode.cn/problems/binary-tree-tilt/)**</u>

## 题目

<p>给你一个二叉树的根节点 <code>root</code> ，计算并返回 <strong>整个树 </strong>的坡度 。</p>

<p>一个树的<strong> 节点的坡度 </strong>定义即为，该节点左子树的节点之和和右子树节点之和的 <strong>差的绝对值 </strong>。如果没有左子树的话，左子树的节点之和为 0 ；没有右子树的话也是一样。空结点的坡度是 0 。</p>

<p><strong>整个树</strong> 的坡度就是其所有节点的坡度之和。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/20/tilt1.jpg" style="width: 712px; height: 182px;" />
<pre>
<strong>输入：</strong>root = [1,2,3]
<strong>输出：</strong>1
<strong>解释：</strong>
节点 2 的坡度：|0-0| = 0（没有子节点）
节点 3 的坡度：|0-0| = 0（没有子节点）
节点 1 的坡度：|2-3| = 1（左子树就是左子节点，所以和是 2 ；右子树就是右子节点，所以和是 3 ）
坡度总和：0 + 0 + 1 = 1
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/20/tilt2.jpg" style="width: 800px; height: 203px;" />
<pre>
<strong>输入：</strong>root = [4,2,9,3,5,null,7]
<strong>输出：</strong>15
<strong>解释：</strong>
节点 3 的坡度：|0-0| = 0（没有子节点）
节点 5 的坡度：|0-0| = 0（没有子节点）
节点 7 的坡度：|0-0| = 0（没有子节点）
节点 2 的坡度：|3-5| = 2（左子树就是左子节点，所以和是 3 ；右子树就是右子节点，所以和是 5 ）
节点 9 的坡度：|0-7| = 7（没有左子树，所以和是 0 ；右子树正好是右子节点，所以和是 7 ）
节点 4 的坡度：|(3+5+2)-(9+7)| = |10-16| = 6（左子树值为 3、5 和 2 ，和是 10 ；右子树值为 9 和 7 ，和是 16 ）
坡度总和：0 + 0 + 0 + 2 + 7 + 6 = 15
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/20/tilt3.jpg" style="width: 800px; height: 293px;" />
<pre>
<strong>输入：</strong>root = [21,7,14,1,1,2,2,3,3]
<strong>输出：</strong>9
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目的范围在 <code>[0, 10<sup>4</sup>]</code> 内</li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>


**相似问题：**
- [1469：寻找所有的独生节点](/leetcode/1469)


## 分析

令 dfs(u) 返回节点 u 的和，递归时计算每个节点的坡度即可。
## 解答

```python
class Solution:
    def findTilt(self, root: Optional[TreeNode]) -> int:
        def dfs(u):
            if not u:
                return 0
            l,r = dfs(u.left),dfs(u.right)
            self.res += abs(l-r)
            return l+r+u.val
        self.res = 0
        dfs(root)
        return self.res
```

59 ms

