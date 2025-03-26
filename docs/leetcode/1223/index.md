# 1223：掷骰子模拟（2008 分）


> <u>**[力扣第 158 场周赛第 3 题](https://leetcode.cn/problems/dice-roll-simulation/)**</u>

## 题目

<p>有一个骰子模拟器会每次投掷的时候生成一个 1 到 6 的随机数。</p>

<p>不过我们在使用它时有个约束，就是使得投掷骰子时，<strong>连续</strong> 掷出数字 <code>i</code> 的次数不能超过 <code>rollMax[i]</code>（<code>i</code> 从 1 开始编号）。</p>

<p>现在，给你一个整数数组 <code>rollMax</code> 和一个整数 <code>n</code>，请你来计算掷 <code>n</code> 次骰子可得到的不同点数序列的数量。</p>

<p>假如两个序列中至少存在一个元素不同，就认为这两个序列是不同的。由于答案可能很大，所以请返回 <strong>模 <code>10^9 + 7</code></strong> 之后的结果。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 2, rollMax = [1,1,2,2,2,3]
<strong>输出：</strong>34
<strong>解释：</strong>我们掷 2 次骰子，如果没有约束的话，共有 6 * 6 = 36 种可能的组合。但是根据 rollMax 数组，数字 1 和 2 最多连续出现一次，所以不会出现序列 (1,1) 和 (2,2)。因此，最终答案是 36-2 = 34。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 2, rollMax = [1,1,1,1,1,1]
<strong>输出：</strong>30
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>n = 3, rollMax = [1,1,1,2,2,3]
<strong>输出：</strong>181
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 5000</code></li>
<li><code>rollMax.length == 6</code></li>
<li><code>1 &lt;= rollMax[i] &lt;= 15</code></li>
</ul>


**相似问题：**
- [2028：找出缺失的观测数据（1444 分）](/leetcode/2028)
- [2318：不同骰子序列的数目（2090 分）](/leetcode/2318)


## 分析


### #1

- 令 f(i,j) 代表掷 i 次且结尾是 j 的序列个数
- 遍历 j 的连续次数 k（满足 k<=rollMax[j]），即可递推
- 注意 k 刚好等于 i 时，对应的个数是 1 

```python
class Solution:
    def dieSimulator(self, n: int, rollMax: List[int]) -> int:
        mod = 10**9+7
        f = [[0]*6 for _ in range(n+1)]
        for i in range(1,n+1):
            for j,a in enumerate(rollMax):
                for k in range(1,a+1):
                    if i-k>0:
                        f[i][j] += sum(f[i-k])-f[i-k][j]
                    elif i==k:
                        f[i][j] += 1
                f[i][j] %= mod
        return sum(f[-1])%mod
```
228 ms

### #2

- 注意到固定 j 时，f[i][j] 其实是一段滑动窗口的和
- 因此可以优化掉 k 的遍历

```python
class Solution:
    def dieSimulator(self, n: int, rollMax: List[int]) -> int:
        mod = 10**9+7
        f = [[0]*6 for _ in range(n+1)]
        for i in range(1,n+1):
            for j,a in enumerate(rollMax):
                f[i][j] = sum(f[i-1]) if i>1 else 1
                if i-a-1>0:
                    f[i][j] -= sum(f[i-a-1])-f[i-a-1][j]
                elif i-a-1==0:
                    f[i][j] -= 1
                f[i][j] %= mod
        return sum(f[-1])%mod
```
84 ms

### #3

- 还可以维护 g[i]=sum(f[i])，进一步优化
- 为了方便，令 g[0]=1
## 解答


```python
class Solution:
    def dieSimulator(self, n: int, rollMax: List[int]) -> int:
        mod = 10**9+7
        f = [[0]*6 for _ in range(n+1)]
        g = [1]+[0]*n
        for i in range(1,n+1):
            for j,a in enumerate(rollMax):
                f[i][j] = g[i-1]
                if i-a-1>=0:
                    f[i][j] -= g[i-a-1]-f[i-a-1][j]
                f[i][j] %= mod
            g[i] = sum(f[i])%mod
        return g[-1]
```
39 ms
