# 0201：数字范围按位与（★★）


## 题目

给你两个整数 left 和 right ，表示区间 [left, right] ，返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）。


 <!--more--> 

示例 1：

	输入：left = 5, right = 7
	输出：4
	
示例 2：

	输入：left = 0, right = 0
	输出：0
	
示例 3：

	输入：left = 1, right = 2147483647
	输出：0



## 分析

显然暴力做法比较耗时，考虑是否有规律。

观察发现当 right 的二进制位数比 left 多时，区间内必然含有二进制表示 $a=\overline{10...0}, b=\overline{1...1}$，且 a 的位数比 b 多。
故 a&b = 0，结果必然为 0 。

如果 right 和 left 都是 n 位二进制，则结果也是 n 位二进制且第一位为 1。剩下的部分是递归子问题。

因此只需要找到 right 和 left 的二进制表示的公共前缀，后面补 0 即可。

这里有个巧妙的方法来计算。 right 不断清除最右边的 1 直到 right<=left，就去除了所有的非公共前缀的 1。最终的 right 即为所求。
 
## 解答

```python
def rangeBitwiseAnd(self, left: int, right: int) -> int:
	while right > left:
		right &= right - 1
	return right
```

48 ms






