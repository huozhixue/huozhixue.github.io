# 0510：二叉搜索树中的中序后继 II（★）


> <u>**[力扣第 510 题](https://leetcode.cn/problems/inorder-successor-in-bst-ii/)**</u>

## 题目

<p>给定一棵二叉搜索树和其中的一个节点 <code>node</code> ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 <code>null</code> 。</p>

<p>一个节点 <code>node</code> 的中序后继是键值比 <code>node.val</code> 大所有的节点中键值最小的那个。</p>

<p>你可以直接访问结点，但无法直接访问树。每个节点都会有其父节点的引用。节点 <code>Node</code> 定义如下：</p>

<pre>
class Node {
public int val;
public Node left;
public Node right;
public Node parent;
}</pre>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/01/23/285_example_1.PNG" style="height: 117px; width: 122px;" /></p>

<pre>
<strong>输入：</strong>tree = [2,1,3], node = 1
<strong>输出：</strong>2
<strong>解析：</strong>1 的中序后继结点是 2 。注意节点和返回值都是 Node 类型的。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/01/23/285_example_2.PNG" style="height: 229px; width: 246px;" /></p>

<pre>
<strong>输入：</strong>tree = [5,3,6,2,4,null,null,1], node = 6
<strong>输出：</strong>null
<strong>解析：</strong>该结点没有中序后继，因此返回<code> null 。</code>
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/02/02/285_example_34.PNG" style="height: 335px; width: 438px;" /></p>

<pre>
<strong>输入：</strong>tree = [15,6,18,3,7,17,20,2,4,null,13,null,null,null,null,null,null,null,null,9], node = 15
<strong>输出：</strong>17
</pre>

<p><strong>示例 4：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/02/02/285_example_34.PNG" style="height: 335px; width: 438px;" /></p>

<pre>
<strong>输入：</strong>tree = [15,6,18,3,7,17,20,2,4,null,13,null,null,null,null,null,null,null,null,9], node = 13
<strong>输出：</strong>15
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>tree = [0], node = 0
<strong>输出：</strong>null
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[1, 10<sup>4</sup>]</code> 内。</li>
<li><code>-10<sup>5</sup> <= Node.val <= 10<sup>5</sup></code></li>
<li>树中各结点的值均保证唯一。</li>
</ul>



<p><strong>进阶：</strong>你能否在不访问任何结点的值的情况下解决问题?</p>


## 分析

- 如果 node 有右子树 right，那么找右子树中最小的节点即可
	- 如果 right 没有左子树，right 即最小
	- 否则，一直往左找
- 否则，向上找到第一个大于 node 的祖先即可
	- 如果 node 是父节点的左子树，父节点即满足
	- 否则，一直往上找

## 解答

```python
def inorderSuccessor(self, node: 'Node') -> 'Node':
	if node.right:
		node = node.right
		while node.left:
			node = node.left
		return node
	while node.parent and node.parent.left != node:
		node = node.parent
	return node.parent
```

60 ms
