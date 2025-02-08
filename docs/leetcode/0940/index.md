# 0940：不同的子序列 II（1985 分）


> <u>**[力扣第 110 场周赛第 4 题](https://leetcode.cn/problems/distinct-subsequences-ii/)**</u>

## 题目

<p>给定一个字符串 <code>s</code>，计算 <code>s</code> 的 <strong>不同非空子序列</strong> 的个数。因为结果可能很大，所以返回答案需要对<strong> </strong><strong><code>10^9 + 7</code> 取余</strong> 。</p>

<p>字符串的 <strong>子序列</strong> 是经由原字符串删除一些（也可能不删除）字符但不改变剩余字符相对位置的一个新字符串。</p>

<ul>
<li>例如，<code>"ace"</code> 是 <code>"<em><strong>a</strong></em>b<em><strong>c</strong></em>d<em><strong>e</strong></em>"</code> 的一个子序列，但 <code>"aec"</code> 不是。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abc"
<strong>输出：</strong>7
<strong>解释：</strong>7 个不同的子序列分别是 "a", "b", "c", "ab", "ac", "bc", 以及 "abc"。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "aba"
<strong>输出：</strong>6
<strong>解释：</strong>6 个不同的子序列分别是 "a", "b", "ab", "ba", "aa" 以及 "aba"。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "aaa"
<strong>输出：</strong>3
<strong>解释：</strong>3 个不同的子序列分别是 "a", "aa" 以及 "aaa"。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 2000</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>




**相似问题：**
- [1987：不同的好子序列数目（2422 分）](/leetcode/1987)
- [2842：统计一个字符串的 k 子序列美丽值最大的数目（2091 分）](/leetcode/2842)


## 分析

### #1

- 假如 s 末尾字符为 'a'
	- 'a' 可以和 s[:-1] 的每个序列组成新的序列
	- 'a' 自身 1 个序列
	- s[:-1] 的每个 'a' 结尾的序列都在新的序列集合里，都是重复的
- 因此令 f[i][c] 代表 s[:i+1] 的 c 结尾的序列个数，即可递推
	- f[i][s[i]] = sum(f[i-1])+1

```python
class Solution:
    def distinctSubseqII(self, s: str) -> int:
        mod = 10**9+7
        f = [0]*26
        for i,c in enumerate(s):
            c = ord(c)-ord('a')
            f[c] = (sum(f)+1)%mod
        return sum(f)%mod
```
16 ms

### #2

- 额外维护一个变量 g 代表 sum(f)，可以优化时间
## 解答

```python
class Solution:
    def distinctSubseqII(self, s: str) -> int:
        mod = 10**9+7
        f = [0]*26
        g = 0
        for i,c in enumerate(s):
            c = ord(c)-ord('a')
            add = g+1-f[c]
            f[c] = (f[c]+add)%mod
            g = (g+add)%mod
        return g
        
```
7 ms
