# 0715：Range 模块（★★）


> <u>**[力扣第 715 题](https://leetcode.cn/problems/range-module/)**</u>

## 题目

<p>Range模块是跟踪数字范围的模块。设计一个数据结构来跟踪表示为 <strong>半开区间</strong> 的范围并查询它们。</p>

<p><strong>半开区间</strong> <code>[left, right)</code> 表示所有 <code>left &lt;= x &lt; right</code> 的实数 <code>x</code> 。</p>

<p>实现 <code>RangeModule</code> 类:</p>

<ul>
<li><code>RangeModule()</code> 初始化数据结构的对象。</li>
<li><code>void addRange(int left, int right)</code> 添加 <strong>半开区间</strong> <code>[left, right)</code>，跟踪该区间中的每个实数。添加与当前跟踪的数字部分重叠的区间时，应当添加在区间 <code>[left, right)</code> 中尚未跟踪的任何数字到该区间中。</li>
<li><code>boolean queryRange(int left, int right)</code> 只有在当前正在跟踪区间 <code>[left, right)</code> 中的每一个实数时，才返回 <code>true</code> ，否则返回 <code>false</code> 。</li>
<li><code>void removeRange(int left, int right)</code> 停止跟踪 <strong>半开区间</strong> <code>[left, right)</code> 中当前正在跟踪的每个实数。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
<strong>输出</strong>
[null, null, null, true, false, true]

<strong>解释</strong>
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); 返回 true （区间 [10, 14) 中的每个数都正在被跟踪）
rangeModule.queryRange(13, 15); 返回 false（未跟踪区间 [13, 15) 中像 14, 14.03, 14.17 这样的数字）
rangeModule.queryRange(16, 17); 返回 true （尽管执行了删除操作，区间 [16, 17) 中的数字 16 仍然会被跟踪）
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= left &lt; right &lt;= 10<sup>9</sup></code></li>
<li>在单个测试用例中，对 <code>addRange</code> 、  <code>queryRange</code> 和 <code>removeRange</code> 的调用总数不超过 <code>10<sup>4</sup></code> 次</li>
</ul>


**相似问题：**
- [0056：合并区间](/leetcode/0056)
- [0057：插入区间](/leetcode/0057)
- [0352：将数据流变为多个不相交区间](/leetcode/0352)


## 分析

### #1

- 区间修改，区间查询，典型的线段树应用
- 值域很大且在线查询，只能用动态开点

```python
class Seg:
    def __init__(self,n):
        self.t = defaultdict(int)
        self.f = defaultdict(lambda:-1)
        self.n = n

    def apply(self,o,x):            
        self.t[o] = x
        self.f[o] = x

    def merge(self,a,b):           
        return a&b

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
        
    def query(self,a,b,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        self.push(o)
        res = 1
        m = (l+r)//2
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return bool(res)

class RangeModule:

    def __init__(self):
        self.seg = Seg(10**9+1)

    def addRange(self, left: int, right: int) -> None:
        self.seg.modify(left,right-1,1)

    def queryRange(self, left: int, right: int) -> bool:
        return self.seg.query(left,right-1)

    def removeRange(self, left: int, right: int) -> None:
        self.seg.modify(left,right-1,0)
```
4806 ms

### #2

- 类似 {{< lc "0699" >}}，可以用珂朵莉树

## 解答


```python
def split(sl,x):
    i = sl.bisect_left((x,))
    if i<len(sl) and sl[i][0]==x:
        return i
    l,r,v = sl.pop(i-1)
    sl.add((l,x-1,v))
    sl.add((x,r,v))
    return i

def update(sl,l,r,x):
    i,j = split(sl,l),split(sl,r+1)
    for k in range(j-1,i-1,-1):
        sl.pop(k)
    sl.add((l,r,x))

class RangeModule:

    def __init__(self):
        from sortedcontainers import SortedList
        self.sl = SortedList([(1,10**9,0)])
        
    def addRange(self, left: int, right: int) -> None:
        update(self.sl,left,right-1,1)
        
    def queryRange(self, left: int, right: int) -> bool:
        sl = self.sl
        i,j = split(sl,left),split(sl,right)
        return all(sl[k][2]==1 for k in range(i,j))

    def removeRange(self, left: int, right: int) -> None:
        update(self.sl,left,right-1,0)
```
754 ms
