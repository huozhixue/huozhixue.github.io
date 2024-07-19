# 2300：咒语和药水的成功对数（1476 分）


> <u>**[力扣第 80 场双周赛第 2 题](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/)**</u>

## 题目

<p>给你两个正整数数组 <code>spells</code> 和 <code>potions</code> ，长度分别为 <code>n</code> 和 <code>m</code> ，其中 <code>spells[i]</code> 表示第 <code>i</code> 个咒语的能量强度，<code>potions[j]</code> 表示第 <code>j</code> 瓶药水的能量强度。</p>

<p>同时给你一个整数 <code>success</code> 。一个咒语和药水的能量强度 <strong>相乘</strong> 如果 <strong>大于等于</strong> <code>success</code> ，那么它们视为一对 <strong>成功</strong> 的组合。</p>

<p>请你返回一个长度为 <code>n</code> 的整数数组<em> </em><code>pairs</code>，其中<em> </em><code>pairs[i]</code> 是能跟第 <code>i</code> 个咒语成功组合的 <b>药水</b> 数目。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>spells = [5,1,3], potions = [1,2,3,4,5], success = 7
<b>输出：</b>[4,0,3]
<strong>解释：</strong>
- 第 0 个咒语：5 * [1,2,3,4,5] = [5,<em><strong>10</strong></em>,<em><strong>15</strong></em>,<em><strong>20</strong></em>,<em><strong>25</strong></em>] 。总共 4 个成功组合。
- 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。总共 0 个成功组合。
- 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,<em><strong>9</strong></em>,<em><strong>12</strong></em>,<em><strong>15</strong></em>] 。总共 3 个成功组合。
所以返回 [4,0,3] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>spells = [3,1,2], potions = [8,5,8], success = 16
<b>输出：</b>[2,0,2]
<strong>解释：</strong>
- 第 0 个咒语：3 * [8,5,8] = [<em><strong>24</strong></em>,15,<em><strong>24</strong></em>] 。总共 2 个成功组合。
- 第 1 个咒语：1 * [8,5,8] = [8,5,8] 。总共 0 个成功组合。
- 第 2 个咒语：2 * [8,5,8] = [<em><strong>16</strong></em>,10,<em><strong>16</strong></em>] 。总共 2 个成功组合。
所以返回 [2,0,2] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == spells.length</code></li>
<li><code>m == potions.length</code></li>
<li><code>1 &lt;= n, m &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= spells[i], potions[i] &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= success &lt;= 10<sup>10</sup></code></li>
</ul>


**相似问题：**
- [0826：安排工作以达到最大收益（1708 分）](/leetcode/0826)
- [2389：和有限的最长子序列（1387 分）](/leetcode/2389)
- [2410：运动员和训练师的最大匹配数（1381 分）](/leetcode/2410)


## 分析

potions 排序后，针对每个咒语，二分查找即可。

## 解答

```python
def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
	potions.sort()
	n = len(potions)
	return [n-bisect_left(potions, success/a) for a in spells]
```
324 MS
