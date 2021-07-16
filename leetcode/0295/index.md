# 0295：数据流的中位数（★★）


## 题目

中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

例如，

- [2,3,4] 的中位数是 3

- [2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

- void addNum(int num) - 从数据流中添加一个整数到数据结构中。
- double findMedian() - 返回目前所有元素的中位数。

进阶:

- 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
- 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？

<!--more--> 

示例：

	addNum(1)
	addNum(2)
	findMedian() -> 1.5
	addNum(3) 
	findMedian() -> 2

## 分析

### #1

最简单的就是维护有序列表，添加元素时二分查找位置插入即可。

```python
class MedianFinder:

    def __init__(self):
        self.A = []

    def addNum(self, num: int) -> None:
        insort_right(self.A, num)

    def findMedian(self) -> float:
        n = len(self.A)
        return (self.A[(n-1)//2]+self.A[n//2]) / 2
```

232 ms

### #2

有个巧妙的想法是用大顶堆 low 维护较小的一半元素，用小顶堆 high 维护较大的一半元素，根据两个堆的堆顶即可得到中位数。

为了保持两边数量平衡，先将元素添加到 high 中，high 的堆顶弹出到 low 中。
然后如果 len(low) > len(high)，就将 low 的堆顶移到 high。

## 解答

```python
class MedianFinder:

    def __init__(self):
        self.low = []
        self.high = []

    def addNum(self, num: int) -> None:
        heappush(self.low, -heappushpop(self.high, num))
        if len(self.low) > len(self.high):
            heappush(self.high, -heappop(self.low))

    def findMedian(self) -> float:
        if len(self.high) == len(self.low):
            return (-self.low[0]+self.high[0]) / 2
        return self.high[0]
```

200 ms

