# 数据结构（一）：链表


```python
# 反转链表
def reverse(head):
	tail = head
	while tail and tail.next:
		tmp = tail.next
		tail.next = tmp.next
		tmp.next = head
		head = tmp
	return head
```

```python
# 双向链表
class Node:
    # 提高访问属性的速度，并节省内存
    __slots__ = 'pre', 'nxt', 'key', 'val'

    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.pre = self
        self.nxt = self

    def insert(self,x):
        q = self.nxt
        self.nxt = x
        x.pre = self
        x.nxt = q
        q.pre = x
    
    def remove(self,):
        self.pre.nxt = self.nxt
        self.nxt.pre = self.pre
```

- {{< lc "3244" >}} [新增道路查询后的最短距离 II](https://leetcode.cn/problems/shortest-distance-after-road-addition-queries-ii/) （2270 分）
双向链表
- {{< lc "0146" >}} LRU 缓存机制
- {{< lc "0380" >}} 常数时间插入、删除和获取随机元素
- {{< lc "0381" >}} O(1) 时间插入、删除和获取随机元素 - 允许重复
- {{< lc "0432" >}} 全 O(1) 的数据结构
- {{< lc "0460" >}} LFU 缓存


