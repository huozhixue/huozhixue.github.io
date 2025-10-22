# 0248：中心对称数 III（★★）


> <u>**[力扣第 248 题](https://leetcode.cn/problems/strobogrammatic-number-iii/)**</u>

## 题目

<p>给定两个字符串 low 和 high 表示两个整数 <code>low</code> 和 <code>high</code> ，其中 <code>low &lt;= high</code> ，返回 范围 <code>[low, high]</code> 内的 <strong>「中心对称数」</strong>总数  。</p>

<p><strong>中心对称数 </strong>是一个数字在旋转了 <code>180</code> 度之后看起来依旧相同的数字（或者上下颠倒地看）。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> low = "50", high = "100"
<strong>输出:</strong> 3
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> low = "0", high = "0"
<strong>输出:</strong> 1
</pre>



<p><strong>提示:</strong><meta charset="UTF-8" /></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= low.length, high.length &lt;= 15</code></li>
<li><code>low</code> 和 <code>high</code> 只包含数字</li>
<li><code>low &lt;= high</code></li>
<li><code>low</code> and <code>high</code> 不包含任何前导零，除了零本身。</li>
</ul>


## 分析

- 令 cal(s) 返回 [0,s] 范围的对称数
	- s 长度 m，则所有长度<m 的对称数都 <s，令 f[n] 代表长度<=n的对称数个数，可以递推得到 
	- 再考虑长度 m 的数，考虑 s 的前一半（包括中心）t
	- 先考虑第一位就比 t 小的数，后面的数可以任取（只要保证是对称数）
	- 然后考虑第一位和 t 相同，第二位比 t 小的数，同理统计
	- 依此类推，需要注意两点
		- 假如某位不是对称数字，直接退出
		- 非中心数可以选择 0,1,6,8,9，中心数只能选择 0,1,8
	- 最后再判断前一半和 t 完全相同的对称数是否小于 s 即可
- 结果就是 cal(high)-cal(low)，如果 low 是对称数，再加 1 即可

## 解答

```python
f,g = [0]*16,[0]*16
g[0] = 1
f[1] = g[1] = 3
for i in range(2,16):
    f[i] = f[i-1]+g[i-2]*4
    g[i] = g[i-2]*5

A = [0,1,6,8,9]
B = [0,1,8]
d = dict(zip('01689','01986'))

def gen(s):
    return ''.join([d.get(c,'*') for c in s][::-1])

def cal(s):
    m = len(s)
    q,r = divmod(m,2)
    res = f[m-1]
    for i in range(q):
        x = int(s[i])
        w = bisect_left(A,x)
        res += (w if i else w-1)*pow(5,q-1-i)*pow(3,r)
        if x not in A:
            return res
    if r:
        x = int(s[q])
        res += bisect_left(B,x)
        res += x in B and s[:q+r]+gen(s[:q])<=s
    else:
        x = int(s[q-1])
        res += s[:q]+gen(s[:q])<=s
    return res

class Solution:
    def strobogrammaticInRange(self, low: str, high: str) -> int:
        return cal(high)-cal(low)+(gen(low)==low)
```
