# 0279：完全平方数（★）


> <u>**[力扣第 279 题](https://leetcode.cn/problems/perfect-squares/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，返回 <em>和为 <code>n</code> 的完全平方数的最少数量</em> 。</p>

<p><strong>完全平方数</strong> 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，<code>1</code>、<code>4</code>、<code>9</code> 和 <code>16</code> 都是完全平方数，而 <code>3</code> 和 <code>11</code> 不是。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = <code>12</code>
<strong>输出：</strong>3
<strong>解释：</strong><code>12 = 4 + 4 + 4</code></pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = <code>13</code>
<strong>输出：</strong>2
<strong>解释：</strong><code>13 = 4 + 9</code></pre>


<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

将平方数看成元素，即是完全背包问题。

## 解答

```python
class Solution:
    def numSquares(self, n: int) -> int:
        f = [0]+[inf]*n
        for x in range(1,n+1):
            for j in range(x*x,n+1):
                f[j] = min(f[j],1+f[j-x*x])
        return f[-1]
```
2518 ms

## *附加

- 根据数学上的 [四平方和定理](https://baike.baidu.com/item/%E5%9B%9B%E5%B9%B3%E6%96%B9%E5%92%8C%E5%AE%9A%E7%90%86)，每个正整数均可表示为4个整数的平方和
- 因此只需逐层遍历 i 个正整数平方的和，找到 n 即可

```python
class Solution:
    def numSquares(self, n: int) -> int:
        Q, vis = deque([(0, 0)]), {0}
        while True:
            u,w = Q.popleft()
            for j in range(1,isqrt(n-u)+1):
                v = u+j*j
                if v==n:
                    return w+1
                if v not in vis:
                    vis.add(v)
                    Q.append((v,w+1))
```
时间 $O(\sqrt N)$，169 ms

