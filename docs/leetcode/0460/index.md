# 0460：LFU 缓存（★★）


> <u>**[力扣第 460 题](https://leetcode.cn/problems/lfu-cache/)**</u>

## 题目

<p>请你为 <a href="https://baike.baidu.com/item/%E7%BC%93%E5%AD%98%E7%AE%97%E6%B3%95">最不经常使用（LFU）</a>缓存算法设计并实现数据结构。</p>

<p>实现 <code>LFUCache</code> 类：</p>

<ul>
<li><code>LFUCache(int capacity)</code> - 用数据结构的容量 <code>capacity</code> 初始化对象</li>
<li><code>int get(int key)</code> - 如果键 <code>key</code> 存在于缓存中，则获取键的值，否则返回 <code>-1</code> 。</li>
<li><code>void put(int key, int value)</code> - 如果键 <code>key</code> 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 <code>capacity</code> 时，则应该在插入新项之前，移除最不经常使用的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 <strong>最久未使用</strong> 的键。</li>
</ul>

<p>为了确定最不常使用的键，可以为缓存中的每个键维护一个 <strong>使用计数器</strong> 。使用计数最小的键是最久未使用的键。</p>

<p>当一个键首次插入到缓存中时，它的使用计数器被设置为 <code>1</code> (由于 put 操作)。对缓存中的键执行 <code>get</code> 或 <code>put</code> 操作，使用计数器的值将会递增。</p>

<p>函数 <code>get</code> 和 <code>put</code> 必须以 <code>O(1)</code> 的平均时间复杂度运行。</p>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
<strong>输出：</strong>
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

<strong>解释：</strong>
// cnt(x) = 键 x 的使用计数
// cache=[] 将显示最后一次使用的顺序（最左边的元素是最近的）
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // 返回 1
// cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 去除键 2 ，因为 cnt(2)=1 ，使用计数最小
// cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // 返回 -1（未找到）
lfu.get(3);      // 返回 3
// cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // 去除键 1 ，1 和 3 的 cnt 相同，但 1 最久未使用
// cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // 返回 -1（未找到）
lfu.get(3);      // 返回 3
// cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // 返回 4
// cache=[3,4], cnt(4)=2, cnt(3)=3</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= capacity &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= key &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= value &lt;= 10<sup>9</sup></code></li>
<li>最多调用 <code>2 * 10<sup>5</sup></code> 次 <code>get</code> 和 <code>put</code> 方法</li>
</ul>


## 分析

### #1

{{< lc "0146" >}} 升级版，同样可以用有序集合解决。

```python
class LFUCache:

    def __init__(self, capacity: int):
        from sortedcontainers import SortedList
        self.sl = SortedList()
        self.m = capacity
        self.t = 0
        self.d = {}

    def get(self, key: int) -> int:
        if key not in self.d:
            return -1
        w,t,x = self.d[key]
        self.sl.remove((w,t,key))
        self.sl.add((w+1,self.t,key))
        self.d[key] = (w+1,self.t,x)
        self.t += 1
        return x

    def put(self, key: int, value: int) -> None:
        if key in self.d:
            w,t,_ = self.d[key]
            self.sl.remove((w,t,key))
            self.sl.add((w+1,self.t,key))
            self.d[key] = (w+1,self.t,value)
        else:
            if len(self.sl)==self.m:
                _,_,x = self.sl.pop(0)
                self.d.pop(x)
            self.sl.add((1,self.t,key))
            self.d[key] = (1,self.t,value)
        self.t += 1
```
553 ms

### #2

要求 O(1)，同样考虑用 OrderedDict：
- 计数器 ct 维护每个 key 的频率
- 将相同频率的 key 放一起，用 OrderedDict 维护顺序
- 维护最小频率 minw
	- get 或 put 时，若已有 key，则 minw 不变或加 1
	- put 新 key 时，minw 变为 1
- 其它模拟即可

## 解答

```python
class LFUCache:

    def __init__(self, capacity: int):
        self.ct = {}
        self.d = defaultdict(OrderedDict)
        self.m = capacity
        self.minw = 0

    def pop(self, key):
        w = self.ct[key]
        val = self.d[w].pop(key)
        if not self.d[w] and self.minw==w:
            self.minw = w+1
        return w,val

    def get(self, key: int) -> int:
        if key not in self.ct:
            return -1
        w,val = self.pop(key)
        self.d[w+1][key] = val
        self.ct[key] = w+1
        return val

    def put(self, key: int, value: int) -> None:
        if key in self.ct:
            w,_ = self.pop(key)
            self.d[w+1][key] = value
            self.ct[key] = w+1
        else:
            if len(self.ct)==self.m:
                x = self.d[self.minw].popitem(last=False)[0]
                self.ct.pop(x)
            self.d[1][key] = value
            self.ct[key] = 1
            self.minw= 1
```
382 ms
