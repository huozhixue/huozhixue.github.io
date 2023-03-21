# 1209：删除字符串中的所有相邻重复项 II（★）


> <u>**[力扣第 156 场周赛第 3 题](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string-ii/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，「<code>k</code> 倍重复项删除操作」将会从 <code>s</code> 中选择 <code>k</code> 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。</p>

<p>你需要对 <code>s</code> 重复进行无限次这样的删除操作，直到无法继续为止。</p>

<p>在执行完所有删除操作后，返回最终得到的字符串。</p>

<p>本题答案保证唯一。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>s = &quot;abcd&quot;, k = 2
<strong>输出：</strong>&quot;abcd&quot;
<strong>解释：</strong>没有要删除的内容。</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>s = &quot;deeedbbcccbdaa&quot;, k = 3
<strong>输出：</strong>&quot;aa&quot;
<strong>解释：
</strong>先删除 &quot;eee&quot; 和 &quot;ccc&quot;，得到 &quot;ddbbbdaa&quot;
再删除 &quot;bbb&quot;，得到 &quot;dddaa&quot;
最后删除 &quot;ddd&quot;，得到 &quot;aa&quot;</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>s = &quot;pbbcggttciiippooaais&quot;, k = 2
<strong>输出：</strong>&quot;ps&quot;
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10^5</code></li>
<li><code>2 &lt;= k &lt;= 10^4</code></li>
<li><code>s</code> 中只含有小写英文字母。</li>
</ul>


## 分析

和 1047 的区别在于相邻重复个数从 2 变为了 k。可以每次判断 stack 的后 k 项，也可以在入栈时添加一个变量 cnt 表示当前字符重复次数。 

## 解答

```python
def removeDuplicates(self, s: str, k: int) -> str:
	stack = []
	for char in s:
		if not stack or stack[-1][0] != char:
			stack.append((char, 1))
		elif stack[-1][1] == k-1:
			for _ in range(k-1):
				stack.pop()
		else:
			stack.append((char, stack[-1][1] + 1))
	return ''.join(char for char, cnt in stack)
```

124 ms

