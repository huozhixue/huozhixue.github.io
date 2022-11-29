# 0432：全 O(1) 的数据结构（★★★★）


> **第  场周赛第  题**

## 题目

请你设计一个用于存储字符串计数的数据结构，并能够返回计数最小和最大的字符串。

实现 AllOne 类：
- AllOne() 初始化数据结构的对象。
- inc(String key) 字符串 key 的计数增加 1 。如果数据结构中尚不存在 key ，那么插入计数为 1 的 key 。
- dec(String key) 字符串 key 的计数减少 1 。如果 key 的计数在减少后为 0 ，那么需要将这个 key 从数据结构中删除。
测试用例保证：在减少计数前，key 存在于数据结构中。
- getMaxKey() 返回任意一个计数最大的字符串。如果没有元素存在，返回一个空字符串 "" 。
- getMinKey() 返回任意一个计数最小的字符串。如果没有元素存在，返回一个空字符串 "" 。

示例：

    输入
    ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
    [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
    
    输出
    [null, null, null, "hello", "hello", null, "hello", "leet"]
    
    解释
    AllOne allOne = new AllOne();
    allOne.inc("hello");
    allOne.inc("hello");
    allOne.getMaxKey(); // 返回 "hello"
    allOne.getMinKey(); // 返回 "hello"
    allOne.inc("leet");
    allOne.getMaxKey(); // 返回 "hello"
    allOne.getMinKey(); // 返回 "leet"
     
提示：
- 1 <= key.length <= 10
- key 由小写英文字母组成
- 测试用例保证：在每次调用 dec 时，数据结构中总存在 key
- 最多调用 inc、dec、getMaxKey 和 getMinKey 方法 5 * 10^4 次


## 分析

### #1

容易想到用一个计数器维护每个 key 的计数，然后维护一个 <计数，key> 的有序集合，首尾即为计数最小/大的 key。

```python
class AllOne:
    def __init__(self):
        from sortedcontainers import SortedList
        self.ct = Counter()
        self.sl = SortedList()

    def inc(self, key: str) -> None:
        freq = self.ct[key]
        if freq:
            self.sl.remove((freq, key))
        self.ct[key] = freq + 1
        self.sl.add((freq+1, key))

    def dec(self, key: str) -> None:
        freq = self.ct[key]
        self.sl.remove((freq, key))
        if freq==1:
            del self.ct[key]
        else:
            self.ct[key] = freq - 1
            self.sl.add((freq-1, key))

    def getMaxKey(self) -> str:
        return self.sl[-1][1] if self.sl else ''

    def getMinKey(self) -> str:
        return self.sl[0][1] if self.sl else ''
```
单次操作时间复杂度 O(log N)，188 ms

### #2

要求全部单次操作 O(1)，考虑用 双向链表+哈希表 来维护 <计数，key> 的有序集合 。

具体来说：
- 操作过程中要维护：
    - 双向链表的每个节点对应一个计数值 x，并且按值的升序相连
    - 节点 x 保存所有计数为 x 的 key 集合
    - 哈希表保存 key 对应的节点
- Inc/Dec 时，将 key 从对应的节点 x 弹出，加入到节点 x+1/x-1 中。若
没有对应的节点，就新建一个。若节点 x 的 key 集合为空了，就去掉该节点。
- GetMaxKey 和 GetMinKey 时，取首/尾节点（排除哑结点）的任意一个 key 返回即可

## 解答

```python
class Node:
    def __init__(self, val, keys=[]):
        self.val = val
        self.keys = set(keys)
        self.next = None
        self.prev = None
    
    def insert(self, node):
        node.next = self.next
        node.prev = self
        self.next = node
        node.next.prev = node

    def pop(self, key):
        self.keys.discard(key)
        if not self.keys:
            self.prev.next = self.next
            self.next.prev = self.prev

class AllOne:
    def __init__(self):
        self.head = Node(0, [''])
        self.tail = Node(0, [''])
        self.head.next = self.tail
        self.tail.prev = self.head
        self.d = {}
    
    def inc(self, key: str) -> None:
        old = self.d.get(key, self.head)
        if old.next.val != old.val+1:
            old.insert(Node(old.val+1))
        new = old.next
        new.keys.add(key)
        old.pop(key)
        self.d[key] = new

    def dec(self, key: str) -> None:
        old = self.d[key]
        if old.prev.val != old.val-1:
            old.prev.insert(Node(old.val-1))
        new = old.prev
        if new.val:
            new.keys.add(key)
        old.pop(key)
        self.d[key] = new

    def getMaxKey(self) -> str:
        return next(iter(self.tail.prev.keys))

    def getMinKey(self) -> str:
        return next(iter(self.head.next.keys))
```
148 ms

