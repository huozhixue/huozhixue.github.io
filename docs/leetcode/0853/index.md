# 0853：车队（1678 分）


> <u>**[力扣第 89 场周赛第 2 题](https://leetcode.cn/problems/car-fleet/)**</u>

## 题目

<p>在一条单行道上，有 <code>n</code> 辆车开往同一目的地。目的地是几英里以外的 <code>target</code> 。</p>

<p>给定两个整数数组 <code>position</code> 和 <code>speed</code> ，长度都是 <code>n</code> ，其中 <code>position[i]</code> 是第 <code>i</code> 辆车的位置， <code>speed[i]</code> 是第 <code>i</code> 辆车的速度(单位是英里/小时)。</p>

<p>一辆车永远不会超过前面的另一辆车，但它可以追上去，并以较慢车的速度在另一辆车旁边行驶。</p>

<p><strong>车队 </strong>是指并排行驶的一辆或几辆汽车。车队的速度是车队中 <strong>最慢</strong> 的车的速度。</p>

<p>即便一辆车在 <code>target</code> 才赶上了一个车队，它们仍然会被视作是同一个车队。</p>

<p>返回到达目的地的车队数量 。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]</span></p>

<p><span class="example-io"><b>输出：</b>3</span></p>

<p><strong>解释：</strong></p>

<ul>
<li>从 10（速度为 2）和 8（速度为 4）开始的车会组成一个车队，它们在 12 相遇。车队在 <code>target</code> 形成。</li>
<li>从 0（速度为 1）开始的车不会追上其它任何车，所以它自己是一个车队。</li>
<li>从 5（速度为 1） 和 3（速度为 3）开始的车组成一个车队，在 6 相遇。车队以速度 1 移动直到它到达 <code>target</code>。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b></span><span class="example-io">target = 10, position = [3], speed = [3]</span></p>

<p><span class="example-io"><b>输出：</b></span><span class="example-io">1</span></p>

<p><strong>解释：</strong></p>
只有一辆车，因此只有一个车队。</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b></span><span class="example-io">target = 100, position = [0,2,4], speed = [4,2,1]</span></p>

<p><span class="example-io"><b>输出：</b></span><span class="example-io">1</span></p>

<p><strong>解释：</strong></p>

<ul>
<li>从 0（速度为 4） 和 2（速度为 2）开始的车组成一个车队，在 4 相遇。从 4 开始的车（速度为 1）移动到了 5。</li>
<li>然后，在 4（速度为 2）的车队和在 5（速度为 1）的车成为一个车队，在 6 相遇。车队以速度 1 移动直到它到达 <code>target</code>。</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == position.length == speed.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt; target &lt;= 10<sup>6</sup></code></li>
<li><code>0 &lt;= position[i] &lt; target</code></li>
<li><code>position</code> 中每个值都 <strong>不同</strong></li>
<li><code>0 &lt; speed[i] &lt;= 10<sup>6</sup></code></li>
</ul>


**相似问题：**
- [1776：车队 II（2530 分）](/leetcode/1776)
- [2211：统计道路上的碰撞次数（1581 分）](/leetcode/2211)


## 分析

令 t[i] 代表如果车 i 速度不变到达目的地的时间，T[i] 代表车 i 实际到达目的地的时间。

显然若车 i 在车 j 前面，且 T[i] < t[j]，则车 j 无法追上车 i，最终 T[j] = t[j]。
反之，若 T[i] >= t[j]，则车 j 能追上车 i，最终 T[j] = T[i]。
另外，一开始在最前面的车 x，显然有 T[x] = t[x]。

因此，将车按初始位置从大到小排序，即可递推求出 T[i]，从而得到车队个数。


## 解答

```python
def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
    res, prev = 0, (target+1, 1)
    for pos, sp in sorted(zip(position, speed), reverse=True):
        if (target-pos)*prev[1] > (target-prev[0])*sp:
            res += 1
            prev = (pos, sp)
    return res
```
196 ms
