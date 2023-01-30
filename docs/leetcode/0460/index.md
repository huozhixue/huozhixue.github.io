# 0460：LFU 缓存（★★★）



## 题目

请你为 最不经常使用（LFU）缓存算法设计并实现数据结构。

实现 LFUCache 类：

- LFUCache(int capacity) - 用数据结构的容量 capacity 初始化对象
- int get(int key) - 如果键存在于缓存中，则获取键的值，否则返回 -1。
- void put(int key, int value) - 如果键已存在，则变更其值；如果键不存在，请插入键值对。
当缓存达到其容量时，则应该在插入新项之前，使最不经常使用的项无效。
在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 最近最久未使用 的键。

注意「项的使用次数」就是自插入该项以来对其调用 get 和 put 函数的次数之和。
使用次数会在对应项被移除后置为 0 。

为了确定最不常使用的键，可以为缓存中的每个键维护一个 使用计数器 。
使用计数最小的键是最久未使用的键。

当一个键首次插入到缓存中时，它的使用计数器被设置为 1 (由于 put 操作)。
对缓存中的键执行 get 或 put 操作，使用计数器的值将会递增。

提示：

- 0 <= capacity, key, value <= 10^4 
- 最多调用 10^5 次 get 和 put 方法

进阶：你可以为这两种操作设计时间复杂度为 O(1) 的实现吗？
 
示例：

    输入：
    ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
    输出：
    [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
    
    解释：
    // cnt(x) = 键 x 的使用计数
    // cache=[] 将显示最后一次使用的顺序（最左边的元素是最近的）
    LFUCache lFUCache = new LFUCache(2);
    lFUCache.put(1, 1);   // cache=[1,_], cnt(1)=1
    lFUCache.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
    lFUCache.get(1);      // 返回 1
                          // cache=[1,2], cnt(2)=1, cnt(1)=2
    lFUCache.put(3, 3);   // 去除键 2 ，因为 cnt(2)=1 ，使用计数最小
                          // cache=[3,1], cnt(3)=1, cnt(1)=2
    lFUCache.get(2);      // 返回 -1（未找到）
    lFUCache.get(3);      // 返回 3
                          // cache=[3,1], cnt(3)=2, cnt(1)=2
    lFUCache.put(4, 4);   // 去除键 1 ，1 和 3 的 cnt 相同，但 1 最久未使用
                          // cache=[4,3], cnt(4)=1, cnt(3)=2
    lFUCache.get(1);      // 返回 -1（未找到）
    lFUCache.get(3);      // 返回 3
                          // cache=[3,4], cnt(4)=1, cnt(3)=3
    lFUCache.get(4);      // 返回 4
                          // cache=[3,4], cnt(4)=2, cnt(3)=3

## 分析

{{< lc "0146" >}} 的升级版。需要先找到最小使用次数的键集合，再找到最久未使用的键。
因此考虑用哈希表存 key 的使用次数 freq。而对于相同 freq 的键, 用 OrderedDict 维护顺序。

get 和 put 时先得到 key 的使用次数 freq，从 freq 对应的字典中弹出 key，并添加到 freq+1 对应的字典中。
如果是 put 新的 key 且容量达到上限，则找到最小使用次数 minFreq，从 minFreq 对应的 OrderedDict 中弹出首位元素。

注意到当 get 或 put 已有 key 时，minFreq 只可能不变或加 1，而 put 新的 key 时，minFreq 变为 1。
因此可以实现 O(1) 时间维护 minFreq。

## 解答

```python
class LFUCache:

    def __init__(self, capacity: int):
        self.ct = Counter()
        self.d = defaultdict(OrderedDict)
        self.capacity = capacity
        self.minFreq = 0

    def pop(self, key):
        freq = self.ct[key]
        val = self.d[freq].pop(key)
        if not self.d[freq] and self.minFreq == freq:
            self.minFreq = freq+1
        return freq, val

    def get(self, key: int) -> int:
        if key not in self.ct:
            return -1
        freq, val = self.pop(key)
        self.d[freq+1][key] = val
        self.ct[key] = freq + 1
        return val

    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return
        if key in self.ct:
            freq, _ = self.pop(key)
            self.d[freq+1][key] = value
            self.ct[key] = freq + 1
            return  
        if len(self.ct) == self.capacity:
            x = self.d[self.minFreq].popitem(last=False)[0]
            del self.ct[x]
        self.d[1][key] = value
        self.ct[key] = 1
        self.minFreq = 1
```
556 ms
