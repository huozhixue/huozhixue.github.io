# 0273：整数转换英文表示（★★★）


## 题目

将非负整数 num 转换为其对应的英文表示。

提示：

- 0 <= num <= 2^31 - 1

<!--more--> 

示例 1：

    输入：num = 123
    输出："One Hundred Twenty Three"

示例 2：

    输入：num = 12345
    输出："Twelve Thousand Three Hundred Forty Five"

示例 3：

    输入：num = 1234567
    输出："One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

示例 4：

    输入：num = 1234567891
    输出："One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"
     

## 分析

容易看出用递归，但关于 0 的处理有点麻烦。

当 num 为 0 时返回 Zero，但是其它数（比如100）递归求 0 的表示时应该返回空，因此考虑用辅助函数 help() 来递归。

递归求 0 时不仅要返回空，而且前面的空格也要去掉，因此考虑 help() 返回 tuple 而不是字符串，主函数再拼接。


## 解答

```python
def numberToWords(self, num: int) -> str:
    def help(num):
        if num == 0:
            return ()
        for unit, exp in zip([10**9, 10**6, 10**3, 10**2], ['Billion', 'Million', 'Thousand', 'Hundred']):
            if num >= unit:
                return help(num//unit)+(exp,)+help(num%unit)
        return (ones[num-1],) if num < 20 else (tens[num//10-2],)+help(num%10)

    tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    ones = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen']
    return 'Zero' if num == 0 else ' '.join(help(num))
```
28 ms

