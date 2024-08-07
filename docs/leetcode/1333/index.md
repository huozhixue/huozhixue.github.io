# 1333：餐厅过滤器（1423 分）


> <u>**[力扣第 173 场周赛第 2 题](https://leetcode.cn/problems/filter-restaurants-by-vegan-friendly-price-and-distance/)**</u>

## 题目

<p>给你一个餐馆信息数组 <code>restaurants</code>，其中  <code>restaurants[i] = [id<sub>i</sub>, rating<sub>i</sub>, veganFriendly<sub>i</sub>, price<sub>i</sub>, distance<sub>i</sub>]</code>。你必须使用以下三个过滤器来过滤这些餐馆信息。</p>

<p>其中素食者友好过滤器 <code>veganFriendly</code> 的值可以为 <code>true</code> 或者 <code>false</code>，如果为 <em>true</em> 就意味着你应该只包括 <code>veganFriendly<sub>i</sub></code> 为 true 的餐馆，为 <em>false</em> 则意味着可以包括任何餐馆。此外，我们还有最大价格 <code>maxPrice</code> 和最大距离 <code>maxDistance</code> 两个过滤器，它们分别考虑餐厅的价格因素和距离因素的最大值。</p>

<p>过滤后返回餐馆的 <strong><em>id</em></strong>，按照 <em><strong>rating</strong></em> 从高到低排序。如果 <em><strong>rating</strong></em> 相同，那么按 <em><strong>id</strong></em> 从高到低排序。简单起见， <code>veganFriendly<sub>i</sub></code> 和 <code>veganFriendly</code> 为 <em>true</em> 时取值为 <em>1</em>，为 <em>false</em> 时，取值为 <em>0 。</em></p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 1, maxPrice = 50, maxDistance = 10
<strong>输出：</strong>[3,1,5]
<strong>解释：
</strong>这些餐馆为：
餐馆 1 [id=1, rating=4, veganFriendly=1, price=40, distance=10]
餐馆 2 [id=2, rating=8, veganFriendly=0, price=50, distance=5]
餐馆 3 [id=3, rating=8, veganFriendly=1, price=30, distance=4]
餐馆 4 [id=4, rating=10, veganFriendly=0, price=10, distance=3]
餐馆 5 [id=5, rating=1, veganFriendly=1, price=15, distance=1]
在按照 veganFriendly = 1, maxPrice = 50 和 maxDistance = 10 进行过滤后，我们得到了餐馆 3, 餐馆 1 和 餐馆 5（按评分从高到低排序）。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 0, maxPrice = 50, maxDistance = 10
<strong>输出：</strong>[4,3,2,1,5]
<strong>解释：</strong>餐馆与示例 1 相同，但在 veganFriendly = 0 的过滤条件下，应该考虑所有餐馆。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 0, maxPrice = 30, maxDistance = 3
<strong>输出：</strong>[4,5]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= restaurants.length &lt;= 10^4</code></li>
<li><code>restaurants[i].length == 5</code></li>
<li><code>1 &lt;= id<sub>i</sub>, rating<sub>i</sub>, price<sub>i</sub>, distance<sub>i </sub>&lt;= 10^5</code></li>
<li><code>1 &lt;= maxPrice, maxDistance &lt;= 10^5</code></li>
<li><code>veganFriendly<sub>i</sub></code> 和 <code>veganFriendly</code> 的值为 0 或 1 。</li>
<li>所有 <code>id<sub>i</sub></code> 各不相同。</li>
</ul>




## 分析

按题意筛出并排序即可。为了方便排序，筛出时可以将值取反。

## 解答


```python
def filterRestaurants(self, restaurants: List[List[int]], veganFriendly: int, maxPrice: int, maxDistance: int) -> List[int]:
	res = []
	for id, rating, vegan, price, dis in restaurants:
		if veganFriendly in [0, vegan] and price<=maxPrice and dis<=maxDistance:
			res.append((-rating, -id))
	return [-id for _,id in sorted(res)]
```
48 ms
