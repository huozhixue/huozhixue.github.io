# 0451：根据字符出现频率排序（★）


> <u>**[力扣第 451 题](https://leetcode.cn/problems/sort-characters-by-frequency/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> ，根据字符出现的 <strong>频率</strong> 对其进行 <strong>降序排序</strong> 。一个字符出现的 <strong>频率</strong> 是它出现在字符串中的次数。</p>

<p>返回 <em>已排序的字符串 </em>。如果有多个答案，返回其中任何一个。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>s = "tree"
<strong>输出: </strong>"eert"
<strong>解释: </strong>'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>s = "cccaaa"
<strong>输出: </strong>"cccaaa"
<strong>解释: </strong>'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>s = "Aabb"
<strong>输出: </strong>"bbAa"
<strong>解释: </strong>此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>5</sup></code></li>
<li><code>s</code> 由大小写英文字母和数字组成</li>
</ul>


**相似问题：**
- [0347：前 K 个高频元素](/leetcode/0347)
- [0387：字符串中的第一个唯一字符](/leetcode/0387)
- [1636：按照频率将数组升序排序（1430 分）](/leetcode/1636)
- [2278：字母在字符串中的百分比（1161 分）](/leetcode/2278)
- [2341：数组能形成多少数对（1184 分）](/leetcode/2341)
- [2374：边积分最高的节点（1418 分）](/leetcode/2374)
- [2404：出现最频繁的偶数元素（1259 分）](/leetcode/2404)
- [2506：统计相似字符串对的数目（1335 分）](/leetcode/2506)


## 分析

计数即可。

## 解答

```python
class Solution:
    def frequencySort(self, s: str) -> str:
        return ''.join(c*w for c, w in Counter(s).most_common())
```
48 ms


