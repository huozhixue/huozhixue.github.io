# 0229：求众数 II（★★）


## 题目

给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

示例 1：
    
    输入：[3,2,3]
    输出：[3]

示例 2：

    输入：nums = [1]
    输出：[1]

示例 3：

    输入：[1,1,1,3,3,2,2,2]
    输出：[1,2]
 

提示：
- 1 <= nums.length <= 5 * 10^4
- -10^9 <= nums[i] <= 10^9

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。

## 分析

{{< lc "0169" >}} 升级版，可以直接计数，也可以考虑摩尔投票法。
- 在 nums 中任意消除三个不同的数直到剩下两种数或一种数
- 假如 nums 中存在超过 ⌊ n/3 ⌋ 次的元素，那么该元素必然会留下来
- 因此检查最终留下来的数是否符合即可

> 这可以推广到求超过 ⌊ n/k ⌋ 次的元素。

## 解答

```python
def majorityElement(self, nums: List[int]) -> List[int]:
    d = defaultdict(int)
    for num in nums:
        d[num] += 1
        if len(d)==3:
            for x in list(d):
                d[x] -= 1
                if d[x] == 0:
                    del d[x]
    return [x for x in d if nums.count(x)>len(nums)//3]
```
52 ms
