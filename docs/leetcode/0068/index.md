# 0068：文本左右对齐（★★）


> <u>**[力扣第 68 题](https://leetcode.cn/problems/text-justification/)**</u>

## 题目

<p>给定一个单词数组 <code>words</code> 和一个长度 <code>maxWidth</code> ，重新排版单词，使其成为每行恰好有 <code>maxWidth</code> 个字符，且左右两端对齐的文本。</p>

<p>你应该使用 “<strong>贪心算法</strong>” 来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 <code>' '</code> 填充，使得每行恰好有 <em>maxWidth</em> 个字符。</p>

<p>要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。</p>

<p>文本的最后一行应为左对齐，且单词之间不插入<strong>额外的</strong>空格。</p>

<p><strong>注意:</strong></p>

<ul>
<li>单词是指由非空格字符组成的字符序列。</li>
<li>每个单词的长度大于 0，小于等于 <em>maxWidth</em>。</li>
<li>输入单词数组 <code>words</code> 至少包含一个单词。</li>
</ul>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
<strong>输出:</strong>
[
"This    is    an",
"example  of text",
"justification.  "
]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong>words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
<strong>输出:</strong>
[
"What   must   be",
"acknowledgment  ",
"shall be        "
]
<strong>解释: </strong>注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
因为最后一行应为左对齐，而不是左右两端对齐。
第二行同样为左对齐，这是因为这行只包含一个单词。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong>words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"]，maxWidth = 20
<strong>输出:</strong>
[
"Science  is  what we",
"understand      well",
"enough to explain to",
"a  computer.  Art is",
"everything  else  we",
"do                  "
]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 300</code></li>
<li><code>1 &lt;= words[i].length &lt;= 20</code></li>
<li><code>words[i]</code> 由小写英文字母和符号组成</li>
<li><code>1 &lt;= maxWidth &lt;= 100</code></li>
<li><code>words[i].length &lt;= maxWidth</code></li>
</ul>


**相似问题：**
- [1592：重新排列单词间的空格（1362 分）](/leetcode/1592)
- [2138：将字符串拆分为若干长度为 k 的组（1273 分）](/leetcode/2138)
- [2468：根据限制分割消息（2381 分）](/leetcode/2468)


## 分析

模拟：
- 遍历单词放到当前行，放不下了就调整空格分配输出当前行，从下一行重新开始
- 分配空格：
	- 先得到空格总数和单词数
	- 求得平均空格数 q 和余数 r
	- 前 r 个间隔分 q+1 个空格，后面的分 q 个空格即可
- 注意一行只有一个单词和最后一行的特殊情况，补空格即可


## 解答

```python
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res,row,s = [],[],0
        for w in words:
            if s+len(row)+len(w)<=maxWidth:
                row.append(w)
                s += len(w)
            else:
                if len(row)==1:
                    res.append(row[0].ljust(maxWidth))
                else:
                    q,r = divmod(maxWidth-s,len(row)-1)
                    for i in range(len(row)-1):
                        row[i] += ' '*(q+(i<r))
                    res.append(''.join(row))
                row,s = [w],len(w)
        res.append(' '.join(row).ljust(maxWidth))
        return res
```
24 ms
