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

