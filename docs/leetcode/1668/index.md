# 1668：最大重复子字符串（★）


> **第 40 场双周赛第 1 题**

## 题目

给你一个字符串 sequence ，如果字符串 word 连续重复 k 次形成的字符串是 sequence 的一个子字符串，
那么单词 word 的 重复值为 k 。单词 word 的 最大重复值 是单词 word 在 sequence 中最大的重复值。
如果 word 不是 sequence 的子串，那么重复值 k 为 0 。

给你一个字符串 sequence 和 word ，请你返回 最大重复值 k 。

 

示例 1：
    
    输入：sequence = "ababc", word = "ab"
    输出：2
    解释："abab" 是 "ababc" 的子字符串。
示例 2：
    
    输入：sequence = "ababc", word = "ba"
    输出：1
    解释："ba" 是 "ababc" 的子字符串，但 "baba" 不是 "ababc" 的子字符串。
示例 3：

    输入：sequence = "ababc", word = "ac"
    输出：0
    解释："ac" 不是 "ababc" 的子字符串。
 

提示：
- 1 <= sequence.length <= 100
- 1 <= word.length <= 100
- sequence 和 word 都只包含小写英文字母。


## 分析

### #1

设 sequence 长度 m，word 长度 n，显然 k 不超过 m//n，从大到小遍历判断即可。

```python
def maxRepeating(self, sequence: str, word: str) -> int:
    m, n = len(sequence), len(word)
    for x in range(m//n, 0, -1):
        if word*x in sequence:
            return x
    return 0
```
32 ms

### #2

令 check(x) 代表 x*word 是否为 sequence 的子串。显然 check(x) 具有单调性，因此可以用二分查找优化时间。

## 解答

```python
def maxRepeating(self, sequence: str, word: str) -> int:
    self.__class__.__getitem__ = lambda self, x: word*x not in sequence
    return bisect_left(self, True, 1, len(sequence)//len(word)+1)-1
```
32 ms


