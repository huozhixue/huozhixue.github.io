# 0689：三个无重叠子数组的最大和（★★）


> <u>**[力扣第 689 题](https://leetcode.cn/problems/maximum-sum-of-3-non-overlapping-subarrays/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，找出三个长度为 <code>k</code> 、互不重叠、且全部数字和（<code>3 * k</code> 项）最大的子数组，并返回这三个子数组。</p>

<p>以下标的数组形式返回结果，数组中的每一项分别指示每个子数组的起始位置（下标从 <strong>0</strong> 开始）。如果有多个结果，返回字典序最小的一个。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,1,2,6,7,5,1], k = 2
<strong>输出：</strong>[0,3,5]
<strong>解释：</strong>子数组 [1, 2], [2, 6], [7, 5] 对应的起始下标为 [0, 3, 5]。
也可以取 [2, 1], 但是结果 [1, 3, 5] 在字典序上更大。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,1,2,1,2,1,2,1], k = 2
<strong>输出：</strong>[0,2,4]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= nums[i] &lt; 2<sup>16</sup></code></li>
<li><code>1 &lt;= k &lt;= floor(nums.length / 3)</code></li>
</ul>


**相似问题：**
- [0123：买卖股票的最佳时机 III](/leetcode/0123)


## 分析

### #1

- 令 A[i] 代表 sum(nums[i:i+k])，问题转为求满足 x+k<=y<=z-k 的最大的 A[x]+A[y]+A[z]
- 三个数可以采用前后缀分解，预处理 max(A[:i+1]) 和 max(A[i:])，遍历中间的下标即可
- 注意要求字典序最小，因此前后缀的递推有一点区别


```python
class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        p = list(accumulate([0]+nums))
        A = [p[i+k]-p[i] for i in range(len(p)-k)]
        n = len(A)
        L, R = [0]*n, [n-1]*n
        for i in range(1,n):
            L[i] = i if A[i]>A[L[i-1]] else L[i-1]
        for i in range(n-2,-1,-1):
            R[i] = i if A[i]>=A[R[i+1]] else R[i+1]
        i = max(range(k,n-k),key=lambda i:A[L[i-k]]+A[i]+A[R[i+k]])
        return [L[i-k],i,R[i+k]]
```
47 ms

### #2

- 还有种更通用的能处理 a 个无重叠子数组的最大和的方法
- 令 f[i][j] 代表 A[:j] 的 i 个无重叠子数组的最大和及其对应下标
	- 若不选 A[j-1] ，转为 f[i][j-1]
	- 否则，转为 f[i-1][j-k]
	- 两者比较即可递推
## 解答

```python
class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        p = list(accumulate([0]+nums))
        A = [p[i+k]-p[i] for i in range(len(p)-k)]
        n = len(A)
        f = [(inf,[]) for _ in range(n+1)]
        for i in range(1,n+1):
            f[i] = min(f[i-1],(-A[i-1],[i-1]))
        for _ in range(2):
            g = [(inf,[]) for _ in range(n+1)]
            for i in range(k+1,n+1):
                s,ids = f[i-k]
                g[i] = min(g[i-1],(s-A[i-1],ids+[i-1]))
            f = g
        return f[-1][-1]
```
155 ms
