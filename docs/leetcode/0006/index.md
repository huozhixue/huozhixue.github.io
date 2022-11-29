# 0006：Z 字形变换（★）


## 题目

将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

    P   A   H   N
    A P L S I I G
    Y   I   R

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：string convert(string s, int numRows);


示例 1：

    输入：s = "PAYPALISHIRING", numRows = 3
    输出："PAHNAPLSIIGYIR"

示例 2：

    输入：s = "PAYPALISHIRING", numRows = 4
    输出："PINALSIGYAHRPI"
    解释：
    P     I    N
    A   L S  I G
    Y A   H R
    P     I

示例 3：

    输入：s = "A", numRows = 1
    输出："A"

提示：
- 1 <= s.length <= 1000
- s 由英文字母（小写和大写）、',' 和 '.' 组成
- 1 <= numRows <= 1000

## 分析

### #1

最直接的就是模拟排列的过程。遍历 s，将每个字符添加到 Z 字形中对应的行，最后再拼接所有行即可。

判断字符所属行时，可以用 flag 标志方向，遇到边界时调转方向。

```python
def convert(self, s: str, numRows: int) -> str:
    if numRows < 2:
        return s
    res = [''] * numRows
    row, flag = 0, 1
    for char in s:
        res[row] += char
        row += flag
        flag *= -1 if row in [0, numRows-1] else 1
    return ''.join(res)
```
44 ms

### #2

也可以用数学方法直接求出每个下标对应的行。

显然变换周期为 loop=max(1, 2*(numRows-1))，一个周期中的第 k 个字符属于第 min(k, loop-k) 行。

## 解答

```python
def convert(self, s: str, numRows: int) -> str:
    loop = max(1, (numRows-1)*2)
    A = ['']*numRows
    for i, c in enumerate(s):
        k = min(i%loop, loop-i%loop)
        A[k] += c
    return ''.join(A)
```
64 ms


