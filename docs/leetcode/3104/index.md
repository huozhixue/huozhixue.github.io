# 3104：查找最长的自包含子串（★★）


> <u>**[力扣第 3104 题](https://leetcode.cn/problems/find-longest-self-contained-substring/)**</u>

## 题目

<p>给定字符串 <code>s</code>，你需要找到 <code>s</code> 的 <strong>最长自包含</strong> <span data-keyword="substring-nonempty">子串</span> 的长度。</p>

<p>如果 <code>s</code> 的一个子串 <code>t</code> 满足 <code>t != s</code> 且 <code>t</code> 中的每一个字符在 <code>s</code> 的剩余部分都不存在，则被称为是 <strong>自包含</strong> 的。</p>

<p>如果存在  <code>s</code> 的最长自包含子串，返回它的长度，否则返回 -1。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>s = "abba"</span></p>

<p><span class="example-io"><b>输出：</b>2</span></p>

<p><strong>解释：</strong><br />
让我们检查子串 <code>"bb"</code>。你可以发现子串外没有其它 <code>"b"</code>。因此答案为 2。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b></span><span class="example-io">s = "abab"</span></p>

<p><span class="example-io"><b>输出：</b></span><span class="example-io">-1</span></p>

<p><strong>解释：</strong><br />
我们选择的每一个子串都不满足描述的特点（子串内外包含有一些字母）。所以答案是 -1。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b></span><span class="example-io">s = "abacd"</span></p>

<p><span class="example-io"><b>输出：</b></span><span class="example-io">4</span></p>

<p><strong>解释：</strong><br />
让我们检查子串 <code>"<span class="example-io">abac</span>"</code>。子串之外只有一个字母 <code>"d"</code>。子串内没有 <code>"d"</code>，所以它满足条件并且答案为 4。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>s</code> 只包含小写英文字母。</li>
</ul>


**相似问题：**
- [3458：选择 K 个互不重叠的特殊子字符串（2220 分）](/leetcode/3458)


## 分析

- 先统计每个字符的区间及个数 l,r,s，得到数组 A
- A 按左端点排序，自包含子串必然对应 A 的子数组
- 对于 A 的某个子数组，若 max(r)-min(l)+1=sum(s)<n，即是一个自包含子串
## 解答


```python
class Solution:
    def maxSubstringLength(self, s: str) -> int:
        n = len(s)
        A = [ord(c)-ord('a') for c in s]
        d = [[] for _ in range(26)]
        for i,a in enumerate(A):
            d[a].append(i)
        A = [[B[0],B[-1],len(B)] for B in d if B]
        A.sort()
        res = -1
        for i,(l,r,s) in enumerate(A):
            if r-l+1==s<n:
                res = max(res,s)
            for _,r2,s2 in A[i+1:]:
                r,s = max(r,r2),s+s2
                if r-l+1==s<n:
                    res = max(res,s)
        return res
```
99 ms
