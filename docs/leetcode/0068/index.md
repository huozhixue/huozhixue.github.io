# 0068：文本左右对齐（★★）


## 题目

给定一个单词数组 words 和一个长度 maxWidth ，重新排版单词，使其成为每行恰好有 maxWidth 个字符，
且左右两端对齐的文本。

你应该使用 “贪心算法” 来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，
使得每行恰好有 maxWidth 个字符。

要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。

文本的最后一行应为左对齐，且单词之间不插入额外的空格。

注意:
- 单词是指由非空格字符组成的字符序列。
- 每个单词的长度大于 0，小于等于 maxWidth。
- 输入单词数组 words 至少包含一个单词。
 

示例 1:

	输入: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
	输出:
	[
	   "This    is    an",
	   "example  of text",
	   "justification.  "
	]

示例 2:

	输入:words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
	输出:
	[
	  "What   must   be",
	  "acknowledgment  ",
	  "shall be        "
	]
	解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
	     因为最后一行应为左对齐，而不是左右两端对齐。       
		 第二行同样为左对齐，这是因为这行只包含一个单词。
	 
示例 3:

	输入:words = ["Science","is","what","we","understand","well","enough","to","explain","to","a",
	"computer.","Art","is","everything","else","we","do"]，maxWidth = 20
	输出:
	[
	  "Science  is  what we",
	  "understand      well",
	  "enough to explain to",
	  "a  computer.  Art is",
	  "everything  else  we",
	  "do                  "
	]
 

提示:
- 1 <= words.length <= 300
- 1 <= words[i].length <= 20
- words[i] 由小写英文字母和符号组成
- 1 <= maxWidth <= 100
- words[i].length <= maxWidth


## 分析

遍历单词放到第一行中，放不下了就调整第一行的空格分配，然后放到下一行。

具体分配空格时：
- 先得到空格总数 total 和单词数 n
- 求得平均空格数 q 和余数 r
- 前 r 个间隔分 q+1 个空格，后面的分 q 个空格即可
- 注意 n==1 和最后一行的特殊情况，在后面补空格即可


## 解答

```python
def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
    res, row, s = [], [], 0
    for word in words:
        if s + len(row) + len(word) > maxWidth:
            if len(row) == 1:
                res.append(row[0].ljust(maxWidth))
            else:
                q, r = divmod(maxWidth-s, len(row)-1)
                res.append(''.join(row[i]+' '*(q+(i<r)) for i in range(len(row)-1)) + row[-1])
            row, s = [word], len(word)
        else:
            row.append(word)
            s += len(word)
    res.append(' '.join(row).ljust(maxWidth))
    return res
```
24 ms
