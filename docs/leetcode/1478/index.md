# 1478：安排邮筒（2190 分）


> <u>**[力扣第 28 场双周赛第 4 题](https://leetcode.cn/problems/allocate-mailboxes/)**</u>

## 题目

<p>给你一个房屋数组<code>houses</code> 和一个整数 <code>k</code> ，其中 <code>houses[i]</code> 是第 <code>i</code> 栋房子在一条街上的位置，现需要在这条街上安排 <code>k</code> 个邮筒。</p>

<p>请你返回每栋房子与离它最近的邮筒之间的距离的 <strong>最小 </strong>总和。</p>

<p>答案保证在 32 位有符号整数范围以内。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/06/13/sample_11_1816.png" style="height: 154px; width: 454px;"></p>

<pre><strong>输入：</strong>houses = [1,4,8,10,20], k = 3
<strong>输出：</strong>5
<strong>解释：</strong>将邮筒分别安放在位置 3， 9 和 20 处。
每个房子到最近邮筒的距离和为 |3-1| + |4-3| + |9-8| + |10-9| + |20-20| = 5 。
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/06/13/sample_2_1816.png" style="height: 154px; width: 433px;"></strong></p>

<pre><strong>输入：</strong>houses = [2,3,5,12,18], k = 2
<strong>输出：</strong>9
<strong>解释：</strong>将邮筒分别安放在位置 3 和 14 处。
每个房子到最近邮筒距离和为 |2-3| + |3-3| + |5-3| + |12-14| + |18-14| = 9 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>houses = [7,4,6,1], k = 1
<strong>输出：</strong>8
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>houses = [3,6,14,10], k = 4
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == houses.length</code></li>
<li><code>1 &lt;= n &lt;= 100</code></li>
<li><code>1 &lt;= houses[i] &lt;= 10^4</code></li>
<li><code>1 &lt;= k &lt;= n</code></li>
<li>数组 <code>houses</code> 中的整数互不相同。</li>
</ul>




## 分析


### #1

- 令 f(i,j) 代表安排 i 个邮筒，houses[:j] 的最小距离和
- 遍历最后一个邮筒覆盖的房子范围 [a,j]，转为子问题 f(i-1,a-1)
- 计算一个邮筒覆盖区间 [a,b] 的最小和，将邮筒放在区间中位数即可，可以预处理前缀和，快速计算得到

```python
class Solution:
    def minDistance(self, houses: List[int], k: int) -> int:
        def w(a,b):
            return p[b+1]-p[(a+b+1)//2]-(p[(a+b)//2+1]-p[a])
        A = sorted(houses)
        n = len(A)
        p = [0]+list(accumulate(A))
        f = [0]+[inf]*n
        for i in range(1,k+1):
            g = [0]+[inf]*n
            for j in range(1,n+1):
                for a in range(j):
                    g[j] = min(g[j],f[a]+w(a,j-1))
            f = g
        return f[-1]
```
520 ms

### #2

- 区间代价函数 w 满足四边形不等式，可以利用决策单调性优化，详细见 [四边形不等式优化](https://oi-wiki.org/dp/opt/quadrangle/)
- 可以用分治，但更通用的是二分队列

```python
class Solution:
    def minDistance(self, houses: List[int], k: int) -> int:
        def quad():
            def w(a,b):
                return f[a]+p[b]-p[(a+b)//2]-(p[(a+b+1)//2]-p[a])
            g = [0]+[inf]*n
            Q = deque([[0,1,n]])
            for j in range(1,n+1):
                while Q and Q[0][2]<j:
                    Q.popleft()
                g[j] = w(Q[0][0],j)
                while Q and w(j,Q[-1][1])<w(Q[-1][0],Q[-1][1]):
                    Q.pop()
                if not Q:
                    Q.append([j,j+1,n])
                else:
                    a = bisect_left(range(Q[-1][2]+1),True,j,key=lambda a:w(j,a)<w(Q[-1][0],a))
                    Q[-1][2] = a-1
                    if a<=n:
                        Q.append([j,a,n])
            return g
        A = sorted(houses)
        n = len(A)
        p = [0]+list(accumulate(A))
        f = [0]+[inf]*n
        for i in range(1,k+1):
            f = quad()
        return f[-1]
```
243 ms

### #3

- 这类问题还可以结合 wqs 二分进一步优化
- 证明见 [四边形不等式优化](https://oi-wiki.org/dp/opt/quadrangle/#%E9%99%90%E5%88%B6%E5%8C%BA%E9%97%B4%E4%B8%AA%E6%95%B0%E7%9A%84%E6%83%85%E5%BD%A2)

## 解答


```python
class Solution:
    def minDistance(self, houses: List[int], k: int) -> int:
        def quad(mid):
            def w(a,b):
                return mid+g[a]+p[b]-p[(a+b)//2]-(p[(a+b+1)//2]-p[a])
            g = [0]+[inf]*n
            h = [0]*(n+1)
            Q = deque([[0,1,n]])
            for j in range(1,n+1):
                while Q and Q[0][2]<j:
                    Q.popleft()
                g[j] = w(Q[0][0],j)
                h[j] = h[Q[0][0]]+1
                while Q and w(j,Q[-1][1])<w(Q[-1][0],Q[-1][1]):
                    Q.pop()
                if not Q:
                    Q.append([j,j+1,n])
                else:
                    a = bisect_left(range(Q[-1][2]+1),True,j,key=lambda a:w(j,a)<w(Q[-1][0],a))
                    Q[-1][2] = a-1
                    if a<=n:
                        Q.append([j,a,n])
            return g,h
        A = sorted(houses)
        n = len(A)
        p = [0]+list(accumulate(A))
        l,r = 0,p[-1]
        while l<=r:
            mid = (l+r)//2
            g,h = quad(mid)
            if h[-1]<=k:
                res = g[-1]-mid*k
                if h[-1]==k:
                    break
                r = mid-1
            else:
                l = mid+1
        return res
```
95 ms
