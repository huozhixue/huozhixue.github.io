# 0365：水壶问题（★）


> <u>**[力扣第 365 题](https://leetcode.cn/problems/water-and-jug-problem/)**</u>

## 题目

<p>有两个水壶，容量分别为 <code>x</code> 和 <code>y</code> 升。水的供应是无限的。确定是否有可能使用这两个壶准确得到 <code>target</code> 升。</p>

<p>你可以：</p>

<ul>
<li>装满任意一个水壶</li>
<li>清空任意一个水壶</li>
<li>将水从一个水壶倒入另一个水壶，直到接水壶已满，或倒水壶已空。</li>
</ul>



<p><strong>示例 1:</strong> </p>

<pre>
<strong>输入:</strong> x = 3,y = 5,target = 4
<strong>输出:</strong> true
<strong>解释：
</strong>按照以下步骤操作，以达到总共 4 升水：
1. 装满 5 升的水壶(0, 5)。
2. 把 5 升的水壶倒进 3 升的水壶，留下 2 升(3, 2)。
3. 倒空 3 升的水壶(0, 2)。
4. 把 2 升水从 5 升的水壶转移到 3 升的水壶(2, 0)。
5. 再次加满 5 升的水壶(2, 5)。
6. 从 5 升的水壶向 3 升的水壶倒水直到 3 升的水壶倒满。5 升的水壶里留下了 4 升水(3, 4)。
7. 倒空 3 升的水壶。现在，5 升的水壶里正好有 4 升水(0, 4)。
参考：来自著名的 <a href="https://www.youtube.com/watch?v=BVtQNK_ZUJg"><em>"Die Hard"</em></a></pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> x = 2, y = 6, target = 5
<strong>输出:</strong> false
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> x = 1, y = 2, target = 3
<strong>输出:</strong> true
<b>解释：</b>同时倒满两个水壶。现在两个水壶中水的总量等于 3。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= x, y, target &lt;= 10<sup>3</sup></code></li>
</ul>




## 分析

- 注意到有效的操作对应的容量变化只能是 ±x、±y、0
- 有效的 z 必然能表示为 ax+by（a、b为整数）
- 反过来，若 z 能表示为 ax+by（a、b为整数），且 z<=x+y，可以构造出方案得到 z
- 根据 [裴蜀定理](//oi-wiki.org/math/number-theory/bezouts/)，z 能表示为 ax+by（a、b为整数）等价于 z 是 a、b 的最大公约数的倍数
- 因此满足 z<=x+y 且 z%gcd(x,y)=0 即可

## 解答

```python
class Solution:
    def canMeasureWater(self, x: int, y: int, target: int) -> bool:
        return target<=x+y and target%gcd(x,y)==0
```
40 ms

