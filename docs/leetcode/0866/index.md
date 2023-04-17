# 0866：回文素数（★★）


> <u>**[力扣第 92 场周赛第 3 题](https://leetcode.cn/problems/prime-palindrome/)**</u>

## 题目

<p>求出大于或等于 <code>N</code> 的最小回文素数。</p>

<p>回顾一下，如果一个数大于 1，且其因数只有 1 和它自身，那么这个数是<em>素数</em>。</p>

<p>例如，2，3，5，7，11 以及 13 是素数。</p>

<p>回顾一下，如果一个数从左往右读与从右往左读是一样的，那么这个数是<em>回文数。</em></p>

<p>例如，12321 是回文数。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>6
<strong>输出：</strong>7
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>8
<strong>输出：</strong>11
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>13
<strong>输出：</strong>101</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= N &lt;= 10^8</code></li>
<li>答案肯定存在，且小于 <code>2 * 10^8</code>。</li>
</ul>






## 分析

### #1

类似 {{< lc "0479" >}}  ，可以直接从小到大构造回文数，再判断是否符合即可。注意遍历顺序。
	
```python
def primePalindrome(self, N):
	def is_prime(n):
		return n >= 2 and all(n % i for i in range(2, int(n**0.5)+1))

	for L in range(1, 6):
		for is_odd in [1, 0]:
			for half in range(10**(L-1), 10**L):
				n = int(str(half) + str(half)[-is_odd-1::-1]) 
				if n >= N and is_prime(n):
					return n
```
200 ms

### #2

还有个巧妙的优化。可以证明偶数位回文数必然是 11 的倍数。

- 设一个数 x 表示为 $\overline{...a_5 a_4 a_3 a_2 a_1}$，那么：

$$x =  a_1 + 10 * a_2 + 100 * a_3 + 1000 * a_4 + 10000 * a_5 + ... $$
$$x =  a_1 + (11-1) * a_2 + (99+1) * a_3 + (1001-1) * a_4 + (9999+1) * a_5 + ... $$
$$x =  (a_1 - a_2 + a_3 - a_4 + a_5 - ...) + 11 * a_2 + 99 * a_3 + 1001 * a_4 + 9999 * a_5 + ...$$

- 偶数位的 $\overline{9...9}$ 显然是 11 的倍数。
- 偶数位(设为 2 * k 位)的 $\overline{10...01}$ 等于 2 * k 位的 $\overline{11...11}$ 减去 10 乘以 2 * (k-1) 位的 $\overline{11...11}$，显然也是 11 的倍数。
- 所以：
	
	$$x \ mod \ 11 = (a_1 - a_2 + a_3 - a_4 + a_5 - ...) \ mod \ 11 $$
- 偶数位回文数的 奇位数字之和与偶位数字之和的差 为 0，故偶数位回文数必然是 11 的倍数

所以先排除 11 的情况，然后只需要考虑一种镜像方式即可。

还可以优化为从 N 的回文根开始遍历。
	

## 解答

```python
def primePalindrome(self, N):
	def is_prime(n):
		return n >= 2 and all(n%i for i in range(2, int(n**0.5) + 1))

	if 8<=N<=11:
		return 11
	L = len(str(N))
	h = int(str(N)[:(L+1)//2])
	for half in range(h, 10**6):
		n = int(str(half) + str(half)[-2::-1]) 
		if n >= N and is_prime(n):
			return n
```
56 ms

