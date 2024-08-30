# 0567：字符串的排列（★）


> <u>**[力扣第 567 题](https://leetcode.cn/problems/permutation-in-string/)**</u>

## 题目

<p>给你两个字符串 <code>s1</code> 和 <code>s2</code> ，写一个函数来判断 <code>s2</code> 是否包含 <code>s1</code><strong> </strong>的排列。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>换句话说，<code>s1</code> 的排列之一是 <code>s2</code> 的 <strong>子串</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s1 = "ab" s2 = "eidbaooo"
<strong>输出：</strong>true
<strong>解释：</strong>s2 包含 s1 的排列之一 ("ba").
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s1= "ab" s2 = "eidboaoo"
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s1.length, s2.length &lt;= 10<sup>4</sup></code></li>
<li><code>s1</code> 和 <code>s2</code> 仅包含小写字母</li>
</ul>


**相似问题：**
- [0076：最小覆盖子串](/leetcode/0076)
- [0438：找到字符串中所有字母异位词](/leetcode/0438)


## 分析

类似于问题 {{< lc "0438" >}} ，还更简单一点。

## 解答

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        m = len(s1)
        ct0 = Counter(s1)
        ct = defaultdict(int)
        valid = 0
        for j,c in enumerate(s2):
            ct[c] += 1
            if ct[c]==ct0[c]:
                valid += 1
            if j>=m:
                old = s2[j-m]
                if ct[old]==ct0[old]:
                    valid -= 1
                ct[old] -= 1
            if valid==len(ct0):
                return True
        return False
```

55 ms

