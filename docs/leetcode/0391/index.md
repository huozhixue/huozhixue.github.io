# 0391：完美矩形（★★）


> <u>**[力扣第 391 题](https://leetcode.cn/problems/perfect-rectangle/)**</u>

## 题目

<p>给你一个数组 <code>rectangles</code> ，其中 <code>rectangles[i] = [x<sub>i</sub>, y<sub>i</sub>, a<sub>i</sub>, b<sub>i</sub>]</code> 表示一个坐标轴平行的矩形。这个矩形的左下顶点是 <code>(x<sub>i</sub>, y<sub>i</sub>)</code> ，右上顶点是 <code>(a<sub>i</sub>, b<sub>i</sub>)</code> 。</p>

<p>如果所有矩形一起精确覆盖了某个矩形区域，则返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perectrec1-plane.jpg" style="height: 294px; width: 300px;" />
<pre>
<strong>输入：</strong>rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
<strong>输出：</strong>true
<strong>解释：</strong>5 个矩形一起可以精确地覆盖一个矩形区域。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perfectrec2-plane.jpg" style="height: 294px; width: 300px;" />
<pre>
<strong>输入：</strong>rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
<strong>输出：</strong>false
<strong>解释：</strong>两个矩形之间有间隔，无法覆盖成一个矩形。</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perfecrrec4-plane.jpg" style="height: 294px; width: 300px;" />
<pre>
<strong>输入：</strong>rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
<strong>输出：</strong>false
<strong>解释：</strong>因为中间有相交区域，虽然形成了矩形，但不是精确覆盖。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= rectangles.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>rectangles[i].length == 4</code></li>
<li><code>-10<sup>5</sup> &lt;= x<sub>i</sub>, y<sub>i</sub>, a<sub>i</sub>, b<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

- 精确覆盖即代表没有重叠、没有间隙，可以用扫描线算法
- 遍历边缘坐标 x，维护矩形的高度区间集合，如果该集合精确覆盖一个区间且一直不变，即说明是完美矩形
- 除了开头和结尾，只需要判断新增的和弹出的高度区间集合是否等价即可
- 合并区间类似 {{< lc "0056" >}}

```python
class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        def merge(A):
            res=[]
            for s,e in sorted(A):
                if not res or res[-1][1]<s:
                    res.append([s,e])
                elif res[-1][1]==s:
                    res[-1][1] = e
                else:
                    return 0
            return res
        d = defaultdict(lambda:defaultdict(list))
        for x,y,a,b in rectangles:
            d[x][0].append((y,b))
            d[a][1].append((y,b))
        for i,x in enumerate(sorted(d)):
            A,B = merge(d[x][0]),merge(d[x][1])
            if A==0 or B==0:
                return False
            if i==0 and len(A)!=1:
                return False
            if 0<i<len(d)-1 and A!=B:
                return False
        return True
```
90 ms

### #2

还可以用二维差分，最后不为 0 的只有 4 个点，且应该是两个 1，两个 -1。
## 解答


```python
class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        d = defaultdict(int)
        for x,y,a,b in rectangles:
            d[(x,y)] += 1
            d[(x,b)] -= 1
            d[(a,y)] -= 1
            d[(a,b)] += 1
        A = [v for v in d.values() if v!=0]
        return len(A)==4 and sorted(A)==[-1,-1,1,1]
```
88 ms

