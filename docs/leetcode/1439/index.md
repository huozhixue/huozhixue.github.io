# 1439：有序矩阵中的第 k 个最小数组和（2133 分）


> <u>**[力扣第 187 场周赛第 4 题](https://leetcode.cn/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/)**</u>

## 题目

<p>给你一个 <code>m * n</code> 的矩阵 <code>mat</code>，以及一个整数 <code>k</code> ，矩阵中的每一行都以非递减的顺序排列。</p>

<p>你可以从每一行中选出 1 个元素形成一个数组。返回所有可能数组中的第 k 个 <strong>最小</strong> 数组和。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>mat = [[1,3,11],[2,4,6]], k = 5
<strong>输出：</strong>7
<strong>解释：</strong>从每一行中选出一个元素，前 k 个和最小的数组分别是：
[1,2], [1,4], [3,2], [3,4], [1,6]。其中第 5 个的和是 7 。  </pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>mat = [[1,3,11],[2,4,6]], k = 9
<strong>输出：</strong>17
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>mat = [[1,10,10],[1,4,5],[2,3,6]], k = 7
<strong>输出：</strong>9
<strong>解释：</strong>从每一行中选出一个元素，前 k 个和最小的数组分别是：
[1,1,2], [1,1,3], [1,4,2], [1,4,3], [1,1,6], [1,5,2], [1,5,3]。其中第 7 个的和是 9 。
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>mat = [[1,1,10],[2,2,9]], k = 7
<strong>输出：</strong>12
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == mat.length</code></li>
<li><code>n == mat.length[i]</code></li>
<li><code>1 &lt;= m, n &lt;= 40</code></li>
<li><code>1 &lt;= k &lt;= min(200, n ^ m)</code></li>
<li><code>1 &lt;= mat[i][j] &lt;= 5000</code></li>
<li><code>mat[i]</code> 是一个非递减数组</li>
</ul>




## 分析

### #1

- 类似 {{< lc "0373" >}}，只不过从两行推广到了 m 行
- 同样可以用多路归并，每次出堆后，遍历每行下标加 1 并入堆即可

```python
class Solution:
    def kthSmallest(self, mat: List[List[int]], k: int) -> int:
        m, n = len(mat), len(mat[0])
        pq = [(sum(row[0] for row in mat),(0,)*m)]
        vis = {(0,)*m}
        for _ in range(k-1):
            w,u = heappop(pq)
            for i in range(m):
                if u[i]+1<n:
                    v = u[:i]+(u[i]+1,)+u[i+1:]
                    if v not in vis:
                        vis.add(v)
                        heappush(pq,(w-mat[i][u[i]]+mat[i][u[i]+1],v))
        return pq[0][0]
```
69 ms

### #2

- 也有类似的不用 vis 的去重方法
- 遍历 i，如果前面的下标都为 0，才将下标 i 加 1 并入堆

## 解答

```python
class Solution:
    def kthSmallest(self, mat: List[List[int]], k: int) -> int:
        m, n = len(mat), len(mat[0])
        pq = [(sum(row[0] for row in mat),(0,)*m)]
        for _ in range(k-1):
            w,u = heappop(pq)
            for i in range(m):
                if u[i]+1<n:
                    v = u[:i]+(u[i]+1,)+u[i+1:]
                    heappush(pq, (w-mat[i][u[i]]+mat[i][u[i]+1],v))
                if u[i]:
                    break
        return pq[0][0]
```
19 ms


