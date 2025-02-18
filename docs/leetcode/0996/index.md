# 0996：平方数组的数目（1932 分）


> <u>**[力扣第 124 场周赛第 4 题](https://leetcode.cn/problems/number-of-squareful-arrays/)**</u>

## 题目

<p>如果一个数组的任意两个相邻元素之和都是 <strong>完全平方数 </strong>，则该数组称为 <strong>平方数组 </strong>。</p>

<p>给定一个整数数组 <code>nums</code>，返回所有属于 <strong>平方数组 </strong>的 <code>nums</code> 的排列数量。</p>

<p>如果存在某个索引 <code>i</code> 使得 <code>perm1[i] != perm2[i]</code>，则认为两个排列 <code>perm1</code> 和 <code>perm2</code> 不同。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,17,8]
<strong>输出：</strong>2
<strong>解释：</strong>[1,8,17] 和 [17,8,1] 是有效的排列。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,2]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 12</code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0047：全排列 II](/leetcode/0047)


## 分析
### #1

- 典型的状压 dp，令 dfs(st,i) 代表子集 st 且末尾是 nums[i] 的排列数，枚举下一个数即可递归
- 需要去掉重复的排列，可以利用组合数学的知识，对于重复 v 次的数，除以 v 的阶乘即可

```python
class Solution:
    def numSquarefulPerms(self, nums: List[int]) -> int:
        @cache
        def dfs(st,i):
            if st==(1<<n)-1:
                return 1
            res,x = 0,nums[i]
            for j,y in enumerate(nums):
                if not st&1<<j and (i==-1 or isqrt(x+y)**2==x+y):
                    res += dfs(st|1<<j,j)
            return res

        n = len(nums)
        s = dfs(0,-1)
        for v in Counter(nums).values():
            s //= factorial(v)
        return s
```
171 ms

### #2

- 解决重复排列还有种常用方法：枚举时，在相同的数中只考虑第一个
- 本题中，将 nums 排序，枚举到 nums[i] 时，假如 nums[i-1]=nums[i] 且 i-1 位于子集 st 中，那么 nums[i] 不考虑
## 解答


```python
class Solution:
    def numSquarefulPerms(self, nums: List[int]) -> int:
        @cache
        def dfs(st,i):
            if st==(1<<n)-1:
                return 1
            res,x = 0,nums[i]
            for j,y in enumerate(nums):
                if j and nums[j-1]==y and not st&1<<(j-1):
                    continue
                if not st&1<<j and (i==-1 or isqrt(x+y)**2==x+y):
                    res += dfs(st|1<<j,j)
            return res

        n = len(nums)
        nums.sort()
        return dfs(0,-1)
```
0 ms
