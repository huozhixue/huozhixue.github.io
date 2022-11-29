# 0367：有效的完全平方数（★）



## 题目

给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。

进阶：不要 使用任何内置的库函数，如 sqrt 。

 
示例 1：

    输入：num = 16
    输出：true

示例 2：
    
    输入：num = 14
    输出：false
 
 提示： 
 - 1 <= num <= 2^31 - 1
 
## 分析

{{< lc "0069" >}} 升级版，找到平方根取整后，判断其平方是否等于 num 即可。

找平方根可以用二分查找，也可以用牛顿迭代法。

## 解答

```python
def isPerfectSquare(self, num: int) -> bool:
    i = num
    while i * i > num:
        i = (i+num//i) // 2
    return i * i == num
```
32 ms

