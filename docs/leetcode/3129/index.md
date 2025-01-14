# 3129：找出所有稳定的二进制数组 I（2200 分）


> <u>**[力扣第 129 场双周赛第 3 题](https://leetcode.cn/problems/find-all-possible-stable-binary-arrays-i/)**</u>

## 题目

<p>给你 3 个正整数 <code>zero</code> ，<code>one</code> 和 <code>limit</code> 。</p>

<p>一个 <span data-keyword="binary-array">二进制数组</span> <code>arr</code> 如果满足以下条件，那么我们称它是 <strong>稳定的</strong> ：</p>

<ul>
<li>0 在 <code>arr</code> 中出现次数 <strong>恰好</strong> 为<strong> </strong><code>zero</code> 。</li>
<li>1 在 <code>arr</code> 中出现次数 <strong>恰好</strong> 为 <code>one</code> 。</li>
<li><code>arr</code> 中每个长度超过 <code>limit</code> 的 <span data-keyword="subarray-nonempty">子数组</span> 都 <strong>同时</strong> 包含 0 和 1 。</li>
</ul>

<p>请你返回 <strong>稳定</strong> 二进制数组的 <em>总</em> 数目。</p>

<p>由于答案可能很大，将它对 <code>10<sup>9</sup> + 7</code> <b>取余</b> 后返回。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>zero = 1, one = 1, limit = 2</span></p>

<p><span class="example-io"><b>输出：</b>2</span></p>

<p><strong>解释：</strong></p>

<p>两个稳定的二进制数组为 <code>[1,0]</code> 和 <code>[0,1]</code> ，两个数组都有一个 0 和一个 1 ，且没有子数组长度大于 2 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">zero = 1, one = 2, limit = 1</span></p>

<p><span class="example-io"><b>输出：</b>1</span></p>

<p><strong>解释：</strong></p>

<p>唯一稳定的二进制数组是 <code>[1,0,1]</code> 。</p>

<p>二进制数组 <code>[1,1,0]</code> 和 <code>[0,1,1]</code> 都有长度为 2 且元素全都相同的子数组，所以它们不稳定。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>zero = 3, one = 3, limit = 2</span></p>

<p><span class="example-io"><b>输出：</b>14</span></p>

<p><strong>解释：</strong></p>

<p>所有稳定的二进制数组包括 <code>[0,0,1,0,1,1]</code> ，<code>[0,0,1,1,0,1]</code> ，<code>[0,1,0,0,1,1]</code> ，<code>[0,1,0,1,0,1]</code> ，<code>[0,1,0,1,1,0]</code> ，<code>[0,1,1,0,0,1]</code> ，<code>[0,1,1,0,1,0]</code> ，<code>[1,0,0,1,0,1]</code> ，<code>[1,0,0,1,1,0]</code> ，<code>[1,0,1,0,0,1]</code> ，<code>[1,0,1,0,1,0]</code> ，<code>[1,0,1,1,0,0]</code> ，<code>[1,1,0,0,1,0]</code> 和 <code>[1,1,0,1,0,0]</code> 。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= zero, one, limit &lt;= 200</code></li>
</ul>


**相似问题：**
- [0525：连续数组](/leetcode/0525)
- [0930：和相同的二元子数组（1591 分）](/leetcode/0930)


## 分析


- 按最后一个选 0/1 递推
- 令 f[i][j][0]、f[i][j][1] 分别代表 i 个 0、j 个 1 且结尾是 0/1 的个数
- 假如结尾是 0
	- 考虑从 f[i-1][j] 的数组转移
	- f[i-1][j] 中，只有当结尾是 limit 个 0 时，才不能转移
	- 结尾是 limit 个 0，即对应了 f[i-1-limit][j] 的数组
	- 因此 f[i][j][0] = f[i-1][j]-f[i-1-limit][j]
- 结尾是 1 可以同理递推

## 解答


```python
class Solution:
    def numberOfStableArrays(self, zero: int, one: int, limit: int) -> int:
        mod = 10**9+7
        f = [[[0,0] for _ in range(one+1)] for _ in range(zero+1)]
        for i in range(1,min(limit,zero)+1):
            f[i][0][0] = 1
        for j in range(1,min(limit,one)+1):
            f[0][j][1] = 1
        for i in range(1,zero+1):
            for j in range(1,one+1):
                f[i][j][0] = sum(f[i-1][j])-(f[i-1-limit][j][1] if i>limit else 0)
                f[i][j][1] = sum(f[i][j-1])-(f[i][j-1-limit][0] if j>limit else 0)
        return sum(f[-1][-1])%mod
```
211 ms
