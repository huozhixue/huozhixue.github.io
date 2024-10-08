# 0565：数组嵌套（★）


> <u>**[力扣第 565 题](https://leetcode.cn/problems/array-nesting/)**</u>

## 题目

<p>索引从<code>0</code>开始长度为<code>N</code>的数组<code>A</code>，包含<code>0</code>到<code>N - 1</code>的所有整数。找到最大的集合<code>S</code>并返回其大小，其中 <code>S[i] = {A[i], A[A[i]], A[A[A[i]]], ... }</code>且遵守以下的规则。</p>

<p>假设选择索引为<code>i</code>的元素<code>A[i]</code>为<code>S</code>的第一个元素，<code>S</code>的下一个元素应该是<code>A[A[i]]</code>，之后是<code>A[A[A[i]]]...</code> 以此类推，不断添加直到<code>S</code>出现重复的元素。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> A = [5,4,0,3,1,6,2]
<strong>输出:</strong> 4
<strong>解释:</strong>
A[0] = 5, A[1] = 4, A[2] = 0, A[3] = 3, A[4] = 1, A[5] = 6, A[6] = 2.

其中一种最长的 S[K]:
S[0] = {A[0], A[5], A[6], A[2]} = {5, 6, 2, 0}
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt; nums.length</code></li>
<li><code>A</code>中不含有重复的元素。</li>
</ul>


**相似问题：**
- [0339：嵌套列表加权和](/leetcode/0339)
- [0341：扁平化嵌套列表迭代器](/leetcode/0341)
- [0364：嵌套列表加权和 II](/leetcode/0364)


## 分析

- 由于不含重复元素，所以这种序列必然组成几个环
- 遍历找最大的环长即可
## 解答


```python
class Solution:
    def arrayNesting(self, nums: List[int]) -> int:
        res = 0
        vis = set()
        for x in nums:
            cnt = 0
            while x not in vis:
                vis.add(x)
                x = nums[x]
                cnt += 1
            res = max(res,cnt)
        return res
```
276 ms
