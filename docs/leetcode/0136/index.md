# 0136：只出现一次的数字（★）


## 题目

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。
找出那个只出现了一次的元素。

说明：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

    输入: [2,2,1]
    输出: 1

示例 2:
    
    输入: [4,1,2,1,2]
    输出: 4


## 分析

### #1

最简单的就是哈希表。

```python
def singleNumber(self, nums: List[int]) -> int:
    return [x for x,freq in Counter(nums).items() if freq==1].pop()
```

40 ms

### #2

要求不用额外空间实现，有个非常巧妙的思路，利用了异或运算的特性。
- 满足交换律和结合律
- x^x=0
- x^0=x

可以推出：题目所给数组的所有元素的异或结果即为所求。

## 解答

```python
def singleNumber(self, nums: List[int]) -> int:
    return reduce(xor, nums)
```
40 ms

