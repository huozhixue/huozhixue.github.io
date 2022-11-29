# 0231：2 的幂（★）


## 题目

给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。

如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方。


示例 1：

    输入：n = 1
    输出：true
    解释：20 = 1

示例 2：

    输入：n = 16
    输出：true
    解释：24 = 16

示例 3：
    
    输入：n = 3
    输出：false

示例 4：

    输入：n = 4
    输出：true

示例 5：

    输入：n = 5
    输出：false
 
提示： -2^31 <= n <= 2^31 - 1 

## 分析

n 是 2 的幂等价于 n 是正整数且 n 的二进制中只有一个 1。

那么用 n&(n-1) 移除最后一个 1 即变为 0。或者用 n&(-n) 提取出最后一个 1 后面的部分，应该等于 n。

## 解答

```python
def isPowerOfTwo(self, n: int) -> bool:
    return n>0 and n&(n-1)==0
```
40 ms

## *附加

还有个巧妙的方法。n 是 2 的幂等价于 n 是正整数且 n 被 2**31 整除。

```python
def isPowerOfTwo(self, n: int) -> bool:
    return n>0 and (1<<31)%n==0
```
32 ms
