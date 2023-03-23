# 0163：缺失的区间


> <u>**[力扣第 163 题](https://leetcode.cn/problems/missing-ranges/)**</u>

## 题目

<p>给定一个排序的整数数组 <em><strong>nums </strong></em>，其中元素的范围在 <strong>闭区间</strong> <strong>[<em>lower, upper</em>]</strong> 当中，返回不包含在数组中的缺失区间。</p>

<p><strong>示例：</strong></p>

<pre><strong>输入: </strong><strong><em>nums</em></strong> = <code>[0, 1, 3, 50, 75]</code>, <strong><em>lower</em></strong> = 0 和 <strong><em>upper</em></strong> = 99,
<strong>输出: </strong><code>[&quot;2&quot;, &quot;4-&gt;49&quot;, &quot;51-&gt;74&quot;, &quot;76-&gt;99&quot;]</code>
</pre>


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


