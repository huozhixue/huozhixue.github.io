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


**相似问题：**
- [0300：最长递增子序列](/leetcode/0300)
- [0674：最长连续递增序列](/leetcode/0674)
- [2407：最长递增子序列 II（2280 分）](/leetcode/2407)


## 分析

### #1

- {{< lc "0300" >}} 的升级版，可以先求出 f[j] 代表结尾位置 j 的最长递增子序列长度。
- 再令 g[j] 代表结尾位置 j 的最长递增子序列长度的个数，则：
	g[j] = sum(g[i] for i in range(j) if nums[i]<nums[j] and f[i]=f[j]-1) or 1
- 最终所有满足 f[j]=max(f) 的 g[j] 之和即为所求。

```python
class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        f, g = [0]*n, [0]*n
        for j in range(n):
            f[j] = 1+max([f[i] for i in range(j) if nums[i]<nums[j]], default=0)
            g[j] = sum(g[i] for i in range(j) if nums[i]<nums[j] and f[i]==f[j]-1) or 1
        ma = max(f)
        return sum(g[j] for j in range(n) if f[j]==ma)
```
895 ms

### #2

- {{< lc "0300" >}} 中能优化 f 的递推。考虑能否优化 g 的递推
- 注意到递推 g[j] 时，只需要满足 f[i]=f[j]-1 的位置 i
- 考虑维护 B[x] 代表 f[i]=x 的所有 <nums[i],g[i]>，问题转为求 sum(b for a,b in B[f[j]-1] if a<nums[j])，然后将 <nums[j],g[j]> 添加到 B[f[j]] 中即可维护 B
- 找位置 i 类似 {{< lc "0300" >}}，二分即可
- 注意到 B[x] 中的 nums[i] 必然是递减的，所以利用前缀和+二分即可快速计算 g[j]

## 解答

```python
class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        f = [[-inf]]
        g = [[1]]
        for x in nums:
            i = bisect_left(f,x,key=lambda p:p[-1])
            j = bisect_left(f[i-1],True,key=lambda p:p<x)
            s = g[i-1][-1]-(g[i-1][j-1] if j else 0)
            if i==len(f):
                f.append([x])
                g.append([s])
            else:
                f[i].append(x)
                g[i].append(s+g[i][-1])
        return g[-1][-1]
```
15 ms

