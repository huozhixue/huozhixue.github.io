# 0046：全排列（★）


## 题目

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：

    输入：nums = [1,2,3]
    输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

示例 2：

    输入：nums = [0,1]
    输出：[[0,1],[1,0]]

示例 3：

    输入：nums = [1]
    输出：[[1]]
	
提示：
- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- nums 中的所有整数 互不相同
     
## 分析 

### #1

python 里可以直接调库。

```python
def permute(self, nums: List[int]) -> List[List[int]]:
	return list(permutations(nums))
```

40 ms

### #2

自己实现可以用 dfs，依次选择数字即可。
注意标记选过的数字。

## 解答

```python
def permute(self, nums: List[int]) -> List[List[int]]:
    def dfs(path):
        if len(path) == len(nums):
            res.append(path)
        for i, num in enumerate(nums):
            if i not in vis:
                vis.add(i)
                dfs(path+[num])
                vis.remove(i)
                
    res, vis = [], set()
    dfs([])
    return res
```
28 ms
