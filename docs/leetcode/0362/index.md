# 0362：敲击计数器（★）


> <u>**[力扣第 362 题](https://leetcode.cn/problems/design-hit-counter/)**</u>

## 题目

<p>设计一个敲击计数器，使它可以统计在过去 <code>5</code> 分钟内被敲击次数。（即过去 <code>300</code> 秒）</p>

<p>您的系统应该接受一个时间戳参数 <code>timestamp</code> (单位为 <strong>秒</strong> )，并且您可以假定对系统的调用是按时间顺序进行的(即 <code>timestamp</code> 是单调递增的)。几次撞击可能同时发生。</p>

<p>实现 <code>HitCounter</code> 类:</p>

<ul>
<li><code>HitCounter()</code> 初始化命中计数器系统。</li>
<li><code>void hit(int timestamp)</code> 记录在 <code>timestamp</code> ( <strong>单位为秒</strong> )发生的一次命中。在同一个 <code>timestamp</code> 中可能会出现几个点击。</li>
<li><code>int getHits(int timestamp)</code> 返回 <code>timestamp</code> 在过去 5 分钟内(即过去 <code>300</code> 秒)的命中次数。</li>
</ul>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入：</strong>
["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
[[], [1], [2], [3], [4], [300], [300], [301]]
<strong>输出：</strong>
[null, null, null, null, 3, null, 4, 3]

<strong>解释：</strong>
HitCounter counter = new HitCounter();
counter.hit(1);// 在时刻 1 敲击一次。
counter.hit(2);// 在时刻 2 敲击一次。
counter.hit(3);// 在时刻 3 敲击一次。
counter.getHits(4);// 在时刻 4 统计过去 5 分钟内的敲击次数, 函数返回 3 。
counter.hit(300);// 在时刻 300 敲击一次。
counter.getHits(300); // 在时刻 300 统计过去 5 分钟内的敲击次数，函数返回 4 。
counter.getHits(301); // 在时刻 301 统计过去 5 分钟内的敲击次数，函数返回 3 。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= timestamp &lt;= 2 * 10<sup>9</sup></code></li>
<li>所有对系统的调用都是按时间顺序进行的（即 <code>timestamp</code> 是单调递增的）</li>
<li><code>hit</code> and <code>getHits </code>最多被调用 <code>300</code> 次</li>
</ul>



<p><strong>进阶:</strong> 如果每秒的敲击次数是一个很大的数字，你的计数器可以应对吗？</p>


## 分析

只需要过去 300 秒的次数，那么记录每秒的次数，相加即可。

这样也可以处理进阶问题。


## 解答

```python
class HitCounter:

    def __init__(self):
        self.d = defaultdict(int)

    def hit(self, timestamp: int) -> None:
        self.d[timestamp] += 1

    def getHits(self, timestamp: int) -> int:
        return sum(self.d.get(t, 0) for t in range(timestamp-299, timestamp+1))
```
44 ms

