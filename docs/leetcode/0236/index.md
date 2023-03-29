# 0236：二叉树的最近公共祖先（★）


> <u>**[力扣第 236 题](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)**</u>

## 题目

<p>给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。</p>

<p><a href="https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin" target="_blank">百度百科</a>中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（<strong>一个节点也可以是它自己的祖先</strong>）。”</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/14/binarytree.png" style="width: 200px; height: 190px;" />
<pre>
<strong>输入：</strong>root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
<strong>输出：</strong>3
<strong>解释：</strong>节点 <code>5 </code>和节点 <code>1 </code>的最近公共祖先是节点 <code>3 。</code>
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/14/binarytree.png" style="width: 200px; height: 190px;" />
<pre>
<strong>输入：</strong>root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
<strong>输出：</strong>5
<strong>解释：</strong>节点 <code>5 </code>和节点 <code>4 </code>的最近公共祖先是节点 <code>5 。</code>因为根据定义最近公共祖先节点可以为节点本身。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [1,2], p = 1, q = 2
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[2, 10<sup>5</sup>]</code> 内。</li>
<li><code>-10<sup>9</sup> <= Node.val <= 10<sup>9</sup></code></li>
<li>所有 <code>Node.val</code> <code>互不相同</code> 。</li>
<li><code>p != q</code></li>
<li><code>p</code> 和 <code>q</code> 均存在于给定的二叉树中。</li>
</ul>


## 分析

与 {{< lc "0235" >}} 的区别在于只是二叉树，并不有序。

依然可以考虑递归：
- 如果 root 等于 p 或 q，结果就是 root
- 如果 p、q 分别在 root 的左右子树，结果就是 root
- 如果 p、q 都在 root 的左子树或右子树，转为递归子问题

于是令 dfs(node) 代表 node 包含 p、q 的状态：
- 若 node 同时有 p、q，返回 p、q 的最近公共祖先
- 若 node 中有 p 或 q，返回 p 或 q 节点
- 若 node 中都没有，返回 None

即可递归。

## 解答

```python
def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    def dfs(node):
        if not node or node in [p, q]:
            return node
        l, r = dfs(node.left), dfs(node.right)
        return node if l and r else (l or r)
    return dfs(root)
```
56 ms
