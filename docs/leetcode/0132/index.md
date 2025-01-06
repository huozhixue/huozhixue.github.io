# 0132：分割回文串 II（★★）


> <u>**[力扣第 132 题](https://leetcode.cn/problems/palindrome-partitioning-ii/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，请你将 <code>s</code> 分割成一些子串，使每个子串都是<span data-keyword="palindrome-string">回文串</span>。</p>

<p>返回符合要求的 <strong>最少分割次数</strong> 。</p>

<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aab"
<strong>输出：</strong>1
<strong>解释：</strong>只需一次分割就可将 <em>s </em>分割成 ["aa","b"] 这样两个回文子串。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "a"
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "ab"
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 2000</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>
</div>
</div>


**相似问题：**
- [0131：分割回文串](/leetcode/0131)
- [1745：分割回文串 IV（1924 分）](/leetcode/1745)
- [2472：不重叠回文子字符串的最大数目（2013 分）](/leetcode/2472)
- [2518：好分区的数目（2414 分）](/leetcode/2518)


## 分析

-  {{< lc "0131" >}} 进阶版，数据范围大了不少，考虑用 dp
- 按最后的分割点位置即可递推
- 要判断某个子串是否回文，可以另外再用 dp 提前计算好

## 解答

```python
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        f = [[1]*n for _ in range(n)]
        for i in range(n-1,-1,-1):
            for j in range(i+1,n):
                f[i][j] = s[i]==s[j] and f[i+1][j-1]
        g = [-1]+[0]*n
        for j in range(1,n+1):
            g[j] = 1+min(g[i] for i in range(j) if f[i][j-1])
        return g[-1]
```
738 ms
