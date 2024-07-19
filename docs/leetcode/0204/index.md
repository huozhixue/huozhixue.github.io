# 0204：计数质数（★）


> <u>**[力扣第 204 题](https://leetcode.cn/problems/count-primes/)**</u>

## 题目

<p>给定整数 <code>n</code> ，返回 <em>所有小于非负整数 <code>n</code> 的质数的数量</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 10
<strong>输出：</strong>4
<strong>解释：</strong>小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 0
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出</strong>：0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 5 * 10<sup>6</sup></code></li>
</ul>


**相似问题：**
- [0263：丑数](/leetcode/0263)
- [0264：丑数 II](/leetcode/0264)
- [0279：完全平方数](/leetcode/0279)
- [2427：公因子的数目（1172 分）](/leetcode/2427)
- [2761：和等于目标值的质数对（1504 分）](/leetcode/2761)


## 分析

本题有个经典的埃氏筛法：
- 从 2 开始遍历到 n
- 遍历到质数 x 时 ，将之后 x 的倍数都标记为 0
- 遍历到数 x，假如 x 还未标记，x 即是质数

## 解答

```python
class Solution:
    def countPrimes(self, n: int) -> int:
        f = [0]*2+[1]*(n-2)
        for i in range(2,isqrt(n)+1):
            if f[i]:
                f[i*i:n:i] = [0]*((n-i*i-1)//i+1)
        return sum(f)
```
757 ms

## *附加

### #1

基于埃氏筛法还有个很巧妙的动态规划方法。
- 令 f[p][v] 代表埃氏筛法遍历到数 p 时，[2, v] 内还未标记的个数
- 如果 p*p > v 或者 p 是合数：
	- p 筛不到数，f[p][v] = f[p-1][v]
- 如果 p*p <= v 且 p 是质数:	
	- 令 g(x) 代表 x 的最小质因数
	- p 能筛掉合数 C=p*x，当且仅当 g(x)>=p
	- p 能筛掉的合数个数 
	    - = 满足 p*x<=v 且 g(x)>=p 的 x 的个数 
		 - = [p, v//p] 内还未标记的个数
		 - = f[p-1][v//p] - f[p-1][p-1]
	- f[p][v] = f[p-1][v] - (f[p-1][v//p] - f[p-1][p-1])
- 质数不会被标记，所以可以用 f[p-1][p]>f[p-1][p-1] 判断 p 是否质数
- 要求的即是 $f[\lfloor \sqrt n \rfloor][n]$

> - 注意递推时 f[p][v] 涉及到的 v 不是 [2,n]
> 	- 要么 v<=$\sqrt n$，要么 v 是 n//p 的形式
> 	- v 的个数是 $O(\sqrt n)$
> - 所以总的时间复杂度为 O(N)

```python
class Solution:
    def countPrimes(self, n: int) -> int:
        n -= 1
        if n < 2:
            return 0
        r = isqrt(n)
        V = list(range(1,n//r))+[n//x for x in range(r,0,-1)]
        f = [{} for _ in range(r+1)]
        f[1] = {v: v-1 for v in V}
        for p in range(2, r+1):
            for v in V:
                f[p][v] = f[p-1][v]
                if p*p <= v and f[p-1][p]>f[p-1][p-1]:
                    f[p][v] -= f[p-1][v//p]-f[p-1][p-1]
        return f[r][n]
```
4224 ms
### #2

- 注意反向遍历 v 就可以优化为一维数组
- 当 p*p > v 或者 p 是合数时，可以直接跳出遍历，极大地优化时间
 
```python
class Solution:
    def countPrimes(self, n: int) -> int:
        n -= 1
        if n < 2:
            return 0
        r = isqrt(n)
        V = [n//x for x in range(1,r)] + list(range(n//r,0,-1))
        f = {v: v-1 for v in V}
        for p in range(2, r+1):
            for v in V:
                if p*p>v or f[p]==f[p-1]:
                    break
                f[v] -= f[v//p]-f[p-1]
        return f[n]
```
158 ms
