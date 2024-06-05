# 0677：键值映射（★）


> <u>**[力扣第 677 题](https://leetcode.cn/problems/map-sum-pairs/)**</u>

## 题目

<p>设计一个 map ，满足以下几点:</p>

<ul>
<li>字符串表示键，整数表示值</li>
<li>返回具有前缀等于给定字符串的键的值的总和</li>
</ul>

<p>实现一个 <code>MapSum</code> 类：</p>

<ul>
<li><code>MapSum()</code> 初始化 <code>MapSum</code> 对象</li>
<li><code>void insert(String key, int val)</code> 插入 <code>key-val</code> 键值对，字符串表示键 <code>key</code> ，整数表示值 <code>val</code> 。如果键 <code>key</code> 已经存在，那么原来的键值对 <code>key-value</code> 将被替代成新的键值对。</li>
<li><code>int sum(string prefix)</code> 返回所有以该前缀 <code>prefix</code> 开头的键 <code>key</code> 的值的总和。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
<strong>输出：</strong>
[null, null, 3, null, 5]

<strong>解释：</strong>
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);
mapSum.sum("ap");           // 返回 3 (<u>ap</u>ple = 3)
mapSum.insert("app", 2);
mapSum.sum("ap");           // 返回 5 (<u>ap</u>ple + <u>ap</u>p = 3 + 2 = 5)
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= key.length, prefix.length &lt;= 50</code></li>
<li><code>key</code> 和 <code>prefix</code> 仅由小写英文字母组成</li>
<li><code>1 &lt;= val &lt;= 1000</code></li>
<li>最多调用 <code>50</code> 次 <code>insert</code> 和 <code>sum</code></li>
</ul>


## 分析

### #1

最简单的就是直接用哈希。计算 sum 时，遍历哈希中所有 key 判断是否以 prefix 开头即可。

```python
class MapSum:

    def __init__(self):
        self.d = {}

    def insert(self, key: str, val: int) -> None:
        self.d[key] = val

    def sum(self, prefix: str) -> int:
        return sum(self.d[key] for key in self.d if key.startswith(prefix))
```

36 ms

### #2

还可以用字典树优化时间。在 insert 时可以动态维护前缀对应的键值和（每个节点都新加一个 'val' 属性来维护），计算 sum 时查询即可。

注意到 insert 时，若 key 已经存在，路径上所有的节点都需要更新 'val' 的值。


## 解答

```python
class MapSum:

    def __init__(self):
        T = lambda: defaultdict(T)
        self.trie = T()
        self.d = defaultdict(int)

    def insert(self, key: str, val: int) -> None:
        diff = val - self.d[key]
        self.d[key] = val
        p = self.trie
        for char in key:
            p = p[char]
            p['val'] = p.get('val', 0) + diff

    def sum(self, prefix: str) -> int:
        return reduce(dict.__getitem__, prefix, self.trie).get('val', 0)
```

28 ms
