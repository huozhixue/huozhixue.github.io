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

### #1

{{< lc "0108" >}} 升级版。可以先将链表转为数组，再转换。 

```python
def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
    def dfs(i, j):
        mid = (i + j) // 2
        return None if i == j else TreeNode(nums[mid], dfs(i, mid), dfs(mid + 1, j))

    nums = []
    while head:
        nums.append(head.val)
        head = head.next
    return dfs(0, len(nums))
```
52 ms

### #2

也可以直接用快慢指针在链表上找到中点，然后转为递归子问题。

## 解答

```python
def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
    def findMid(head):
        slow = fast = ListNode(next=head)
        while fast.next and fast.next.next:
            slow, fast = slow.next, fast.next.next
        return slow

    def dfs(head):
        if not head:
            return None
        if not head.next:
            return TreeNode(head.val)
        mid = findMid(head)
        root = mid.next
        mid.next = None
        return TreeNode(root.val, dfs(head), dfs(root.next))

    return dfs(head)
```
72 ms

