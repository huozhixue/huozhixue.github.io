# 0423：从英文中重建数字（★）


> <u>**[力扣第 423 题](https://leetcode.cn/problems/reconstruct-original-digits-from-english/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，其中包含字母顺序打乱的用英文单词表示的若干数字（<code>0-9</code>）。按 <strong>升序</strong> 返回原始的数字。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "owoztneoer"
<strong>输出：</strong>"012"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "fviefuro"
<strong>输出：</strong>"45"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s[i]</code> 为 <code>["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"]</code> 这些字符之一</li>
<li><code>s</code> 保证是一个符合题目要求的字符串</li>
</ul>


## 分析

可以假设每个数字的个数，得到一个联立方程组，求解即可。

例如只有 '0' 的英文里含有 'z' 字母，故 s 中 'z' 的个数即是原本 '0' 的个数。

## 解答


```python
def originalDigits(self, s: str) -> str:
	res, ct = [0]*10, Counter(s)
	res[0] = ct['z']
	res[2] = ct['w']
	res[4] = ct['u']
	res[6] = ct['x']
	res[8] = ct['g']
	res[5] = ct['f'] - res[4]
	res[7] = ct['s'] - res[6]
	res[1] = ct['o'] - res[0] - res[2] - res[4]
	res[3] = ct['t'] - res[2] - res[8]
	res[9] = ct['i'] - res[5] - res[6] - res[8]
	return ''.join(str(x)*res[x] for x in range(10))
```
56 ms
