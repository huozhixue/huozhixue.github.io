# 0149：直线上最多的点数（★★）


> <u>**[力扣第 149 题](https://leetcode.cn/problems/max-points-on-a-line/)**</u>

## 题目

<p>给你一个数组 <code>points</code> ，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 表示 <strong>X-Y</strong> 平面上的一个点。求最多有多少个点在同一条直线上。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg" style="width: 300px; height: 294px;" />
<pre>
<strong>输入：</strong>points = [[1,1],[2,2],[3,3]]
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg" style="width: 300px; height: 294px;" />
<pre>
<strong>输入：</strong>points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
<strong>输出：</strong>4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= points.length <= 300</code></li>
<li><code>points[i].length == 2</code></li>
<li><code>-10<sup>4</sup> <= x<sub>i</sub>, y<sub>i</sub> <= 10<sup>4</sup></code></li>
<li><code>points</code> 中的所有点 <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [0356：直线镜像](/leetcode/0356)
- [2152：穿过所有点的所需最少直线数量](/leetcode/2152)
- [2280：表示一个折线图的最少线段数（1680 分）](/leetcode/2280)


## 分析

- 本题可能有重复点，因此考虑按点遍历更方便：
	- 对于每个点，首先统计重复个数 same
	- 然后将其它点按斜率分组
	- 最大的组大小加上 same 即可
- 考虑到精度问题，可以用最简分数来表示斜率，注意不存在斜率的特殊情况

## 解答

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        def cal(x,y):
            if y==0:
                return (1,0)
            if y<0:
                x,y = -x,-y
            a = gcd(x,y)
            return (x//a,y//a)
        res = 0
        for a in points:
            same = points.count(a)
            ct = Counter(cal(b[0]-a[0],b[1]-a[1]) for b in points if b!=a)
            res = max(res,max(ct.values(),default=0)+same)
        return res
```
51 ms

