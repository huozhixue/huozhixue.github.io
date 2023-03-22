# 0014：最长公共前缀


> <u>**[力扣第 14 题](https://leetcode.cn/problems/longest-common-prefix/)**</u>

## 题目

<p>编写一个函数来查找字符串数组中的最长公共前缀。</p>

<p>如果不存在公共前缀，返回空字符串 <code>""</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>strs = ["flower","flow","flight"]
<strong>输出：</strong>"fl"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>strs = ["dog","racecar","car"]
<strong>输出：</strong>""
<strong>解释：</strong>输入不存在公共前缀。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= strs.length &lt;= 200</code></li>
<li><code>0 &lt;= strs[i].length &lt;= 200</code></li>
<li><code>strs[i]</code> 仅由小写英文字母组成</li>
</ul>


## 分析

遍历判断即可。

## 解答

```python
def longestCommonPrefix(self, strs: List[str]) -> str:
    res = ''
    for row in zip(*strs):
        if len(set(row)) != 1:
            break
        res += row[0]
    return res
```
28 ms
