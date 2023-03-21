# 0273：整数转换英文表示（★★）


> <u>**[力扣第 273 题](https://leetcode.cn/problems/integer-to-english-words/)**</u>

## 题目

<p>将非负整数 <code>num</code> 转换为其对应的英文表示。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>num = 123
<strong>输出：</strong>"One Hundred Twenty Three"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>num = 12345
<strong>输出：</strong>"Twelve Thousand Three Hundred Forty Five"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>num = 1234567
<strong>输出：</strong>"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

容易看出用递归，但要注意细节处理：
- 当 num 为 0 时要返回 Zero
- 其它数（比如100）递归求 0 的表示时应该返回空
- 为了方便处理空格，dfs 返回元组形式，主函数再拼接


## 解答

```python
def numberToWords(self, num: int) -> str:
    def dfs(num):
        if num == 0:
            return ()
        for unit, exp in zip([10**9, 10**6, 10**3, 10**2], ['Billion', 'Million', 'Thousand', 'Hundred']):
            if num >= unit:
                return dfs(num//unit)+(exp,)+dfs(num%unit)
        return (ones[num-1],) if num < 20 else (tens[num//10-2],)+dfs(num%10)

    tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    ones = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen']
    return 'Zero' if num == 0 else ' '.join(dfs(num))
```
28 ms

