# 0060：排列序列（★★）


> <u>**[力扣第 60 题](https://leetcode.cn/problems/permutation-sequence/)**</u>

## 题目

<p>给出集合 <code>[1,2,3,...,n]</code>，其所有元素共有 <code>n!</code> 种排列。</p>

<p>按大小顺序列出所有排列情况，并一一标记，当 <code>n = 3</code> 时, 所有排列如下：</p>

<ol>
<li><code>"123"</code></li>
<li><code>"132"</code></li>
<li><code>"213"</code></li>
<li><code>"231"</code></li>
<li><code>"312"</code></li>
<li><code>"321"</code></li>
</ol>

<p>给定 <code>n</code> 和 <code>k</code>，返回第 <code>k</code> 个排列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3, k = 3
<strong>输出：</strong>"213"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 4, k = 9
<strong>输出：</strong>"2314"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 3, k = 1
<strong>输出：</strong>"123"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 9</code></li>
<li><code>1 <= k <= n!</code></li>
</ul>


## 分析 

- 为了方便，令 k 减 1 使得从 0 开始
- 由排列组合知识可知：
	- 首位固定时有 (n-1)! 种情况
	- 第 k 个排列的首位即为第 k//(n-1)! 小的元素
	- 确定首位后，转为求剩下元素的第 k%(n-1)! 个排列
- 为了方便，维护一个有序数组 A，每次弹出确定的元素即可
 
## 解答

```python
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        res = ''
        A = list(range(1,n+1))
        k,s = k-1,factorial(n)
        for _ in range(n):
            s //= len(A)
            q,k = divmod(k,s)
            res += str(A.pop(q))
        return res
```
34 ms

