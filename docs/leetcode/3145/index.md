# 3145：大数组元素的乘积（2859 分）


> <u>**[力扣第 130 场双周赛第 4 题](https://leetcode.cn/problems/find-products-of-elements-of-big-array/)**</u>

## 题目

<p>一个非负整数 <code>x</code> 的 <strong>强数组</strong> 指的是满足元素为 2 的幂且元素总和为 <code>x</code> 的最短有序数组。下表说明了如何确定 <strong>强数组</strong> 的示例。可以证明，<code>x</code> 对应的强数组是独一无二的。</p>

<table border="1">
<tbody>
<tr>
<th>数字</th>
<th>二进制表示</th>
<th>强数组</th>
</tr>
<tr>
<td>1</td>
<td>0000<u>1</u></td>
<td>[1]</td>
</tr>
<tr>
<td>8</td>
<td>0<u>1</u>000</td>
<td>[8]</td>
</tr>
<tr>
<td>10</td>
<td>0<u>1</u>0<u>1</u>0</td>
<td>[2, 8]</td>
</tr>
<tr>
<td>13</td>
<td>0<u>11</u>0<u>1</u></td>
<td>[1, 4, 8]</td>
</tr>
<tr>
<td>23</td>
<td><u>1</u>0<u>111</u></td>
<td>[1, 2, 4, 16]</td>
</tr>
</tbody>
</table>



<p>我们将每一个升序的正整数 <code>i</code> （即1，2，3等等）的 <strong>强数组</strong> 连接得到数组 <code>big_nums</code> ，<code>big_nums</code> 开始部分为 <code>[<u>1</u>, <u>2</u>, <u>1, 2</u>, <u>4</u>, <u>1, 4</u>, <u>2, 4</u>, <u>1, 2, 4</u>, <u>8</u>, ...]</code> 。</p>

<p>给你一个二维整数数组 <code>queries</code> ，其中 <code>queries[i] = [from<sub>i</sub>, to<sub>i</sub>, mod<sub>i</sub>]</code> ，你需要计算 <code>(big_nums[from<sub>i</sub>] * big_nums[from<sub>i</sub> + 1] * ... * big_nums[to<sub>i</sub>]) % mod<sub>i</sub></code> 。</p>

<p>请你返回一个整数数组 <code>answer</code> ，其中 <code>answer[i]</code> 是第 <code>i</code> 个查询的答案。</p>



<p><strong>示例 1：</strong></p>

<p><b>输入：</b>queries = [[1,3,7]]</p>

<p><b>输出：</b>[4]</p>

<p><strong>解释：</strong></p>

<p>只有一个查询。</p>

<p><code>big_nums[1..3] = [2,1,2]</code> 。它们的乘积为 4。结果为 <code>4 % 7 = 4</code>。</p>

<p><strong>示例 2：</strong></p>

<p><b>输入：</b>queries = [[2,5,3],[7,7,4]]</p>

<p><b>输出：</b>[2,2]</p>

<p><strong>解释：</strong></p>

<p>有两个查询。</p>

<p>第一个查询：<code>big_nums[2..5] = [1,2,4,1]</code> 。它们的乘积为 8 。结果为  <code>8 % 3 = 2</code>。</p>

<p>第二个查询：<code>big_nums[7] = 2</code> 。结果为 <code>2 % 4 = 2</code>。</p>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= queries.length &lt;= 500</code></li>
<li><code>queries[i].length == 3</code></li>
<li><code>0 &lt;= queries[i][0] &lt;= queries[i][1] &lt;= 10<sup>15</sup></code></li>
<li><code>1 &lt;= queries[i][2] &lt;= 10<sup>5</sup></code></li>
</ul>

## 分析

- 由于 big_nums 的数都是2的幂，令A[i]=log2(big_nums[i])，转为求 A的 [from,to] 区间和，令 g(a) 代表 A[:a] 的和，即转为求 g(to+1) 和 g(from)
- 要求 g(a)，可以先二分找到 a 对应的最后整数 x
	- 先考虑这个问题：令 f(x) 代表 1到 x 所对应的强数组总长度，如何求 f(x)
	- f(x) 其实就是 1到x 的二进制位上 1 的总数， 这可以用贡献法解决：
		- 枚举每个二进制位 i，每 2^(i+1) 个数为一个循环，贡献 2^i 个 1，且都在后 2^i 个数，因此计算有多少个完整循环，并特判最后一个循环即可
	- 于是二分找到第一个 x 使得 f(x)>=a，即是 a 对应的最后整数
- 接着求 g(a)，同样可以用贡献法：
	- 区别仅在于二进制位 i 上的权重位 2^i，因此算出个数后乘以 2^i 即可
	- 注意最后整数 x 的强数组不一定完整，需要特判

## 解答

```python []
class Solution:
    def findProductsOfElements(self, queries: List[List[int]]) -> List[int]:
        def f(x):
            s = 0
            for i in range(x.bit_length()):
                q,r = divmod(x,1<<(i+1))
                s += q*(1<<i)+max(0,r-(1<<i)+1)
            return s
        def get(a):
            x = bisect_left(range(a*2),a,key=f)-1
            s = 0
            for i in range(x.bit_length()):
                q,r = divmod(x,1<<(i+1))
                s += (q*(1<<i)+max(0,r-(1<<i)+1))*i
            A = [i for i in range((x+1).bit_length()) if (x+1)&1<<i]
            return s+sum(A[:a-f(x)])
        return [pow(2,get(b+1)-get(a),mod) for a,b,mod in queries]
```
718 ms



