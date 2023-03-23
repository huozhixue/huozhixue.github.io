# 0484：寻找排列（★）


> <u>**[力扣第 484 题](https://leetcode.cn/problems/find-permutation/)**</u>

## 题目

<p>由范围 <code>[1,n]</code> 内所有整数组成的 <code>n</code> 个整数的排列 <code>perm</code> 可以表示为长度为 <code>n - 1</code> 的字符串 <code>s</code> ，其中:</p>

<ul>
<li>如果 <code>perm[i] &lt; perm[i + 1]</code> ，那么 <code>s[i] == ' i '</code></li>
<li>如果 <code>perm[i] &gt; perm[i + 1]</code> ，那么 <code>s[i] == 'D'</code> 。</li>
</ul>

<p>给定一个字符串 <code>s</code> ，重构字典序上最小的排列 <code>perm</code> 并返回它。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong> s = "I"
<strong>输出：</strong> [1,2]
<strong>解释：</strong> [1,2] 是唯一合法的可以生成秘密签名 "I" 的特定串，数字 1 和 2 构成递增关系。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong> s = "DI"
<strong>输出：</strong> [2,1,3]
<strong>解释：</strong> [2,1,3] 和 [3,1,2] 可以生成秘密签名 "DI"，
但是由于我们要找字典序最小的排列，因此你需要输出 [2,1,3]。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s[i]</code> 只会包含字符 <code>'D'</code> 和 <code>'I'</code>。</li>
</ul>


## 分析

## 解答


```python
def findPermutation(self, s: str) -> List[int]:
	res, x = [], 1
	for sub in s.split('I'):
		res.extend(range(x+len(sub), x-1, -1))
		x += len(sub)+1
	return res
```

44 ms
