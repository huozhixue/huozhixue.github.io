# 0641：设计循环双端队列（★）


## 题目

设计实现双端队列。
你的实现需要支持以下操作：

- MyCircularDeque(k)：构造函数,双端队列的大小为k。
- insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true。
- insertLast()：将一个元素添加到双端队列尾部。如果操作成功返回 true。
- deleteFront()：从双端队列头部删除一个元素。 如果操作成功返回 true。
- deleteLast()：从双端队列尾部删除一个元素。如果操作成功返回 true。
- getFront()：从双端队列头部获得一个元素。如果双端队列为空，返回 -1。
- getRear()：获得双端队列的最后一个元素。 如果双端队列为空，返回 -1。
- isEmpty()：检查双端队列是否为空。
- isFull()：检查双端队列是否满了。

提示：

- 所有值的范围为 [1, 1000]
- 操作次数的范围为 [1, 1000]
- 请不要使用内置的双端队列库

<!--more--> 

示例：

	MyCircularDeque circularDeque = new MycircularDeque(3); // 设置容量大小为3
	circularDeque.insertLast(1);			        // 返回 true
	circularDeque.insertLast(2);			        // 返回 true
	circularDeque.insertFront(3);			        // 返回 true
	circularDeque.insertFront(4);			        // 已经满了，返回 false
	circularDeque.getRear();  				// 返回 2
	circularDeque.isFull();				        // 返回 true
	circularDeque.deleteLast();			        // 返回 true
	circularDeque.insertFront(4);			        // 返回 true
	circularDeque.getFront();				// 返回 4

## 分析

类似 0622 ，增加 insertFront() 和 deleteLast() 即可。

## 解答

```python
class MyCircularDeque:

    def __init__(self, k: int):
        self.k = k
        self.A = [0] * k
        self.head = 0
        self.cnt = 0

    def insertFront(self, value: int) -> bool:
        if self.isFull():
            return False
        self.head = (self.head-1) % self.k
        self.A[self.head] = value
        self.cnt += 1
        return True

    def insertLast(self, value: int) -> bool:
        if self.isFull():
            return False
        self.A[(self.head+self.cnt) % self.k] = value
        self.cnt += 1
        return True

    def deleteFront(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head+1) % self.k
        self.cnt -= 1
        return True

    def deleteLast(self) -> bool:
        if self.isEmpty():
            return False
        self.cnt -= 1
        return True

    def getFront(self) -> int:
        return -1 if self.isEmpty() else self.A[self.head]

    def getRear(self) -> int:
        return -1 if self.isEmpty() else self.A[(self.head+self.cnt-1)%self.k]

    def isEmpty(self) -> bool:
        return self.cnt == 0

    def isFull(self) -> bool:
        return self.cnt == self.k
```

88 ms

