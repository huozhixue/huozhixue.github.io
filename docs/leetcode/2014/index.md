# 2014：重复 K 次的最长子序列（2558 分）


> <u>**[力扣第 259 场周赛第 4 题](https://leetcode.cn/problems/longest-subsequence-repeated-k-times/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的字符串 <code>s</code> ，和一个整数 <code>k</code> 。请你找出字符串 <code>s</code> 中 <strong>重复</strong> <code>k</code> 次的 <strong>最长子序列</strong> 。</p>

<p><strong>子序列</strong> 是由其他字符串删除某些（或不删除）字符派生而来的一个字符串。</p>

<p>如果 <code>seq * k</code> 是 <code>s</code> 的一个子序列，其中 <code>seq * k</code> 表示一个由 <code>seq</code> 串联 <code>k</code> 次构造的字符串，那么就称 <code>seq</code><strong> </strong>是字符串 <code>s</code> 中一个 <strong>重复 <code>k</code> 次</strong> 的子序列。</p>

<ul>
<li>举个例子，<code>"bba"</code> 是字符串 <code>"bababcba"</code> 中的一个重复 <code>2</code> 次的子序列，因为字符串 <code>"bbabba"</code> 是由 <code>"bba"</code> 串联 <code>2</code> 次构造的，而 <code>"bbabba"</code> 是字符串 <code>"<em><strong>b</strong></em>a<em><strong>bab</strong></em>c<em><strong>ba</strong></em>"</code> 的一个子序列。</li>
</ul>

<p>返回字符串 <code>s</code> 中 <strong>重复 k 次的最长子序列</strong>  。如果存在多个满足的子序列，则返回 <strong>字典序最大</strong> 的那个。如果不存在这样的子序列，返回一个 <strong>空</strong> 字符串。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="example 1" src="https://assets.leetcode.com/uploads/2021/08/30/longest-subsequence-repeat-k-times.png" style="width: 457px; height: 99px;" /></p>

<pre>
<strong>输入：</strong>s = "letsleetcode", k = 2
<strong>输出：</strong>"let"
<strong>解释：</strong>存在两个最长子序列重复 2 次：let" 和 "ete" 。
"let" 是其中字典序最大的一个。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "bb", k = 2
<strong>输出：</strong>"b"
<strong>解释：</strong>重复 2 次的最长子序列是 "b" 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "ab", k = 2
<strong>输出：</strong>""
<strong>解释：</strong>不存在重复 2 次的最长子序列。返回空字符串。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == s.length</code></li>
<li><code>2 &lt;= k &lt;= 2000</code></li>
<li><code>2 &lt;= n &lt; k * 8</code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>


**相似问题：**
- [0395：至少有 K 个重复字符的最长子串](/leetcode/0395)


## 分析

### #1

- 注意到 n<k*8，那么子序列长度最多为 7，因此可以暴力枚举所有可能的子序列
- 假如字符 c 在 s 中有 w 个，那么最多 w//k 个参与子序列
- 遍历字符 c，得到候选集合 A，A 长度最多 7
- 从长到短，从大到小枚举 A 的排列，返回第一个在 s 中重复 k 次的子序列即可
- 枚举排列可以用回溯法，也可以直接调包

```python
class Solution:
    def longestSubsequenceRepeatedK(self, s: str, k: int) -> str:
        A = []
        for c,w in Counter(s).items():
            A.extend([c]*(w//k))
        A = sorted(A)[::-1]
        for i in range(len(A),0,-1):
            for B in permutations(A,i):
                it = iter(s)
                if all(c in it for c in B*k):
                    return ''.join(B)
        return ''
```
2023 ms

### #2

- 也可以考虑从短到长枚举排列，假如某个子序列 u 不能重复 k 次，那么以 u 为前缀的子序列都不能
- 因此用 bfs，在子序列 u 后添加 A 中的字符 c，判断 v=u+c 能否重复 k 次，再入队即可
## 解答


```python
class Solution:
    def longestSubsequenceRepeatedK(self, s: str, k: int) -> str:
        res = ''
        A = sorted(c for c,w in Counter(s).items() if w>=k)
        Q = deque(A)
        while Q:
            u = Q.popleft()
            res = u
            for c in A:
                v = u+c
                it = iter(s)
                if all(a in it for a in v*k):
                    Q.append(v)
        return res
```
963 ms
