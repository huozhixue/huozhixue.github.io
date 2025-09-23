# 2276：统计区间中的整数数目（2222 分）


> <u>**[力扣第 293 场周赛第 4 题](https://leetcode.cn/problems/count-integers-in-intervals/)**</u>

## 题目

<p>给你区间的 <strong>空</strong> 集，请你设计并实现满足要求的数据结构：</p>

<ul>
<li><strong>新增：</strong>添加一个区间到这个区间集合中。</li>
<li><strong>统计：</strong>计算出现在 <strong>至少一个</strong> 区间中的整数个数。</li>
</ul>

<p>实现 <code>CountIntervals</code> 类：</p>

<ul>
<li><code>CountIntervals()</code> 使用区间的空集初始化对象</li>
<li><code>void add(int left, int right)</code> 添加区间 <code>[left, right]</code> 到区间集合之中。</li>
<li><code>int count()</code> 返回出现在 <strong>至少一个</strong> 区间中的整数个数。</li>
</ul>

<p><strong>注意：</strong>区间 <code>[left, right]</code> 表示满足 <code>left &lt;= x &lt;= right</code> 的所有整数 <code>x</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>
["CountIntervals", "add", "add", "count", "add", "count"]
[[], [2, 3], [7, 10], [], [5, 8], []]
<strong>输出</strong>
[null, null, null, 6, null, 8]

<strong>解释</strong>
CountIntervals countIntervals = new CountIntervals(); // 用一个区间空集初始化对象
countIntervals.add(2, 3);  // 将 [2, 3] 添加到区间集合中
countIntervals.add(7, 10); // 将 [7, 10] 添加到区间集合中
countIntervals.count();    // 返回 6
// 整数 2 和 3 出现在区间 [2, 3] 中
// 整数 7、8、9、10 出现在区间 [7, 10] 中
countIntervals.add(5, 8);  // 将 [5, 8] 添加到区间集合中
countIntervals.count();    // 返回 8
// 整数 2 和 3 出现在区间 [2, 3] 中
// 整数 5 和 6 出现在区间 [5, 8] 中
// 整数 7 和 8 出现在区间 [5, 8] 和区间 [7, 10] 中
// 整数 9 和 10 出现在区间 [7, 10] 中</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= left &lt;= right &lt;= 10<sup>9</sup></code></li>
<li>最多调用  <code>add</code> 和 <code>count</code> 方法 <strong>总计</strong> <code>10<sup>5</sup></code> 次</li>
<li>调用 <code>count</code> 方法至少一次</li>
</ul>


**相似问题：**
- [0056：合并区间](/leetcode/0056)
- [0057：插入区间](/leetcode/0057)
- [0352：将数据流变为多个不相交区间](/leetcode/0352)
- [0732：我的日程安排表 III](/leetcode/0732)


## 分析

### #1

- 区间修改、区间查询，可以用线段树
- 值域很大且在线查询，用动态开点

```python
class Seg:
    def __init__(self,n):
        self.t = defaultdict(int)
        self.f = defaultdict(int)
        self.n = n

    def apply(self,o,x,l,r):            
        self.t[o] = x*(r-l+1)
        self.f[o] = x

    def merge(self,a,b):           
        return a+b

    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def push(self,o,l,m,r):
        if self.f[o] != self.f[0]:
            self.apply(o*2,self.f[o],l,m)
            self.apply(o*2+1,self.f[o],m+1,r)
            self.f[o] = self.f[0]

    def modify(self,a,b,x,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            self.apply(o,x,l,r)
            return
        m = (l+r)//2
        self.push(o,l,m,r)
        if a<=m: self.modify(a,b,x,o*2,l,m)
        if m<b: self.modify(a,b,x,o*2+1,m+1,r)
        self.pull(o)
        

class CountIntervals:

    def __init__(self):
        self.seg = Seg(10**9+1)

    def add(self, left: int, right: int) -> None:
        self.seg.modify(left,right,1)

    def count(self) -> int:
        return self.seg.t[1]
```
6449 ms

### #2

区间赋相同值，可以用珂朵莉树
## 解答


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

class CountIntervals:

    def __init__(self):
        self.sl = SortedList([(1,10**9,0)])
        self.s = 0

    def add(self, left: int, right: int) -> None:
        sl = self.sl
        i,j = split(sl,left),split(sl,right+1)
        for k in range(j-1,i-1,-1):
            a,b,v = sl.pop(k)
            if not v:
                self.s += b-a+1
        if i<len(sl) and sl[i][2]==1:
            right = sl.pop(i)[1]
        if i>0 and sl[i-1][2]==1:
            left = sl.pop(i-1)[0]
        sl.add((left,right,1))

    def count(self) -> int:
        return self.s
```
895 ms
