# 1012：至少有 1 位重复的数字（2230 分）


> <u>**[力扣第 128 场周赛第 4 题](https://leetcode.cn/problems/numbers-with-repeated-digits/)**</u>

## 题目

<p>给定正整数 <code>n</code>，返回在<em> </em><code>[1, n]</code><em> </em>范围内具有 <strong>至少 1 位</strong> 重复数字的正整数的个数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 20
<strong>输出：</strong>1
<strong>解释：</strong>具有至少 1 位重复数字的正数（&lt;= 20）只有 11 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 100
<strong>输出：</strong>10
<strong>解释：</strong>具有至少 1 位重复数字的正数（&lt;= 100）有 11，22，33，44，55，66，77，88，99 和 100 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 1000
<strong>输出：</strong>262
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [2999：统计强大整数的数目（2351 分）](/leetcode/2999)


## 分析

### #1

- 可以反过来求数字不重复的个数，即是典型的数位 dp
- 注意前置 0 不加入状态 st 中

```python
class Solution:
    def numDupDigitsAtMostN(self, n: int) -> int:
        @cache
        def dfs(i,st,bd):
            if i==len(s):
                return 1
            res = 0
            up = int(s[i]) if bd else 9
            for x in range(up+1):
                if not st>>x&1:
                    res += dfs(i+1,0 if st==x==0 else st|1<<x,bd and x==up)
            return res
        s = str(n)
        return n+1-dfs(0,0,1)
```
278 ms

### #2

- 还可以利用排列组合知识直接分段计算，例如对于 n=8382：
	- [0, 1000) 的数字不重复的个数：9*(A(9,0)+A(9,1)+A(9,2))  
	- [1000, 8000) 的对应个数：7*A(9,3)     
	- [8000, 8300) 的对应个数：3*A(8,2)
	- [8300, 8380) 的对应个数：7*A(7,1)
	- [8380, 8382) 的对应个数：0
- 具体实现时，假设 s=str(n) 的长度为 m
	- 先计算 0-10^(m-1) 的个数
	- 然后遍历 i，固定 s[:i]，求 s[i] 能取的值，再求 s[i+1:] 的排列个数
- 特别注意：
	- i=0 时，s[i] 不能取 0
	- i=m-1 时，s[i] 可以取到原值，为了方便，可以先将 n 加 1，就不需特别处理
	- s[:i] 已经有重复数字时，直接终止

## 解答

```python
class Solution:
    def numDupDigitsAtMostN(self, n: int) -> int:
        s = str(n+1)
        m = len(s)
        res = 9*sum(perm(9,k) for k in range(m-1))
        vis = set()
        for i in range(m):
            cur = int(s[i])
            cand = set(range(int(i==0),cur))-vis
            res += len(cand)*perm(9-i, m-i-1)
            if cur in vis:
                break
            vis.add(cur)
        return n-res
```
0 ms
