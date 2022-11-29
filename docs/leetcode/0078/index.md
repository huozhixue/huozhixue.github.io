# 0078：子集（★）


## 题目

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。


示例 1：

    输入：nums = [1,2,3]
    输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

示例 2：

    输入：nums = [0]
    输出：[[],[0]]
	
提示：
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
- nums 中的所有元素 互不相同
     

## 分析

### #1

典型的回溯问题，遍历时有取或不取两种选择。

```python
def subsets(self, nums: List[int]) -> List[List[int]]:
    def dfs(i):
        res.append(path[:])
        for j in range(i, n):
            path.append(nums[j])
            dfs(j+1)
            path.pop()

    res, path, n = [], [], len(nums)
    dfs(0)
    return res
```
32 ms

### #2

实际应用中常用递推式的写法。

令 dp[i] 代表 nums[:i] 的所有子集，则：

	dp[i] = dp[i-1]+[sub+[nums[i]] for sub in dp[i-1]]
	
## 解答

```python
def subsets(self, nums: List[int]) -> List[List[int]]:
    res = [[]]
    for x in nums:
        res += [sub+[x] for sub in res]
    return res
```
40 ms
