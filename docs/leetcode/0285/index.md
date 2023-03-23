# 0285：二叉搜索树中的中序后继（★）


> <u>**[力扣第 285 题](https://leetcode.cn/problems/inorder-successor-in-bst/)**</u>

## 题目

<p>给定一棵二叉搜索树和其中的一个节点 <code>p</code> ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 <code>null</code> 。</p>

<p>节点 <code>p</code> 的后继是值比 <code>p.val</code> 大的节点中键值最小的节点。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/01/23/285_example_1.PNG" style="height: 117px; width: 122px;" /></p>

<pre>
<strong>输入：</strong>root = [2,1,3], p = 1
<strong>输出：</strong>2
<strong>解释：</strong>这里 1 的中序后继是 2。请注意 p 和返回值都应是 TreeNode 类型。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/01/23/285_example_2.PNG" style="height: 229px; width: 246px;" /></p>

<pre>
<strong>输入：</strong>root = [5,3,6,2,4,null,null,1], p = 6
<strong>输出：</strong>null
<strong>解释：</strong>因为给出的节点没有中序后继，所以答案就返回 <code>null 了。</code>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[1, 10<sup>4</sup>]</code> 内。</li>
<li><code>-10<sup>5</sup> <= Node.val <= 10<sup>5</sup></code></li>
<li>树中各节点的值均保证唯一。</li>
</ul>


## 分析

遍历并比较即可：
- 先比较 root 和 p
- 如果 root 比 p 大，后继要么是 root，要么在左子树中，继续遍历 root 的左子树
- 同理，如果 root 比 p 大，继续遍历 root 的右子树

## 解答

```python
def inorderSuccessor(self, root: 'TreeNode', p: 'TreeNode') -> 'TreeNode':
    res, q = None, root
    while q:
        if q.val>p.val:
            res = q if not res or q.val<res.val else res
            q = q.left
        else:
            q = q.right
    return res
```
68 ms
