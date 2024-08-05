# 0539：最小时间差（★）


> <u>**[力扣第 539 题](https://leetcode.cn/problems/minimum-time-difference/)**</u>

## 题目

<p>给定一个 24 小时制（小时:分钟 <strong>"HH:MM"</strong>）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>timePoints = ["23:59","00:00"]
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>timePoints = ["00:00","23:59","00:00"]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= timePoints.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>timePoints[i]</code> 格式为 <strong>"HH:MM"</strong></li>
</ul>


**相似问题：**
- [2162：设置时间的最少代价（1851 分）](/leetcode/2162)


## 分析

### #1

- 统一转为分钟数，求相邻最小差值即可
- 注意相当于循环数组，考虑首减去尾的情况
```python
class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        A = []
        for t in timePoints:
            h,m = map(int,t.split(':'))
            A.append(h*60+m)
        A.sort()
        return min(min(b-a for a,b in pairwise(A)),A[0]+1440-A[-1])
```
69 ms

### #2

分钟数最多 1440 种，因此 n>1440 时必然有重复，返回 0 即可。
## 解答


```python
class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        if len(timePoints)>1440:
            return 0
        A = []
        for t in timePoints:
            h,m = map(int,t.split(':'))
            A.append(h*60+m)
        A.sort()
        return min(min(b-a for a,b in pairwise(A)),A[0]+1440-A[-1])
```
32 ms
