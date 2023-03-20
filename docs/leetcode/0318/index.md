# 0318：最大单词长度乘积（★★）


## 题目

给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，
并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。
 

示例 1:
    
    输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
    输出: 16 
    解释: 这两个单词为 "abcw", "xtfn"。

示例 2:
    
    输入: ["a","ab","abc","d","cd","bcd","abcd"]
    输出: 4 
    解释: 这两个单词为 "ab", "cd"。

示例 3:

    输入: ["a","aa","aaa","aaaa"]
    输出: 0 
    解释: 不存在这样的两个单词。
 
提示：
- 2 <= words.length <= 1000
- 1 <= words[i].length <= 1000
- words[i] 仅包含小写字母

## 分析

### #1 

先保存每个单词的字母集合，然后遍历每一对单词，判断是否有公共字母即可。

```python
def maxProduct(self, words: List[str]) -> int:
    A, n = [set(w) for w in words], len(words)
    return max(len(words[i])*len(words[j]) if not A[i] & A[j] else 0 for i in range(n) for j in range(i))
```
1024 ms

### #2

注意到可能有多个单词的字母集合相同，所以可以用状态压缩表示的字母集合作为 key，保存对应的最大长度。

## 解答

```python
def maxProduct(self, words: List[str]) -> int:
    d = defaultdict(int)
    for w in words:
        st = reduce(lambda x, y: x | 1 << (ord(y) - ord('a')), w, 0)
        d[st] = max(d[st], len(w))
    return max([d[a] * d[b] for a in d for b in d if not a & b], default=0)
```
284 ms
