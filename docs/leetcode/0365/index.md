# 0365：水壶问题（★）


> <u>**[力扣第 365 题](https://leetcode.cn/problems/water-and-jug-problem/)**</u>

## 题目

<p>有两个水壶，容量分别为 <code>jug1Capacity</code> 和 <code>jug2Capacity</code> 升。水的供应是无限的。确定是否有可能使用这两个壶准确得到 <code>targetCapacity</code> 升。</p>

<p>如果可以得到 <code>targetCapacity</code> 升水，最后请用以上水壶中的一或两个来盛放取得的 <code>targetCapacity</code> 升水。</p>

<p>你可以：</p>

<ul>
<li>装满任意一个水壶</li>
<li>清空任意一个水壶</li>
<li>从一个水壶向另外一个水壶倒水，直到装满或者倒空</li>
</ul>



<p><strong>示例 1:</strong> </p>

<pre>
<strong>输入:</strong> jug1Capacity = 3, jug2Capacity = 5, targetCapacity = 4
<strong>输出:</strong> true
<strong>解释</strong>：来自著名的 <a href="https://www.youtube.com/watch?v=BVtQNK_ZUJg"><em>"Die Hard"</em></a></pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> jug1Capacity = 2, jug2Capacity = 6, targetCapacity = 5
<strong>输出:</strong> false
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> jug1Capacity = 1, jug2Capacity = 2, targetCapacity = 3
<strong>输出:</strong> true
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= jug1Capacity, jug2Capacity, targetCapacity &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

注意到有效的操作对应的容量变化只能是 ±x、±y、0：
- 有效的 z 必然能表示为 ax+by（a、b为整数）
- 反过来，若 z 能表示为 ax+by（a、b为整数），且 z<=x+y，可以构造出方案得到 z
- 根据 [裴蜀定理](//oi-wiki.org/math/number-theory/bezouts/)，z 能表示为 ax+by（a、b为整数）
等价于 z 是 a、b 的最大公约数的倍数
- 因此满足 z<=x+y 且 z%gcd(x,y)==0 即可

## 解答

```python
def canMeasureWater(self, x: int, y: int, z: int) -> bool:
    return z<=x+y and z%gcd(x,y)==0
```
28 ms

