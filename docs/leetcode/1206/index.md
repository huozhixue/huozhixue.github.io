# 1206：设计跳表（★★）


> <u>**[力扣第 1206 题](https://leetcode.cn/problems/design-skiplist/)**</u>

## 题目

<p>不使用任何库函数，设计一个 <strong>跳表</strong> 。</p>

<p><strong>跳表</strong> 是在 <code>O(log(n))</code> 时间内完成增加、删除、搜索操作的数据结构。跳表相比于树堆与红黑树，其功能与性能相当，并且跳表的代码长度相较下更短，其设计思想与链表相似。</p>

<p>例如，一个跳表包含 <code>[30, 40, 50, 60, 70, 90]</code> ，然后增加 <code>80</code>、<code>45</code> 到跳表中，以下图的方式操作：</p>

<p><img alt="" src="https://pic.leetcode.cn/1702370216-mKQcTt-1506_skiplist.gif" style="width: 500px; height: 173px;" /></p>

<p>跳表中有很多层，每一层是一个短的链表。在第一层的作用下，增加、删除和搜索操作的时间复杂度不超过 <code>O(n)</code>。跳表的每一个操作的平均时间复杂度是 <code>O(log(n))</code>，空间复杂度是 <code>O(n)</code>。</p>

<p>了解更多 : <a href="https://oi-wiki.org/ds/skiplist/" target="_blank">https://oi-wiki.org/ds/skiplist/</a></p>

<p>在本题中，你的设计应该要包含这些函数：</p>

<ul>
<li><code>bool search(int target)</code> : 返回target是否存在于跳表中。</li>
<li><code>void add(int num)</code>: 插入一个元素到跳表。</li>
<li><code>bool erase(int num)</code>: 在跳表中删除一个值，如果 <code>num</code> 不存在，直接返回false. 如果存在多个 <code>num</code> ，删除其中任意一个即可。</li>
</ul>

<p>注意，跳表中可能存在多个相同的值，你的代码需要处理这种情况。</p>



<p><strong>示例 1:</strong></p>

<pre>
<b>输入</b>
["Skiplist", "add", "add", "add", "search", "add", "search", "erase", "erase", "search"]
[[], [1], [2], [3], [0], [4], [1], [0], [1], [1]]
<strong>输出</strong>
[null, null, null, null, false, null, true, false, true, false]

<strong>解释</strong>
Skiplist skiplist = new Skiplist();
skiplist.add(1);
skiplist.add(2);
skiplist.add(3);
skiplist.search(0);   // 返回 false
skiplist.add(4);
skiplist.search(1);   // 返回 true
skiplist.erase(0);    // 返回 false，0 不在跳表中
skiplist.erase(1);    // 返回 true
skiplist.search(1);   // 返回 false，1 已被擦除
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>0 &lt;= num, target &lt;= 2 * 10<sup>4</sup></code></li>
<li>调用<code>search</code>, <code>add</code>,  <code>erase</code>操作次数不大于 <code>5 * 10<sup>4</sup></code> </li>
</ul>


**相似问题：**
- [0705：设计哈希集合](/leetcode/0705)
- [0706：设计哈希映射](/leetcode/0706)
- [0707：设计链表](/leetcode/0707)


## 分析

- [:(far fa-hand-point-right fa-fw):跳表教程](//www.cs.cmu.edu/~ckingsf/bioinfo-lectures/skiplists.pdf)
- 为了方便，可以将叠在一起的看成是一个节点。

## 解答

```python
maxH = 16
prob = 0.5

def random_level() -> int:
    h = 1
    while h<maxH and random.random()<prob:
        h += 1
    return h

class Node:
    __slots__ = 'val', 'nxt'

    def __init__(self, val: int, maxH=maxH):
        self.val = val
        self.nxt = [None]*maxH

class Skiplist:
    def __init__(self):
        self.head = Node(-1)
        self.H = 0
    
    def get(self,x):
        jump = [self.head]*maxH
        p = self.head
        for i in range(self.H-1,-1,-1):
            while p.nxt[i] and p.nxt[i].val<x:
                p = p.nxt[i]
            jump[i] = p
        return jump

    def search(self, target: int) -> bool:
        p = self.get(target)[0].nxt[0]
        return bool(p) and p.val==target

    def add(self, num: int) -> None:
        jump = self.get(num)
        h = random_level()
        self.H = max(self.H, h)
        new = Node(num,h)
        for i in range(h):
            new.nxt[i] = jump[i].nxt[i]
            jump[i].nxt[i] = new

    def erase(self, num: int) -> bool:
        jump = self.get(num)
        p = jump[0].nxt[0]
        if not p or p.val != num:
            return False
        for i in range(self.H):
            if jump[i].nxt[i] != p:
                break
            jump[i].nxt[i] = p.nxt[i]
        while self.H>1 and not self.head.nxt[self.H-1]:
            self.H -= 1
        return True
```
60 ms

