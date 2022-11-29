# 0600：不含连续1的非负整数（★★）


> **第  场周赛第  题**

## 题目

给定一个正整数 n ，返回范围在 [0, n] 都非负整数中，其二进制表示不包含 连续的 1 的个数。

 

示例 1:

    输入: n = 5
    输出: 5
    解释: 
    下面是带有相应二进制表示的非负整数<= 5：
    0 : 0
    1 : 1
    2 : 10
    3 : 11
    4 : 100
    5 : 101
    其中，只有整数3违反规则（有两个连续的1），其他5个满足规则。
示例 2:

    输入: n = 1
    输出: 2
示例 3:
    
    输入: n = 2
    输出: 3
     

提示:
- 1 <= n <= 10^9



## 分析

求范围内数字满足某种性质的个数，典型的数位 dp 问题，
令 dfs(pos, st, bound) 代表某个状态下的结果：
- 遍历到 n 的第 pos 位
- 前面一个数是 st
- bound 代表前面取的数是否贴着 n 的上界

即可递归。

注意本题是限制二进制，所以用 bin。
	
## 解答

```python
def findIntegers(self, n: int) -> int:
    @lru_cache(None)
    def dfs(pos, st, bound):
        if pos==len(s):
            return 1
        res, cur = 0, int(s[pos])
        up = cur if bound else 1
        for x in range(up+1):
            if not x&st:
                res += dfs(pos+1, x, bound and x==cur)
        return res
    
    s = bin(n)[2:]
    return dfs(0, 0, True)
```
64 ms

