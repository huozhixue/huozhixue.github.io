# 1157：子数组中占绝大多数的元素（2205 分）


> <u>**[力扣第 149 场周赛第 4 题](https://leetcode.cn/problems/online-majority-element-in-subarray/)**</u>

## 题目

<p>设计一个数据结构，有效地找到给定子数组的 <strong>多数元素</strong> 。</p>

<p>子数组的 <strong>多数元素</strong> 是在子数组中出现 <code>threshold</code> 次数或次数以上的元素。</p>

<p>实现 <code>MajorityChecker</code> 类:</p>

<ul>
<li><code>MajorityChecker(int[] arr)</code> 会用给定的数组 <code>arr</code> 对 <code>MajorityChecker</code> 初始化。</li>
<li><code>int query(int left, int right, int threshold)</code> 返回子数组中的元素  <code>arr[left...right]</code> 至少出现 <code>threshold</code> 次数，如果不存在这样的元素则返回 <code>-1</code>。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong>
["MajorityChecker", "query", "query", "query"]
[[[1, 1, 2, 2, 1, 1]], [0, 5, 4], [0, 3, 3], [2, 3, 2]]
<strong>输出：</strong>
[null, 1, -1, 2]

<b>解释：</b>
MajorityChecker majorityChecker = new MajorityChecker([1,1,2,2,1,1]);
majorityChecker.query(0,5,4); // 返回 1
majorityChecker.query(0,3,3); // 返回 -1
majorityChecker.query(2,3,2); // 返回 2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= arr[i] &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= left &lt;= right &lt; arr.length</code></li>
<li><code>threshold &lt;= right - left + 1</code></li>
<li><code>2 * threshold &gt; right - left + 1</code></li>
<li>调用 <code>query</code> 的次数最多为 <code>10<sup>4</sup></code> </li>
</ul>


## 分析

区间查询相关的常用算法有块状数组、树状数组、线段树等。本题的数据规模可以尝试块状数组的思想：
- threshold 小的查询，区间也小，暴力统计即可
- threshold 大的查询，数组中频数较大的元素也少，考虑直接从这些元素中找

具体实现时：
- 提前记录所有频数 >=100 的元素，及其在数组中的下标列表
- 查询时，假如 threshold<=100，则区间长度<=200，遍历即可
- 否则，遍历所有频数>=100 的元素，并在对应的下标列表中二分查找区间的边界，即可得到该元素在区间内出现的次数，判断是否符合即可
- 数组长度最多 2 * 10^4，频数>=100的元素最多200个，因此单次查询时间 O(200 logN)。

## 解答

```python
class MajorityChecker:

    def __init__(self, arr: List[int]):
        self.d = defaultdict(list)
        for i,x in enumerate(arr):
            self.d[x].append(i)
        self.cand = [x for x in self.d if len(self.d[x])>100]
        self.arr = arr
        
    def query(self, left: int, right: int, threshold: int) -> int:
        if threshold<=100:
            ct = Counter(self.arr[i] for i in range(left, right+1))
            x, w = ct.most_common(1)[0]
            return x if w>=threshold else -1
        for x in self.cand:
            w = bisect_right(self.d[x],right)-bisect_left(self.d[x],left) 
            if w>=threshold:
                return x
        return -1
```
392 ms
