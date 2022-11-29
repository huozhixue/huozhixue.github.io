# 0516：最长回文子序列（★★）


## 题目

给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。

子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。

示例 1：

    输入：s = "bbbab"
    输出：4
    解释：一个可能的最长回文子序列为 "bbbb" 。

示例 2：

    输入：s = "cbbd"
    输出：2
    解释：一个可能的最长回文子序列为 "bb" 。
    
提示：
- 1 <= s.length <= 1000
- s 仅由小写英文字母组成
	
## 分析

显然当 s[0]==s[-1] 时，可以转为子问题。当 s[0]!=s[-1] 时，发现也可以转为两个子问题。

因此令 dfs(i, j) 代表 s[i:j+1] 的最长回文子序列的长度，即可递归。

>这是典型的区间 dp。

## 解答

```python
def longestPalindromeSubseq(self, s: str) -> int:
    @lru_cache(None)
    def dfs(i, j):
        if i>=j:
            return j-i+1
        if s[i]==s[j]:
            return 2+dfs(i+1, j-1)
        return max(dfs(i+1, j), dfs(i, j-1))
    
    return dfs(0, len(s)-1)
```
时间复杂度 O(N^2)，852 ms

