# 1461：检查一个字符串是否包含所有长度为 K 的二进制子串（★★）




## 题目

给你一个二进制字符串 s 和一个整数 k 。如果所有长度为 k 的二进制字符串都是 s 的子串，
请返回 true ，否则请返回 false 。

 

示例 1：

    输入：s = "00110110", k = 2
    输出：true
    解释：长度为 2 的二进制串包括 "00"，"01"，"10" 和 "11"。
    它们分别是 s 中下标为 0，1，3，2 开始的长度为 2 的子串。
示例 2：
    
    输入：s = "0110", k = 1
    输出：true
    解释：长度为 1 的二进制串包括 "0" 和 "1"，显然它们都是 s 的子串。
示例 3：

    输入：s = "0110", k = 2
    输出：false
    解释：长度为 2 的二进制串 "00" 没有出现在 s 中。
 

提示：
- 1 <= s.length <= 5 * 10^5
- s[i] 不是'0' 就是 '1'
- 1 <= k <= 20


## 分析

### #1

最简单的就是看所有长度 k 的子串集合是否有 2^k 个即可。

```python
def hasAllCodes(self, s: str, k: int) -> bool:
    return len({s[i:i+k] for i in range(len(s)-k+1)})==(1<<k)
```
356 ms

### #2

注意到如果将子串用对应的十进制值代替，那么相邻的子串的值可以递推，从而节省时间。

这其实就是滚动哈希的思想。


## 解答

```python
def hasAllCodes(self, s: str, k: int) -> bool:
    res, w = set(), 0
    for j, char in enumerate(s):
        w = w*2+(char=='1')
        if j>=k:
            w -= (s[j-k]=='1')*(1<<k)
        if j>=k-1:
            res.add(w)
    return len(res)==(1<<k)
```
600 ms


