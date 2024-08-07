# 1408：数组中的字符串匹配（1223 分）


> <u>**[力扣第 184 场周赛第 1 题](https://leetcode.cn/problems/string-matching-in-an-array/)**</u>

## 题目

<p>给你一个字符串数组 <code>words</code> ，数组中的每个字符串都可以看作是一个单词。请你按 <strong>任意</strong> 顺序返回 <code>words</code> 中是其他单词的子字符串的所有单词。</p>

<p>如果你可以删除 <code>words[j]</code> 最左侧和/或最右侧的若干字符得到 <code>words[i]</code> ，那么字符串 <code>words[i]</code> 就是 <code>words[j]</code> 的一个子字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["mass","as","hero","superhero"]
<strong>输出：</strong>["as","hero"]
<strong>解释：</strong>"as" 是 "mass" 的子字符串，"hero" 是 "superhero" 的子字符串。
["hero","as"] 也是有效的答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["leetcode","et","code"]
<strong>输出：</strong>["et","code"]
<strong>解释：</strong>"et" 和 "code" 都是 "leetcode" 的子字符串。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>words = ["blue","green","bu"]
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 100</code></li>
<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
<li><code>words[i]</code> 仅包含小写英文字母。</li>
<li>题目数据 <strong>保证</strong> 每个 <code>words[i]</code> 都是独一无二的。</li>
</ul>


**相似问题：**
- [2564：子字符串异或查询（1959 分）](/leetcode/2564)


## 分析

遍历判断 word 是否是另一个单词的子串即可。

## 解答

```python
def stringMatching(self, words: List[str]) -> List[str]:
    return [w for w in words if any(w2!=w and w in w2 for w2 in words)]
```
40 ms


