# 0382：链表随机节点（★★）


## 题目

给你一个单链表，随机选择链表的一个节点，并返回相应的节点值。每个节点 被选中的概率一样 。

实现 Solution 类：
- Solution(ListNode head) 使用整数数组初始化对象。
- int getRandom() 从链表中随机选择一个节点并返回该节点的值。链表中所有节点被选中的概率相等。


示例：

![img](https://assets.leetcode.com/uploads/2021/03/16/getrand-linked-list.jpg)

    输入
    ["Solution", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"]
    [[[1, 2, 3]], [], [], [], [], []]
    输出
    [null, 1, 3, 2, 2, 3]
    
    解释
    Solution solution = new Solution([1, 2, 3]);
    solution.getRandom(); // 返回 1
    solution.getRandom(); // 返回 3
    solution.getRandom(); // 返回 2
    solution.getRandom(); // 返回 2
    solution.getRandom(); // 返回 3
    // getRandom() 方法应随机返回 1、2、3中的一个，每个元素被返回的概率相等。
 

提示：
- 链表中的节点数在范围 [1, 10^4] 内
- -10^4 <= Node.val <= 10^4
- 至多调用 getRandom 方法 10^4 次
 

进阶：
- 如果链表非常大且长度未知，该怎么处理？
- 你能否在不使用额外空间的情况下解决此问题？

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
        res, i = 0, 0
        p = self.head
        while p:
            i += 1
            if random.randint(1, i) == 1:
                res = p.val
            p = p.next
        return res
```
180 ms

