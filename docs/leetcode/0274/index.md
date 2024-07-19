# 0274：H 指数（★）


> <u>**[力扣第 274 题](https://leetcode.cn/problems/h-index/)**</u>

## 题目

<p>给你一个整数数组 <code>citations</code> ，其中 <code>citations[i]</code> 表示研究者的第 <code>i</code> 篇论文被引用的次数。计算并返回该研究者的 <strong><code>h</code><em> </em>指数</strong>。</p>

<p>根据维基百科上 <a href="https://baike.baidu.com/item/h-index/3991452?fr=aladdin" target="_blank">h 指数的定义</a>：<code>h</code> 代表“高引用次数” ，一名科研人员的 <code>h</code><strong> 指数 </strong>是指他（她）至少发表了 <code>h</code> 篇论文，并且 <strong>至少 </strong>有 <code>h</code> 篇论文被引用次数大于等于 <code>h</code> 。如果 <code>h</code><em> </em>有多种可能的值，<strong><code>h</code> 指数 </strong>是其中最大的那个。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong><code>citations = [3,0,6,1,5]</code>
<strong>输出：</strong>3
<strong>解释：</strong>给定数组表示研究者总共有 <code>5</code> 篇论文，每篇论文相应的被引用了 <code>3, 0, 6, 1, 5</code> 次。
由于研究者有 <code>3 </code>篇论文每篇 <strong>至少 </strong>被引用了 <code>3</code> 次，其余两篇论文每篇被引用 <strong>不多于</strong> <code>3</code> 次，所以她的 <em>h </em>指数是 <code>3</code>。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>citations = [1,3,1]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == citations.length</code></li>
<li><code>1 &lt;= n &lt;= 5000</code></li>
<li><code>0 &lt;= citations[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0275：H 指数 II](/leetcode/0275)


## 分析

- 先将 citations 排序
- citations[i:] 这 n-i 篇论文的引用数都 >=citations[i]
- 因此遍历找到第一个满足 n-i<=citations[i] 的 i 即可

## 解答

```python
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        citations.sort()
        n = len(citations)
        for i,x in enumerate(citations):
            if x>=n-i:
                return n-i
        return 0
```
34 ms

