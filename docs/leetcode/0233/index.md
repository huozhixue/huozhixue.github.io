# 0233：数字 1 的个数（★★★）


## 题目

给定一个整数 n，计算所有小于等于 n 的非负整数中数字 1 出现的个数。

示例 1：

    输入：n = 13
    输出：6

示例 2：
    
    输入：n = 0
    输出：0

提示：0 <= n <= 10^9 

## 分析

求范围内数字满足某种性质的个数，典型的数位 dp 问题。

令 dfs(pos, st, bound) 代表某个状态下的结果：
- 遍历到 n 的第 pos 位
- 前面取的数中有 st 个 1
- bound 代表前面取的数是否贴着 n 的上界

即可递归。

## 解答

```python
def countDigitOne(self, n: int) -> int:
    @lru_cache(None)
    def dfs(pos, st, bound):
        if pos == len(s):
            return st
        cur = int(s[pos])
        up = cur if bound else 9
        return sum(dfs(pos+1, st+(x==1), bound and x==cur) for x in range(up+1))

    s = str(n)
    return dfs(0, 0, 1)
```
32 ms
