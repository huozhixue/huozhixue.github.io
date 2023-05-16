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

假设 x 是一个好进制，n 在 x 进制下的位数是 m+1，那么：

$$n=x^0+x^1+...+x^m>x^m$$
根据二项式定理又有：
$$(x+1)^m=\binom{m}{0}x^0+\binom{m}{1}x^1+...+\binom{m}{m}x^m \\\ >x^0+x^1+...+x^m=n $$

两式结合有：

$$x<n^{\frac 1 m}<x+1$$

所以 m 固定时，x 只有一种可能  $\lfloor n^{\frac 1 m} \rfloor$。那么遍历 m，判断对应的 x 是否符合即可。

## 解答

```python
def smallestGoodBase(self, n: str) -> str:
	n = int(n)
	ma = len(bin(n))-3
	for m in range(ma,1,-1):
		x = int(pow(n,1/m))
		if (pow(x,m+1)-1)//(x-1)==n:
			return str(x)
	return str(n-1)
```
52 ms

