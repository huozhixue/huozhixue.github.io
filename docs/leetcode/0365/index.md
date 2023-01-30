# 0365：水壶问题（★★）



## 题目

有两个水壶，容量分别为 jug1Capacity 和 jug2Capacity 升。水的供应是无限的。
确定是否有可能使用这两个壶准确得到 targetCapacity 升。

如果可以得到 targetCapacity 升水，最后请用以上水壶中的一或两个来盛放取得的 targetCapacity 升水。

你可以：
- 装满任意一个水壶
- 清空任意一个水壶
- 从一个水壶向另外一个水壶倒水，直到装满或者倒空
 

示例 1: 

	输入: jug1Capacity = 3, jug2Capacity = 5, targetCapacity = 4
	输出: true
	解释：来自著名的 "Die Hard"

示例 2:

	输入: jug1Capacity = 2, jug2Capacity = 6, targetCapacity = 5
	输出: false

示例 3:

	输入: jug1Capacity = 1, jug2Capacity = 2, targetCapacity = 3
	输出: true
 

提示:
- 1 <= jug1Capacity, jug2Capacity, targetCapacity <= 10^6

 
 
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

