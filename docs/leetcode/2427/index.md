# 2427：公因子的数目（1172 分）


> <u>**[力扣第 313 场周赛第 1 题](https://leetcode.cn/problems/number-of-common-factors/)**</u>

## 题目

<p>给你两个正整数 <code>a</code> 和 <code>b</code> ，返回 <code>a</code> 和 <code>b</code> 的 <strong>公</strong> 因子的数目。</p>

<p>如果 <code>x</code> 可以同时整除 <code>a</code> 和 <code>b</code> ，则认为 <code>x</code> 是 <code>a</code> 和 <code>b</code> 的一个 <strong>公因子</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>a = 12, b = 6
<strong>输出：</strong>4
<strong>解释：</strong>12 和 6 的公因子是 1、2、3、6 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>a = 25, b = 30
<strong>输出：</strong>2
<strong>解释：</strong>25 和 30 的公因子是 1、5 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= a, b &lt;= 1000</code></li>
</ul>


## 分析


等价于求 `a` 和 `b` 的最大公约数 x 的因子数，遍历到 $O(\sqrt x)$ 即可。

## 解答


```python
def commonFactors(self, a: int, b: int) -> int:
	x = gcd(a, b)
	res, i = 0, 1
	while i*i<=x:
		if x%i==0:
			res += 1+(i*i!=x)
		i += 1
	return res
```

36 ms
