# 1457：二叉树中的伪回文路径（★）


> <u>**[力扣第 190 场周赛第 3 题](https://leetcode.cn/problems/pseudo-palindromic-paths-in-a-binary-tree/)**</u>

## 题目

<p>给你一棵二叉树，每个节点的值为 1 到 9 。我们称二叉树中的一条路径是 「<strong>伪回文</strong>」的，当它满足：路径经过的所有节点值的排列中，存在一个回文序列。</p>

<p>请你返回从根到叶子节点的所有路径中 <strong>伪回文 </strong>路径的数目。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/23/palindromic_paths_1.png" style="height: 201px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [2,3,1,3,1,null,1]
<strong>输出：</strong>2
<strong>解释：</strong>上图为给定的二叉树。总共有 3 条从根到叶子的路径：红色路径 [2,3,3] ，绿色路径 [2,1,1] 和路径 [2,3,1] 。
在这些路径中，只有红色和绿色的路径是伪回文路径，因为红色路径 [2,3,3] 存在回文排列 [3,2,3] ，绿色路径 [2,1,1] 存在回文排列 [1,2,1] 。
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/23/palindromic_paths_2.png" style="height: 314px; width: 300px;" /></strong></p>

<pre>
<strong>输入：</strong>root = [2,1,1,1,3,null,null,null,null,null,1]
<strong>输出：</strong>1
<strong>解释：</strong>上图为给定二叉树。总共有 3 条从根到叶子的路径：绿色路径 [2,1,1] ，路径 [2,1,3,1] 和路径 [2,1] 。
这些路径中只有绿色路径是伪回文路径，因为 [2,1,1] 存在回文排列 [1,2,1] 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [9]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>给定二叉树的节点数目在范围 <code>[1, 10<sup>5</sup>]</code> 内</li>
<li><code>1 &lt;= Node.val &lt;= 9</code></li>
</ul>


## 分析

一个序列最多有 1 个值出现奇数次，就可以排列成回文。

因此遍历时存储每个值出现次数即可。进一步的，因为只关心次数的奇偶，所以可以用二进制位来表示，压缩成一个数。

## 解答


```python
def pseudoPalindromicPaths (self, root: Optional[TreeNode]) -> int:
	res, stack = 0, [(root, 0)]
	while stack:
		u, w = stack.pop()
		w ^= 1<<u.val
		res += not u.left and not u.right and w.bit_count()<=1
		stack.extend((chi,w) for chi in [u.right,u.left] if chi)
	return res
```
832 ms
