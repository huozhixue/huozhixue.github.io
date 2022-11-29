# 0201：数字范围按位与（★★★）


## 题目

给你两个整数 left 和 right ，表示区间 [left, right] ，
返回此区间内所有数字 按位与 的结果（包含 left 、right 端点）。

示例 1：

    输入：left = 5, right = 7
    输出：4

示例 2：

    输入：left = 0, right = 0
    输出：0

示例 3：

    输入：left = 1, right = 2147483647
    输出：0
	

提示： 0 <= left <= right <= 2^31 - 1

## 分析

本题要利用位运算与的特性：
- 假如 right 的二进制位数比 left 多，结果必然为 0 
- 假如位数相等，去掉 right 和 left 二进制的第一位，转为递归子问题
- 因此只需要找到 right 和 left 的二进制表示的公共前缀，后面补 0 即可

具体实现时有个巧妙的方法：right 不断去掉最右边的 1 直到 right<=left，即为所求。
 
## 解答

```python
def rangeBitwiseAnd(self, left: int, right: int) -> int:
	while right > left:
		right &= right - 1
	return right
```
48 ms






