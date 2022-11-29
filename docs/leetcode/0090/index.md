# 0090：子集 II（★★）


## 题目

给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。


示例 1：

    输入：nums = [1,2,2]
    输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

示例 2：
    
    输入：nums = [0]
    输出：[[],[0]]
	

提示：
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
     

## 分析

{{< lc "0078" >}} 升级版，区别在于可能有重复数字，采用排序并跳过相同数字的通用方法即可。

## 解答

```python
def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
    def dfs(i):
        res.append(path[:])
        for j in range(i, n):
            if j > i and nums[j] == nums[j - 1]:
                continue
            path.append(nums[j])
            dfs(j + 1)
            path.pop()

    res, path, n = [], [], len(nums)
    nums.sort()
    dfs(0)
    return res
```
28 ms
