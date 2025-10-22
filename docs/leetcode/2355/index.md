# 2355：你能拿走的最大图书数量（★★）


> <u>**[力扣第 2355 题](https://leetcode.cn/problems/maximum-number-of-books-you-can-take/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的<b> 下标从 0 开始 </b>的整数数组 <code>books</code>，其中 <code>books[i]</code> 表示书架的第 <code>i</code> 个书架上的书的数量。</p>

<p>你要从书架 <code>l</code> 到 <code>r</code> 的一个 <strong>连续 </strong>的部分中取书，其中 <code>0 &lt;= l &lt;= r &lt; n</code>。对于 <code>l &lt;= i &lt; r</code> 范围内的每个索引 <code>i</code>，你从书架 <code>i</code> 取书的数量必须 <strong>严格小于 </strong>你从书架 <code>i + 1</code> 取书的数量。</p>

<p>返回<em>你能从书架上拿走的书的 <strong>最大 </strong>数量。</em></p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> books = [8,5,2,7,9]
<strong>输出:</strong> 19
<strong>解释:</strong>
- 从书架 1 上取 1 本书。
- 从书架 2 上取 2 本书。
- 从书架 3 上取 7 本书
- 从书架 4 上取 9 本书
你已经拿了19本书，所以返回 19。
可以证明 19 本是你所能拿走的书的最大数量。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> books = [7,0,3,4,5]
<strong>输出:</strong> 12
<strong>解释:</strong>
- 从书架 2 上取 3 本书。
- 从书架 3 上取 4 本书。
- 从书架 4 上取 5 本书。
你已经拿了 12 本书，所以返回 12。
可以证明 12 本是你所能拿走的书的最大数量。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> books = [8,2,3,7,3,4,0,1,4,3]
<strong>输出:</strong> 13
<strong>解释:</strong>
- 从书架 0 上取 1 本书。
- 从书架 1 上取 2 本书。
- 从书架 2 上取 3 本书。
- 从书架 3 上取 7 本书。
你已经拿了 13 本书，所以返回 13。
可以证明 13 本是你所能拿走的书的最大数量。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= books.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= books[i] &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0300：最长递增子序列](/leetcode/0300)
- [1800：最大升序子数组和（1229 分）](/leetcode/1800)
- [2866：美丽塔 II（2071 分）](/leetcode/2866)
- [2865：美丽塔 I（1519 分）](/leetcode/2865)


## 分析

- 假设选了最后一本书 j，往前找第一个下标 i 满足 books[i]<=books[j]-j+i
- 那么 books[:i+1] 是递归子问题，[i+1,j] 是等差 1 的数列
- 令 A[i] 代表 books[i]-i，即转为找上一个更小元素，用单调栈即可

## 解答

```python
class Solution:
    def maximumBooks(self, books: List[int]) -> int:
        n = len(books)
        A = [x-i for i,x in enumerate(books)]
        L = [-1]*n
        sk = []
        for j,a in enumerate(A):
            while sk and A[sk[-1]]>a:
                sk.pop()
            if sk:
                L[j] = sk[-1]
            sk.append(j)
        f = [0]*(n+1)
        for j,a in enumerate(books):
            i = L[j]
            c = min(a,j-i)
            f[j+1] = f[i+1]+(a+a-c+1)*c//2
        return max(f)
```
236 ms
