# 0346：数据流中的移动平均值


> <u>**[力扣第 346 题](https://leetcode.cn/problems/moving-average-from-data-stream/)**</u>

## 题目

<p>给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算其所有整数的移动平均值。</p>

<p>实现 <code>MovingAverage</code> 类：</p>

<ul>
<li><code>MovingAverage(int size)</code> 用窗口大小 <code>size</code> 初始化对象。</li>
<li><code>double next(int val)</code> 计算并返回数据流中最后 <code>size</code> 个值的移动平均值。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]
<strong>输出：</strong>
[null, 1.0, 5.5, 4.66667, 6.0]

<strong>解释：</strong>
MovingAverage movingAverage = new MovingAverage(3);
movingAverage.next(1); // 返回 1.0 = 1 / 1
movingAverage.next(10); // 返回 5.5 = (1 + 10) / 2
movingAverage.next(3); // 返回 4.66667 = (1 + 10 + 3) / 3
movingAverage.next(5); // 返回 6.0 = (10 + 3 + 5) / 3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= size <= 1000</code></li>
<li><code>-10<sup>5</sup> <= val <= 10<sup>5</sup></code></li>
<li>最多调用 <code>next</code> 方法 <code>10<sup>4</sup></code> 次</li>
</ul>


## 分析

维护一个 size 大小的队列，并维护队列元素之和即可。

## 解答

```python
class MovingAverage:

    def __init__(self, size: int):
        self.size = size
        self.A = deque()
        self.s = 0

    def next(self, val: int) -> float:
        self.A.append(val)
        self.s += val
        if len(self.A)>self.size:
            self.s -= self.A.popleft()
        return self.s / len(self.A)
```
52 ms



