# 0762：二进制表示中质数个计算置位（1383 分）


> <u>**[力扣第 762 题](https://leetcode.cn/problems/prime-number-of-set-bits-in-binary-representation/)**</u>

## 题目

<p>给你两个整数 <code>left</code> 和 <code>right</code> ，在闭区间 <code>[left, right]</code> 范围内，统计并返回 <strong>计算置位位数为质数</strong> 的整数个数。</p>

<p><strong>计算置位位数</strong> 就是二进制表示中 <code>1</code> 的个数。</p>

<ul>
<li>例如， <code>21</code> 的二进制表示 <code>10101</code> 有 <code>3</code> 个计算置位。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>left = 6, right = 10
<strong>输出：</strong>4
<strong>解释：</strong>
6 -&gt; 110 (2 个计算置位，2 是质数)
7 -&gt; 111 (3 个计算置位，3 是质数)
9 -&gt; 1001 (2 个计算置位，2 是质数)
10-&gt; 1010 (2 个计算置位，2 是质数)
共计 4 个计算置位为质数的数字。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>left = 10, right = 15
<strong>输出：</strong>5
<strong>解释：</strong>
10 -&gt; 1010 (2 个计算置位, 2 是质数)
11 -&gt; 1011 (3 个计算置位, 3 是质数)
12 -&gt; 1100 (2 个计算置位, 2 是质数)
13 -&gt; 1101 (3 个计算置位, 3 是质数)
14 -&gt; 1110 (3 个计算置位, 3 是质数)
15 -&gt; 1111 (4 个计算置位, 4 不是质数)
共计 5 个计算置位为质数的数字。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= left &lt;= right &lt;= 10<sup>6</sup></code></li>
<li><code>0 &lt;= right - left &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0191：位1的个数](/leetcode/0191)


## 分析


遍历数判断 1 的个数是否质数即可。因为最大为 $10^6<2^20$，所以只需考虑 20 以下的质数。


## 解答

```python
def countPrimeSetBits(self, L: int, R: int) -> int:
	return sum(bin(x).count('1') in [2, 3, 5, 7, 11, 13, 17, 19] for x in range(L, R+1))
```

220 ms


