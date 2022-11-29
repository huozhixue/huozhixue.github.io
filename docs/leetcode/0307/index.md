# 0307：区域和检索 - 数组可修改（★★）


## 题目

给你一个数组 nums ，请你完成两类查询。
- 其中一类查询要求 更新 数组 nums 下标对应的值
- 另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right

实现 NumArray 类：
- NumArray(int[] nums) 用整数数组 nums 初始化对象
- void update(int index, int val) 将 nums[index] 的值 更新 为 val
- int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间
（ 包含 ）的nums元素的 和 （即，nums[left] + nums[left + 1], ..., nums[right]）
 

示例 1：

	输入：
	["NumArray", "sumRange", "update", "sumRange"]
	[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
	输出：
	[null, 9, null, 8]

	解释：
	NumArray numArray = new NumArray([1, 3, 5]);
	numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
	numArray.update(1, 2);   // nums = [1,2,5]
	numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
 

提示：
- 1 <= nums.length <= 3 * 10^4
- -100 <= nums[i] <= 100
- 0 <= index < nums.length
- -100 <= val <= 100
- 0 <= left <= right < nums.length
- 调用 update 和 sumRange 方法次数不大于 3 * 10^4 


## 分析

{{< lc "0303" >}} 升级版，元素不固定了。

每次 sumRange 都挨个求和，显然会有大量不必要的运算。
有个想法是维护一些区间和，修改的数无关时就无需重新计算区间和。

这个想法也就是块状数组：
- 将数组分成大小 size 的块，并计算得到每一块的和
- update 时，更新该数所属的块的和即可
- sumRange 时，其中包含的完整的块的和无需再计算，只需计算两边的残块的和
- 完整的块最多有 n//size 个，残块的元素个数不超过 2*size 个 
- 因此，当 size 取 $\sqrt n$ 时，sumRange 时间是 $O(\sqrt n)$

## 解答

```python
class NumArray:

    def __init__(self, nums: List[int]):
        n = len(nums)
        self.size = int(sqrt(n))
        self.B = [0]*((n-1)//self.size+1)
        for i in range(n):
            self.B[i//self.size] += nums[i]
        self.nums = nums

    def update(self, index: int, val: int) -> None:
        self.B[index//self.size] += val-self.nums[index]
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        m, nums = self.size, self.nums
        l, r = left//m, right//m
        if l==r:
            return sum(nums[left:right+1])
        return sum(self.B[l+1:r])+sum(nums[left:(l+1)*m])+ sum(nums[r*m:right+1])
```
792 ms

## *附加

还有个更巧妙的方法来维护一些区间和，即树状数组。

树状数组专门针对 单点更新+区间查询 的情况，实现时间复杂度 O(logN)。

> 为了方便，用 tree[i] 维护数组 **[0]+nums** 的区间 (i-lowbit(i), i] 的和

```python
class NumArray:

    def __init__(self, nums: List[int]):
        self.nums = nums
        self.tree = [0] * (len(nums)+1)
        for i, num in enumerate(nums):
            self.add(i+1, num)

    def lowbit(self, x):
        return x & -x

    def add(self, i, x):
        while i < len(self.tree):
            self.tree[i] += x
            i += self.lowbit(i)

    def query(self, i):
        res = 0
        while i:
            res += self.tree[i]
            i -= self.lowbit(i)
        return res

    def update(self, index: int, val: int) -> None:
        self.add(index+1, val-self.nums[index])
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        return self.query(right+1) - self.query(left)
```
1116 ms 
