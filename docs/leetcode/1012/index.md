# 1012：至少有 1 位重复的数字（★★★）


> **第 128 场周赛第 4 题**

## 题目

给定正整数 n，返回在 [1, n] 范围内具有 至少 1 位 重复数字的正整数的个数。

示例 1：

    输入：n = 20
    输出：1
    解释：具有至少 1 位重复数字的正数（<= 20）只有 11 。
示例 2：

    输入：n = 100
    输出：10
    解释：具有至少 1 位重复数字的正数（<= 100）有 11，22，33，44，55，66，77，88，99 和 100 。
示例 3：

    输入：n = 1000
    输出：262
 

提示：
- 1 <= n <= 10^9



## 分析

### #1

可以先求 [0, n] 范围内数字不重复的个数，再用 n+1 减去即可。

求范围内数字满足某种性质的个数，容易想到用数位 dp，令 dfs(pos, state, bound) 代表某个状态下的结果：
- 遍历到 n 的第 pos 位
- 前面取的数的集合状态是 state
- bound 代表前面取的数是否贴着 n 的上界

即可递归。

特别注意前置 0 不应该加入到 state 中。

```python
def numDupDigitsAtMostN(self, n: int) -> int:
    @lru_cache(None)
    def dfs(pos, state, bound):
        if pos==len(s):
            return 1
        res, cur = 0, int(s[pos])
        up = cur if bound else 9
        for x in range(up+1):
            if not state&(1<<x):
                state2 = 0 if x==state==0 else state|(1<<x) 
                res += dfs(pos+1, state2, bound and x==cur)
        return res

    s = str(n)
    return n+1-dfs(0, 0, True)
```
288 ms

### #2

也可以利用排列组合知识直接分段计算。例如对于 n=8382：
    
- [0, 1000) 的数字不重复的个数：9*(perm(9,0)+perm(9,1)+perm(9,2))  
- [1000, 8000) 的对应个数：7*perm(9,3)     
- [8000, 8300) 的对应个数：3*perm(8,2)
- [8300, 8380) 的对应个数：7*perm(7,1)
- [8380, 8382) 的对应个数：0

具体实现时，假设 s=str(n) 的长度为 m：
- 先计算 0-10^(m-1) 的对应个数
- 然后遍历 i，在 s[:i] 不变的情况下，求 s[i] 能取的值，即在 [0, 原 s[i]) 区间且和 s[:i] 不同的值，
然后求 s[i+1:] 的可能排列个数

特别的：
- i==0 时，s[i] 不能取 0
- i==m-1 时，s[i] 可以取到原值
- s[:i] 已经有重复数字时，直接终止遍历

## 解答

```python
def numDupDigitsAtMostN(self, n: int) -> int:
    s = str(n)
    m = len(s)
    res = 9*sum(perm(9, k) for k in range(m-1))
    vis = set()
    for i in range(m):
        cur = int(s[i])
        cand = set(range(int(i==0), cur+int(i==m-1)))-vis
        res += len(cand)*perm(9-i, m-i-1)
        if cur in vis:
            break
        vis.add(cur)
    return n-res
```
36 ms
