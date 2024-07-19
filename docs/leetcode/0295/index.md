# 0295：数据流的中位数（★★）


> <u>**[力扣第 295 题](https://leetcode.cn/problems/find-median-from-data-stream/)**</u>

## 题目

<p><strong>中位数</strong>是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。</p>

<ul>
<li>例如 <code>arr = [2,3,4]</code> 的中位数是 <code>3</code> 。</li>
<li>例如 <code>arr = [2,3]</code> 的中位数是 <code>(2 + 3) / 2 = 2.5</code> 。</li>
</ul>

<p>实现 MedianFinder 类:</p>

<ul>
<li>
<p><code>MedianFinder() </code>初始化 <code>MedianFinder</code> 对象。</p>
</li>
<li>
<p><code>void addNum(int num)</code> 将数据流中的整数 <code>num</code> 添加到数据结构中。</p>
</li>
<li>
<p><code>double findMedian()</code> 返回到目前为止所有元素的中位数。与实际答案相差 <code>10<sup>-5</sup></code> 以内的答案将被接受。</p>
</li>
</ul>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
<strong>输出</strong>
[null, null, null, 1.5, null, 2.0]

<strong>解释</strong>
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0</pre>

<p><strong>提示:</strong></p>

<ul>
<li><code>-10<sup>5</sup> &lt;= num &lt;= 10<sup>5</sup></code></li>
<li>在调用 <code>findMedian</code> 之前，数据结构中至少有一个元素</li>
<li>最多 <code>5 * 10<sup>4</sup></code> 次调用 <code>addNum</code> 和 <code>findMedian</code></li>
</ul>


**相似问题：**
- [0480：滑动窗口中位数](/leetcode/0480)
- [1825：求出 MK 平均值（2395 分）](/leetcode/1825)
- [2102：序列顺序查询（2158 分）](/leetcode/2102)
- [3107：使数组中位数等于 K 的最少操作数（1604 分）](/leetcode/3107)


## 分析

### #1

最简单的是用 SortedList 维护一个有序集合即可。

```python
class MedianFinder:

    def __init__(self):
        from sortedcontainers import SortedList
        self.sl = SortedList()


    def addNum(self, num: int) -> None:
        self.sl.add(num)


    def findMedian(self) -> float:
        n = len(self.sl)
        return (self.sl[(n-1)//2]+self.sl[n//2])/2
```
439 ms

### #2

也可以用双堆维护：
- 用两个堆 A、B 分别维护较小的一半和较大的一半
- A 要弹出最大数，B 要弹出最小数，因此 A 为大顶堆，注意入堆时元素取负
- 为了方便，总个数为奇数时，多余的一个放在 A
- addNum 时
	- 先将元素添加到 A 中，弹出堆顶并加到 B 中
	- 如果 len(A)<len(B)，就再弹出 B 堆顶加到 A 中 
- findMedian 时，根据奇偶情况返回即可
        

## 解答

```python
class MedianFinder:

    def __init__(self):
        self.A = []
        self.B = []

    def addNum(self, num: int) -> None:
        heappush(self.A,-num)
        heappush(self.B,-heappop(self.A))
        if len(self.B)>len(self.A):
            heappush(self.A,-heappop(self.B))

    def findMedian(self) -> float:
        if len(self.A)>len(self.B):
            return -self.A[0]
        return (self.B[0]-self.A[0])/2
```
330 ms

