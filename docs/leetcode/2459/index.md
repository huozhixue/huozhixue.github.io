# 2459：通过移动项目到空白区域来排序数组（★★）


> <u>**[力扣第 2459 题](https://leetcode.cn/problems/sort-array-by-moving-items-to-empty-space/)**</u>

## 题目

<p>给定一个大小为 <code>n</code> 的整数数组 <code>nums</code>，其中包含从 <code>0</code> 到 <code>n - 1</code> (<strong>包含边界</strong>) 的 <strong>每个 </strong>元素。从 <code>1</code> 到 <code>n - 1</code> 的每一个元素都代表一项目，元素 <code>0</code> 代表一个空白区域。</p>

<p>在一个操作中，您可以将 <strong>任何 </strong>项目移动到空白区域。如果所有项目的编号都是 <strong>升序 </strong>的，并且空格在数组的开头或结尾，则认为 <code>nums</code> 已排序。</p>

<p data-group="1-1">例如，如果 <code>n = 4</code>，则 <code>nums</code> 按以下条件排序:</p>

<ul>
<li><code>nums = [0,1,2,3]</code> 或</li>
<li><code>nums = [1,2,3,0]</code></li>
</ul>

<p>...否则被认为是无序的。</p>

<p>返回<em>排序 <code>nums</code> 所需的最小操作数。</em></p>



<p><strong class="example">示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [4,2,0,3,1]
<strong>输出:</strong> 3
<strong>解释:</strong>
- 将项目 2 移动到空白区域。现在，nums =[4,0,2,3,1]。
- 将项目 1 移动到空白区域。现在，nums =[4,1,2,3,0]。
- 将项目 4 移动到空白区域。现在，nums =[0,1,2,3,4]。
可以证明，3 是所需的最小操作数。
</pre>

<p><strong class="example">示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,3,4,0]
<strong>输出:</strong> 0
<strong>解释:</strong> nums 已经排序了，所以返回 0。</pre>

<p><strong class="example">示例 3:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,0,2,4,3]
<strong>输出:</strong> 2
<strong>解释:</strong>
- 将项目 2 移动到空白区域。现在，nums =[1,2,0,4,3]。
- 将项目 3 移动到空白区域。现在，nums =[1,2,3,4,0]。
可以证明，2 是所需的最小操作数。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt; n</code></li>
<li><code>nums</code> 的所有值都是 <strong>唯一 </strong>的。</li>
</ul>


**相似问题：**
- [0210：课程表 II](/leetcode/0210)
- [1591：奇怪的打印机 II（2290 分）](/leetcode/1591)
- [1649：通过指令创建有序数组（2207 分）](/leetcode/1649)


## 分析

- 置换环问题，令每个元素指向其最后应在的位置，形成若干个环
- 对于长度 m 的非自环，假如 0 在环中，交换 m-1 次，否则 m+1 次
- 转变为 [1,2,3,0] 等价于将 nums[-1:]+nums[:-1] 变成 [0,1,2,3]

## 解答

```python
def cal(A):
    n = len(A)
    vis = [0]*n
    res = 0
    for i in range(n):
        if not vis[i]:
            a,j = 0,i
            while not vis[j]:
                vis[j] = 1
                j = A[j]
                a += 1
            if a>1:
                res += a+1 if i else a-1
    return res
            
class Solution:
    def sortArray(self, nums: List[int]) -> int:
        return min(cal(nums),cal(nums[-1:]+nums[:-1]))
```
98 ms
