# 0421：数组中两个数的最大异或值（★★★）


## 题目

给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，
其中 0 ≤ i ≤ j < n 。


你能在O(n)的时间解决这个问题吗？

提示：

- 1 <= nums.length <= 2 * 10^4
- 0 <= nums[i] <= 2^31 - 1


示例 1：

    输入：nums = [3,10,5,25,2,8]
    输出：28
    解释：最大运算结果是 5 XOR 25 = 28.

示例 2：

    输入：nums = [0]
    输出：0

示例 3：

    输入：nums = [2,4]
    输出：6

示例 4：

    输入：nums = [8,10,2]
    输出：10

示例 5：

    输入：nums = [14,70,53,83,49,91,36,80,92,51,66,70]
    输出：127


## 分析

结果的二进制表示最多 31 位。为了使结果最大，应该尽可能让二进制的高位取 1。

假如结果的最大 k 位前缀为 x，那么最大的 k+1 位前缀应该尽量取 (x<<1)+1，如果取不到，那么就是 x<<1。

如果存在两个数的 k 位前缀 y、z，使得 y^z=x，那么 k 位前缀 x 就能取到。
但这样太耗时，有个巧妙的方法是利用异或的重要性质：如果 y^z=x，那么 y^x=z。

将每个数的 k 位前缀保存在哈希表 vis 中。遍历 vis 中的 y，如果 y^x 也在 vis 中，
即代表 k 位前缀 x 能取到。

于是从 k=0 递推到 k=31 的最大 k 位前缀，每轮 O(N) 时间，最终是 O(31*N)=O(N) 时间。

## 解答

```python
def findMaximumXOR(self, nums: List[int]) -> int:
    res = 0
    for i in range(30, -1, -1):
        res, vis = res << 1, {num >> i for num in nums}
        res += int(any((res+1) ^ val in vis for val in vis))
    return res
```

480 ms

## *附加

有个更通用的字典树解法。

遍历每个数 nums[j], 将 31 位二进制表示当作字符串，添加到字典树中。
然后可以根据当前的字典树在 31 步内找到 max(nums[j]^nums[i] for i in range(j+1))。

```python
def findMaximumXOR(self, nums: List[int]) -> int:
    T = lambda: defaultdict(T)
    res, trie = 0, T()
    for num in nums:
        val = bin(num)[2:].zfill(31)
        reduce(dict.__getitem__, val, trie)
        p, tmp = trie, ''
        for bit in val:
            bit_rev = str(int(bit)^1)
            tmp += '1' if bit_rev in p else '0'
            p = p[bit_rev] if bit_rev in p else p[bit]
        res = max(res, int(tmp, 2))
    return res
```
4244 ms



