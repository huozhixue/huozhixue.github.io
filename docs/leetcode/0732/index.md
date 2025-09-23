# 0732：我的日程安排表 III（★★）


> <u>**[力扣第 732 题](https://leetcode.cn/problems/my-calendar-iii/)**</u>

## 题目

<p>当 <code>k</code> 个日程存在一些非空交集时（即, <code>k</code> 个日程包含了一些相同时间），就会产生 <code>k</code> 次预订。</p>

<p>给你一些日程安排 <code>[startTime, endTime)</code> ，请你在每个日程安排添加后，返回一个整数 <code>k</code> ，表示所有先前日程安排会产生的最大 <code>k</code> 次预订。</p>

<p>实现一个 <code>MyCalendarThree</code> 类来存放你的日程安排，你可以一直添加新的日程安排。</p>

<ul>
<li><code>MyCalendarThree()</code> 初始化对象。</li>
<li><code>int book(int startTime, int endTime)</code> 返回一个整数 <code>k</code> ，表示日历中存在的 <code>k</code> 次预订的最大值。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
<strong>输出：</strong>
[null, 1, 1, 2, 3, 3, 3]

<strong>解释：</strong>
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // 返回 1 ，第一个日程安排可以预订并且不存在相交，所以最大 k 次预订是 1 次预订。
myCalendarThree.book(50, 60); // 返回 1 ，第二个日程安排可以预订并且不存在相交，所以最大 k 次预订是 1 次预订。
myCalendarThree.book(10, 40); // 返回 2 ，第三个日程安排 [10, 40) 与第一个日程安排相交，所以最大 k 次预订是 2 次预订。
myCalendarThree.book(5, 15); // 返回 3 ，剩下的日程安排的最大 k 次预订是 3 次预订。
myCalendarThree.book(5, 10); // 返回 3
myCalendarThree.book(25, 55); // 返回 3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= startTime &lt; endTime &lt;= 10<sup>9</sup></code></li>
<li>每个测试用例，调用 <code>book</code> 函数最多不超过 <code>400</code>次</li>
</ul>


**相似问题：**
- [0729：我的日程安排表 I](/leetcode/0729)
- [0731：我的日程安排表 II](/leetcode/0731)
- [2276：统计区间中的整数数目（2222 分）](/leetcode/2276)


## 分析

### #1 

查询次数较小，可以直接用差分。

```python
class MyCalendarThree:
    def __init__(self):
        self.d = defaultdict(int)

    def book(self, start: int, end: int) -> int:
        d = self.d
        d[start] += 1
        d[end] -= 1
        return max(accumulate(d[x] for x in sorted(d)))
```
674 ms

### #2

也可以用珂朵莉树

```python
from sortedcontainers import SortedList
def split(sl,x):
    i = sl.bisect_left((x,))
    if i<len(sl) and sl[i][0]==x:
        return i
    l,r,v = sl.pop(i-1)
    sl.add((l,x-1,v))
    sl.add((x,r,v))
    return i
    
class MyCalendarThree:

    def __init__(self):
        self.sl = SortedList([(0,10**9,0)])
        self.s = 0
        
    def book(self, startTime: int, endTime: int) -> int:
        sl = self.sl
        i,j = split(sl,startTime),split(sl,endTime)
        for k in range(j-1,i-1,-1):
            l,r,v = sl.pop(k)
            sl.add((l,r,v+1))
            self.s = max(self.s,v+1)
        return self.s
```
204 ms

### #3

- 更通用的是线段树，区间修改并查询
- 值域很大且在线，只能用动态开点
## 解答


```python
class Seg:
    def __init__(self,n):
        self.t = defaultdict(int)
        self.f = defaultdict(int)
        self.n = n

    def apply(self,o,x):            
        self.t[o] += x
        self.f[o] += x

    def merge(self,a,b):           
        return max(a,b)

    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def push(self,o):
        if self.f[o] != self.f[0]:
            self.apply(o*2,self.f[o])
            self.apply(o*2+1,self.f[o])
            self.f[o] = self.f[0]

    def modify(self,a,b,x,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            self.apply(o,x)
            return
        self.push(o)
        m = (l+r)//2
        if a<=m: self.modify(a,b,x,o*2,l,m)
        if m<b: self.modify(a,b,x,o*2+1,m+1,r)
        self.pull(o)
    
class MyCalendarThree:
    def __init__(self):
        self.seg = Seg(10**9+1)

    def book(self, start: int, end: int) -> int:
        self.seg.modify(start,end-1,1)
        return self.seg.t[1]
```
809 ms
