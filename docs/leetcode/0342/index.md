# 0342：4的幂（★）


## 题目

给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。

整数 n 是 4 的幂次方需满足：存在整数 x 使得 n == 4^x


示例 1：

    输入：n = 16
    输出：true

示例 2：

    输入：n = 5
    输出：false

示例 3：

    输入：n = 1
    输出：true
	
提示：-2^31 <= n <= 2^31 - 1
 
## 分析

{{< lc "0231" >}} 升级版。n 是 4 的幂等价于 n 是 2 的幂且 n 的二进制中的 1 在偶数位上。

只要 n & 0xAAAAAAAA == 0，即说明 n 的二进制不存在奇数位的 1。

## 解答

```python
def isPowerOfFour(self, n: int) -> bool:
    return n > 0 and n&(n-1) == 0 and n & 0xAAAAAAAA == 0
```
32 ms

