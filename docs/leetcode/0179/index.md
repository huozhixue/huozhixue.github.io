# 0179：最大数（★）


> <u>**[力扣第 179 题](https://leetcode.cn/problems/largest-number/)**</u>

## 题目

<p>给定一组非负整数 <code>nums</code>，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。</p>

<p><strong>注意：</strong>输出结果可能非常大，所以你需要返回一个字符串而不是整数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入<code>：</code></strong><code>nums = [10,2]</code>
<strong>输出：</strong><code>"210"</code></pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入<code>：</code></strong><code>nums = [3,30,34,5,9]</code>
<strong>输出：</strong><code>"9534330"</code>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 100</code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

- 首先想到按字典序降序拼接，但是某些情况并不适用
	- 例如 [3,30,34,5,9] 的字典序降序为 [9,5,34,30,3]，但正确的顺序应该是 [9,5,34,3,30]。
- 因此需要重新定义优先顺序。这里有个巧妙的想法:
	- 只要 $\overline{AB}>\overline{BA}$，就认为 A 的优先级更高，应该排在前面。
- 直觉告诉我们这样很可能是正确的，不过需要证明一下。 采用反证法：
	- 假设最大结果 res 中存在 $\overline{AB}>\overline{BA}$ 但 B 排在 A 的前面
		- 显然 B 和 A 不可能是相邻的，否则直接交换就得到更大的结果了
		- 故res 是 $\overline{...BCA...}$ 的形式
		- 同理，应该有 $\overline{BC} \geq \overline{CB}，\overline{CA} \geq \overline{AC}$，否则交换下就得到更大的结果
	- 设 A、B、C 对应的字符串长度分别为 x、y、z，那么：
$$\overline{BC} \geq \overline{CB}，
\overline{CA} \geq \overline{AC}$$
$$\Rarr \begin{cases} 
B * 10^z + C \geq C * 10^y + B \\\
C * 10^x + A \geq A * 10^z + C 
\end{cases} $$
$$ \Rarr \begin{cases}
B * (10^z-1) \geq C * (10^y-1) \\\
C * (10^x-1) \geq A * (10^z-1) 
\end{cases}$$
$$ \Rarr B * C * (10^z-1) * (10^x-1) \geq C * A * (10^y-1) * (10^z-1) $$
$$ \Rarr B * (10^x-1) \geq A * (10^y-1) $$
$$ \Rarr B * 10^x + A \geq A * 10^y + B $$
$$ \Rarr \overline{BA} \geq \overline{AB}  ，矛盾。 $$
	
- 故对于任意 $\overline{AB}>\overline{BA}$，应该将 A 排在 B 的前面。

## 解答

```python
class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        cmp = lambda x,y: 1 if x+y<y+x else -1 if x+y>y+x else 0
        res = ''.join(sorted(map(str, nums), key=cmp_to_key(cmp)))
        return res.lstrip('0') or '0'
```
40 ms



