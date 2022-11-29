# 0109：有序链表转换二叉搜索树（★）


## 题目

给定一个单链表的头节点  head ，其中的元素 按升序排序 ，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差不超过 1。

示例 1:

![img](https://assets.leetcode.com/uploads/2020/08/17/linked.jpg)

	输入: head = [-10,-3,0,5,9]
	输出: [0,-3,9,-10,null,5]
	解释: 一个可能的答案是[0，-3,9，-10,null,5]，它表示所示的高度平衡的二叉搜索树。

示例 2:

	输入: head = []
	输出: []
	 

提示:
- head 中的节点数在[0, 2 * 10^4] 范围内
- -10^5 <= Node.val <= 10^5


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

