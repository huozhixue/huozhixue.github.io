# 0398：随机数索引（★★）



## 题目

给定一个可能含有重复元素的整数数组，要求随机输出给定的数字的索引。 您可以假设给定的数字一定存在于数组中。

注意：数组大小可能非常大。 使用太多额外空间的解决方案将不会通过测试。

 <!--more--> 
 
示例:
    
    int[] nums = new int[] {1,2,3,3,3};
    Solution solution = new Solution(nums);
    
    // pick(3) 应该返回索引 2,3 或者 4。每个索引的返回概率应该相等。
    solution.pick(3);
    
    // pick(1) 应该返回 0。因为只有nums[0]等于1。
    solution.pick(1);



## 分析

### #1

最简单的就是用哈希表保存每个数对应的索引列表。

```python
class Solution:

    def __init__(self, nums: List[int]):
        self.d = defaultdict(list)
        for i, num in enumerate(nums):
            self.d[num].append(i)

    def pick(self, target: int) -> int:
        return random.choice(self.d[target])
```

148 ms

### #2

要求额外空间小，想到蓄水池抽样。遇到第 cnt 个等于 target 的数时，以 1/cnt 的概率将该数的索引赋值给 res。

## 解答

```python
class Solution:

    def __init__(self, nums: List[int]):
        self.nums = nums

    def pick(self, target: int) -> int:
        res, cnt = 0, 0
        for i, num in enumerate(self.nums):
            if num == target:
                cnt += 1
                if random.randint(1, cnt) == cnt:
                    res = i
        return res
```

112 ms


