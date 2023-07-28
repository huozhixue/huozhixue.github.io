# 0358：K 距离间隔重排字符串（★★）


> <u>**[力扣第 358 题](https://leetcode.cn/problems/rearrange-string-k-distance-apart/)**</u>

## 题目

<p>给你一个非空的字符串 <code>s</code> 和一个整数 <code>k</code> ，你要将这个字符串 <code>s</code> 中的字母进行重新排列，使得重排后的字符串中相同字母的位置间隔距离 <strong>至少</strong> 为 <code>k</code> 。如果无法做到，请返回一个空字符串 <code>""</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong>s = "aabbcc", k = 3
<strong>输出: </strong>"abcabc"
<strong>解释: </strong>相同的字母在新的字符串中间隔至少 3 个单位距离。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>s = "aaabc", k = 3
<strong>输出: </strong>""
<strong>解释:</strong> 没有办法找到可能的重排结果。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>s = "aaadbbcc", k = 2
<strong>输出: </strong>"abacabcd"
<strong>解释:</strong> 相同的字母在新的字符串中间隔至少 2 个单位距离。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
<li><code>0 &lt;= k &lt;= s.length</code></li>
</ul>


## 分析

类似 {{< lc "0621" >}}，优先选剩余最多且能放的字符即可。

可以用堆维护剩余的字符及个数，用队列维护暂时不能放的字符。


## 解答

```python
class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        n = len(s)
        free = sorted((-w,c) for c,w in Counter(s).items())
        res, busy = [], deque()
        for i in range(n):
            while busy and busy[0][0]<=i:
                heappush(free,busy.popleft()[1:])
            if not free:
                return ''
            w,c = heappop(free)
            res.append(c)
            if -w-1>0:
                busy.append((i+k,w+1,c))
        return ''.join(res)
```
100 ms

