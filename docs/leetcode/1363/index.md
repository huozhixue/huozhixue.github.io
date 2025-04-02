# 1363：形成三的最大倍数（1822 分）


> <u>**[力扣第 177 场周赛第 4 题](https://leetcode.cn/problems/largest-multiple-of-three/)**</u>

## 题目

<p>给你一个整数数组 <code>digits</code>，你可以通过按 <strong>任意顺序</strong> 连接其中某些数字来形成 <strong>3</strong> 的倍数，请你返回所能得到的最大的 3 的倍数。</p>

<p>由于答案可能不在整数数据类型范围内，请以字符串形式返回答案。如果无法得到答案，请返回一个空字符串。返回的结果不应包含不必要的前导零。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>digits = [8,1,9]
<strong>输出：</strong>"981"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>digits = [8,6,7,1,0]
<strong>输出：</strong>"8760"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>digits = [1]
<strong>输出：</strong>""
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>digits = [0,0,0,0,0,0]
<strong>输出：</strong>"0"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= digits.length &lt;= 10^4</code></li>
<li><code>0 &lt;= digits[i] &lt;= 9</code></li>
</ul>




## 分析

- 假如总和模3余1
	- 首先考虑 1、4、7，若存在，去掉 1 个即可
	- 否则要去掉 2、5、8 中的两个
- 假如总和模3余2
	- 首先考虑 2、5、8，若存在，去掉 1 个
	- 否则要去掉 1、4、7 中的两个
- 最后输出时，注意不能有前导 0

## 解答


```python
class Solution:
    def largestMultipleOfThree(self, digits: List[int]) -> str:
        ct = Counter(digits)
        r = sum(digits)%3
        for x in ([1,4,7,2,5,8] if r==1 else [2,5,8,1,4,7]):
            while ct[x] and r:
                ct[x] -= 1
                r = (r-x)%3
        res = ''.join(str(x)*ct[x] for x in sorted(ct)[::-1])
        return res and (res.lstrip('0') or '0')
```
3 ms
