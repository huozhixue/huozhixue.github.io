# 0474：一和零（★）


> <u>**[力扣第 474 题](https://leetcode.cn/problems/ones-and-zeroes/)**</u>

## 题目

<p>给你一个二进制字符串数组 <code>strs</code> 和两个整数 <code>m</code> 和 <code>n</code> 。</p>

<div class="MachineTrans-Lines">
<p class="MachineTrans-lang-zh-CN">请你找出并返回 <code>strs</code> 的最大子集的长度，该子集中 <strong>最多</strong> 有 <code>m</code> 个 <code>0</code> 和 <code>n</code> 个 <code>1</code> 。</p>

<p class="MachineTrans-lang-zh-CN">如果 <code>x</code> 的所有元素也是 <code>y</code> 的元素，集合 <code>x</code> 是集合 <code>y</code> 的 <strong>子集</strong> 。</p>
</div>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
<strong>输出：</strong>4
<strong>解释：</strong>最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>strs = ["10", "0", "1"], m = 1, n = 1
<strong>输出：</strong>2
<strong>解释：</strong>最大的子集是 {"0", "1"} ，所以答案是 2 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= strs.length &lt;= 600</code></li>
<li><code>1 &lt;= strs[i].length &lt;= 100</code></li>
<li><code>strs[i]</code> 仅由 <code>'0'</code> 和 <code>'1'</code> 组成</li>
<li><code>1 &lt;= m, n &lt;= 100</code></li>
</ul>


## 分析

### #1

显然按是否选 strs[0]，可以转为递归子问题。

令 dfs(i, j, k) 代表 strs[i:] 中最多 j 个 0、k 个 1 的最大子集长度，即可递归。

注意每个字符串有用的信息只有 0 和 1 的个数，可以提前求出保存，节省时间。

>这本质上是个 01 背包问题，m、n 是限制条件，字符串的 0/1 个数是代价，求最多能选多少个。

```python
def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
    @lru_cache(None)
    def dfs(i, j, k):
        if j<0 or k<0:
            return float('-inf')
        if i == len(A):
            return 0
        return max(dfs(i+1, j, k), 1+dfs(i+1, j-A[i][0], k-A[i][1]))
    
    A = [(s.count('0'), s.count('1')) for s in strs]
    return dfs(0, m, n)
```
1644 ms

### #2

可以改写成非递归形式，并且倒序遍历 j、k，将 dp 优化为二维数组。

## 解答

```python
def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
    dp = [[0]*(n+1) for _ in range(m+1)]
    for s in strs:
        cnt0, cnt1 = s.count('0'), s.count('1')
        for j in range(m, cnt0-1, -1):
            for k in range(n, cnt1-1, -1):
                dp[j][k] = max(dp[j][k], 1+dp[j-cnt0][k-cnt1])
    return dp[-1][-1]
```
2652 ms


