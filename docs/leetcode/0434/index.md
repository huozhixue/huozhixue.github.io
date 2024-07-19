# 0434：字符串中的单词数


> <u>**[力扣第 434 题](https://leetcode.cn/problems/number-of-segments-in-a-string/)**</u>

## 题目

<p>统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符。</p>

<p>请注意，你可以假定字符串里不包括任何不可打印的字符。</p>

<p><strong>示例:</strong></p>

<pre><strong>输入:</strong> &quot;Hello, my name is John&quot;
<strong>输出:</strong> 5
<strong>解释: </strong>这里的单词是指连续的不是空格的字符，所以 &quot;Hello,&quot; 算作 1 个单词。
</pre>




## 分析

按空格分割即可。

## 解答


```python
class Solution:
    def countSegments(self, s: str) -> int:
        return len(s.split())
```
38 ms
