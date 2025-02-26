# 1092：最短公共超序列（1976 分）


> <u>**[力扣第 141 场周赛第 4 题](https://leetcode.cn/problems/shortest-common-supersequence/)**</u>

## 题目

<p>给你两个字符串 <code>str1</code> 和 <code>str2</code>，返回同时以 <code>str1</code> 和 <code>str2</code> 作为 <strong>子序列</strong> 的最短字符串。如果答案不止一个，则可以返回满足条件的 <strong>任意一个</strong> 答案。</p>

<p>如果从字符串 <code>t</code> 中删除一些字符（也可能不删除），可以得到字符串 <code>s</code> ，那么 <code>s</code> 就是 t 的一个子序列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>str1 = "abac", str2 = "cab"
<strong>输出：</strong>"cabac"
<strong>解释：</strong>
str1 = "abac" 是 "cabac" 的一个子串，因为我们可以删去 "cabac" 的第一个 "c"得到 "abac"。
str2 = "cab" 是 "cabac" 的一个子串，因为我们可以删去 "cabac" 末尾的 "ac" 得到 "cab"。
最终我们给出的答案是满足上述属性的最短字符串。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>str1 = "aaaaaaaa", str2 = "aaaaaaaa"
<strong>输出：</strong>"aaaaaaaa"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= str1.length, str2.length &lt;= 1000</code></li>
<li><code>str1</code> 和 <code>str2</code> 都由小写英文字母组成。</li>
</ul>


**相似问题：**
- [1143：最长公共子序列](/leetcode/1143)
- [2800：包含三个字符串的最短字符串（1855 分）](/leetcode/2800)


## 分析

- 典型的 dp，按末尾字符递推即可
- 由于不仅要最短长度，还要输出对应的子序列，递推时需要保存转移的路径
- 可以 令 rf[i][j]=1/2/3 分别代表 (i,j) 由 (i-1,j)/(i,j-1)/(i-1,j-1) 转移而来，即可反推路径并输出

## 解答


```python
class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        m, n = len(str1), len(str2)
        f = [[0]*(n+1) for _ in range(m+1)]
        rf = [[3]*(n+1) for _ in range(m+1)]
        for i in range(1,m+1):
            for j in range(1,n+1):
                if str1[i-1]==str2[j-1]:
                    f[i][j] = 1+f[i-1][j-1] 
                elif f[i-1][j]>f[i][j-1]:
                    f[i][j] = f[i-1][j]
                    rf[i][j] = 1
                else:
                    f[i][j] = f[i][j-1]
                    rf[i][j] = 2
        res,i,j = [],m,n
        while i and j:
            st = rf[i][j]
            res.append(str1[i-1] if st&1 else str2[j-1])
            i -= st&1
            j -= st>>1&1
        return str1[:i]+str2[:j]+''.join(res)[::-1]
```
401 ms
