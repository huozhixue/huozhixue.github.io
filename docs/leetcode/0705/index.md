# 0705：设计哈希集合


> <u>**[力扣第 705 题](https://leetcode.cn/problems/design-hashset/)**</u>

## 题目

<p>不使用任何内建的哈希表库设计一个哈希集合（HashSet）。</p>

<p>实现 <code>MyHashSet</code> 类：</p>

<ul>
<li><code>void add(key)</code> 向哈希集合中插入值 <code>key</code> 。</li>
<li><code>bool contains(key)</code> 返回哈希集合中是否存在这个值 <code>key</code> 。</li>
<li><code>void remove(key)</code> 将给定值 <code>key</code> 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。</li>
</ul>


<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
<strong>输出：</strong>
[null, null, null, true, false, null, true, null, false]

<strong>解释：</strong>
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // 返回 True
myHashSet.contains(3); // 返回 False ，（未找到）
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // 返回 True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // 返回 False ，（已移除）</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= key &lt;= 10<sup>6</sup></code></li>
<li>最多调用 <code>10<sup>4</sup></code> 次 <code>add</code>、<code>remove</code> 和 <code>contains</code></li>
</ul>


**相似问题：**
- [0706：设计哈希映射](/leetcode/0706)
- [1206：设计跳表](/leetcode/1206)


## 分析

### #1

key 的范围较小，可以直接用一个数组一一对应。

```python
class MyHashSet:

    def __init__(self):
        self.A = [False] * (10**6+1)

    def add(self, key: int) -> None:
        self.A[key] = True

    def remove(self, key: int) -> None:
        self.A[key] = False

    def contains(self, key: int) -> bool:
        return self.A[key]
```

268 ms

### #2

一般哈希表会用更小的空间来存储，这时要考虑冲突的情况。最简单的就是拉链法。

## 解答

```python
class MyHashSet:

    def __init__(self):
        self.size = 1009
        self.A = [[] for _ in range(self.size)]

    def add(self, key: int) -> None:
        if not self.contains(key):
            self.A[key%self.size].append(key)

    def remove(self, key: int) -> None:
        if self.contains(key):
            self.A[key%self.size].remove(key)

    def contains(self, key: int) -> bool:
        return key in self.A[key%self.size]
```
140 ms

