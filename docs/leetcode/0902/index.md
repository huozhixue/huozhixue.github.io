# 0902：最大为 N 的数字组合（★★★）


> **第 101 场周赛第 3 题**

## 题目

给定一个按 非递减顺序 排列的数字数组 digits 。你可以用任意次数 digits[i] 来写的数字。
例如，如果 digits = ['1','3','5']，我们可以写数字，如 '13', '551', 和 '1351315'。

返回 可以生成的小于或等于给定整数 n 的正整数的个数 。

 

示例 1：

    输入：digits = ["1","3","5","7"], n = 100
    输出：20
    解释：
    可写出的 20 个数字是：
    1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.
示例 2：

    输入：digits = ["1","4","9"], n = 1000000000
    输出：29523
    解释：
    我们可以写 3 个一位数字，9 个两位数字，27 个三位数字，
    81 个四位数字，243 个五位数字，729 个六位数字，
    2187 个七位数字，6561 个八位数字和 19683 个九位数字。
    总共，可以使用D中的数字写出 29523 个整数。
示例 3:
    
    输入：digits = ["7"], n = 8
    输出：1
 

提示：
- 1 <= digits.length <= 9
- digits[i].length == 1
- digits[i] 是从 '1' 到 '9' 的数
- digits 中的所有值都 不同 
- digits 按 非递减顺序 排列
- 1 <= n <= 10^9


 
## 分析

### #1

求范围内数字满足某种性质的个数，容易想到用数位 dp，令 dfs(pos, state, bound) 代表某个状态下的结果：
- 遍历到 n 的第 pos 位
- state 代表前面是否取了数
- bound 代表前面取的数是否贴着 n 的上界

即可递归。

特别注意，“什么也不取”也被计算了，最后需要减去。

```python
def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
    @lru_cache(None)
    def dfs(pos, state, bound):
        if pos==len(s):
            return 1
        res, cur = 0, s[pos]
        for x in digits:
            if not bound or x<=cur:
                res += dfs(pos+1, False, bound and x==cur)
        if state:
            res += dfs(pos+1, state, False)
        return res
    
    s = str(n)
    return dfs(0, True, True)-1
```
44 ms

### #2

也可以利用排列组合知识直接分段计算。例如对于 n=7382，digits=["1","3","5","7"]：
    
- [0, 1000) 的对应个数：4+4^2+4^3
- [1000, 7000) 的对应个数：3*4^3     
- [7000, 7300) 的对应个数：1*4^2
- [7300, 7380) 的对应个数：4*4
- [7380, 7382) 的对应个数：0

具体实现时，假设 s=str(n) 的长度为 m：
- 先计算 0-10^(m-1) 的对应个数
- 然后遍历 i，在 s[:i] 不变的情况下，求 s[i] 能取的值，即 digits 中比 s[i] 小的值，
然后求 s[i+1:] 的可能排列个数

> 为了方便，可以先将 n 加 1，变为开区间

## 解答

```python
def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
    s = str(n+1)
    m, k = len(s), len(digits)
    res = (k**m-k)//(k-1) if k>1 else k*(m-1)
    for i, cur in enumerate(s):
        cand = [x for x in digits if x<cur]
        res += len(cand)*pow(k, m-1-i)
        if cur not in digits:
            break
    return res
```
40 ms

