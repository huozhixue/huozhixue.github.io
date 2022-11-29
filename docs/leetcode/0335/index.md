# 0335：路径交叉（★★★）


## 题目

给你一个整数数组 distance 。

从 X-Y 平面上的点 (0,0) 开始，先向北移动 distance[0] 米，然后向西移动 distance[1] 米，
向南移动 distance[2] 米，向东移动 distance[3] 米，持续移动。也就是说，每次移动后你的方位会发生逆时针变化。

判断你所经过的路径是否相交。如果相交，返回 true ；否则，返回 false 。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/14/selfcross1-plane.jpg)

	输入：distance = [2,1,1,2]
	输出：true
	
示例 2：

![img](https://assets.leetcode.com/uploads/2021/03/14/selfcross2-plane.jpg)

	输入：distance = [1,2,3,4]
	输出：false
	
示例 3：

![img](https://assets.leetcode.com/uploads/2021/03/14/selfcross3-plane.jpg)


	输入：distance = [1,1,1,1]
	输出：true
	 

提示：
- 1 <= distance.length <= 10^5
- 1 <= distance[i] <= 10^5


## 分析

观察发现，第 i 步的路径只可能和 [i-5,i-3] 范围内的路径交叉。分别判断即可。

## 解答

```python
def isSelfCrossing(self, distance: List[int]) -> bool:
    n, A = len(distance), distance
    for i in range(3, n):
        if A[i]>=A[i-2] and A[i-1]<=A[i-3]:
            return True
        if i>=4 and A[i-1]==A[i-3] and A[i]+A[i-4]>=A[i-2]:
            return True
        if i>=5 and A[i]+A[i-4]>=A[i-2]>=A[i-4] and A[i-1]+A[i-5]>=A[i-3]>=A[i-1]:
            return True
    return False
```
80 ms
