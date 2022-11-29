# 0041：缺失的第一个正数（★★）


## 题目

给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 

示例 1：
    
    输入：nums = [1,2,0]
    输出：3

示例 2：

    输入：nums = [3,4,-1,1]
    输出：2

示例 3：

    输入：nums = [7,8,9,11,12]
    输出：1
 

提示：
- 1 <= nums.length <= 5 * 10^5
- -2^31 <= nums[i] <= 2^31 - 1



## 分析 

### #1

最简单地，遍历 1 到 max(nums)+1，没出现就返回。

```python
def firstMissingPositive(self, nums: List[int]) -> int:
    nums = set(nums)
    for x in range(1, max(0, max(nums, default=0))+2):
        if x not in nums:
            return x
```
84 ms

### #2

不过题目要求 O(1) 空间，那么只能考虑交换或赋值了。
- 有个巧妙的想法是把正数都放在对应的位置上，比如 1 放在第 1 位，3 放在第 3 位，
那么再遍历就能发现缺的第一个正数了
- 本题不能直接赋值，可能会覆盖掉有用信息，所以考虑交换
- 如果交换过来还是范围内的正数，应该循环操作
- 为了防止死循环，当要交换的两个数相等时就应跳出

## 解答

```python
def firstMissingPositive(self, nums: List[int]) -> int:
    n = len(nums)
    for i, x in enumerate(nums):
        while 1 <= x <= n and x != nums[x-1]:
            nums[i], nums[x-1] = nums[x-1], nums[i]
            x = nums[i]
    for i, x in enumerate(nums):
        if x != i + 1:
            return i + 1
    return n + 1
```
228 ms
