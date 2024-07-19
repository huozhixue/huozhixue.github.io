# 1046：最后一块石头的重量（1172 分）


> <u>**[力扣第 137 场周赛第 1 题](https://leetcode.cn/problems/last-stone-weight/)**</u>

## 题目

<p>有一堆石头，每块石头的重量都是正整数。</p>

<p>每一回合，从中选出两块<strong> 最重的</strong> 石头，然后将它们一起粉碎。假设石头的重量分别为 <code>x</code> 和 <code>y</code>，且 <code>x <= y</code>。那么粉碎的可能结果如下：</p>

<ul>
<li>如果 <code>x == y</code>，那么两块石头都会被完全粉碎；</li>
<li>如果 <code>x != y</code>，那么重量为 <code>x</code> 的石头将会完全粉碎，而重量为 <code>y</code> 的石头新重量为 <code>y-x</code>。</li>
</ul>

<p>最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 <code>0</code>。</p>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>[2,7,4,1,8,1]
<strong>输出：</strong>1
<strong>解释：</strong>
先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= stones.length <= 30</code></li>
<li><code>1 <= stones[i] <= 1000</code></li>
</ul>




## 分析

典型的堆问题，删除两个最大值，插入差值。python 默认的是小顶堆，要实现大顶堆，就将元素取负再插入即可。

因为 python 的 list 插入非常快，因此也可以直接排序，然后二分查找插入差值。


## 解答

```python
def lastStoneWeight(self, stones: List[int]) -> int:
	stones = [-stone for stone in stones]
	heapify(stones)
	while len(stones) > 1:
		y, x = heappop(stones), heappop(stones)
		heappush(stones, y-x)
	return -stones[0]
```

40 ms

