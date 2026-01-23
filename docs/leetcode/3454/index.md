# 3454：分割正方形 II（2671 分）


> <u>**[力扣第 150 场双周赛第 3 题](https://leetcode.cn/problems/separate-squares-ii/)**</u>

## 题目

<p>给你一个二维整数数组 <code>squares</code> ，其中 <code>squares[i] = [x<sub>i</sub>, y<sub>i</sub>, l<sub>i</sub>]</code> 表示一个与 x 轴平行的正方形的左下角坐标和正方形的边长。</p>

<p>找到一个<strong>最小的</strong> y 坐标，它对应一条水平线，该线需要满足它以上正方形的总面积 <strong>等于</strong> 该线以下正方形的总面积。</p>

<p>答案如果与实际答案的误差在 <code>10<sup>-5</sup></code> 以内，将视为正确答案。</p>

<p><strong>注意</strong>：正方形 <strong>可能会 </strong>重叠。重叠区域只 <strong>统计一次 </strong>。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong> <span class="example-io">squares = [[0,0,1],[2,2,1]]</span></p>

<p><strong>输出：</strong> <span class="example-io">1.00000</span></p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://pic.leetcode.cn/1739609602-zhNmeC-4065example1drawio.png" style="width: 269px; height: 203px;" /></p>

<p>任何在 <code>y = 1</code> 和 <code>y = 2</code> 之间的水平线都会有 1 平方单位的面积在其上方，1 平方单位的面积在其下方。最小的 y 坐标是 1。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong> <span class="example-io">squares = [[0,0,2],[1,1,1]]</span></p>

<p><strong>输出：</strong> <span class="example-io">1.00000</span></p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://pic.leetcode.cn/1739609605-ezeVgk-4065example2drawio.png" style="width: 269px; height: 203px;" /></p>

<p>由于蓝色正方形和红色正方形有重叠区域且重叠区域只统计一次。所以直线 <code>y = 1</code> 将正方形分割成两部分且面积相等。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= squares.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>squares[i] = [x<sub>i</sub>, y<sub>i</sub>, l<sub>i</sub>]</code></li>
<li><code>squares[i].length == 3</code></li>
<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= l<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li>所有正方形的总面积不超过 <code>10<sup>15</sup></code>。</li>
</ul>


**相似问题：**
- [0850：矩形面积 II（2235 分）](/leetcode/0850)


## 分析

### #1

- {{< lc "3453" >}} 进阶版，同样可以采用扫描线的方法
- 区别在于重叠区域只算一次，需要用数据结构维护扫描时的区域大小
- 这个问题类似 {{< lc "0850" >}}，可以用有序集合维护

```python []
from sortedcontainers import SortedList
class Solution:
    def separateSquares(self, squares: List[List[int]]) -> float:
        def cal(sl):
            res,e = 0,0
            for l,r in sl:
                if r>e:
                    res += r-max(l,e)
                    e = r
            return res
        d = defaultdict(list)
        for x,y,l in squares:
            d[y].append((1,x,x+l))
            d[y+l].append((0,x,x+l))
        s = 0
        sl = SortedList()
        for y1,y2 in pairwise(sorted(d)):
            for flag,x1,x2 in d[y1]:
                if flag:
                    sl.add((x1,x2))
                else:
                    sl.remove((x1,x2))
            s += cal(sl)*(y2-y1)
        t = 0
        sl = SortedList()
        for y1,y2 in pairwise(sorted(d)):
            for flag,x1,x2 in d[y1]:
                if flag:
                    sl.add((x1,x2))
                else:
                    sl.remove((x1,x2))
            w = cal(sl)
            t += w*(y2-y1)
            if t*2>=s:
                return y2-(t*2-s)/2/w
```
808 ms

### #2

- 也可以用线段树维护，时间复杂度更优

## 解答

```python []
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

class Solution:
    def separateSquares(self, squares: List[List[int]]) -> float:
        V = sorted({a for x,y,l in squares for a in [x,x+l]})
        mp = {a:i for i,a in enumerate(V)}
        d = defaultdict(list)
        for x,y,l in squares:
            x1,x2 = mp[x],mp[x+l]-1
            d[y].append((x1,x2,1))
            d[y+l].append((x1,x2,-1))
        s = 0
        seg = Seg(len(V)-1)
        seg.build(V)
        for y1,y2 in pairwise(sorted(d)):
            for x1,x2,flag in d[y1]:
                seg.modify(x1,x2,flag)
            w = V[-1]-V[0]-(seg.sz[1] if seg.t[1]==0 else 0)
            s += w*(y2-y1)
        t = 0
        seg = Seg(len(V)-1)
        seg.build(V)
        for y1,y2 in pairwise(sorted(d)):
            for x1,x2,flag in d[y1]:
                seg.modify(x1,x2,flag)
            w = V[-1]-V[0]-(seg.sz[1] if seg.t[1]==0 else 0)
            t += w*(y2-y1)
            if t*2>=s:
                return y2-(t*2-s)/2/w
```
4765 ms

