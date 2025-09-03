# 3506：查找消除细菌菌株所需时间（★★）


> <u>**[力扣第 3506 题](https://leetcode.cn/problems/find-time-required-to-eliminate-bacterial-strains/)**</u>

## 题目

<p>给定一个整数数组 <code>timeReq</code> 和一个整数 <code>splitTime</code>。</p>

<p>在人体微观世界中，免疫系统面临着一项非凡的挑战：对抗快速繁殖的细菌群落，这对身体的生存构成威胁。</p>

<p>最初，只部署一个 <strong>白细胞</strong>（<strong>WBC</strong>）来消除细菌。然而，单独的白细胞很快意识到它无法跟上细菌的生长速度。</p>

<p>WBC制定了一种巧妙的策略来对抗细菌：</p>

<ul>
<li>第 <code>i</code> 个细菌菌株需要 <code>timeReq[i]</code> 个时间单位来被消除。</li>
<li>单个白细胞只能消除 <strong>一个</strong> 细菌菌株。之后，白细胞耗尽，无法执行任何其他任务。</li>
<li>一个白细胞可以将自身分裂为两个白细胞，但这需要 <code>splitTime</code> 单位时间。一旦分裂，两个白细胞就可以 <strong>并行</strong> 消灭细菌。</li>
<li>一个白细胞仅可以攻击一个细菌菌株。多个白细胞不能同时攻击一个菌株。</li>
</ul>

<p>您必须确定消除所有细菌菌株所需的 <strong>最短</strong> 时间。</p>

<p><strong>注意</strong>，细菌菌株可以按任何顺序消除。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>timeReq = [10,4,5], splitTime = 2</span></p>

<p><span class="example-io"><b>输出：</b>12</span></p>

<p><b>解释：</b></p>

<p>消除过程如下：</p>

<ul>
<li>最初，有一个白细胞。经过 2 个时间单位后，白细胞分裂成 2 个白细胞。</li>
<li>其中一个白细胞在 <code>t = 2 + 10 = 12</code> 时间内消除菌株 0。另一个白细胞使用 2 个单位时间再次分裂。</li>
<li>2 个新的白细胞消灭细菌的时间是 <code>t = 2 + 2 + 4</code> 和 <code>t = 2 + 2 + 5</code>。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>timeReq = [10,4], splitTime = 5</span></p>

<p><b>输出：</b>15</p>

<p><strong>解释：</strong></p>

<p>消除过程如下：</p>

<ul>
<li>最初，有一个白细胞。经过 5 个时间单位后，白细胞分裂成 2 个白细胞。</li>
<li>2 个新的白细胞消灭细菌的时间是 <code>t = 5 + 10</code> 和 <code>t = 5 + 4</code>。</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= timeReq.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= timeReq[i] &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= splitTime &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [1199：建造街区的最短时间（2250 分）](/leetcode/1199)


## 分析

- 与 {{< lc "1199" >}} 完全相同

## 解答

```python
class Solution:
    def minEliminationTime(self, timeReq: List[int], splitTime: int) -> int:
        pq = sorted(timeReq)
        while len(pq)>1:
            a,b = heappop(pq),heappop(pq)
            heappush(pq,b+splitTime)
        return pq[0]
```
111 ms

