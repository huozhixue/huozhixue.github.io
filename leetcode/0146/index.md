# 0146：LRU 缓存机制（★★）


## 题目

运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。
实现 LRUCache 类：

- LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
- int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
- void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。
当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

你是否可以在 O(1) 时间复杂度内完成这两种操作？

<!--more--> 

示例：

	输入
	["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
	[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
	输出
	[null, null, null, 1, null, -1, null, -1, 3, 4]

	解释
	LRUCache lRUCache = new LRUCache(2);
	lRUCache.put(1, 1); // 缓存是 {1=1}
	lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
	lRUCache.get(1);    // 返回 1
	lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
	lRUCache.get(2);    // 返回 -1 (未找到)
	lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
	lRUCache.get(1);    // 返回 -1 (未找到)
	lRUCache.get(3);    // 返回 3
	lRUCache.get(4);    // 返回 4



## 分析

### #1

先用最简单的数组和哈希表构造。


```python
class LRUCache:

    def __init__(self, capacity: int):
        self.A = []
        self.d = {}
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key in self.d:
            self.A.pop(self.A.index(key))
            self.A.append(key)
            return self.d[key]
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            self.A.pop(self.A.index(key))
        elif len(self.A) == self.capacity:
            del self.d[self.A.pop(0)]
        self.A.append(key)
        self.d[key] = value
```

368 ms

### #2

要求 O(1) 时间完成 put() 和 get()，也就是 O(1) 时间删除元素。因此考虑换成双向链表，并用哈希表存储节点。

```python
class Node:
    def __init__(self, key=None, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:

    def __init__(self, capacity: int):
        self.head, self.tail = Node(), Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.d = {}
        self.capacity = capacity
    
    def add_node(self, node):
        self.tail.prev.next = node
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev = node
    
    def remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def get(self, key: int) -> int:
        node = self.d.get(key)
        if node:
            self.remove_node(node)
            self.add_node(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        node = self.d.get(key)
        if node:
            node.value = value
            self.remove_node(node)
            self.add_node(node)
        else:
            if len(self.d) == self.capacity:
                del self.d[self.head.next.key]
                self.remove_node(self.head.next)
            node = Node(key, value)
            self.add_node(node)
            self.d[key] = node
```

188 ms

### #3

python 也可以直接调用有序字典 OrderedDict 。

## 解答

```python
class LRUCache:

    def __init__(self, capacity: int):
        self.d = OrderedDict()
        self.capacity = capacity
        
    def get(self, key: int) -> int:
        if key in self.d:
            self.d.move_to_end(key)
        return self.d.get(key, -1)
        
    def put(self, key: int, value: int) -> None:
        if key in self.d:
            self.d.move_to_end(key)
        elif len(self.d) == self.capacity:
            self.d.popitem(last=False)
        self.d[key] = value
```

168 ms

