# 0312：戳气球（★★）


> <u>**[力扣第 312 题](https://leetcode.cn/problems/burst-balloons/)**</u>

## 题目

<p>有 <code>n</code> 个气球，编号为<code>0</code> 到 <code>n - 1</code>，每个气球上都标有一个数字，这些数字存在数组 <code>nums</code> 中。</p>

<p>现在要求你戳破所有的气球。戳破第 <code>i</code> 个气球，你可以获得 <code>nums[i - 1] * nums[i] * nums[i + 1]</code> 枚硬币。 这里的 <code>i - 1</code> 和 <code>i + 1</code> 代表和 <code>i</code> 相邻的两个气球的序号。如果 <code>i - 1</code>或 <code>i + 1</code> 超出了数组的边界，那么就当它是一个数字为 <code>1</code> 的气球。</p>

<p>求所能获得硬币的最大数量。</p>


<strong>示例 1：</strong>

<pre>
<strong>输入：</strong>nums = [3,1,5,8]
<strong>输出：</strong>167
<strong>解释：</strong>
nums = [3,1,5,8] --&gt; [3,5,8] --&gt; [3,8] --&gt; [8] --&gt; []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,5]
<strong>输出：</strong>10
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 300</code></li>
<li><code>0 &lt;= nums[i] &lt;= 100</code></li>
</ul>


**相似问题：**
- [1000：合并石头的最低成本（2422 分）](/leetcode/1000)


## 分析


- 为了方便，在前后各加一个数字 1 作为边界，得到数组 A
- 假设最后戳破第 k 个气球，获得 A[0]*A[k]*A[-1] 个硬币，剩下的转为 A[:k+1] 和 A[k:] 的递归子问题
- 因此采用区间 dp 即可
## 解答

```python
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        A = [1]+nums+[1]
        n = len(A)
        f = [[0]*n for _ in range(n)]
        for i in range(n-1,-1,-1):
            for j in range(i+2,n):
                for k in range(i+1,j):
                    f[i][j] = max(f[i][j],f[i][k]+f[k][j]+A[i]*A[j]*A[k])
        return f[0][-1]
```
2541 ms

