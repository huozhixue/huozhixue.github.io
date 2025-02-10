# 0943：最短超级串（2185 分）


> <u>**[力扣第 111 场周赛第 4 题](https://leetcode.cn/problems/find-the-shortest-superstring/)**</u>

## 题目

<p>给定一个字符串数组 <code>words</code>，找到以 <code>words</code> 中每个字符串作为子字符串的最短字符串。如果有多个有效最短字符串满足题目条件，返回其中 <strong>任意一个</strong> 即可。</p>

<p>我们可以假设 <code>words</code> 中没有字符串是 <code>words</code> 中另一个字符串的子字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["alex","loves","leetcode"]
<strong>输出：</strong>"alexlovesleetcode"
<strong>解释：</strong>"alex"，"loves"，"leetcode" 的所有排列都会被接受。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["catg","ctaagt","gcta","ttca","atgcatc"]
<strong>输出：</strong>"gctaagttcatgcatc"</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= words.length <= 12</code></li>
<li><code>1 <= words[i].length <= 20</code></li>
<li><code>words[i]</code> 由小写英文字母组成</li>
<li><code>words</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [2397：被列覆盖的最多行数（1718 分）](/leetcode/2397)
- [3149：找出分数最低的排列（2641 分）](/leetcode/3149)


## 分析

### #1

- 按结尾选哪个字符串即可递归
- 计算两个字符串重叠长度，也可记忆化
- 为了方便，可以令 dfs 直接返回最短字符串

```python
class Solution:
    def shortestSuperstring(self, words: List[str]) -> str:
        @cache
        def cal(a,b):
            return next(i for i in range(len(b),-1,-1) if a.endswith(b[:i]))
        @cache
        def dfs(A,a):
            if len(A)==1:
                return a
            B = tuple(set(A)-{a})
            return min([dfs(B,b)+a[cal(b,a):] for b in B],key=len)
        return min([dfs(tuple(words),a) for a in words],key=len)
```
1299 ms

### #2

- 更通用的方法是先递推最短长度，再根据转移过程得到对应的字符串
- 令 f[st][i] 代表集合 st 且以 i 结尾的最短长度
- 预处理 g[i][j] 代表 words[i] 接 words[j] 的重叠长度
- 令 rf[st][i]=j 代表 f[st][i] 由 f[st^1<<i][j] 转移而来
## 解答


```python
class Solution:
    def shortestSuperstring(self, words: List[str]) -> str:
        def cal(a,b):
            return next(i for i in range(len(b),-1,-1) if a.endswith(b[:i]))
        n = len(words)
        g = [[cal(a,b) for b in words] for a in words]
        f = [[inf]*n for _ in range(1<<n)]
        rf = [[0]*n for _ in range(1<<n)]
        for st in range(1,1<<n):
            for i in range(n):
                if st>>i&1:
                    w = len(words[i])
                    st2 = st^1<<i
                    if not st2:
                        f[st][i] = w
                    else:
                        j = min(range(n),key=lambda j:f[st2][j]+w-g[j][i])
                        f[st][i] = f[st2][j]+w-g[j][i]
                        rf[st][i] = j
        st = (1<<n)-1
        i = min(range(n),key=lambda i:f[-1][i])
        res = words[i]
        while st.bit_count()>1:
            j = rf[st][i]
            res = words[j]+res[g[j][i]:]
            st,i = st^1<<i,j
        return res
```
587 ms
