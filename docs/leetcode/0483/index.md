# 0483：最小好进制（★★）


> <u>**[力扣第 483 题](https://leetcode.cn/problems/smallest-good-base/)**</u>

## 题目

<p>以字符串的形式给出 <code>n</code> , 以字符串的形式返回<em> <code>n</code> 的最小 <strong>好进制</strong> </em> 。</p>

<p>如果 <code>n</code> 的  <code>k(k&gt;=2)</code> 进制数的所有数位全为1，则称 <code>k(k&gt;=2)</code> 是 <code>n</code> 的一个 <strong>好进制 </strong>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = "13"
<strong>输出：</strong>"3"
<strong>解释：</strong>13 的 3 进制是 111。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = "4681"
<strong>输出：</strong>"8"
<strong>解释：</strong>4681 的 8 进制是 11111。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = "1000000000000000000"
<strong>输出：</strong>"999999999999999999"
<strong>解释：</strong>1000000000000000000 的 999999999999999999 进制是 11。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n</code> 的取值范围是 <code>[3, 10<sup>18</sup>]</code></li>
<li><code>n</code> 没有前导 0</li>
</ul>


## 分析

### #1
- 显然二进制最长，最多 60 位，因此考虑遍历位数
- 对于位数 m 的 1，二分查找离 n 最近的 k 进制，判断是否等于 n 即可

```python
class Solution:
    def smallestGoodBase(self, n: str) -> str:
        n = int(n)
        for m in range(n.bit_length(),1,-1):
            k = bisect_left(range(n),n,2,key=lambda k:(pow(k,m)-1)//(k-1))
            if (pow(k,m)-1)//(k-1)==n:
                return str(k)
```
205 ms


### #2

- 还可以用数学直接计算位数 m>2 时对应的 k
- 首先有：  $$n=k^0+k^1+...+k^{m-1}>k^{m-1}$$
- 根据二项式定理又有：
$$(k+1)^{m-1}=\binom{m-1}{0}k^0+\binom{m-1}{1}k^1+...+\binom{m-1}{m-1}k^{m-1} \\\ >k^0+k^1+...+k^{m-1}=n $$
- 两式结合有：

$$k<n^{\frac 1 {m-1}}<k+1 \\\
  k=\lfloor n^{\frac 1 {m-1}} \rfloor$$

## 解答

```python
class Solution:
    def smallestGoodBase(self, n: str) -> str:
        n = int(n)
        for m in range(n.bit_length(),2,-1):
            k = int(pow(n,1/(m-1)))
            if (pow(k,m)-1)//(k-1)==n:
                return str(k)
        return str(n-1)
```
38 ms

