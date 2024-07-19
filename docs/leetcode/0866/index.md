# 0866：回文质数（1938 分）


> <u>**[力扣第 92 场周赛第 3 题](https://leetcode.cn/problems/prime-palindrome/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，返回大于或等于 <code>n</code> 的最小 <stron><strong>回文质数</strong></stron>。</p>
<!-- 一个整数是素数的定义，以及1不是素数的说明 -->

<p>一个整数如果恰好有两个除数：<code>1</code> 和它本身，那么它是 <strong>质数</strong> 。注意，<code>1</code> 不是质数。</p>

<ul>
<li>例如，<code>2</code>、<code>3</code>、<code>5</code>、<code>7</code>、<code>11</code> 和 <code>13</code> 都是质数。</li>
</ul>

<p>一个整数如果从左向右读和从右向左读是相同的，那么它是<strong> 回文数 </strong>。</p>

<ul>
<li>例如，<code>101</code> 和 <code>12321</code> 都是回文数。</li>
</ul>

<p>测试用例保证答案总是存在，并且在 <code>[2, 2 * 10<sup>8</sup>]</code> 范围内。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 6
<strong>输出：</strong>7
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 8
<strong>输出：</strong>11
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 13
<strong>输出：</strong>101
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>8</sup></code></li>
</ul>


**相似问题：**
- [2081：k 镜像数字的和（2209 分）](/leetcode/2081)


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

