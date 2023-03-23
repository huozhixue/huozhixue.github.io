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

{{< lc "0247" >}} 升级版，递推得到所有不超过 high 长度的中心对称数，判断是否在范围内即可。

注意最外层为 0 的不能计数。

## 解答

```python
def strobogrammaticInRange(self, low: str, high: str) -> int:
    n, low, high = len(high), int(low), int(high)
    dp = [[] for _ in range(n+1)]
    dp[0], dp[1] = [''], ['0', '1', '8']
    res = sum(low<=int(x)<=high for x in dp[1])
    for i in range(2, n+1):
        dp[i] = [a+sub+b for sub in dp[i-2] for a,b in zip('1689', '1986')]
        res += sum(low<=int(x)<=high for x in dp[i])
        dp[i].extend(['0'+sub+'0' for sub in dp[i-2]])
    return res
```
128 ms
