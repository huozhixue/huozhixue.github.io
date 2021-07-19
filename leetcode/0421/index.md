# 0421：数组中两个数的最大异或值（★★★）


## 题目

给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，
其中 0 ≤ i ≤ j < n 。


你能在O(n)的时间解决这个问题吗？

提示：

- 1 <= nums.length <= 2 * 10^4
- 0 <= nums[i] <= 2^31 - 1


<!--more--> 

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

### #1

结果的二进制表示最多 31 位。为了使结果最大，应该尽可能让二进制的高位取 1。

第 31 位能否取 1 很好判断，只要存在两个数的第 31 位分别为 0 和 1 即可。
如果第 31 位能取 1，也就是 $\overline{1...}$能取到，接着要判断 $\overline{11...}$ 能否取到。

遍历每一对数来判断太费时间。有个巧妙的想法是利用异或的一个重要性质：如果 x^y=z，那么 x^z=y。

将每个数的后面 29 位都置 0 保存在哈希表 vis 中。
如果 vis 中的某个值和 $\overline{110...0}$ 的异或在 vis 中，说明能取到，否则将第 30 位置 0。

后面的依此类推，每一轮可以在 O(N) 时间内判断，因此最后是 O(31*N)=O(N)。

```python
def findMaximumXOR(self, nums: List[int]) -> int:
    res = 0
    for i in range(30, -1, -1):
        tmp, vis = res | (1 << i), {num >> i << i for num in nums}
        res = tmp if any(val ^ tmp in vis for val in vis) else res
    return res
```

668 ms

### #2

有个更通用的字典树解法。

遍历每个数 nums[j], 将 31 位二进制表示当作字符串，添加到字典树中。
然后可以根据当前的字典树在 31 步内找到 max(nums[j]^nums[i] for i in range(j+1))。


## 解答

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



