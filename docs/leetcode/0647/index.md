# 0647：回文子串（★）


> <u>**[力扣第 647 题](https://leetcode.cn/problems/palindromic-substrings/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，请你统计并返回这个字符串中 <strong>回文子串</strong> 的数目。</p>

<p><strong>回文字符串</strong> 是正着读和倒过来读一样的字符串。</p>

<p><strong>子字符串</strong> 是字符串中的由连续字符组成的一个序列。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abc"
<strong>输出：</strong>3
<strong>解释：</strong>三个回文子串: "a", "b", "c"
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "aaa"
<strong>输出：</strong>6
<strong>解释：</strong>6个回文子串: "a", "a", "a", "aa", "aa", "aaa"</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>


**相似问题：**
- [0005：最长回文子串](/leetcode/0005)
- [0516：最长回文子序列](/leetcode/0516)


## 分析

### #1

类似 {{< lc "0005" >}}，可以发现在用 区间 dp 或中心扩展法的过程中，即可得到所有的回文子串。

这里用中心扩展法。

```python
def countSubstrings(self, s: str) -> int:
	def expand(s, left, right):
		while left > 0 and right < len(s)-1 and s[left-1] == s[right+1]:
			left -= 1
			right += 1
			self.res += 1
			
	self.res = len(s)
	for i in range(len(s)):
		expand(s, i, i)
		expand(s, i+1, i)
	return self.res
```
时间复杂度 O(N^2)，208 ms

### #2

还可以尝试经典的 Manacher 算法。

## 解答

```python
def countSubstrings(self, s: str) -> int:
    def expand(l, r):
        while l and r<len(ss)-1 and ss[l-1]==ss[r+1]:
            l -= 1
            r += 1
        return (r-l)//2

    res = 0
    pair, ss = (0, 0), '#' + '#'.join(s) + '#'
    A, center, right = [], 0, 0
    for i in range(len(ss)):
        min_arm = min(A[2*center-i], right-i) if right > i else 0
        cur_arm = expand(i-min_arm, i+min_arm)
        A.append(cur_arm)
        if i + cur_arm > right:
            center, right = i, i + cur_arm
        res += (cur_arm+1) // 2
    return res
```
时间复杂度 O(N)，48 ms

