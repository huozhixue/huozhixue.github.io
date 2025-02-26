# 0047：全排列 II（★）


> <u>**[力扣第 47 题](https://leetcode.cn/problems/permutations-ii/)**</u>

## 题目

<p>给定一个可包含重复数字的序列 <code>nums</code> ，<em><strong>按任意顺序</strong></em> 返回所有不重复的全排列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,2]
<strong>输出：</strong>
[[1,1,2],
[1,2,1],
[2,1,1]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 8</code></li>
<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>
</ul>


**相似问题：**
- [0031：下一个排列](/leetcode/0031)
- [0046：全排列](/leetcode/0046)
- [0267：回文排列 II](/leetcode/0267)
- [0996：平方数组的数目（1932 分）](/leetcode/0996)


## 分析 

### #1

  {{< lc "0046" >}} 升级版，一种通用的的方法是将 nums 先排序，然后相同数只考虑第一个。

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        def dfs():
            if len(path) == len(nums):
                res.append(path[:])
                return
            for i, x in enumerate(nums):
                if x<inf and not (i and nums[i-1]==x):
                    nums[i]=inf
                    path.append(x)
                    dfs()
                    path.pop()
                    nums[i]=x
                    
        nums.sort()
        res, path = [], []
        dfs()
        return res
```
7 ms
### #2
 
 还可以遍历计数器，相同的数也只会考虑一次。

## 解答

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        def dfs():
            if len(path) == len(nums):
                res.append(path[:])
                return
            for x in ct:
                if ct[x]:
                    ct[x]-=1
                    path.append(x)
                    dfs()
                    path.pop()
                    ct[x]+=1

        ct = Counter(nums)  
        res, path = [], []
        dfs()
        return res
```
7 ms

