# 0522：最长特殊序列 II（★）


> <u>**[力扣第 522 题](https://leetcode.cn/problems/longest-uncommon-subsequence-ii/)**</u>

## 题目

<p>给定字符串列表 <code>strs</code> ，返回其中 <strong>最长的特殊序列</strong> 的长度。如果最长特殊序列不存在，返回 <code>-1</code> 。</p>

<p><strong>特殊序列</strong> 定义如下：该序列为某字符串 <strong>独有的子序列（即不能是其他字符串的子序列）</strong>。</p>

<p> <code>s</code> 的 <strong>子序列</strong>可以通过删去字符串 <code>s</code> 中的某些字符实现。</p>

<ul>
<li>例如，<code>"abc"</code> 是 <code>"aebdc"</code> 的子序列，因为您可以删除<code>"a<u>e</u>b<u>d</u>c"</code>中的下划线字符来得到 <code>"abc"</code> 。<code>"aebdc"</code>的子序列还包括<code>"aebdc"</code>、 <code>"aeb"</code> 和 <font color="#c7254e" face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size: 12.6px; background-color: rgb(249, 242, 244);">""</span></font> (空字符串)。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> strs = ["aba","cdc","eae"]
<strong>输出:</strong> 3
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> strs = ["aaa","aaa","aa"]
<strong>输出:</strong> -1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>2 &lt;= strs.length &lt;= 50</code></li>
<li><code>1 &lt;= strs[i].length &lt;= 10</code></li>
<li><code>strs[i]</code> 只包含小写英文字母</li>
</ul>


**相似问题：**
- [0521：最长特殊序列 Ⅰ](/leetcode/0521)


## 分析

- 若 s 本身不是特殊序列，那 s 的子序列也都不是
- 因此对每一个 s，判断是否是其它某个字符串的子序列即可
- 显然只需要遍历长度 >= s 的字符串
- 因此可以先按长度从大到小排序，找到符合的即可返回
- 判断是否子序列即是 {{< lc "0392" >}}

## 解答


```python
class Solution:
    def findLUSlength(self, strs: List[str]) -> int:
        def check(s,t):
            it = iter(t)
            return all(c in it for c in s)

        ct = Counter(strs)
        A = sorted(ct,key=len)[::-1]
        for i,a in enumerate(A):
            if ct[a]==1 and all(not check(A[i],A[j]) for j in range(i)):
                return len(a)
        return -1
```
38 ms
