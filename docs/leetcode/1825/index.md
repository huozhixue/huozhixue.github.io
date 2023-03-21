# 1825：求出 MK 平均值（★★）


> <u>**[力扣第 236 场周赛第 4 题](https://leetcode.cn/problems/finding-mk-average/)**</u>

## 题目

<p>给你两个整数 <code>m</code> 和 <code>k</code> ，以及数据流形式的若干整数。你需要实现一个数据结构，计算这个数据流的 <b>MK 平均值</b> 。</p>

<p><strong>MK 平均值</strong> 按照如下步骤计算：</p>

<ol>
<li>如果数据流中的整数少于 <code>m</code> 个，<strong>MK 平均值</strong> 为 <code>-1</code> ，否则将数据流中最后 <code>m</code> 个元素拷贝到一个独立的容器中。</li>
<li>从这个容器中删除最小的 <code>k</code> 个数和最大的 <code>k</code> 个数。</li>
<li>计算剩余元素的平均值，并 <strong>向下取整到最近的整数</strong> 。</li>
</ol>

<p>请你实现 <code>MKAverage</code> 类：</p>

<ul>
<li><code>MKAverage(int m, int k)</code> 用一个空的数据流和两个整数 <code>m</code> 和 <code>k</code> 初始化 <strong>MKAverage</strong> 对象。</li>
<li><code>void addElement(int num)</code> 往数据流中插入一个新的元素 <code>num</code> 。</li>
<li><code>int calculateMKAverage()</code> 对当前的数据流计算并返回 <strong>MK 平均数</strong> ，结果需 <strong>向下取整到最近的整数</strong> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
["MKAverage", "addElement", "addElement", "calculateMKAverage", "addElement", "calculateMKAverage", "addElement", "addElement", "addElement", "calculateMKAverage"]
[[3, 1], [3], [1], [], [10], [], [5], [5], [5], []]
<strong>输出：</strong>
[null, null, null, -1, null, 3, null, null, null, 5]

<strong>解释：</strong>
MKAverage obj = new MKAverage(3, 1);
obj.addElement(3);        // 当前元素为 [3]
obj.addElement(1);        // 当前元素为 [3,1]
obj.calculateMKAverage(); // 返回 -1 ，因为 m = 3 ，但数据流中只有 2 个元素
obj.addElement(10);       // 当前元素为 [3,1,10]
obj.calculateMKAverage(); // 最后 3 个元素为 [3,1,10]
// 删除最小以及最大的 1 个元素后，容器为 [3]
// [3] 的平均值等于 3/1 = 3 ，故返回 3
obj.addElement(5);        // 当前元素为 [3,1,10,5]
obj.addElement(5);        // 当前元素为 [3,1,10,5,5]
obj.addElement(5);        // 当前元素为 [3,1,10,5,5,5]
obj.calculateMKAverage(); // 最后 3 个元素为 [5,5,5]
// 删除最小以及最大的 1 个元素后，容器为 [5]
// [5] 的平均值等于 5/1 = 5 ，故返回 5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= m &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= k*2 &lt; m</code></li>
<li><code>1 &lt;= num &lt;= 10<sup>5</sup></code></li>
<li><code>addElement</code> 与 <code>calculateMKAverage</code> 总操作次数不超过 <code>10<sup>5</sup></code> 次。</li>
</ul>


## 分析

### #1

考虑用数组 A 动态维护最后的 m 个元素并保持有序，MK 平均数即为 int(sum(A[k:-k])/(m-2*k))。

```python
class MKAverage:

    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.queue = deque()
        self.A = []
        self.size = m - 2*k

    def addElement(self, num: int) -> None:
        self.queue.append(num)
        if len(self.queue) == self.m:
            self.A = sorted(self.queue)
        if len(self.queue) > self.m:
            i = bisect_left(self.A, self.queue.popleft())
            self.A.pop(i)
            insort_right(self.A, num)
            
    def calculateMKAverage(self) -> int:
        if len(self.queue) < self.m:
            return -1
        return int(sum(self.A[self.k:-self.k]) / self.size)
```

9760 ms，勉强 AC

### #2

考虑能否动态维护 s=sum(A[k:-k])。弹出位置 i 的元素时，有：

	if i < k					A[i] 属于最小的 k 个数，弹出后 s 中的最小数 A[k] 补上， s -= A[k] 
	elif i >= len(A)-k			A[i] 属于最大的 k 个数，弹出后 s 中的最大数 A[-k-1] 补上，s -= A[-k-1]
	else						A[i] 属于 s， s -= A[i]

同理，在位置 i 插入元素 num 时：

	if i < k					num 属于新的最小的 k 个数，原来的 A[k-1] 被挤出加入到 s，s += A[k-1]
	elif i > len(A)-k			num 属于新的最大的 k 个数，原来的 A[-k] 被挤出加入到 s，s += A[-k]
	else						num 属于 s，s += num

注意 len(A) 是变化的。	

## 解答

```python
class MKAverage:

    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.queue = deque()
        self.A = []
        self.size = m - 2 * k
        self.s = 0

    def addElement(self, num: int) -> None:
        self.queue.append(num)
        if len(self.queue) == self.m:
            self.A = sorted(self.queue)
            self.s = sum(self.A[self.k:-self.k])
        if len(self.queue) > self.m:
            i = bisect_left(self.A, self.queue.popleft())
            if i < self.k:
                self.s -= self.A[self.k]
            elif i >= len(self.A) - self.k:
                self.s -= self.A[-self.k-1]
            else:
                self.s -= self.A[i]
            self.A.pop(i)
            j = bisect_left(self.A, num)
            if j < self.k:
                self.s += self.A[self.k-1]
            elif j > len(self.A)-self.k:
                self.s += self.A[-self.k]
            else:
                self.s += num
            self.A.insert(j, num)

    def calculateMKAverage(self) -> int:
        if len(self.queue) < self.m:
            return -1
        return int(self.s / self.size)
```

1008 ms

## *附加

理论上来说，采用平衡有序二叉树来维护 A，能在 log N 时间内查找、插入、删除元素，可以降低时间复杂度。

但是 python 的列表操作非常快，所以一般不用树结构。库函数 sortedcontainers.SortedList 也是用 list 实现的。


