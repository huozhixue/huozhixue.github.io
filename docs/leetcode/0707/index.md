# 0707：设计链表（★★）


> **第  场周赛第  题**

## 题目

设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。
val 是当前节点的值，next 是指向下一个节点的指针/引用。如果要使用双向链表，
则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。

在链表类中实现这些功能：

- get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
- addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
- addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
- addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。
如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。
如果index小于0，则在头部插入节点。
- deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。

提示：
- 所有val值都在 [1, 1000] 之内。
- 操作次数将在  [1, 1000] 之内。
- 请不要使用内置的 LinkedList 库。
 
示例：

	MyLinkedList linkedList = new MyLinkedList();
	linkedList.addAtHead(1);
	linkedList.addAtTail(3);
	linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
	linkedList.get(1);            //返回2
	linkedList.deleteAtIndex(1);  //现在链表是1-> 3
	linkedList.get(1);            //返回3

## 分析

先定义节点 ListNode，然后再设计链表。需要经常判断索引是否有效，因此可以维护链表的长度。

## 解答

```python
class ListNode:
    def __init__(self, x=None, next=None):
        self.val = x
        self.next = next

class MyLinkedList:

    def __init__(self):
        self.size = 0
        self.dummy = ListNode()

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        p = self.dummy
        for _ in range(index+1):
            p = p.next
        return p.val

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def addAtIndex(self, index: int, val: int) -> None:
        if index > self.size:
            return
        p = self.dummy
        for _ in range(index):
            p = p.next
        node = ListNode(val, next=p.next)
        p.next = node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        p = self.dummy
        for _ in range(index):
            p = p.next
        p.next = p.next.next
        self.size -= 1
```
216 ms
