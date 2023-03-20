# 0295：数据流的中位数（★★）


## 题目

中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：
- void addNum(int num) - 从数据流中添加一个整数到数据结构中。
- double findMedian() - 返回目前所有元素的中位数。

示例：

	addNum(1)
	addNum(2)
	findMedian() -> 1.5
	addNum(3) 
	findMedian() -> 2

进阶:
- 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
- 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？


## 分析

### #1

考虑维护一个有序集合，根据中间位置的一个数或两个数即可得到中位数。

要进行插入、访问的操作，考虑用 SortedList，都能在 O(logN) 时间内完成。

```python
class MedianFinder:

    def __init__(self):
        from sortedcontainers import SortedList
        self.sl = SortedList()

    def addNum(self, num: int) -> None:
        self.sl.add(num)

    def findMedian(self) -> float:
        n = len(self.sl)
        return (self.sl[(n-1)//2] + self.sl[n//2])/2
```
664 ms

### #2

也可以用双堆维护：
- 用两个堆 low、high 分别维护较小的一半和较大的一半
- low 为大顶堆，high 为小顶堆，并且保证 len(low)>=len(high)
- addNum 时
	- 先将元素添加到 low 中，弹出堆顶并添加到 high 中
	- 如果 len(low)<len(high)，就再弹出 high 堆顶添加到 low 中
- findMedian 时
	- 若 len(low)==len(high)，中位数等于 (max(low)+min(high))//2
	- 若 len(low)>len(high)，中位数等于 max(low)
        
addNum 时间复杂度 O(logN)，findMedian 时间复杂度 O(1)。

## 解答

```python
class MedianFinder:

    def __init__(self):
        self.low, self.high = [], []

    def addNum(self, num: int) -> None:
        heappush(self.high, -heappushpop(self.low, -num))
        if len(self.high) > len(self.low):
            heappush(self.low, -heappop(self.high))

    def findMedian(self) -> float:
        return (-self.low[0]+self.high[0]) / 2 if len(self.high) == len(self.low) else -self.low[0]
```
460 ms

