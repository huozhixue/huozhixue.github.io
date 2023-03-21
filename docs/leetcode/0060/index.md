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

### #1

可以直接调包得到所有排列，返回第 k 个排列。

```python
def getPermutation(self, n: int, k: int) -> str:
	res = list(permutations(range(1, n+1)))[k-1]
	return ''.join(map(str, res))
```

1908 ms

### #2

也可以递推：
- 为了方便，令 x = k-1 使得从 0 开始
- 由排列组合知识可知，首位固定时有 (n-1)! 种情况，那么第 x 个排列的首位即为第 x//(n-1)! 个元素
- 确定首位元素后，转为求剩下元素的第 x%(n-1)! 个排列，后面依此类推
- 为了方便，维护还剩下的元素的有序数组 A，每次弹出即可
 
## 解答

```python
def getPermutation(self, n: int, k: int) -> str:
    res, A, x = '', list(range(1, n+1)), k-1
    for j in range(n):
        fac = factorial(n-1-j)
        res += str(A.pop(x//fac))
        x %= fac
    return res
```
32 ms

