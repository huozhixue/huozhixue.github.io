# 0160：相交链表（★★）


## 题目

编写一个程序，找到两个单链表相交的起始节点。

如下面的两个链表：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

在节点 c1 开始相交。

可假定整个链表结构中没有循环。在返回结果后，两个链表仍须保持原有的结构。

程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。

 <!--more--> 


示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_1.png)

	输入：		intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
	输出：		Reference of the node with value = 8
	输入解释：	相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
				从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
				在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
	 

示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_2.png)

	输入：		intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
	输出：		Reference of the node with value = 2
	输入解释：	相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
				从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。
				在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
	 

示例 3：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_3.png)

	输入：		intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
	输出：		null
	输入解释：	从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
				由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
	解释：这两个链表不相交，因此返回 null。
 

## 分析

### #1

最直接的是哈希。

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
	Set, p, q = set(), headA, headB
	while p:
		Set.add(p)
		p = p.next
	while q:
		if q in Set:
			return q
		q = q.next
	return None
```

176 ms

### #2

要求 O(1) 空间，有个巧妙的想法是将 A 链表的结尾接到开头，那么就转为问题  {{< lc "0142" >}} 。

要求链表保持原有的结构，所以注意最后将环断开。

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
	p = headA
	while p.next:
		p = p.next
	p.next = headA

	slow = fast = headB
	while fast and fast.next:
		slow, fast = slow.next, fast.next.next
		if slow == fast:
			break
	else:
		p.next = None
		return None
	slow = headB
	while slow != fast:
		slow, fast = slow.next, fast.next
	p.next = None
	return slow
```

180 ms

### #3

本题还有个很巧妙的方法。用两个指针 p、q 分别指向 A、B 链表开头，每轮移动一步。
当 p 到达 A 末尾时重定向到 B 开头，当 q 到达 B 末尾时重定向到 A 开头。

设 A、B 链表长度分别为 L1、L2，相交部分长度为 L3，那么经过 L1+L2-L3 轮后 p、q 相遇在相交节点。

不相交时，经过 L1+L2 轮 p、q 也相等 p==q==None。

 
## 解答

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
	p, q = headA, headB
	while p != q:
		p = p.next if p else headB
		q = q.next if q else headA
	return p
```

164 ms



