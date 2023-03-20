# 0358：K 距离间隔重排字符串（★★★）


## 题目

给你一个非空的字符串 s 和一个整数 k ，你要将这个字符串 s 中的字母进行重新排列，
使得重排后的字符串中相同字母的位置间隔距离 至少 为 k 。如果无法做到，请返回一个空字符串 ""。


示例 1：

	输入: s = "aabbcc", k = 3
	输出: "abcabc" 
	解释: 相同的字母在新的字符串中间隔至少 3 个单位距离。

示例 2:

	输入: s = "aaabc", k = 3
	输出: "" 
	解释: 没有办法找到可能的重排结果。

示例 3:

	输入: s = "aaadbbcc", k = 2
	输出: "abacabcd"
	解释: 相同的字母在新的字符串中间隔至少 2 个单位距离。
	 

提示：
- 1 <= s.length <= 3 * 10^5
- s 仅由小写英文字母组成
- 0 <= k <= s.length


## 分析

类似 {{< lc "0621" >}}，优先选剩余最多且能放的字符即可。

可以用堆维护剩余的字符及个数，用队列维护暂时不能放的字符。


## 解答

```python
def rearrangeString(self, s: str, k: int) -> str:
    pq = [(-freq, c) for c,freq in Counter(s).items()]
    heapify(pq)
    res, busy = '', deque()
    for i in range(len(s)):
        if busy and busy[0][2]<=i-k:
            heappush(pq, busy.popleft()[:2])
        if not pq:
            return ''
        freq, c = heappop(pq)
        res += c
        if freq<-1:
            busy.append((freq+1, c, i))
    return res
```
124 ms

