# 0401：二进制手表（★★）


第 5 场周赛第 2 题

## 题目

二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。

每个 LED 代表一个 0 或 1，最低位在右侧。

![img](https://upload.wikimedia.org/wikipedia/commons/8/8b/Binary_clock_samui_moon.jpg)

例如，上面的二进制手表读取 “3:25”。

给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。

输出的顺序没有要求。

超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。

 <!--more--> 


示例：

	输入: n = 1
	返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]



## 分析

### #1

在 10 个灯里选 n 个，如果表示的时间没有超过范围，那么就是可能的时间。因此可以用 dfs。

```python
def readBinaryWatch(self, num: int) -> List[str]:
	def dfs(n, i, hour, minute):
		if hour > 11 or minute > 59:
			return 
		if n == 0:
			res.append('%d:%02d' % (hour ,minute))
			return
		for j in range(i, 11-n):
			dfs(n-1, j+1, hour+H[j], minute+M[j])
	
	H = [0, 0, 0, 0, 0, 0, 1, 2, 4, 8]
	M = [1, 2, 4, 8, 16, 32, 0, 0, 0, 0]
	res = []
	dfs(num, 0, 0, 0)
	return res
```

32 ms

### #2

因为 10 个灯所有的可能也只有 1024 种，所以可以反过来，直接遍历所有不超过范围的可能，判断是否 n 个灯亮着。
这等价于计算 hour 和 minute 的二进制形式有多少个 1 。

## 解答

```python
def readBinaryWatch(self, num: int) -> List[str]:
	bins = [bin(i).count('1') for i in range(60)]
	return ['%d:%02d' % (h, m) for h in range(12) for m in range(60) if bins[h]+bins[m]==num]
```

40 ms
