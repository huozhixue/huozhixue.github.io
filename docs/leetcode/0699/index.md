# 0699：掉落的方块（★★）


> <u>**[力扣第 699 题](https://leetcode.cn/problems/falling-squares/)**</u>

## 题目

<p>在二维平面上的 x 轴上，放置着一些方块。</p>

<p>给你一个二维整数数组 <code>positions</code> ，其中 <code>positions[i] = [left<sub>i</sub>, sideLength<sub>i</sub>]</code> 表示：第 <code>i</code> 个方块边长为 <code>sideLength<sub>i</sub></code> ，其左侧边与 x 轴上坐标点 <code>left<sub>i</sub></code> 对齐。</p>

<p>每个方块都从一个比目前所有的落地方块更高的高度掉落而下。方块沿 y 轴负方向下落，直到着陆到 <strong>另一个正方形的顶边</strong> 或者是 <strong>x 轴上</strong> 。一个方块仅仅是擦过另一个方块的左侧边或右侧边不算着陆。一旦着陆，它就会固定在原地，无法移动。</p>

<p>在每个方块掉落后，你必须记录目前所有已经落稳的 <strong>方块堆叠的最高高度</strong> 。</p>

<p>返回一个整数数组 <code>ans</code> ，其中 <code>ans[i]</code> 表示在第 <code>i</code> 块方块掉落后堆叠的最高高度。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/fallingsq1-plane.jpg" style="width: 500px; height: 505px;" />
<pre>
<strong>输入：</strong>positions = [[1,2],[2,3],[6,1]]
<strong>输出：</strong>[2,5,5]
<strong>解释：</strong>
第 1 个方块掉落后，最高的堆叠由方块 1 组成，堆叠的最高高度为 2 。
第 2 个方块掉落后，最高的堆叠由方块 1 和 2 组成，堆叠的最高高度为 5 。
第 3 个方块掉落后，最高的堆叠仍然由方块 1 和 2 组成，堆叠的最高高度为 5 。
因此，返回 [2, 5, 5] 作为答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>positions = [[100,100],[200,100]]
<strong>输出：</strong>[100,100]
<strong>解释：</strong>
第 1 个方块掉落后，最高的堆叠由方块 1 组成，堆叠的最高高度为 100 。
第 2 个方块掉落后，最高的堆叠可以由方块 1 组成也可以由方块 2 组成，堆叠的最高高度为 100 。
因此，返回 [100, 100] 作为答案。
注意，方块 2 擦过方块 1 的右侧边，但不会算作在方块 1 上着陆。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= positions.length &lt;= 1000</code></li>
<li><code>1 &lt;= left<sub>i</sub> &lt;= 10<sup>8</sup></code></li>
<li><code>1 &lt;= sideLength<sub>i</sub> &lt;= 10<sup>6</sup></code></li>
</ul>


**相似问题：**
- [0218：天际线问题](/leetcode/0218)


## 分析

### #1

- 需要区间修改、区间查询，是线段树的典型应用
- 值域范围较大，需要离散化
- 维护区间最大值即可


```python
class Seg:
    def __init__(self,n):
        N = 1<<n.bit_length()
        self.t = [0]*N*2
        self.f = [0]*N*2
        self.n = n

    def apply(self,o,x):            
        self.t[o] = x
        self.f[o] = x

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
        
    def query(self,a,b,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        self.push(o)
        res = 0
        m = (l+r)//2
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return res

class Solution:
    def fallingSquares(self, positions: List[List[int]]) -> List[int]:
        A = sorted({x for l,w in positions for x in [l,l+w-1]})
        d = {x:i for i,x in enumerate(A)}
        n = len(A)
        seg = Seg(n)
        res = []
        for l,w in positions:
            r = l+w-1
            l,r = d[l],d[r]
            x = w+seg.query(l,r)
            seg.modify(l,r,x)
            res.append(seg.t[1])
        return res
```
110 ms

### #2

区间赋相同值的操作，还可以用珂朵莉树

## 解答

```python
class Solution:
    def fallingSquares(self, positions: List[List[int]]) -> List[int]:
        from sortedcontainers import SortedList
        def split(x):
            i = sl.bisect_left((x,))
            if i<len(sl) and sl[i][0]==x:
                return i
            l,r,v = sl.pop(i-1)
            sl.add((l,x-1,v))
            sl.add((x,r,v))
            return i

        sl = SortedList([(0,10**9,0)])
        res,ma = [],0
        for l,w in positions:
            r = l+w-1
            i = split(l)
            j = split(r+1)
            h = 0
            for k in range(j-1,i-1,-1):
                h = max(h,sl.pop(k)[2])
            sl.add((l,r,h+w))
            ma = max(ma,h+w)
            res.append(ma)
        return res
```
63 ms
