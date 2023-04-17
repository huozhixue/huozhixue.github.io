# 0479：最大回文数乘积（★★）


> <u>**[力扣第 479 题](https://leetcode.cn/problems/largest-palindrome-product/)**</u>

## 题目

<p>给定一个整数 n ，返回 <em>可表示为两个 <code>n</code> 位整数乘积的 <strong>最大回文整数</strong></em> 。因为答案可能非常大，所以返回它对 <code>1337</code> <strong>取余</strong> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<b>输入：</b>n = 2
<b>输出：</b>987
<strong>解释：</strong>99 x 91 = 9009, 9009 % 1337 = 987
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong> n = 1
<strong>输出：</strong> 9
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 8</code></li>
</ul>


## 分析

两个 n 位数相乘，必然是 2n 或 2n-1 位，因此考虑从大到小遍历所有 2n 和 2n-1 位的回文数，判断是否符合。

具体构造回文数：
- 以基于某数并镜像的方法可以得到回文数
	- 例如 10 通过两种镜像方式，可得到两个回文数 101、1001
- 长度为 L 的回文数也必然可以基于前 (L+1)//2 个数字镜像得到，把它称作 L 的回文根
- 遍历 n 位的回文根，并遍历两种镜像方式，注意大小顺序即可

## 解答


```python
def largestPalindrome(self, n: int) -> int:
	for is_odd in [0, 1]:
		for half in range(10**n-1, 10**(n-1), -1):
			num = int(str(half) + str(half)[-is_odd-1::-1])
			if any(num%x==0 and num//x<10**n for x in range(10**n-1, isqrt(num)-1, -1)):
				return num % 1337
```
2208 ms
