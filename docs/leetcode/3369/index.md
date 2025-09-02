# 3369：设计数组统计跟踪器（★★）


> <u>**[力扣第 3369 题](https://leetcode.cn/problems/design-an-array-statistics-tracker/)**</u>

## 题目

<p>设计一个数据结构来跟踪它其中的值，并回答一些有关其平均值、中位数和众数的询问。</p>

<p>实现 <code>StatisticsTracker</code> 类。</p>

<ul>
<li><code>StatisticsTracker()</code>：用空数组初始化 <code>StatisticsTracker</code> 对象。</li>
<li><code>void addNumber(int number)</code>：将 <code>number</code> 添加到数据结构中。</li>
<li><code>void removeFirstAddedNumber()</code>：从数据结构删除最早添加的数字。</li>
<li><code>int getMean()</code>：返回数据结构中数字向下取整的 <strong>平均值</strong>。</li>
<li><code>int getMedian()</code>：返回数据结构中数字的 <strong>中位数</strong>。</li>
<li><code>int getMode()</code>：返回数据结构中数字的 <strong>众数</strong>。如果有多个众数，返回最小的那个。</li>
</ul>

<p><b>注意：</b></p>

<ul>
<li>数组的 <strong>平均值</strong> 是所有值的和除以数组中值的数量。</li>
<li>数组的 <strong>中位数</strong> 是在非递减顺序排序后数组的中间元素。如果中位数有两个选择，则取两个值中较大的一个。</li>
<li>数组的 <strong>众数</strong> 是数组中出现次数最多的元素。</li>
</ul>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><br />
<span class="example-io">["StatisticsTracker", "addNumber", "addNumber", "addNumber", "addNumber", "getMean", "getMedian", "getMode", "removeFirstAddedNumber", "getMode"]<br />
[[], [4], [4], [2], [3], [], [], [], [], []]</span></p>

<p><strong>输出：</strong><br />
<span class="example-io">[null, null, null, null, null, 3, 4, 4, null, 2] </span></p>

<p><strong>解释：</strong></p>
StatisticsTracker statisticsTracker = new StatisticsTracker();<br />
statisticsTracker.addNumber(4); // 现在数据结构中有 [4]<br />
statisticsTracker.addNumber(4); // 现在数据结构中有 [4, 4]<br />
statisticsTracker.addNumber(2); // 现在数据结构中有 [4, 4, 2]<br />
statisticsTracker.addNumber(3); // 现在数据结构中有 [4, 4, 2, 3]<br />
statisticsTracker.getMean(); // return 3<br />
statisticsTracker.getMedian(); // return 4<br />
statisticsTracker.getMode(); // return 4<br />
statisticsTracker.removeFirstAddedNumber(); // 现在数据结构中有 [4, 2, 3]<br />
statisticsTracker.getMode(); // return 2</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><br />
<span class="example-io">["StatisticsTracker", "addNumber", "addNumber", "getMean", "removeFirstAddedNumber", "addNumber", "addNumber", "removeFirstAddedNumber", "getMedian", "addNumber", "getMode"]<br />
[[], [9], [5], [], [], [5], [6], [], [], [8], []]</span></p>

<p><strong>输出：</strong><br />
<span class="example-io">[null, null, null, 7, null, null, null, null, 6, null, 5] </span></p>

<p><strong>解释：</strong></p>
StatisticsTracker statisticsTracker = new StatisticsTracker();<br />
statisticsTracker.addNumber(9); // 现在数据结构中有 [9]<br />
statisticsTracker.addNumber(5); // 现在数据结构中有 [9, 5]<br />
statisticsTracker.getMean(); // return 7<br />
statisticsTracker.removeFirstAddedNumber(); // 现在数据结构中有 [5]<br />
statisticsTracker.addNumber(5); // 现在数据结构中有 [5, 5]<br />
statisticsTracker.addNumber(6); // 现在数据结构中有 [5, 5, 6]<br />
statisticsTracker.removeFirstAddedNumber(); // 现在数据结构中有 [5, 6]<br />
statisticsTracker.getMedian(); // return 6<br />
statisticsTracker.addNumber(8); // 现在数据结构中有 [5, 6, 8]<br />
statisticsTracker.getMode(); // return 5</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= number &lt;= 10<sup>9</sup></code></li>
<li><code>addNumber</code>，<code>removeFirstAddedNumber</code>，<code>getMean</code>，<code>getMedian</code> 和 <code>getMode</code> 的总调用次数最多为 <code>10<sup>5</sup></code>。</li>
<li><code>removeFirstAddedNumber</code>，<code>getMean</code>，<code>getMedian</code> 和 <code>getMode</code> 只会在数据结构中至少有一个元素时被调用。</li>
</ul>




## 分析

- 队列维护数的添加删除顺序
- 有序集合维护数的中位数
- 哈希表维护每个数字的频数
- 另一个有序集合维护 <频数、数> 的对，次数相同时要返回最小的数，因此维护 <频数、数的负>

## 解答


```python
from sortedcontainers import SortedList
class StatisticsTracker:

    def __init__(self):
        self.A = deque()
        self.sl = SortedList()
        self.ct = defaultdict(int)
        self.sl2 = SortedList()
        self.s = 0
        
    def addNumber(self, number: int) -> None:
        self.A.append(number)
        self.sl.add(number)
        self.s += number
        w = self.ct[number]
        if w:
            self.sl2.remove((w,-number))
        self.ct[number] = w+1
        self.sl2.add((w+1,-number))

    def removeFirstAddedNumber(self) -> None:
        x = self.A.popleft()
        self.sl.remove(x)
        self.s -= x
        w = self.ct[x]
        self.sl2.remove((w,-x))
        self.ct[x] -= 1
        if w>1:
            self.sl2.add((w-1,-x))
        
    def getMean(self) -> int:
        return self.s//len(self.A)
        
    def getMedian(self) -> int:
        n = len(self.sl)
        return self.sl[n//2]

    def getMode(self) -> int:
        return -self.sl2[-1][1]
```
1120 ms
