# 0485：最大连续 1 的个数



## 题目

给定一个二进制数组，计算其中最大连续 1 的个数。

提示：
- 输入的数组只包含 0 和 1 。
- 输入数组的长度是正整数，且不超过 10,000。
 
示例：

	输入：[1,1,0,1,1,1]
	输出：3
	解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.

## 分析

遍历计数，遇到 0 重新开始计数即可。

## 解答

```python
def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
    res, cnt = 0, 0
    for num in nums:
        cnt = cnt + 1 if num else 0
        res = max(res, cnt)
    return res
```
104 ms
