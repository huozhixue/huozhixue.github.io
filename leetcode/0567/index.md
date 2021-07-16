# 0567：字符串的排列（★）


## 题目

给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的 子串 。

提示：

- 输入的字符串只包含小写字母
- 两个字符串的长度都在 [1, 10,000] 之间

 <!--more--> 
 
示例 1：

    输入: s1 = "ab" s2 = "eidbaooo"
    输出: True
    解释: s2 包含 s1 的排列之一 ("ba").

示例 2：

    输入: s1= "ab" s2 = "eidboaoo"
    输出: False
 

	
## 分析

类似于问题 {{< lc "0438" >}} ，还更简单一点。

## 解答

```python
def checkInclusion(self, s1: str, s2: str) -> bool:
    ct, ct0, k = Counter(), Counter(s1), len(s1)
    for j, char in enumerate(s2):
        ct[char] += 1
        if j >= k:
            ct[s2[j-k]] -= 1
            if ct[s2[j-k]] == 0:
                del ct[s2[j-k]]
        if j >= k-1 and ct == ct0:
            return True
    return False
```

96 ms

