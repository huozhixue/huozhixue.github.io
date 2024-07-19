# 1047：删除字符串中的所有相邻重复项（1286 分）


> <u>**[力扣第 137 场周赛第 2 题](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/)**</u>

## 题目

<p>给出由小写字母组成的字符串 <code>S</code>，<strong>重复项删除操作</strong>会选择两个相邻且相同的字母，并删除它们。</p>

<p>在 S 上反复执行重复项删除操作，直到无法继续删除。</p>

<p>在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。</p>



<p><strong>示例：</strong></p>

<pre><strong>输入：</strong>&quot;abbaca&quot;
<strong>输出：</strong>&quot;ca&quot;
<strong>解释：</strong>
例如，在 &quot;abbaca&quot; 中，我们可以删除 &quot;bb&quot; 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 &quot;aaca&quot;，其中又只有 &quot;aa&quot; 可以执行重复项删除操作，所以最后的字符串为 &quot;ca&quot;。
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= S.length &lt;= 20000</code></li>
<li><code>S</code> 仅由小写英文字母组成。</li>
</ol>


**相似问题：**
- [1209：删除字符串中的所有相邻重复项 II（1541 分）](/leetcode/1209)
- [2390：从字符串中移除星号（1347 分）](/leetcode/2390)
- [2716：最小化字符串长度（1242 分）](/leetcode/2716)


## 分析

典型的栈应用。


## 解答

```python
def removeDuplicates(self, S: str) -> str:
	stack = []
	for char in S:
		if stack and stack[-1] == char:
			stack.pop()
		else:
			stack.append(char)
	return ''.join(stack)
```

92 ms

