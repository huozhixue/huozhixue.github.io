# 0248：中心对称数 III（★★）


## 题目

给定两个字符串 low 和 high 表示两个整数 low 和 high ，其中 low <= high ，
返回 范围 [low, high] 内的 「中心对称数」总数  。

中心对称数 是一个数字在旋转了 180 度之后看起来依旧相同的数字（或者上下颠倒地看）。


示例 1:

	输入: low = "50", high = "100"
	输出: 3 

示例 2:

	输入: low = "0", high = "0"
	输出: 1
 

提示:
- 1 <= low.length, high.length <= 15
- low 和 high 只包含数字
- low <= high
- low and high 不包含任何前导零，除了零本身。


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
