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

区间修改，区间查询，典型的线段树应用

```python
class RangeModule:

    def __init__(self):
        self.t = defaultdict(int)
        self.f = defaultdict(lambda:-1)
    
    def do(self,o,x):
        self.t[o] = x
        self.f[o] = x
    
    def down(self,o):
        if self.f[o]!=-1:
            self.do(o*2,self.f[o])
            self.do(o*2+1,self.f[o])
            self.f[o] = -1

    def update(self,a,b,x,o,l,r):
        if a<=l and r<=b:
            self.do(o,x)
            return 
        m = (l+r)//2
        self.down(o)
        if a<=m: self.update(a,b,x,o*2,l,m)
        if m<b: self.update(a,b,x,o*2+1,m+1,r)
        self.t[o] = self.t[o*2]&self.t[o*2+1]

    def query(self,a,b,o,l,r):
        if a<=l and r<=b:
            return self.t[o]
        m = (l+r)//2
        self.down(o)
        res = 1
        if a<=m: res &= self.query(a,b,o*2,l,m)
        if m<b: res &= self.query(a,b,o*2+1,m+1,r)
        return res

    def addRange(self, left: int, right: int) -> None:
        self.update(left,right-1,1,1,1,10**9)
        
    def queryRange(self, left: int, right: int) -> bool:
        return bool(self.query(left,right-1,1,1,10**9))
        
    def removeRange(self, left: int, right: int) -> None:
        self.update(left,right-1,0,1,1,10**9)
```
4460 ms

### #2

- 类似 {{< lc "0699" >}}，可以用有序集合维护高度的轮廓线
- 注意连续的相同高度的线段必须合并，保证查询只需要 logN 的时间

```python
class RangeModule:

    def __init__(self):
        from sortedcontainers import SortedList
        self.sl = SortedList()

    def addRange(self, left: int, right: int) -> None:
        sl = self.sl
        i = sl.bisect_left((left,))
        j = sl.bisect_left((right+1,))
        if j==len(sl) or sl[j][1]==1:
            sl.add((right,0))
        del sl[i:j]
        if i==0 or sl[i-1][1]==0:
            sl.add((left,1))

    def queryRange(self, left: int, right: int) -> bool:
        sl = self.sl
        i = sl.bisect_left((left+1,))-1
        return i>=0 and sl[i][1]==1 and sl[i+1][0]>=right
        
    def removeRange(self, left: int, right: int) -> None:
        sl = self.sl
        i = sl.bisect_left((left,))
        j = sl.bisect_left((right+1,))
        if j<len(sl) and sl[j][1]==0:
            sl.add((right,1))
        del sl[i:j]
        if i and sl[i-1][1]==1:
            sl.add((left,0))
```
183 ms

### #3

- 因为本题高度只能是 0 或 1，所以直接根据下标的奇偶性即可判断
- 集合中的偶数下标代表 1 的开始，奇数下标代表 0 的开始，无需保存高度

## 解答


```python
class RangeModule:

    def __init__(self):
        from sortedcontainers import SortedList
        self.sl = SortedList()

    def addRange(self, left: int, right: int) -> None:
        sl = self.sl
        i = sl.bisect_left(left)
        j = sl.bisect_left(right+1)
        if j%2==0:
            sl.add(right)
        del sl[i:j]
        if i%2==0:
            sl.add(left)

    def queryRange(self, left: int, right: int) -> bool:
        sl = self.sl
        i = sl.bisect_left(left+1)-1
        return i%2==0 and sl[i+1]>=right

    def removeRange(self, left: int, right: int) -> None:
        sl = self.sl
        i = sl.bisect_left(left)
        j = sl.bisect_left(right+1)
        if j%2 and j<len(sl):
            sl.add(right)
        del sl[i:j]
        if i%2:
            sl.add(left)
```
108 ms
