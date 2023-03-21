# 0880：索引处的解码字符串（★）


> <u>**[力扣第 96 场周赛第 3 题](https://leetcode.cn/problems/decoded-string-at-index/)**</u>

## 题目

<p>给定一个编码字符串 <code>S</code>。请你找出<em> </em><strong>解码字符串</strong> 并将其写入磁带。解码时，从编码字符串中<strong> 每次读取一个字符 </strong>，并采取以下步骤：</p>

<ul>
<li>如果所读的字符是字母，则将该字母写在磁带上。</li>
<li>如果所读的字符是数字（例如 <code>d</code>），则整个当前磁带总共会被重复写 <code>d-1</code> 次。</li>
</ul>

<p>现在，对于给定的编码字符串 <code>S</code> 和索引 <code>K</code>，查找并返回解码字符串中的第 <code>K</code> 个字母。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>S = &quot;leet2code3&quot;, K = 10
<strong>输出：</strong>&quot;o&quot;
<strong>解释：</strong>
解码后的字符串为 &quot;leetleetcodeleetleetcodeleetleetcode&quot;。
字符串中的第 10 个字母是 &quot;o&quot;。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>S = &quot;ha22&quot;, K = 5
<strong>输出：</strong>&quot;h&quot;
<strong>解释：</strong>
解码后的字符串为 &quot;hahahaha&quot;。第 5 个字母是 &quot;h&quot;。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>S = &quot;a2345678999999999999999&quot;, K = 1
<strong>输出：</strong>&quot;a&quot;
<strong>解释：</strong>
解码后的字符串为 &quot;a&quot; 重复 8301530446056247680 次。第 1 个字母是 &quot;a&quot;。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= S.length &lt;= 100</code></li>
<li><code>S</code> 只包含小写字母与数字 <code>2</code> 到 <code>9</code> 。</li>
<li><code>S</code> 以字母开头。</li>
<li><code>1 &lt;= K &lt;= 10^9</code></li>
<li>题目保证 <code>K</code> 小于或等于解码字符串的长度。</li>
<li>解码后的字符串保证少于 <code>2^63</code> 个字母。</li>
</ul>


## 分析

直接模拟会超时，因为解码后的字符串可能非常长，比如示例 3。

用 tmp 表示解码后的字符串。观察示例 3 发现，如果某一步 tmp 长度为 size < K，遇到数字 d，长度变为 size * d > K，
那么在 tmp * d 的第 K 位就是 tmp 的第 K % size 位。

因此遇到数字 d 时，可以不保存重复部分，重复部分的信息可以向前查到。
用栈保存解码字符串每一步的 size 和对应字母即可。比如示例 2：

	ha			[(1, h), (2, a)]	
	ha2			[(1, h), (2, a), (4, a)]
	ha22		[(1, h), (2, a), (4, a), (8, a)]
	
	这样得到的栈便已经包含了所有位置信息。比如查询第 7 位等价于查第 7 % 4 = 3 位，等于查第 3 % 2 = 1 位为 h。

注意特殊情况 K % size == 0 时等价于第 size 位，所以终止条件是 K % size == 0。

## 解答

```python
def decodeAtIndex(self, S: str, K: int) -> str:
	stack, size = [], 0
	for char in S:
		size = size * int(char) if char.isdigit() else size + 1
		stack.append((size, stack[-1][1] if char.isdigit() else char))
	while K % stack[-1][0]:
		K %= stack.pop()[0]
	return stack[-1][1]
```

40 ms

