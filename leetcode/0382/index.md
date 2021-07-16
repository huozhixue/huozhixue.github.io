# 0382：链表随机节点（★）



## 题目

给定一个单链表，随机选择链表的一个节点，并返回相应的节点值。
保证每个节点被选的概率一样。

进阶: 如果链表十分大且长度未知，如何解决这个问题？你能否使用常数级空间复杂度实现？

 <!--more--> 
 
示例:

    // 初始化一个单链表 [1,2,3].
    ListNode head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    Solution solution = new Solution(head);
    
    // getRandom()方法应随机返回1,2,3中的一个，保证每个元素被返回的概率相等。
    solution.getRandom();


## 分析

### #1

最简单的就是保存在数组中，然后随机抽取。

```python
class Solution:

    def __init__(self, head: ListNode):
        self.A = []
        while head:
            self.A.append(head.val)
            head = head.next

    def getRandom(self) -> int:
        return random.choice(self.A)
```

84 ms

### #2

还有个经典的蓄水池抽样方法，无需事先知道长度。

遍历 1 到 n，第 i 轮以 1/i 的概率将 i 赋值到结果。最后结果即是 1 到 n 的随机数。

## 解答

```python
class Solution:

    def __init__(self, head: ListNode):
        self.head = head

    def getRandom(self) -> int:
        res, cnt = 0, 0
        p = self.head
        while p:
            cnt += 1
            if random.randint(1, cnt) == cnt:
                res = p.val
            p = p.next
        return res
```

244 ms

