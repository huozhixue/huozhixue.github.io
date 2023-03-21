# 0564：寻找最近的回文数（★★）


> <u>**[力扣第 564 题](https://leetcode.cn/problems/find-the-closest-palindrome/)**</u>

## 题目

<p>给定一个表示整数的字符串 <code>n</code> ，返回与它最近的回文整数（不包括自身）。如果不止一个，返回较小的那个。</p>

<p>“最近的”定义为两个整数<strong>差的绝对值</strong>最小。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> n = "123"
<strong>输出:</strong> "121"
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = "1"
<strong>输出:</strong> "0"
<strong>解释:</strong> 0 和 2是最近的回文，但我们返回最小的，也就是 0。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n.length &lt;= 18</code></li>
<li><code>n</code> 只由数字组成</li>
<li><code>n</code> 不含前导 0</li>
<li><code>n</code> 代表在 <code>[1, 10<sup>18</sup> - 1]</code> 范围内的整数</li>
</ul>


## 分析

显然用暴力法太耗时了，考虑直接构造的方法。

尝试几次发现可以用固定前半并镜像的方法得到一个相近的回文数。
例如 356，固定住 35 并镜像得到 353，又如 6482 固定住 64 并镜像得到 6446。
这样得到的回文数和原数的差必然在 $10^{len(n)//2}$ 以内，所以暴力法要遍历 $O(\sqrt N)$ 次。

但这并不一定是最近的，比如说 731 最近的应该是 727 而不是 737 ，399 最近的应该是 404 而不是 393。 

也就是说，设 n 的前半为 half，以 half 镜像得到的不一定是最近的。但分别以 half-1、half、half+1 镜像的三个数中，必然有一个是所求结果。
因此可以直接构造三个数，再排序得到结果。

注意当 n 的位数是奇数和是偶数的两种情况下，取 half 和 half 镜像的操作有区别。可以先用 flag 标志奇偶性，方便操作。

另外当 half-1、half+1 和 half 的位数不同时，要特别处理：

	比如 999 的 half 是 99，half+1 是 100，应该变为 10
	
	比如 1000 的 half 是 10，half-1 是 9，应该变为 99
	
	特别的，10 的 half 是 1，half-1 是 0，应该变为 9


## 解答

```python
def nearestPalindromic(self, n: str) -> str:
	L = len(n)
	half, flag = n[:(L+1)//2], L % 2
	h1, h2 = str(int(half)-1), str(int(half)+1)
	a = h1 + h1[-flag-1::-1] if h1!='0' and len(h1)==len(half) else str(10**(L-1)-1)
	b = half + half[-flag-1::-1]
	c = h2 + h2[-flag-1::-1] if len(h2)==len(half) else str(10**L+1)
	return min([a, b, c],key=lambda x:abs(int(x)-int(n)) or float('inf'))
```

32 ms

