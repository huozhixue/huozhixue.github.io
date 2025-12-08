# 1925：统计平方和三元组的数目（1323 分）


> <u>**[力扣第 56 场双周赛第 1 题](https://leetcode.cn/problems/count-square-sum-triples/)**</u>

## 题目

<p>一个 <strong>平方和三元组</strong> <code>(a,b,c)</code> 指的是满足 <code>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></code> 的 <strong>整数 </strong>三元组 <code>a</code>，<code>b</code> 和 <code>c</code> 。</p>

<p>给你一个整数 <code>n</code> ，请你返回满足<em> </em><code>1 &lt;= a, b, c &lt;= n</code> 的 <strong>平方和三元组</strong> 的数目。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>n = 5
<b>输出：</b>2
<b>解释：</b>平方和三元组为 (3,4,5) 和 (4,3,5) 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>n = 10
<b>输出：</b>4
<b>解释：</b>平方和三元组为 (3,4,5)，(4,3,5)，(6,8,10) 和 (8,6,10) 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 250</code></li>
</ul>


**相似问题：**
- [2475：数组中不等三元组的数目（1255 分）](/leetcode/2475)


## 分析

### #1

最简单的就是两重遍历 a 和 b

```python
class Solution:
    def countTriples(self, n: int) -> int:
        res = 0
        for a in range(1,n+1):
            for b in range(1,n+1):
                c = isqrt(a*a+b*b+1)
                if c<=n and c*c==a*a+b*b:
                    res += 1
        return res
```
219 ms

### #2

- 根据 [勾三股四弦五：生成勾股数的公式](https://zhuanlan.zhihu.com/p/1978057341963368012)，可以直接找到所有本原勾股数组，并计算

## 解答


```python []
class Solution:
    def countTriples(self, n: int) -> int:
        res = 0
        u = 3
        while u*u<=n*2:
            v = 1
            while v<u and u*u+v*v<=n*2:
                if gcd(v,u)==1:
                    res += n*2//(u*u+v*v)
                v += 2
            u += 2
        return res*2
```
0 ms
