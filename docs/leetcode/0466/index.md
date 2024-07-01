# 0466：统计重复个数（★★）


> <u>**[力扣第 466 题](https://leetcode.cn/problems/count-the-repetitions/)**</u>

## 题目

<p>定义 <code>str = [s, n]</code> 表示 <code>str</code> 由 <code>n</code> 个字符串 <code>s</code> 连接构成。</p>

<ul>
<li>例如，<code>str == ["abc", 3] =="abcabcabc"</code> 。</li>
</ul>

<p>如果可以从 <code>s2</code><sub> </sub>中删除某些字符使其变为 <code>s1</code>，则称字符串 <code>s1</code><sub> </sub>可以从字符串 <code>s2</code> 获得。</p>

<ul>
<li>例如，根据定义，<code>s1 = "abc"</code> 可以从 <code>s2 = "ab<em><strong>dbe</strong></em>c"</code> 获得，仅需要删除加粗且用斜体标识的字符。</li>
</ul>

<p>现在给你两个字符串 <code>s1</code> 和 <code>s2</code> 和两个整数 <code>n1</code> 和 <code>n2</code> 。由此构造得到两个字符串，其中 <code>str1 = [s1, n1]</code>、<code>str2 = [s2, n2]</code> 。</p>

<p>请你找出一个最大整数 <code>m</code> ，以满足 <code>str = [str2, m]</code> 可以从 <code>str1</code> 获得。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s1 = "acb", n1 = 1, s2 = "acb", n2 = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= s1.length, s2.length <= 100</code></li>
<li><code>s1</code> 和 <code>s2</code> 由小写英文字母组成</li>
<li><code>1 <= n1, n2 <= 10<sup>6</sup></code></li>
</ul>


## 分析

- 将 [s1,n1] 看作 n1 行，每行都是 s1 的矩阵，便类似 {{< lc "0418" >}}
- 按顺序匹配 s2，令 d[k]=i 代表第 i 行最先匹配的是 s2 第 k 个字符
	- 显然 k 的值有限，有限行之后，必然进入循环
	- 用哈希表即可找到第一个循环的开始行 j 和结束行 i
- 遍历时，再用 A[i] 维护前 i 行匹配的 s2 的个数
	- 根据 A[i]、A[j] 即可计算出一个循环匹配的 s2 的个数，从而快速得到结果

## 解答


```python
class Solution:
    def getMaxRepetitions(self, s1: str, n1: int, s2: str, n2: int) -> int:
        d,A = {0:0},[0]
        k,s = 0,0
        for i in range(1,n1+1):
            for c in s1:
                if c==s2[k]:
                    s += (k+1)//len(s2)
                    k = (k+1)%len(s2)
            if k in d:
                j = d[k]
                q,r = divmod(n1-j,i-j)
                return (q*(s-A[j])+A[j+r])//n2
            d[k] = i
            A.append(s)
        return s//n2
```
38  ms
