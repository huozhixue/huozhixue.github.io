# 0043：字符串相乘（★★）


## 题目

给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

<!--more--> 

示例 1:

	输入: num1 = "2", num2 = "3"
	输出: "6"
	
示例 2:

	输入: num1 = "123", num2 = "456"
	输出: "56088"


## 分析 

### #1

虽然题目说不能直接转为整数，不过还是试下看看速度。

```python
def multiply(self, num1: str, num2: str) -> str:
	return str(int(num1)*int(num2))
```

40 ms

### #2

想想人是怎么算的，可以先计算 num1 任意一位和 num2 任意一位的乘积，然后根据起始位置列出竖式相加。

观察可知，任意 num1[i] 和 num2[j] 的乘积对应的起始位置是 i+j+1，可能的进位位置是 i+j，最多也就占两位。
因此，只要反序遍历 num1[i] 和 num2[j]，将乘积的值添加到对应的两位即可。

注意最后要去掉前置 0。


## 解答

```python
def multiply(self, num1: str, num2: str) -> str:
	res = [0] * (len(num1)+len(num2))
	for i in range(len(num1)-1, -1, -1):
		for j in range(len(num2)-1, -1, -1):
			s = int(num1[i])*int(num2[j]) + res[i+j+1]
			res[i+j+1] = s%10
			res[i+j] += s//10
	while len(res) > 1 and res[0] == 0:
		res = res[1:]
	return ''.join(map(str, res))
```

148 ms

