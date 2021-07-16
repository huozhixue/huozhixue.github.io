# 0109：有序链表转换二叉搜索树（★）


## 题目

给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

<!--more--> 

示例:

	给定的有序链表： [-10, -3, 0, 5, 9],

	一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

		  0
		 / \
	   -3   9
	   /   /
	 -10  5


## 分析

### #1

可以将链表转为数组，然后等价于 {{< lc "0108" >}} 。 

```python
def sortedListToBST(self, head: ListNode) -> TreeNode:
	def help(nums):
		n = len(nums)
		return None if not n else TreeNode(nums[n//2], help(nums[:n//2]), help(nums[n//2+1:]))
	
	nums = []
	while head:
		nums.append(head.val)
		head = head.next
	return help(nums)
```

80 ms

### #2

也可以直接用快慢指针在链表上找到中点，然后转为递归子问题。

## 解答

```python
def sortedListToBST(self, head: ListNode) -> TreeNode:
	if not head:
		return None
	if not head.next:
		return TreeNode(head.val)
	
	slow = fast = ListNode(next=head)
	while fast.next and fast.next.next:
		slow = slow.next
		fast = fast.next.next
	root = slow.next
	slow.next = None
	return TreeNode(root.val, self.sortedListToBST(head), self.sortedListToBST(root.next))
```

96 ms

