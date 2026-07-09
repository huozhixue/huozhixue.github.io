# 1982：从子集的和还原数组（2872 分）


> <u>**[力扣第 255 场周赛第 4 题](https://leetcode.cn/problems/find-array-given-subset-sums/)**</u>

## 题目

<p>存在一个未知数组需要你进行还原，给你一个整数 <code>n</code> 表示该数组的长度。另给你一个数组 <code>sums</code> ，由未知数组中全部 <code>2<sup>n</sup></code> 个 <strong>子集的和</strong> 组成（子集中的元素没有特定的顺序）。</p>

<p>返回一个长度为 <code>n</code> 的数组<em> </em><code>ans</code><em> </em>表示还原得到的未知数组。如果存在 <strong>多种</strong> 答案，只需返回其中 <strong>任意一个</strong> 。</p>

<p>如果可以由数组 <code>arr</code> 删除部分元素（也可能不删除或全删除）得到数组 <code>sub</code> ，那么数组 <code>sub</code> 就是数组 <code>arr</code> 的一个<strong> 子集</strong> 。<code>sub</code> 的元素之和就是 <code>arr</code> 的一个 <strong>子集的和</strong> 。一个空数组的元素之和为 <code>0</code> 。</p>

<p><strong>注意：</strong>生成的测试用例将保证至少存在一个正确答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3, sums = [-3,-2,-1,0,0,1,2,3]
<strong>输出：</strong>[1,2,-3]
<strong>解释：</strong>[1,2,-3] 能够满足给出的子集的和：
- []：和是 0
- [1]：和是 1
- [2]：和是 2
- [1,2]：和是 3
- [-3]：和是 -3
- [1,-3]：和是 -2
- [2,-3]：和是 -1
- [1,2,-3]：和是 0
注意，[1,2,-3] 的任何排列和 [-1,-2,3] 的任何排列都会被视作正确答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2, sums = [0,0,0,0]
<strong>输出：</strong>[0,0]
<strong>解释：</strong>唯一的正确答案是 [0,0] 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 4, sums = [0,0,5,5,4,-1,4,9,9,-1,4,3,4,8,3,8]
<strong>输出：</strong>[0,-1,4,5]
<strong>解释：</strong>[0,-1,4,5] 能够满足给出的子集的和。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 15</code></li>
<li><code>sums.length == 2<sup>n</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= sums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0078：子集](/leetcode/0078)
- [0090：子集 II](/leetcode/0090)
- [2122：还原原数组（2158 分）](/leetcode/2122)


## 分析

- 考虑 sums 的最大数 ma 和次大数 ma2，则要么 ma-ma2 在原数组中，要么 ma2-ma 在原数组中
- 假设 x 在原数组中，则可以将 sums 分为两部分，包含x的和不包含x的，不包含 x 的即是子问题，递归即可

## 解答


```python []
class Solution:
    def recoverArray(self, n: int, sums: List[int]) -> List[int]:
        def gen(A,x):
            ct = Counter(A)
            B,C = [],[]
            for a in A:
                if ct[a]:
                    ct[a] -= 1
                    ct[a+x] -= 1
                    if ct[a+x]<0:
                        return [],[]
                    B.append(a)
                    C.append(a+x)
            return B,C

        def dfs(A):
            if len(A)==2:
                if 0 not in A:
                    return []
                A.remove(0)
                return A
            x = A[-1]-A[-2]
            B,C = gen(A,x)
            if B:
                res = dfs(B)
                if res:
                    return [x]+res 
            if C:
                res = dfs(C)
                if res:
                    return [-x]+res
            return []
        sums.sort()
        return dfs(sums)
```
929 ms
