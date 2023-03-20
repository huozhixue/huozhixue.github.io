# 0163：缺失的区间（★）


## 题目

给定一个排序的整数数组 nums ，其中元素的范围在 闭区间 [lower, upper] 当中，
返回不包含在数组中的缺失区间。

示例：
- 输入: nums = [0, 1, 3, 50, 75], lower = 0 和 upper = 99,
- 输出: ["2", "4->49", "51->74", "76->99"]



## 分析

遍历 nums 的间隔并分类按格式添加即可。

为了方便，可以将 lower-1、upper+1 也添加到 nums 中，一次遍历即可。


## 解答

```python
def findMissingRanges(self, nums: List[int], lower: int, upper: int) -> List[str]:
    res = []
    for a, b in pairwise([lower-1]+nums+[upper+1]):
        if b-a>=2:
            s = '%d->%d'%(a+1, b-1) if b-a>2 else str(a+1)
            res.append(s)
    return res
```
32 ms


