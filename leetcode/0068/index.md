# 0068：文本左右对齐（★★★）


## 题目

给定一个单词数组和一个长度 maxWidth，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。

你应该使用“贪心算法”来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。

要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。

文本的最后一行应为左对齐，且单词之间不插入额外的空格。

说明:

- 单词是指由非空格字符组成的字符序列。
- 每个单词的长度大于 0，小于等于 maxWidth。
- 输入单词数组 words 至少包含一个单词。

<!--more--> 

示例:

	输入:
	words = ["This", "is", "an", "example", "of", "text", "justification."]
	maxWidth = 16
	输出:
	[
	   "This    is    an",
	   "example  of text",
	   "justification.  "
	]
	
示例 2:

	输入:
	words = ["What","must","be","acknowledgment","shall","be"]
	maxWidth = 16
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

	输入:
	words = ["Science","is","what","we","understand","well","enough","to","explain",
	         "to","a","computer.","Art","is","everything","else","we","do"]
	maxWidth = 20
	输出:
	[
	  "Science  is  what we",
	  "understand      well",
	  "enough to explain to",
	  "a  computer.  Art is",
	  "everything  else  we",
	  "do                  "
	]


## 分析

遍历单词放到 row 数组中，放不下了就将 row 和填充空格拼接后添加到结果，然后重置 row 再放。问题在于空格的分配。对于一般情况：

- 平均每个间隔的空格数是  blank_avg = 空格总数 blank_total // 间隔数 N
- 不能整除的情况下还剩了额外空格  blank_extra = blank_total % N
- 按题目要求，应该把额外空格均匀添加到左侧的间隔中，即前 blank_extra 个间隔再加一个空格

那么相当于对 row 作如下转换：
	
	if i==0: 				row[i] = row[i]
	else:					row[i] = ' '*(blank_avg+int(i<=blank_extra))+row[i]
	
再考虑特殊情况，最后一行或行里只有一个单词，用空格在后面补齐即可。


## 解答

```python
def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
	res, row, curlen = [], [], 0
	for word in words:
		if curlen + len(row) + len(word) <= maxWidth:
			row.append(word)
			curlen += len(word)
		else:
			blank_total, N = maxWidth-curlen, len(row)-1
			if not N:
				res.append(row[0] + ' '*blank_total)
			else:
				blank_avg, blank_extra = blank_total // N, blank_total % N
				blank_cnt = lambda i: 0 if i==0 else blank_avg+int(i<=blank_extra)
				res.append(''.join(' '*blank_cnt(i)+w for i, w in enumerate(row)))
			row, curlen = [word], len(word)
	res.append(' '.join(row) + ' '*(maxWidth-curlen-len(row)+1))
	return res
```

32 ms
