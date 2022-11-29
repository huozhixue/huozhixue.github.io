# 0260：只出现一次的数字 III（★★）


## 题目

给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 
找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。


示例 1：

	输入：nums = [1,2,1,3,2,5]
	输出：[3,5]
	解释：[5, 3] 也是有效的答案。

示例 2：

	输入：nums = [-1,0]
	输出：[-1,0]

示例 3：

	输入：nums = [0,1]
	输出：[1,0]

提示：
- 2 <= nums.length <= 3 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- 除两个只出现一次的整数外，nums 中的其他数字都出现两次

进阶：你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？


## 分析

### #1

{{< lc "0136"  >}} 升级版，最简单的依然是哈希表。

```python
def singleNumber(self, nums: List[int]) -> List[int]:
	ct = Counter(nums)
	return [num for num in nums if ct[num]==1]
```

44 ms

### #2

同样有巧妙的位运算方法：
- 设出现两次的元素是 a、b
- 将所有数字异或得到 x，显然 x = a^b
- 在 x 的二进制表示中，任选一个为 1 的位置 i，
按二进制的位置 i 是否为 1 可以将 nums 分为两组
- 显然 a、b 必然在不同的组，而相同的数必然在同一组
- 每一组就转为问题 {{< lc "0136">}} 


## 解答

```python
def singleNumber(self, nums: List[int]) -> List[int]:
    x = reduce(xor, nums)
    i = len(bin(x))-3
    a, b = 0, 0
    for num in nums:
        if num & (1<<i):
            a ^= num
        else:
            b ^= num
    return [a, b]
```
40 ms
