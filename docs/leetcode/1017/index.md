# 1017：负二进制转换（★）


> <u>**[力扣第 130 场周赛第 2 题](https://leetcode.cn/problems/convert-to-base-2/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，以二进制字符串的形式返回该整数的 <strong>负二进制（<code>base -2</code>）</strong>表示。</p>

<p><strong>注意，</strong>除非字符串就是 <code>"0"</code>，否则返回的字符串中不能含有前导零。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>"110"
<strong>解释：</strong>(-2)<sup>2</sup> + (-2)<sup>1</sup> = 2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>"111"
<strong>解释：</strong>(-2)<sup>2</sup> + (-2)<sup>1</sup> + (-2)<sup>0</sup> = 3
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 4
<strong>输出：</strong>"100"
<strong>解释：</strong>(-2)<sup>2</sup> = 4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

类似二进制转换，每步将商取负即可。

## 解答


```python
def baseNeg2(self, n: int) -> str:
	res = ''
	while n:
		n, r = -(n//2), n%2
		res = str(r)+res
	return res or '0'
```
40 ms
