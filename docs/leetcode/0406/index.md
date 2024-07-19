# 0406：根据身高重建队列（★）


> <u>**[力扣第 406 题](https://leetcode.cn/problems/queue-reconstruction-by-height/)**</u>

## 题目

<p>假设有打乱顺序的一群人站成一个队列，数组 <code>people</code> 表示队列中一些人的属性（不一定按顺序）。每个 <code>people[i] = [h<sub>i</sub>, k<sub>i</sub>]</code> 表示第 <code>i</code> 个人的身高为 <code>h<sub>i</sub></code> ，前面 <strong>正好</strong> 有 <code>k<sub>i</sub></code><sub> </sub>个身高大于或等于 <code>h<sub>i</sub></code> 的人。</p>

<p>请你重新构造并返回输入数组 <code>people</code> 所表示的队列。返回的队列应该格式化为数组 <code>queue</code> ，其中 <code>queue[j] = [h<sub>j</sub>, k<sub>j</sub>]</code> 是队列中第 <code>j</code> 个人的属性（<code>queue[0]</code> 是排在队列前面的人）。</p>



<ul>
</ul>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
<strong>输出：</strong>[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
<strong>解释：</strong>
编号为 0 的人身高为 5 ，没有身高更高或者相同的人排在他前面。
编号为 1 的人身高为 7 ，没有身高更高或者相同的人排在他前面。
编号为 2 的人身高为 5 ，有 2 个身高更高或者相同的人排在他前面，即编号为 0 和 1 的人。
编号为 3 的人身高为 6 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
编号为 4 的人身高为 4 ，有 4 个身高更高或者相同的人排在他前面，即编号为 0、1、2、3 的人。
编号为 5 的人身高为 7 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
因此 [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] 是重新构造后的队列。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
<strong>输出：</strong>[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= people.length <= 2000</code></li>
<li><code>0 <= h<sub>i</sub> <= 10<sup>6</sup></code></li>
<li><code>0 <= k<sub>i</sub> < people.length</code></li>
<li>题目数据确保队列可以被重建</li>
</ul>


**相似问题：**
- [0315：计算右侧小于当前元素的个数](/leetcode/0315)
- [2512：奖励最顶尖的 K 名学生（1636 分）](/leetcode/2512)


## 分析

### #1

- 先考虑简化情形，即不存在相等身高的情况
	- 可以从小到大考虑，依次确定位置
	- 遍历到 [h,k] 时，由于前面确定了位置的都比 h 小，所以应找到第 k+1 个空位
- 接着考虑相等身高的情况，显然 k 更大的人的位置应该靠后
	- 所以先确定 k 更大的人的位置，依然是找第 k+1 个空位
- 找第 k+1 个空位可以用有序集合+二分来加速

```python
class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        from sortedcontainers import SortedList
        n = len(people)
        res = [0]*n
        sl = SortedList()
        for h,k in sorted(people,key=lambda p:(p[0],-p[1])):
            def check(i):
                pos = sl.bisect_left(i+1)
                return i+1-pos>k
            i = bisect_left(range(n),True,key=check)
            res[i] = [h,k]
            sl.add(i)
        return res
```
98 ms

### #2

- 也可以从大到小考虑
- 遍历到 [h,k] 时，由于前面的人都比 h 大，插入第 k 个人之后即可
- 身高相等的，先插 k 更小的，保证顺序符合
- 插第 k 个人之后，也可以用有序集合来加速

## 解答

```python
class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        from sortedcontainers import SortedList
        n = len(people)
        sl = SortedList([(0,),(n,)])
        for h,k in sorted(people, key=lambda p: (-p[0], p[1])):
            x = (sl[k][0]+sl[k+1][0])/2
            sl.add((x,h,k))
        return [[h,k] for x,h,k in sl[1:-1]]
```
42 ms

