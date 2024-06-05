# 0673：最长递增子序列的个数（★）


> <u>**[力扣第 673 题](https://leetcode.cn/problems/number-of-longest-increasing-subsequence/)**</u>

## 题目

<p>给定一个未排序的整数数组<meta charset="UTF-8" /> <code>nums</code> ， <em>返回最长递增子序列的个数</em> 。</p>

<p><strong>注意</strong> 这个数列必须是 <strong>严格</strong> 递增的。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> [1,3,5,4,7]
<strong>输出:</strong> 2
<strong>解释:</strong> 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> [2,2,2,2,2]
<strong>输出:</strong> 5
<strong>解释:</strong> 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
</pre>



<p><strong>提示:</strong> </p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2000</code></li>
<li><code>-10<sup>6</sup> &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

### #1

{{< lc "0300" >}} 的升级版，可以先求出 dp[j] 代表结尾位置 j 的最长递增子序列长度。

再令 dp2[j] 代表结尾位置 j 的最长递增子序列长度的个数，则：

    dp2[j] = sum(dp2[i] for i in range(j) if nums[i]<nums[j] and dp[i]==dp[j]-1) or 1
    
最终所有满足 dp[j]==max(dp) 的 dp2[j] 之和即为所求。
    
```python
def findNumberOfLIS(self, nums: List[int]) -> int:
    n = len(nums)
    dp, dp2 = [0]*n, [0]*n
    for j in range(n):
        dp[j] = 1+max([dp[i] for i in range(j) if nums[i]<nums[j]], default=0)
        dp2[j] = sum(dp2[i] for i in range(j) if nums[i]<nums[j] and dp[i]==dp[j]-1) or 1
    L = max(dp)
    return sum(dp2[j] for j in range(n) if dp[j]==L)
```
1380 ms

### #2

{{< lc "0300" >}} 中能优化 dp 的递推。考虑能否优化 dp2 的递推。

注意到递推 dp2[j] 时，只需要满足 dp[i]==dp[j]-1 的位置 i。

考虑维护 B[x] 代表 dp[i]==x 的所有 <nums[i],dp2[i]>，问题转为求 
sum(b for a,b in B[dp[j]-1] if a<nums[j])。
然后将 <nums[j],dp2[j]> 添加到 B[dp[j]] 中即可维护 B。

注意到 B[x] 中的第一个元素必然是单调非减的，因此可以二分查找到第一个 pos 满足 
B[dp[j]-1][pos][0]<nums[j]，问题转为求 
sum(b for _,b in B[dp[j]-1][pos:])。

容易想到维护 B[x] 第二个元素的前缀和，即可快速得到 dp2[j]。

可以将 B 改成三元组，第三个元素维护前缀和即可。进一步的，发现此时第二个元素无用，可以去掉。

> B[x][-1][0] 就是长度 x 的递增子序列的最小尾数，因此基于 B 数组即可递推 dp 和 dp2。


## 解答

```python
def findNumberOfLIS(self, nums: List[int]) -> int:
    B = [[(float('inf'), 0), (float('-inf'), 1)]]
    for num in nums:
        self.__class__.__getitem__ = lambda self, x: x==len(B) or B[x][-1][0]>=num
        x = bisect_left(self, True, 0, len(B))
        if x==len(B):
            B.append([(float('inf'), 0)])
        self.__class__.__getitem__ = lambda self, pos: B[x-1][pos][0]<num
        pos = bisect_left(self, True, 0, len(B[x-1])-1)
        B[x].append((num, B[x][-1][1]+B[x-1][-1][1]-B[x-1][pos-1][1]))
    return B[-1][-1][1]
```
80 ms

