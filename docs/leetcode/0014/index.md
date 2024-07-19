# 0014：最长公共前缀


> <u>**[力扣第 14 题](https://leetcode.cn/problems/longest-common-prefix/)**</u>

## 题目

<p>编写一个函数来查找字符串数组中的最长公共前缀。</p>

<p>如果不存在公共前缀，返回空字符串 <code>""</code>。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>strs = ["flower","flow","flight"]
<strong>输出：</strong>"fl"
</pre>

<p><strong class="example">示例 2：</strong></p>

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


**相似问题：**
- [2996：大于等于顺序前缀和的最小缺失整数（1405 分）](/leetcode/2996)
- [3043：最长公共前缀的长度（1688 分）](/leetcode/3043)
- [3093：最长公共后缀查询（2118 分）](/leetcode/3093)


## 分析

遍历判断即可。

## 解答

```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        res = ''
        for g in zip(*strs):
            if len(set(g))>1:
                break
            res += g[0]
        return res
```
32 ms
