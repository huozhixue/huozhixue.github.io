# 1177：构建回文串检测（1848 分）


> <u>**[力扣第 152 场周赛第 3 题](https://leetcode.cn/problems/can-make-palindrome-from-substring/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，请你对 <code>s</code> 的子串进行检测。</p>

<p>每次检测，待检子串都可以表示为 <code>queries[i] = [left, right, k]</code>。我们可以 <strong>重新排列</strong> 子串 <code>s[left], ..., s[right]</code>，并从中选择 <strong>最多</strong> <code>k</code> 项替换成任何小写英文字母。 </p>

<p>如果在上述检测过程中，子串可以变成回文形式的字符串，那么检测结果为 <code>true</code>，否则结果为 <code>false</code>。</p>

<p>返回答案数组 <code>answer[]</code>，其中 <code>answer[i]</code> 是第 <code>i</code> 个待检子串 <code>queries[i]</code> 的检测结果。</p>

<p>注意：在替换时，子串中的每个字母都必须作为 <strong>独立的</strong> 项进行计数，也就是说，如果 <code>s[left..right] = &quot;aaa&quot;</code> 且 <code>k = 2</code>，我们只能替换其中的两个字母。（另外，任何检测都不会修改原始字符串 <code>s</code>，可以认为每次检测都是独立的）</p>



<p><strong>示例：</strong></p>

<pre><strong>输入：</strong>s = &quot;abcda&quot;, queries = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]
<strong>输出：</strong>[true,false,false,true,true]
<strong>解释：</strong>
queries[0] : 子串 = &quot;d&quot;，回文。
queries[1] : 子串 = &quot;bc&quot;，不是回文。
queries[2] : 子串 = &quot;abcd&quot;，只替换 1 个字符是变不成回文串的。
queries[3] : 子串 = &quot;abcd&quot;，可以变成回文的 &quot;abba&quot;。 也可以变成 &quot;baab&quot;，先重新排序变成 &quot;bacd&quot;，然后把 &quot;cd&quot; 替换为 &quot;ab&quot;。
queries[4] : 子串 = &quot;abcda&quot;，可以变成回文的 &quot;abcba&quot;。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length, queries.length &lt;= 10^5</code></li>
<li><code>0 &lt;= queries[i][0] &lt;= queries[i][1] &lt; s.length</code></li>
<li><code>0 &lt;= queries[i][2] &lt;= s.length</code></li>
<li><code>s</code> 中只有小写英文字母</li>
</ul>


**相似问题：**
- [2055：蜡烛之间的盘子（1819 分）](/leetcode/2055)
- [3003：执行操作后的最大分割数量（3039 分）](/leetcode/3003)


## 分析

对于某个子串：
- 因为可以改变顺序，所以某个字符个数为 w 时，只有 w%2 个多余
- 根据每个字符的个数即可算出所有多余的字符个数 s
- 每次替换可以使一对多余的字符相同，所以只要 s//2<=k，即可变成回文

要快速计算子串中每个字符的个数，可以用前缀和。



## 解答


```python
def canMakePaliQueries(self, s: str, queries: List[List[int]]) -> List[bool]:
	A = [[0]*26]
	for i,c in enumerate(s):
		A.append(A[-1][:])
		A[-1][ord(c)-ord('a')] += 1
	return [sum((a-b)%2 for a,b in zip(A[r+1],A[l]))//2<=k for l,r,k in queries]
```
776 ms
