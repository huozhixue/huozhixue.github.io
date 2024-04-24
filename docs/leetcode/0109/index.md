# 0109：有序链表转换二叉搜索树（★）


> <u>**[力扣第 109 题](https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree/)**</u>

## 题目

<p>给定一个单链表的头节点  <code>head</code> ，其中的元素 <strong>按升序排序</strong> ，将其转换为高度平衡的二叉搜索树。</p>

<p>本题中，一个高度平衡二叉树是指一个二叉树<em>每个节点 </em>的左右两个子树的高度差不超过 1。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2020/08/17/linked.jpg" style="height: 388px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> head = [-10,-3,0,5,9]
<strong>输出:</strong> [0,-3,9,-10,null,5]
<strong>解释:</strong> 一个可能的答案是[0，-3,9，-10,null,5]，它表示所示的高度平衡的二叉搜索树。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> head = []
<strong>输出:</strong> []
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>head</code> 中的节点数在<code>[0, 2 * 10<sup>4</sup>]</code> 范围内</li>
<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

{{< lc "0108" >}} 升级版，可以用快慢指针在链表上找中点，实现递归。更简单的做法是直接将链表转为数组。 

## 解答

```python
class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        A = []
        while head:
            A.append(head.val)
            head = head.next
        def dfs(i,j):
            if i>j:
                return None
            k = (i+j)//2
            return TreeNode(A[k],dfs(i,k-1),dfs(k+1,j))
        return dfs(0,len(A)-1)
```
49 ms


