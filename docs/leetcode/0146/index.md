# 0146：LRU 缓存机制（★★）


## 题目

请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。

实现 LRUCache 类：
- LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
- int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
- void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；
如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，
则应该 逐出 最久未使用的关键字。

函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

 

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
 

提示：
- 1 <= capacity <= 3000
- 0 <= key <= 10000
- 0 <= value <= 10^5
- 最多调用 2 * 10^5 次 get 和 put


## 分析

### #1

先考虑最简单的方法，用数组维护关键字的顺序:
- get 和 put 时将对应关键字移到最后面
- 容量达到上限时，弹出数组首个元素即可

```python
class LRUCache:

    def __init__(self, capacity: int):
        self.A = []
        self.d = {}
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.d:
            return -1
        self.A.remove(key)
        self.A.append(key)
        return self.d[key]

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            self.A.remove(key)
        elif len(self.A) == self.capacity:
            del self.d[self.A.pop(0)]
        self.A.append(key)
        self.d[key] = value
```
2396 ms

### #2

要求 O(1) 时间完成 put() 和 get()，也就是 O(1) 时间内删除元素，在头部或尾部添加元素。

可以用双向链表+哈希表来实现。不过 python 有个更方便的 OrderedDict。

## 解答

```python
class LRUCache:

    def __init__(self, capacity: int):
        self.d = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.d:
            return -1
        self.d.move_to_end(key)
        return self.d[key]

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            self.d.move_to_end(key)
        elif len(self.d) == self.capacity:
            self.d.popitem(last=False)
        self.d[key] = value
```
464 ms

