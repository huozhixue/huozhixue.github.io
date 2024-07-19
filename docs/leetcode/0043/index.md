# 0043：字符串相乘（★）


> <u>**[力扣第 43 题](https://leetcode.cn/problems/multiply-strings/)**</u>

## 题目

<p>给定两个以字符串形式表示的非负整数 <code>num1</code> 和 <code>num2</code>，返回 <code>num1</code> 和 <code>num2</code> 的乘积，它们的乘积也表示为字符串形式。</p>

<p><strong>注意：</strong>不能使用任何内置的 BigInteger 库或直接将输入转换为整数。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> num1 = "2", num2 = "3"
<strong>输出:</strong> "6"</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> num1 = "123", num2 = "456"
<strong>输出:</strong> "56088"</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= num1.length, num2.length &lt;= 200</code></li>
<li><code>num1</code> 和 <code>num2</code> 只能由数字组成。</li>
<li><code>num1</code> 和 <code>num2</code> 都不包含任何前导零，除了数字0本身。</li>
</ul>


**相似问题：**
- [0002：两数相加](/leetcode/0002)
- [0066：加一](/leetcode/0066)
- [0067：二进制求和](/leetcode/0067)
- [0415：字符串相加](/leetcode/0415)
- [2288：价格减免（1577 分）](/leetcode/2288)


## 分析 

不能直接转为整数，考虑模拟竖式乘法：
- 结果最多 m * n 位，用 m * n 长度的数组存储结果 
- 对于每对 <nums1[i], nums2[j]>， 乘积结果对应第 i+j 和 i+j+1 位
- 从低位到高位遍历，遍历过程中注意进位
- 注意最后要去掉前置 0，且注意结果为 0 的情况

## 解答

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        m, n = len(num1), len(num2)
        res = [0]*(m+n)
        for i in range(m-1,-1,-1):
            for j in range(n-1,-1,-1):
                a,b = int(num1[i]),int(num2[j])
                q,res[i+j+1] = divmod(res[i+j+1]+a*b,10)
                res[i+j] += q
        return ''.join(map(str,res)).lstrip('0') or '0'
```
112 ms
