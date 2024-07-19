# 0621：任务调度器（★）


> <u>**[力扣第 621 题](https://leetcode.cn/problems/task-scheduler/)**</u>

## 题目

<p>给你一个用字符数组 <code>tasks</code> 表示的 CPU 需要执行的任务列表，用字母 A 到 Z 表示，以及一个冷却时间 <code>n</code>。每个周期或时间间隔允许完成一项任务。任务可以按任何顺序完成，但有一个限制：两个<strong> 相同种类</strong> 的任务之间必须有长度为<strong> </strong><code>n</code><strong> </strong>的冷却时间。</p>

<p>返回完成所有任务所需要的<strong> 最短时间间隔</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>tasks = ["A","A","A","B","B","B"], n = 2
<strong>输出：</strong>8
<strong>解释：</strong>A -&gt; B -&gt; (待命) -&gt; A -&gt; B -&gt; (待命) -&gt; A -&gt; B
在本示例中，两个相同类型任务之间必须间隔长度为 n = 2 的冷却时间，而执行一个任务只需要一个单位时间，所以中间出现了（待命）状态。 </pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>tasks = ["A","A","A","B","B","B"], n = 0
<strong>输出：</strong>6
<strong>解释：</strong>在这种情况下，任何大小为 6 的排列都可以满足要求，因为 n = 0
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
诸如此类
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
<strong>输出：</strong>16
<strong>解释：</strong>一种可能的解决方案是：
A -&gt; B -&gt; C -&gt; A -&gt; D -&gt; E -&gt; A -&gt; F -&gt; G -&gt; A -&gt; (待命) -&gt; (待命) -&gt; A -&gt; (待命) -&gt; (待命) -&gt; A
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= tasks.length &lt;= 10<sup>4</sup></code></li>
<li><code>tasks[i]</code> 是大写英文字母</li>
<li><code>0 &lt;= n &lt;= 100</code></li>
</ul>


**相似问题：**
- [0358：K 距离间隔重排字符串](/leetcode/0358)
- [0767：重构字符串（1681 分）](/leetcode/0767)
- [1953：你可以工作的最大周数（1803 分）](/leetcode/1953)
- [2323：完成所有工作的最短时间 II](/leetcode/2323)
- [2365：任务调度器 II（1622 分）](/leetcode/2365)


## 分析

### #1 贪心+堆

容易想到的一种方法是贪心放剩余次数最多的任务。证明见 [力扣官方题解](https://leetcode.cn/u/leetcode-solution/)。

```python
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        free = sorted(-w for w in Counter(tasks).values())
        busy, t = deque(), 0
        for _ in range(len(tasks)):
            if not free:
                t = max(t,busy[0][0])
            while busy and busy[0][0]<=t:
                heappush(free,busy.popleft()[1])
            w = heappop(free)
            if -w-1>0:
                busy.append((t+n+1,w+1))
            t += 1
        return t
```
200 ms

### #2 构造

还可以直接构造，具体见 [力扣官方题解](https://leetcode.cn/u/leetcode-solution/)。

## 解答


```python
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        A = list(Counter(tasks).values())
        ma = max(A)
        w = A.count(ma)
        return max(len(tasks),(ma-1)*(n+1)+w)
```
64 ms
