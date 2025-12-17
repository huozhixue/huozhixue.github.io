# 1508：子数组和排序后的区间和（1402 分）

 
> <u>**[力扣第 30 场双周赛第 2 题](https://leetcode.cn/problems/range-sum-of-sorted-subarray-sums/)**</u>

## 题目

<p>给你一个数组 <code>nums</code> ，它包含 <code>n</code> 个正整数。你需要计算所有非空连续子数组的和，并将它们按升序排序，得到一个新的包含 <code>n * (n + 1) / 2</code> 个数字的数组。</p>

<p>请你返回在新数组中下标为<em> </em><code>left</code> 到 <code>right</code> <strong>（下标从 1 开始）</strong>的所有数字和（包括左右端点）。由于答案可能很大，请你将它对 10^9 + 7 取模后返回。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4], n = 4, left = 1, right = 5
<strong>输出：</strong>13
<strong>解释：</strong>所有的子数组和为 1, 3, 6, 10, 2, 5, 9, 3, 7, 4 。将它们升序排序后，我们得到新的数组 [1, 2, 3, 3, 4, 5, 6, 7, 9, 10] 。下标从 le = 1 到 ri = 5 的和为 1 + 2 + 3 + 3 + 4 = 13 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4], n = 4, left = 3, right = 4
<strong>输出：</strong>6
<strong>解释：</strong>给定数组与示例 1 一样，所以新数组为 [1, 2, 3, 3, 4, 5, 6, 7, 9, 10] 。下标从 le = 3 到 ri = 4 的和为 3 + 3 = 6 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4], n = 4, left = 1, right = 10
<strong>输出：</strong>50
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10^3</code></li>
<li><code>nums.length == n</code></li>
<li><code>1 &lt;= nums[i] &lt;= 100</code></li>
<li><code>1 &lt;= left &lt;= right &lt;= n * (n + 1) / 2</code></li>
</ul>




## 分析

### #1

- n 较小，可以直接暴力得到所有和，排序后累加即可

```python []
mod = 10**9+7
class Solution:
    def rangeSum(self, nums: List[int], n: int, left: int, right: int) -> int:
        A = list(accumulate([0]+nums))
        B = [A[i]-A[j] for i in range(len(A)) for j in range(i)]
        B.sort()
        return sum(B[left-1:right])%mod
```
195 ms

### #2

可以用二分优化
- 令 f(k) 代表前 k 个和的总和
- 先求出第 k 个和 x，这是典型的二分问题
	- 对于固定的 x，判断<=x 的和的个数是否>=k
	- 具体计算时，遍历 j，找满足 A[j]-A[i]<=x 的 i
	- 显然 i 随着 j 递增，可以用双指针在 O(N) 时间完成
- 然后计算 <=x 的和的个数 a 及总和 s
	- 类似前面的双指针，得到每个 j 对应的 i
	- 计算总和，需要累加的是 sum(A[j]-A[l] for l in range(i,j))
	- 预处理 A 的前缀和，即可快速计算
- 有 a-k 个 x 多算了，所以 f(k)=s-(a-k)*x
- 最终答案即是 f(right)-f(left-1)
## 解答


```python []
mod = 10**9+7
class Solution:
    def rangeSum(self, nums: List[int], n: int, left: int, right: int) -> int:
        def cal(x):
            res = 0
            i = 0
            for j in range(len(A)):
                while A[j]-A[i]>x:
                    i += 1
                res += j-i
            return res

        def f(k):
            x = bisect_left(range(A[-1]),k,key=cal)
            res = 0
            i = 0
            for j in range(len(A)):
                while A[j]-A[i]>x:
                    i += 1
                res += (j-i)*A[j]-(P[j]-P[i])
            res -= (cal(x)-k)*x
            return res

        A = list(accumulate([0]+nums))
        P = list(accumulate([0]+A))
        return (f(right)-f(left-1))%mod
```
15 ms
