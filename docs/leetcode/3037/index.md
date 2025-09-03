# 3037：在无限流中寻找模式 II（★★）


> <u>**[力扣第 3037 题](https://leetcode.cn/problems/find-pattern-in-infinite-stream-ii/)**</u>

## 题目

<p>给定一个二进制数组 <code>pattern</code> 和一个类 <code>InfiniteStream</code> 的对象 <code>stream</code> 表示一个下标从 <strong>0</strong> 开始的二进制位无限流。</p>

<p>类 <code>InfiniteStream</code> 包含下列函数：</p>

<ul>
<li><code>int next()</code>：从流中读取 <strong>一个</strong> 二进制位 （是 <code>0</code> 或 <code>1</code>）并返回。</li>
</ul>

<p>返回<em> <strong>第一个使得模式匹配流中读取的二进制位的 </strong>开始下标</em>。例如，如果模式是 <code>[1, 0]</code>，第一个匹配是流中的高亮部分 <code>[0, <strong><u>1, 0</u></strong>, 1, ...]</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> stream = [1,1,1,0,1,1,1,...], pattern = [0,1]
<strong>输出:</strong> 3
<strong>解释:</strong> 模式 [0,1] 的第一次出现在流中高亮 [1,1,1,<strong><u>0,1</u></strong>,...]，从下标 3 开始。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong> stream = [0,0,0,0,...], pattern = [0]
<strong>输出:</strong> 0
<strong>解释:</strong> 模式 [0] 的第一次出现在流中高亮 [<strong><u>0</u></strong>,...]，从下标 0 开始。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入:</strong> stream = [1,0,1,1,0,1,1,0,1,...], pattern = [1,1,0,1]
<strong>输出:</strong> 2
<strong>解释:</strong> 模式 [1,1,0,1] 的第一次出现在流中高亮 [1,0,<strong><u>1,1,0,1</u></strong>,...]，从下标 2 开始。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= pattern.length &lt;= 10<sup>4</sup></code></li>
<li><code>pattern</code> 只包含 <code>0</code> 或 <code>1</code>。</li>
<li><code>stream</code> 只包含 <code>0</code> 或 <code>1</code>。</li>
<li>生成的输入使模式的开始下标在流的前 <code>10<sup>5</sup></code> 个二进制位中。</li>
</ul>




**相似问题：**
- [3621：位计数深度为 K 的整数数目 I（2330 分）](/leetcode/3621)


## 分析

- kmp 找第一个完全匹配的下标即可

## 解答


```python
class Solution:
    def findPattern(self, stream: Optional['InfiniteStream'], pattern: List[int]) -> int:
        A = pattern+[2]
        pi,j = [0],0
        for i in range(1,len(A)):
            while j>0 and A[i]!=A[j]:
                j = pi[j-1]
            j += A[i]==A[j]
            pi.append(j)
        while True:
            c = stream.next()
            while j>0 and c!=A[j]:
                j = pi[j-1]
            j += c==A[j]
            pi.append(j)
            A.append(c)
            if j==len(pattern):
                return len(A)-j*2-1
```
2339 ms
