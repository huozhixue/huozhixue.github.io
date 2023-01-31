# 1998：数组的最大公因数排序（★★★）


> **第 257 场周赛第 4 题**

## 题目

给你一个整数数组 nums ，你可以在 nums 上执行下述操作 任意次 ：

如果 gcd(nums[i], nums[j]) > 1 ，交换 nums[i] 和 nums[j] 的位置。
其中 gcd(nums[i], nums[j]) 是 nums[i] 和 nums[j] 的最大公因数。

如果能使用上述交换方式将 nums 按 非递减顺序 排列，返回 true ；否则，返回 false 。


提示：
- 1 <= nums.length <= 3 * 10^4
- 2 <= nums[i] <= 10^5


示例 1：

    输入：nums = [7,21,3]
    输出：true
    解释：可以执行下述操作完成对 [7,21,3] 的排序：
    - 交换 7 和 21 因为 gcd(7,21) = 7 。nums = [21,7,3]
    - 交换 21 和 3 因为 gcd(21,3) = 3 。nums = [3,7,21]

示例 2：

    输入：nums = [5,2,6,2]
    输出：false
    解释：无法完成排序，因为 5 不能与其他元素交换。

示例 3：
    
    输入：nums = [10,5,9,3,15]
    输出：true
    解释：
    可以执行下述操作完成对 [10,5,9,3,15] 的排序：
    - 交换 10 和 15 因为 gcd(10,15) = 5 。nums = [15,5,9,3,10]
    - 交换 15 和 3 因为 gcd(15,3) = 3 。nums = [3,5,9,15,10]
    - 交换 10 和 15 因为 gcd(10,15) = 5 。nums = [3,5,9,10,15]
 

## 分析

观察发现，只要 a、b 不互质，b、c 不互质，那么 a、b、c 可交换为任意顺序。

将 a、b 不互质看作是顶点 a、b 之间连了一条边。那么只要 a、b 连通，a、b 就可交换。

因此遍历数据范围内的质数 p，将 nums 中 p 的倍数都连通。
最终判断 nums 和 sorted(nums) 相同位置上不同的数是否连通即可。

## 解答

```python
def gcdSort(self, nums: List[int]) -> bool:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    M, vis = max(nums)+1, set(nums)
    f, flags = list(range(M)), [1] * M
    for p in range(2, M):
        if flags[p]:
            for x in range(p * 2, M, p):
                flags[x] = 0
                if x in vis:
                    union(x, p)
    return all(a==b or find(a)==find(b) for a, b in zip(nums, sorted(nums)))
```
时间复杂度 $O(N * logN+M * logM)$，656 ms

