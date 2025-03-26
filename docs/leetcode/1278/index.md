# 1278：分割回文串 III（1979 分）


> <u>**[力扣第 165 场周赛第 4 题](https://leetcode.cn/problems/palindrome-partitioning-iii/)**</u>

## 题目

<p>给你一个由小写字母组成的字符串 <code>s</code>，和一个整数 <code>k</code>。</p>

<p>请你按下面的要求分割字符串：</p>

<ul>
<li>首先，你可以将 <code>s</code> 中的部分字符修改为其他的小写英文字母。</li>
<li>接着，你需要把 <code>s</code> 分割成 <code>k</code> 个非空且不相交的子串，并且每个子串都是回文串。</li>
</ul>

<p>请返回以这种方式分割字符串所需修改的最少字符数。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>s = &quot;abc&quot;, k = 2
<strong>输出：</strong>1
<strong>解释：</strong>你可以把字符串分割成 &quot;ab&quot; 和 &quot;c&quot;，并修改 &quot;ab&quot; 中的 1 个字符，将它变成回文串。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>s = &quot;aabbc&quot;, k = 3
<strong>输出：</strong>0
<strong>解释：</strong>你可以把字符串分割成 &quot;aa&quot;、&quot;bb&quot; 和 &quot;c&quot;，它们都是回文串。</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>s = &quot;leetcode&quot;, k = 8
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= s.length &lt;= 100</code></li>
<li><code>s</code> 中只含有小写英文字母。</li>
</ul>


**相似问题：**
- [1745：分割回文串 IV（1924 分）](/leetcode/1745)
- [2472：不重叠回文子字符串的最大数目（2013 分）](/leetcode/2472)
- [2911：得到 K 个半回文串的最少修改次数（2607 分）](/leetcode/2911)


## 分析

### #1

- 按最后一个子串的长度，即可递推
- 子串变回文的修改次数可以预处理，节省时间
- 还可以用滚动数组优化
```python
class Solution:
    def palindromePartition(self, s: str, k: int) -> int:
        n = len(s)
        w = [[0]*n for _ in range(n)]
        for i in range(n-2,-1,-1):
            for j in range(i+1,n):
                w[i][j] = w[i+1][j-1]+(s[i]!=s[j])
        f = [0]+[inf]*n
        for a in range(1,k+1):
            g = [inf]*(n+1)
            for i in range(a,n+1):
                g[i] = min(f[j]+w[j][i-1] for j in range(i))
            f = g
        return f[-1]
```
59 ms

### #2

- 还可以在 f 上倒序递推，省去 g 数组
- 注意 a 对应的 f 值，只需要计算 f[a:]，节省时间
## 解答

```python
class Solution:
    def palindromePartition(self, s: str, k: int) -> int:
        n = len(s)
        w = [[0]*n for _ in range(n)]
        for i in range(n-2,-1,-1):
            for j in range(i+1,n):
                w[i][j] = w[i+1][j-1]+(s[i]!=s[j])
        f = [0]+[inf]*n
        for a in range(1,k+1):
            for i in range(n,a-1,-1):
                f[i] = min(f[j]+w[j][i-1] for j in range(a-1,i))
        return f[-1]
```

31 ms


