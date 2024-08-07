# 0017：电话号码的字母组合（★）


> <u>**[力扣第 17 题](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)**</u>

## 题目

<p>给定一个仅包含数字 <code>2-9</code> 的字符串，返回所有它能表示的字母组合。答案可以按 <strong>任意顺序</strong> 返回。</p>

<p>给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。</p>

<p><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/11/09/200px-telephone-keypad2svg.png" style="width: 200px;" /></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>digits = "23"
<strong>输出：</strong>["ad","ae","af","bd","be","bf","cd","ce","cf"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>digits = ""
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>digits = "2"
<strong>输出：</strong>["a","b","c"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= digits.length &lt;= 4</code></li>
<li><code>digits[i]</code> 是范围 <code>['2', '9']</code> 的一个数字。</li>
</ul>


**相似问题：**
- [0022：括号生成](/leetcode/0022)
- [0039：组合总和](/leetcode/0039)
- [0401：二进制手表](/leetcode/0401)
- [2266：统计打字方案数（1856 分）](/leetcode/2266)
- [3014：输入单词需要的最少按键次数 I（1324 分）](/leetcode/3014)
- [3016：输入单词需要的最少按键次数 II（1533 分）](/leetcode/3016)


## 分析

可以递推前 i 个字符能代表的组合。

## 解答

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        d = dict(zip('23456789',['abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']))
        res = []
        for x in digits:
            res = [sub+c for sub in res or [''] for c in d[x]] 
        return res
```
37 ms
