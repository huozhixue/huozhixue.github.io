# 0094：二叉树的中序遍历


> <u>**[力扣第 94 题](https://leetcode.cn/problems/binary-tree-inorder-traversal/)**</u>

## 题目

<p>给定一个二叉树的根节点 <code>root</code> ，返回 <em>它的 <strong>中序</strong> 遍历</em> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg" style="height: 200px; width: 125px;" />
<pre>
<strong>输入：</strong>root = [1,null,2,3]
<strong>输出：</strong>[1,3,2]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[0, 100]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>



<p><strong>进阶:</strong> 递归算法很简单，你可以通过迭代算法完成吗？</p>


**相似问题：**
- [0098：验证二叉搜索树](/leetcode/0098)
- [0144：二叉树的前序遍历](/leetcode/0144)
- [0145：二叉树的后序遍历](/leetcode/0145)
- [0173：二叉搜索树迭代器](/leetcode/0173)
- [0230：二叉搜索树中第K小的元素](/leetcode/0230)
- [0272：最接近的二叉搜索树值 II](/leetcode/0272)
- [0285：二叉搜索树中的中序后继](/leetcode/0285)
- [0426：将二叉搜索树转化为排序的双向链表](/leetcode/0426)
- [0783：二叉搜索树节点最小距离（1303 分）](/leetcode/0783)


## 分析

- 对于树，有个通用的遍历方法：
	- 初始栈保存根节点
	- 每轮出栈，如果是节点，按 [右子树、节点值、左子树] 顺序入栈
	- 如果出栈的是节点值，说明其左子树已经遍历完，将节点值添加到结果中
	- 依此循环直到栈空即遍历完毕
- 前/后序遍历只需改变 右子树、节点值、左子树 的入栈顺序即可

## 解答

```python
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res,sk = [],[root]
        while sk:
            p = sk.pop()
            if isinstance(p,int):
                res.append(p)
            elif p:
                sk.extend([p.right,p.val,p.left])
        return res
```
37 ms

