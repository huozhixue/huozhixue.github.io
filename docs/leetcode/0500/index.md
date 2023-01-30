# 0500：键盘行（★）


> **第  场周赛第  题**

## 题目

给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。

美式键盘 中：

- 第一行由字符 "qwertyuiop" 组成。
- 第二行由字符 "asdfghjkl" 组成。
- 第三行由字符 "zxcvbnm" 组成。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/keyboard.png)

提示：
- 1 <= words.length <= 20
- 1 <= words[i].length <= 100
- words[i] 由英文字母（小写和大写字母）组成
 
示例 1：

	输入：words = ["Hello","Alaska","Dad","Peace"]
	输出：["Alaska","Dad"]

示例 2：

	输入：words = ["omk"]
	输出：[]

示例 3：

	输入：words = ["adsdf","sfd"]
	输出：["adsdf","sfd"]



## 分析

遍历判断每个单词的字符集合是否是某一行的子集即可。

注意单词可能有大写，要先全转为小写。

## 解答

```python
def findWords(self, words: List[str]) -> List[str]:
	return [word for word in words if any(set(word.lower()) <= set(s) for s in ["qwertyuiop", "asdfghjkl", "zxcvbnm"])]
```
32 ms
