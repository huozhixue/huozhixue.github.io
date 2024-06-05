# 0526：优美的排列（★）


> <u>**[力扣第 526 题](https://leetcode.cn/problems/beautiful-arrangement/)**</u>

## 题目

<p>假设有从 1 到 n 的 n 个整数。用这些整数构造一个数组 <code>perm</code>（<strong>下标从 1 开始</strong>），只要满足下述条件 <strong>之一</strong> ，该数组就是一个 <strong>优美的排列</strong> ：</p>

<ul>
<li><code>perm[i]</code> 能够被 <code>i</code> 整除</li>
<li><code>i</code> 能够被 <code>perm[i]</code> 整除</li>
</ul>

<p>给你一个整数 <code>n</code> ，返回可以构造的 <strong>优美排列 </strong>的 <strong>数量</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>2
<b>解释：</b>
第 1 个优美的排列是 [1,2]：
- perm[1] = 1 能被 i = 1 整除
- perm[2] = 2 能被 i = 2 整除
第 2 个优美的排列是 [2,1]:
- perm[1] = 2 能被 i = 1 整除
- i = 2 能被 perm[2] = 1 整除
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 15</code></li>
</ul>


## 分析

假设最后一个数是 x，满足 x%n==0 或 n%x==0，
那么剩下的转为子问题：求集合 set(range(1,n+1))-{x} 中构造优美排列的个数。

所以令 dfs(A) 代表集合 A 构造的优美排列个数，即可递归。

为了方便，可以将集合状态压缩为一个数。

## 解答

```python
def countArrangement(self, n: int) -> int:
    dp = [1]+[0]*((1<<n)-1)
    for st in range(1<<n):
        idx = bin(st).count('1')+1
        for x in range(n):
            if not st&(1<<x) and ((x+1)%idx==0 or idx%(x+1)==0):
                dp[st|(1<<x)] += dp[st]
    return dp[-1]
```
160 ms

