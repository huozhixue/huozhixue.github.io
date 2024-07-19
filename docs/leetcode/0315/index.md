# 0315：计算右侧小于当前元素的个数（★★）


> <u>**[力扣第 315 题](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code><em> </em>，按要求返回一个新数组 <code>counts</code><em> </em>。数组 <code>counts</code> 有该性质： <code>counts[i]</code> 的值是  <code>nums[i]</code> 右侧小于 <code>nums[i]</code> 的元素的数量。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,2,6,1]
<strong>输出：</strong><code>[2,1,1,0]
<strong>解释：</strong></code>
5 的右侧有 <strong>2 </strong>个更小的元素 (2 和 1)
2 的右侧仅有 <strong>1 </strong>个更小的元素 (1)
6 的右侧有 <strong>1 </strong>个更小的元素 (1)
1 的右侧有 <strong>0 </strong>个更小的元素
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1]
<strong>输出：</strong>[0]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,-1]
<strong>输出：</strong>[0,0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0327：区间和的个数](/leetcode/0327)
- [0406：根据身高重建队列](/leetcode/0406)
- [0493：翻转对](/leetcode/0493)
- [1365：有多少小于当前数字的数字（1152 分）](/leetcode/1365)
- [2179：统计数组中好三元组数目（2272 分）](/leetcode/2179)
- [2519：统计 K-Big 索引的数量](/leetcode/2519)


## 分析


### #1
考虑从右往左遍历，维护右侧元素的有序集合，二分查找即可。 


```python
class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        from sortedcontainers import SortedList
        res = []
        sl = SortedList()
        for x in nums[::-1]:
            res.append(sl.bisect_left(x))
            sl.add(x)
        return res[::-1]
```
727 ms

### #2

也可以用树状数组维护，注意先离散化处理负数。

## 解答

```python
class BIT:
    def __init__(self,n):
        self.n = n+1
        self.t = [0]*(n+1)
    
    def update(self,i,x):
        i += 1
        while i<self.n:
            self.t[i]+=x
            i += i&-i
    
    def get(self,i):
        res,i = 0,i+1
        while i:
            res += self.t[i]
            i &= i-1
        return res

class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        d = {x:i for i,x in enumerate(sorted(set(nums)))}
        A = [d[x] for x in nums[::-1]]
        res = []
        tree = BIT(max(A)+1)
        for x in A:
            res.append(tree.get(x-1))
            tree.update(x,1)
        return res[::-1]
```
607 ms

## *附加

- 还可以类似归并排序，采用cdq分治法
	- 先递归地将前后两部分排序
	- 然后归并两部分，并计算后半部分对前半部分的贡献
	- 于是在递归过程中，计算出了所有后面元素对前面元素的贡献
- 提前将下标排序，dfs 只需计算贡献，就可以随意改变子问题递归的顺序，能解决更多问题

```python
class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        def cdq(A,l,r):
            if l==r:
                return
            m = (l+r)//2
            B,C = [],[]
            for i in A:
                if i>m:
                    C.append(i)
                else:
                    B.append(i)
                    res[i]+=len(C)
            cdq(B,l,m)
            cdq(C,m+1,r)
        n = len(nums)
        res = [0]*n
        A = sorted(range(n),key=lambda i:nums[i])
        cdq(A,0,n-1)
        return res
```
695 ms
