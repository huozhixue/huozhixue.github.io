# 0479：最大回文数乘积（★★）


> <u>**[力扣第 479 题](https://leetcode.cn/problems/largest-palindrome-product/)**</u>

## 题目

<p>给定一个整数 n ，返回 <em>可表示为两个 <code>n</code> 位整数乘积的 <strong>最大回文整数</strong></em> 。因为答案可能非常大，所以返回它对 <code>1337</code> <strong>取余</strong> 。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>987
<strong>解释：</strong>99 x 91 = 9009, 9009 % 1337 = 987
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>9
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 8</code></li>
</ul>




## 分析


- 两个 n 位数相乘，必然是 2n 或 2n-1 位
- 因此从大到小遍历 n 位回文根，构造回文数，判断即可
	- 例如 10 作为回文根，可根据两种镜像方式，构造出 1001、101
	- 遍历两种镜像方式，注意大小顺序即可

## 解答


```python
class Solution:
    def largestPalindrome(self, n: int) -> int:
        for odd in [0,1]:
            for h in range(10**n-1,10**(n-1)-1,-1):
                x = int(str(h)+str(h)[::-1][odd:])
                mi = max(10**(n-1),(x-1)//(10**n-1)+1)
                for y in range(mi,isqrt(x)+1):
                    if x%y==0:
                        return x%1337
```
1018 ms
