# 0575：分糖果


## 题目

给定一个偶数长度的数组，其中不同的数字代表着不同种类的糖果，每一个数字代表一个糖果。你需要把这些糖果平均分给一个弟弟和一个妹妹。返回妹妹可以获得的最大糖果的种类数。


 <!--more--> 
 
示例 1:

	输入: candies = [1,1,2,2,3,3]
	输出: 3
	解析: 一共有三种种类的糖果，每一种都有两个。
		 最优分配方案：妹妹获得[1,2,3],弟弟也获得[1,2,3]。这样使妹妹获得糖果的种类数最多。

示例 2 :

	输入: candies = [1,1,2,3]
	输出: 2
	解析: 妹妹获得糖果[2,3],弟弟获得糖果[1,1]，妹妹有两种不同的糖果，弟弟只有一种。这样使得妹妹可以获得的糖果种类数最多。


	
## 分析

妹妹分到 x = len(candyType) // 2 个糖果，若糖果种类足够多，显然 x 即是结果。若糖果种类 y 小于 x，那么妹妹就只能分到 y 种。

## 解答

```python
def distributeCandies(self, candyType: List[int]) -> int:
	return min(len(candyType)//2, len(set(candyType)))
```

92 ms

