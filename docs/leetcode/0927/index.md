# 0927：三等分（1994 分）


> <u>**[力扣第 107 场周赛第 3 题](https://leetcode.cn/problems/three-equal-parts/)**</u>

## 题目

<p>给定一个由 <code>0</code> 和 <code>1</code> 组成的数组<meta charset="UTF-8" /> <code>arr</code> ，将数组分成  <strong>3 个非空的部分</strong> ，使得所有这些部分表示相同的二进制值。</p>

<p>如果可以做到，请返回<strong>任何</strong> <code>[i, j]</code>，其中 <code>i+1 &lt; j</code>，这样一来：</p>

<ul>
<li><code>arr[0], arr[1], ..., arr[i]</code> 为第一部分；</li>
<li><code>arr[i + 1], arr[i + 2], ..., arr[j - 1]</code> 为第二部分；</li>
<li><code>arr[j], arr[j + 1], ..., arr[arr.length - 1]</code> 为第三部分。</li>
<li>这三个部分所表示的二进制值相等。</li>
</ul>

<p>如果无法做到，就返回 <code>[-1, -1]</code>。</p>

<p>注意，在考虑每个部分所表示的二进制时，应当将其看作一个整体。例如，<code>[1,1,0]</code> 表示十进制中的 <code>6</code>，而不会是 <code>3</code>。此外，前导零也是<strong>被允许</strong>的，所以 <code>[0,1,1]</code> 和 <code>[1,1]</code> 表示相同的值。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,0,1,0,1]
<strong>输出：</strong>[0,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,1,0,1,1]
<strong>输出：</strong>[-1,-1]</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入：</strong>arr = [1,1,0,0,1]
<strong>输出：</strong>[0,2]
</pre>



<p><strong>提示：</strong></p>
<meta charset="UTF-8" />

<ul>
<li><code>3 &lt;= arr.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>arr[i]</code> 是 <code>0</code> 或 <code>1</code></li>
</ul>




## 分析

- 相同的二进制数必然 1 的数量是相同的
- 因此先提取 1 的下标数组 A
	- 如果 m=len(A) 不是 3 的倍数，无法分割
	- 否则将 A 三等分，三段起始的 1 分别是 i=A[0],j=A[m//3],k=A[m//3*2]
		- 注意前缀 0 不影响值，所以直接定位起始的 1
	- 注意最后一段必然是 arr[k:]，所以要使三段相同，长度必然都是 L=n-k
	- 确定了三段的起始和长度，直接判断是否相同即可
		- 注意三段不能重叠，要特别判断
	- 假如相同，返回对应的分割点 [i+L-1,j+L] 即可
		- 注意分割点要考虑前缀 0 了，不能直接返回起始的 1 的下标

## 解答


```python
class Solution:
    def threeEqualParts(self, arr: List[int]) -> List[int]:
        n = len(arr)
        A = [i for i,a in enumerate(arr) if a==1]
        m = len(A)
        if m%3:
            return [-1,-1]
        if m==0:
            return [0,2]
        i,j,k = A[0],A[m//3],A[m//3*2]
        L = n-k
        if i+L<=j<=k-L and arr[i:i+L]==arr[j:j+L]==arr[k:]:
            return [i+L-1,j+L]
        return [-1,-1]
```
8 ms
