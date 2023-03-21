# 0114：二叉树展开为链表（★）


> <u>**[力扣第 114 题](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)**</u>

## 题目

<p>给你二叉树的根结点 <code>root</code> ，请你将它展开为一个单链表：</p>

<ul>
<li>展开后的单链表应该同样使用 <code>TreeNode</code> ，其中 <code>right</code> 子指针指向链表中下一个结点，而左子指针始终为 <code>null</code> 。</li>
<li>展开后的单链表应该与二叉树 <a href="https://baike.baidu.com/item/%E5%85%88%E5%BA%8F%E9%81%8D%E5%8E%86/6442839?fr=aladdin" target="_blank"><strong>先序遍历</strong></a> 顺序相同。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/14/flaten.jpg" style="width: 500px; height: 226px;" />
<pre>
<strong>输入：</strong>root = [1,2,5,3,4,null,6]
<strong>输出：</strong>[1,null,2,null,3,null,4,null,5,null,6]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [0]
<strong>输出：</strong>[0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中结点数在范围 <code>[0, 2000]</code> 内</li>
<li><code>-100 <= Node.val <= 100</code></li>
</ul>



<p><strong>进阶：</strong>你可以使用原地算法（<code>O(1)</code> 额外空间）展开这棵树吗？</p>


## 分析

先序遍历 root，每次将上一个节点的 right 指向当前节点即可。

注意要去掉节点的 left 指针。

## 解答

```python
def flatten(self, root: TreeNode) -> None:
    stack, prev = [root], TreeNode()
    while stack:
        node = stack.pop()
        if node:
            stack.extend([node.right, node.left])
            prev.right = node
            node.left = None
            prev = node
```
40 ms

