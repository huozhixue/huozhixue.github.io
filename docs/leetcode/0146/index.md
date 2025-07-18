# 0146：LRU 缓存（★）


> <u>**[力扣第 146 题](https://leetcode.cn/problems/lru-cache/)**</u>

## 题目

<div class="title__3Vvk">请你设计并实现一个满足  <a href="https://baike.baidu.com/item/LRU" target="_blank">LRU (最近最少使用) 缓存</a> 约束的数据结构。</div>

<div class="title__3Vvk">实现 <code>LRUCache</code> 类：</div>

<div class="original__bRMd">
<div>
<ul>
<li><code>LRUCache(int capacity)</code> 以 <strong>正整数</strong> 作为容量 <code>capacity</code> 初始化 LRU 缓存</li>
<li><code>int get(int key)</code> 如果关键字 <code>key</code> 存在于缓存中，则返回关键字的值，否则返回 <code>-1</code> 。</li>
<li><code>void put(int key, int value)</code> 如果关键字 <code>key</code> 已经存在，则变更其数据值 <code>value</code> ；如果不存在，则向缓存中插入该组 <code>key-value</code> 。如果插入操作导致关键字数量超过 <code>capacity</code> ，则应该 <strong>逐出</strong> 最久未使用的关键字。</li>
</ul>

<p>函数 <code>get</code> 和 <code>put</code> 必须以 <code>O(1)</code> 的平均时间复杂度运行。</p>
</div>
</div>



<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
<strong>输出</strong>
[null, null, null, 1, null, -1, null, -1, 3, 4]

<strong>解释</strong>
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
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= capacity &lt;= 3000</code></li>
<li><code>0 &lt;= key &lt;= 10000</code></li>
<li><code>0 &lt;= value &lt;= 10<sup>5</sup></code></li>
<li>最多调用 <code>2 * 10<sup>5</sup></code> 次 <code>get</code> 和 <code>put</code></li>
</ul>


**相似问题：**
- [0460：LFU 缓存](/leetcode/0460)
- [0588：设计内存文件系统](/leetcode/0588)
- [0604：迭代压缩字符串](/leetcode/0604)
- [1756：设计最近使用（MRU）队列](/leetcode/1756)


## 分析

### #1

先考虑通用方法，用有序集合维护关键字的顺序:
- 维护时间戳 t
- 有序集合 sl 维护 (t,key) 
- 哈希表维护 d 维护 key 对应的 t 和 value
- get 和 put 时模拟操作即可

```python
class LRUCache:

    def __init__(self, capacity: int):
        from sortedcontainers import SortedList
        self.sl = SortedList()
        self.m = capacity
        self.t = 0
        self.d = {}

    def get(self, key: int) -> int:
        if key not in self.d:
            return -1
        t,x = self.d[key]
        self.sl.remove((t,key))
        self.sl.add((self.t,key))
        self.d[key] = (self.t,x)
        self.t += 1
        return x

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            t,_ = self.d[key]
            self.sl.remove((t,key))
        elif len(self.sl)==self.m:
            _,x = self.sl.pop(0)
            self.d.pop(x)
        self.sl.add((self.t,key))
        self.d[key] = (self.t,value)
        self.t += 1
```
368 ms

### #2

- 要求 O(1) 时间完成 put() 和 get()，可以用双向链表+哈希表来实现
-  python 可以用 OrderedDict 方便地实现


```python
class LRUCache:

    def __init__(self, capacity: int):
        self.d = OrderedDict()
        self.m = capacity

    def get(self, key: int) -> int:
        if key not in self.d:
            return -1
        self.d.move_to_end(key)
        return self.d[key]

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            self.d.move_to_end(key)
        elif len(self.d)==self.m:
            self.d.popitem(last=False)
        self.d[key] = value
```
90 ms

### #3 

更通用的双向链表写法

## 解答

```python
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

class LRUCache:
    def __init__(self, capacity: int):
        self.c = capacity
        self.dum = Node()
        self.d = {}
    
    def update(self,node):
        node.remove()
        self.dum.insert(node)

    def get(self, key: int) -> int:
        if key not in self.d:
            return -1
        node = self.d[key]
        self.update(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            node = self.d[key]
            self.update(node)
            node.val = value
            return
        if len(self.d)==self.c:
            p = self.dum.pre
            del self.d[p.key]
            p.remove()
        self.d[key] = node = Node(key,value)
        self.dum.insert(node)
```
104 ms
