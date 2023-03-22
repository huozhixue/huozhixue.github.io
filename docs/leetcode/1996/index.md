# 1996：游戏中弱角色的数量（★★）


> <u>**[力扣第 257 场周赛第 2 题](https://leetcode.cn/problems/the-number-of-weak-characters-in-the-game/)**</u>

## 题目

<p>你正在参加一个多角色游戏，每个角色都有两个主要属性：<strong>攻击</strong> 和 <strong>防御</strong> 。给你一个二维整数数组 <code>properties</code> ，其中 <code>properties[i] = [attack<sub>i</sub>, defense<sub>i</sub>]</code> 表示游戏中第 <code>i</code> 个角色的属性。</p>

<p>如果存在一个其他角色的攻击和防御等级 <strong>都严格高于</strong> 该角色的攻击和防御等级，则认为该角色为 <strong>弱角色</strong> 。更正式地，如果认为角色 <code>i</code> <strong>弱于</strong> 存在的另一个角色 <code>j</code> ，那么 <code>attack<sub>j</sub> &gt; attack<sub>i</sub></code> 且 <code>defense<sub>j</sub> &gt; defense<sub>i</sub></code> 。</p>

<p>返回 <strong>弱角色</strong> 的数量。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>properties = [[5,5],[6,3],[3,6]]
<strong>输出：</strong>0
<strong>解释：</strong>不存在攻击和防御都严格高于其他角色的角色。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>properties = [[2,2],[3,3]]
<strong>输出：</strong>1
<strong>解释：</strong>第一个角色是弱角色，因为第二个角色的攻击和防御严格大于该角色。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>properties = [[1,5],[10,4],[4,3]]
<strong>输出：</strong>1
<strong>解释：</strong>第三个角色是弱角色，因为第二个角色的攻击和防御严格大于该角色。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= properties.length &lt;= 10<sup>5</sup></code></li>
<li><code>properties[i].length == 2</code></li>
<li><code>1 &lt;= attack<sub>i</sub>, defense<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

将角色按攻击排序，若攻击相同则防御较高的排前面。

令 A 代表排序后的防御数组，那么 A[i] 是弱角色等价于后面后面有角色的防御更高，即 A[i]<max(A[i+1:])。

那么倒序遍历 i 并维护 max(A[i+1:])，即可在 O(N) 时间得到弱角色数量。

## 解答

```python
def numberOfWeakCharacters(self, properties: List[List[int]]) -> int:
    A = sorted(properties, key=lambda x: (x[0],-x[1]))
    res, M = 0, float('-inf')
    for _, x in A[::-1]:
        res += int(x < M)
        M = max(M, x)
    return res
```
时间复杂度 O(N*logN)，600 ms

