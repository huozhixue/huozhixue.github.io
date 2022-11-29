# 0072：编辑距离（★★）


## 题目

给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：
- 插入一个字符
- 删除一个字符
- 替换一个字符


示例 1：

	输入：word1 = "horse", word2 = "ros"
	输出：3
	解释：
	horse -> rorse (将 'h' 替换为 'r')
	rorse -> rose (删除 'r')
	rose -> ros (删除 'e')
	
示例 2：

	输入：word1 = "intention", word2 = "execution"
	输出：5
	解释：
	intention -> inention (删除 't')
	inention -> enention (将 'i' 替换为 'e')
	enention -> exention (将 'n' 替换为 'x')
	exention -> exection (将 'n' 替换为 'c')
	exection -> execution (插入 'u')

提示：
- 0 <= word1.length, word2.length <= 500
- word1 和 word2 由小写英文字母组成

## 分析

### #1

典型的双串 dp，令 dp[i][j] 表示 word1[:i] 和 word2[:j] 的编辑距离，即可递推。

```python
def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1):
        for j in range(n+1):
            if i==0 or j==0:
                dp[i][j] = i+j
            elif word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1+ min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])
    return dp[-1][-1]
```
164 ms

### #2

可以用滚动数组优化空间。

## 解答

```python
def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = list(range(n+1))
    for i in range(1, m+1):
        prev = dp[:]
        dp[0] = i
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[j] = prev[j-1]
            else:
                dp[j] = 1+ min(dp[j-1], prev[j], prev[j-1])
    return dp[-1]
```
112 ms
