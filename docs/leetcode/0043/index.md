# 0043：字符串相乘（★★）


## 题目

给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。


示例 1:

	输入: num1 = "2", num2 = "3"
	输出: "6"

示例 2:

	输入: num1 = "123", num2 = "456"
	输出: "56088"
 

提示：
- 1 <= num1.length, num2.length <= 200
- num1 和 num2 只能由数字组成。
- num1 和 num2 都不包含任何前导零，除了数字0本身。


## 分析 

### #1

虽然题目说不能直接转为整数，不过还是试下看看速度。

```python
def multiply(self, num1: str, num2: str) -> str:
	return str(int(num1)*int(num2))
```
40 ms

### #2

考虑模拟竖式乘法：
- 为了从低到高计算，将 num1、num2 反序
- 结果最多 m * n 位，因此用 m * n 长度的数组 res 存储结果 
- 对于每对 <nums1[i], nums2[j]>， 乘积结果对应第 i+j 和 i+j+1 位
- 遍历过程中注意进位，最后将 res 反序即为所求

注意最后要去掉前置 0。

## 解答

```python
def multiply(self, num1: str, num2: str) -> str:
    m, n = len(num1), len(num2)
    res, A, B = [0] * (m+n), num1[::-1], num2[::-1]
    for i, j in product(range(m), range(n)):
        s = int(A[i]) * int(B[j]) + res[i+j]
        res[i+j] = s % 10
        res[i+j+1] += s // 10
    return ''.join(map(str, res[::-1])).lstrip('0') or '0'
```
112 ms
