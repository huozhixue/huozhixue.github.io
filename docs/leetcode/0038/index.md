# 0038：外观数列（★）


> <u>**[力扣第 38 题](https://leetcode.cn/problems/count-and-say/)**</u>

## 题目

<p>「外观数列」是一个数位字符串序列，由递归公式定义：</p>

<ul>
<li><code>countAndSay(1) = "1"</code></li>
<li><code>countAndSay(n)</code> 是 <code>countAndSay(n-1)</code> 的行程长度编码。</li>
</ul>



<ul>
</ul>

<p><a href="https://baike.baidu.com/item/%E8%A1%8C%E7%A8%8B%E9%95%BF%E5%BA%A6%E7%BC%96%E7%A0%81/2931940">行程长度编码</a>（RLE）是一种字符串压缩方法，其工作原理是通过将连续相同字符（重复两次或更多次）替换为字符重复次数（运行长度）和字符的串联。例如，要压缩字符串 <code>"3322251"</code> ，我们将 <code>"33"</code> 用 <code>"23"</code> 替换，将 <code>"222"</code> 用 <code>"32"</code> 替换，将 <code>"5"</code> 用 <code>"15"</code> 替换并将 <code>"1"</code> 用 <code>"11"</code> 替换。因此压缩后字符串变为 <code>"23321511"</code>。</p>

<p>给定一个整数 <code>n</code> ，返回 <strong>外观数列</strong> 的第 <code>n</code> 个元素。</p>

<p><strong>示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong>n = 4</p>

<p><strong>输出：</strong>"1211"</p>

<p><strong>解释：</strong></p>

<p>countAndSay(1) = "1"</p>

<p>countAndSay(2) = "1" 的行程长度编码 = "11"</p>

<p>countAndSay(3) = "11" 的行程长度编码 = "21"</p>

<p>countAndSay(4) = "21" 的行程长度编码 = "1211"</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">n = 1</span></p>

<p><strong>输出：</strong><span class="example-io">"1"</span></p>

<p><strong>解释：</strong></p>

<p>这是基本情况。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 30</code></li>
</ul>


<strong>进阶：</strong>你能迭代解决该问题吗？

## 分析 

迭代即可，可以用 itertools.groupby 简化。

## 解答

```python
class Solution:
    def countAndSay(self, n: int) -> str:
        res = '1'
        for _ in range(n-1):
            res = ''.join(str(len(list(g)))+c for c,g in groupby(res))
        return res
```
48 ms
