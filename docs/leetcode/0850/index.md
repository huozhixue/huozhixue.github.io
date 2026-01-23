# 0850：矩形面积 II（2235 分）


> <u>**[力扣第 88 场周赛第 4 题](https://leetcode.cn/problems/rectangle-area-ii/)**</u>

## 题目

<p>给你一个轴对齐的二维数组 <code>rectangles</code> 。 对于 <code>rectangle[i] = [x1, y1, x2, y2]</code>，其中（x1，y1）是矩形 <code>i</code> 左下角的坐标，<meta charset="UTF-8" /> <code>(x<sub>i1</sub>, y<sub>i1</sub>)</code> 是该矩形 <strong>左下角</strong> 的坐标，<meta charset="UTF-8" /> <code>(x<sub>i2</sub>, y<sub>i2</sub>)</code> 是该矩形 <strong>右上角</strong> 的坐标。</p>

<p>计算平面中所有 <code>rectangles</code> 所覆盖的 <strong>总面积 </strong>。任何被两个或多个矩形覆盖的区域应只计算 <strong>一次</strong> 。</p>

<p>返回<em> <strong>总面积</strong> </em>。因为答案可能太大，返回<meta charset="UTF-8" /> <code>10<sup>9</sup> + 7</code> 的 <strong>模</strong> 。</p>



<p><strong class="example">示例 1：</strong></p>

<p><img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png" style="height: 360px; width: 480px;" /></p>

<pre>
<strong>输入：</strong>rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
<strong>输出：</strong>6
<strong>解释：</strong>如图所示，三个矩形覆盖了总面积为 6 的区域。
从(1,1)到(2,2)，绿色矩形和红色矩形重叠。
从(1,0)到(2,3)，三个矩形都重叠。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>rectangles = [[0,0,1000000000,1000000000]]
<strong>输出：</strong>49
<strong>解释：</strong>答案是 10<sup>18</sup> 对 (10<sup>9</sup> + 7) 取模的结果， 即 49 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= rectangles.length &lt;= 200</code></li>
<li><code>rectanges[i].length = 4</code><meta charset="UTF-8" /></li>
<li><code>0 &lt;= x<sub>i1</sub>, y<sub>i1</sub>, x<sub>i2</sub>, y<sub>i2</sub> &lt;= 10<sup>9</sup></code></li>
</ul>




## 分析

### #1

- 类似 {{< lc "0218" >}}，不过遍历坐标 x 时，要维护的不是高度集合，而是区间集合
- 每一轮根据当前横坐标 x2 、上一轮横坐标 x1，上一轮区间集合覆盖的长度 w，即可计算出 x1 到 x2 的面积


```python
from sortedcontainers import SortedList
mod = 10**9+7
class Solution:
    def rectangleArea(self, rectangles: List[List[int]]) -> int:
        def cal(A):
            res, end = 0, 0
            for s, e in A:
                res += max(end, e) - max(s, end)
                end = max(end, e)
            return res
        d = defaultdict(list)
        for x1,y1,x2,y2 in rectangles:
            d[x1].append((1,y1,y2))
            d[x2].append((0,y1,y2))
        res = 0
        H = SortedList()
        for x1,x2 in pairwise(sorted(d)):
            for flag,y1,y2 in d[x1]:
                if flag:
                    H.add((y1,y2))
                else:
                    H.remove((y1,y2))
            res += cal(H)*(x2-x1)
            res %= mod
        return res
```
时间复杂度 O(N^2)，15 ms

### #2

- 还可以用线段树维护区间覆盖的长度 w
- 直接维护覆盖的长度不好处理，一种方法是维护 区间的最小值 t 和 t 对应的长度 sz
	- 假如总区间的最小值 t>0，说明整个区间都被覆盖
	- 否则 t=0，覆盖的长度为总区间长度 s - (t 对应的 sz)

## 解答

```python
class Seg:
    def __init__(self,n):
        self.L = n.bit_length()
        self.N = N = 1<<self.L
        self.t = [0]*N*2
        self.f = [0]*N*2
        self.sz = [0]*N*2
        
    def apply(self,o,x):            
        self.t[o] += x
        self.f[o] += x

    def build(self,A):
        for i in range(len(A)-1):
            self.sz[self.N+i] = A[i+1]-A[i]
        for o in range(self.N-1,0,-1):
            self.pull(o)

    def pull(self,o):
        t,sz = self.t,self.sz
        t[o] = min(t[o*2],t[o*2+1])
        sz[o] = sz[o*2]*(t[o]==t[o*2])+sz[o*2+1]*(t[o]==t[o*2+1])

    def push(self,o):
        if self.f[o] != self.f[0]:
            self.apply(o*2,self.f[o])
            self.apply(o*2+1,self.f[o])
            self.f[o] = self.f[0]

    def modify(self,a,b,x):
        a,b = a+self.N-1,b+self.N+1  
        for i in range(self.L,0,-1):  
            self.push(a>>i)  
            self.push(b>>i)  
        while a^b^1:  
            if not a&1: self.apply(a^1,x)  
            if b&1: self.apply(b^1,x)  
            a,b = a>>1,b>>1  
            self.pull(a)  
            self.pull(b)  
        while a>>1:
            a >>= 1
            self.pull(a)
    
mod = 10**9+7
class Solution:
    def rectangleArea(self, rectangles: List[List[int]]) -> int:
        d = defaultdict(list)
        V = sorted({y for _,y1,_,y2 in rectangles for y in [y1,y2]})
        mp = {y:i for i,y in enumerate(V)}
        for x1,y1,x2,y2 in rectangles:
            y1,y2 = mp[y1],mp[y2]-1
            d[x1].append((y1,y2,1))
            d[x2].append((y1,y2,-1))
        res = 0
        seg = Seg(len(V)-1)
        seg.build(V)
        for x1,x2 in pairwise(sorted(d)):
            for y1,y2,flag in d[x1]:
                seg.modify(y1,y2,flag)
            w = V[-1]-V[0]-(seg.sz[1] if seg.t[1]==0 else 0)
            res += w*(x2-x1)
            res %= mod
        return res
```
19 ms



