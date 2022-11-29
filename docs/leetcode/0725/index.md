# 0725：分隔链表（★）


> **第  场周赛第  题**

## 题目

给定一个头结点为 root 的链表, 编写一个函数以将链表分隔为 k 个连续的部分。

每部分的长度应该尽可能的相等: 任意两部分的长度差距不能超过 1，也就是说可能有些部分为 null。

这k个部分应该按照在链表中出现的顺序进行输出，并且排在前面的部分的长度应该大于或等于后面的长度。

返回一个符合上述规则的链表的列表。

提示:
- root 的长度范围： [0, 1000].
- 输入的每个节点的大小范围：[0, 999].
- k 的取值范围： [1, 50].
 
示例 1：

	输入: 
	root = [1, 2, 3], k = 5
	输出: [[1],[2],[3],[],[]]
	解释:
	输入输出各部分都应该是链表，而不是数组。
	例如, 输入的结点 root 的 val= 1, root.next.val = 2, \root.next.next.val = 3, 且 root.next.next.next = null。
	第一个输出 output[0] 是 output[0].val = 1, output[0].next = null。
	最后一个元素 output[4] 为 null, 它代表了最后一个部分为空链表。

示例 2：

	输入: 
	root = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 3
	输出: [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]
	解释:
	输入被分成了几个连续的部分，并且每部分的长度相差不超过1.前面部分的长度大于等于后面部分的长度。
 
## 分析

先得到链表长度 n，应该平均分为 n // k 长度，但可能有余数 extra。根据题目要求，应该将前 extra 个链表的长度再分别加 1。

注意可能分为空链表，所以每轮从哑结点开始，防止越界。

## 解答

```python
def splitListToParts(self, root: ListNode, k: int) -> List[ListNode]:
	n, p = 0, root
	while p:
		n += 1
		p = p.next
	avg, extra = divmod(n, k)
	res, p = [root], ListNode(next=root)
	for i in range(k-1):
		for _ in range(avg+(i<extra)):
			p = p.next
		res.append(p.next)
		p.next = None
		p = ListNode(next=res[-1])
	return res
```
44 ms
