# 0049：字母异位词分组（★）


> <u>**[力扣第 49 题](https://leetcode.cn/problems/group-anagrams/)**</u>

## 题目

<p>给你一个字符串数组，请你将 <strong>字母异位词</strong> 组合在一起。可以按任意顺序返回结果列表。</p>

<p><strong>字母异位词</strong> 是由重新排列源单词的所有字母得到的一个新单词。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> strs = <code>["eat", "tea", "tan", "ate", "nat", "bat"]</code>
<strong>输出: </strong>[["bat"],["nat","tan"],["ate","eat","tea"]]</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> strs = <code>[""]</code>
<strong>输出: </strong>[[""]]
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> strs = <code>["a"]</code>
<strong>输出: </strong>[["a"]]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= strs.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= strs[i].length &lt;= 100</code></li>
<li><code>strs[i]</code> 仅包含小写字母</li>
</ul>


**相似问题：**
- [0242：有效的字母异位词](/leetcode/0242)
- [0249：移位字符串分组](/leetcode/0249)
- [2273：移除字母异位词后的结果数组（1294 分）](/leetcode/2273)
- [2514：统计同位异构字符串数目（2069 分）](/leetcode/2514)


## 分析 

显然字母异位词排序后相同，所以将排序后的字符串作为键存到哈希表即可。

## 解答

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        d = defaultdict(list)
        for s in strs:
            d[''.join(sorted(s))].append(s)
        return list(d.values())
```
43 ms

