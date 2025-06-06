# 0765：情侣牵手（1999 分）


> <u>**[力扣第 765 题](https://leetcode.cn/problems/couples-holding-hands/)**</u>

## 题目

<p><code>n</code> 对情侣坐在连续排列的 <code>2n</code> 个座位上，想要牵到对方的手。</p>

<p>人和座位由一个整数数组 <code>row</code> 表示，其中 <code>row[i]</code> 是坐在第 <code>i </code>个座位上的人的 <strong>ID</strong>。情侣们按顺序编号，第一对是 <code>(0, 1)</code>，第二对是 <code>(2, 3)</code>，以此类推，最后一对是 <code>(2n-2, 2n-1)</code>。</p>

<p>返回 <em>最少交换座位的次数，以便每对情侣可以并肩坐在一起</em>。 <i>每次</i>交换可选择任意两人，让他们站起来交换座位。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> row = [0,2,1,3]
<strong>输出:</strong> 1
<strong>解释:</strong> 只需要交换row[1]和row[2]的位置即可。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> row = [3,2,0,1]
<strong>输出:</strong> 0
<strong>解释:</strong> 无需交换座位，所有的情侣都已经可以手牵手了。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>2n == row.length</code></li>
<li><code>2 &lt;= n &lt;= 30</code></li>
<li><code>n</code> 是偶数</li>
<li><code>0 &lt;= row[i] &lt; 2n</code></li>
<li><code>row</code> 中所有元素均<strong>无重复</strong></li>
</ul>


**相似问题：**
- [0041：缺失的第一个正数](/leetcode/0041)
- [0268：丢失的数字](/leetcode/0268)
- [0854：相似度为 K 的字符串（2377 分）](/leetcode/0854)


## 分析

- 每个人看作顶点，情侣间连边，相邻座位的连边（0和1、2和3才算，1和2不算）
- 由于每个点的度数都是 2，所以图由若干个独立的环组成
- 假如环里有 k 对情侣，任意凑对的操作本质上相当于将环缩小了 1，因此需要 k-1 次交换
- 实际实现时，可以贪心地凑对，哈希表维护元素下标即可

## 解答


```python
class Solution:
    def minSwapsCouples(self, row: List[int]) -> int:
        res = 0
        d = {x:i for i,x in enumerate(row)}
        for i in range(1,len(row),2):
            x = row[i-1]^1
            if row[i]!=x:
                j = d[x]
                row[j] = row[i]
                d[row[j]] = j
                res += 1
        return res
```
0 ms
