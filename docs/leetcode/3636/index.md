# 3636：查询超过阈值频率最高元素（2451 分）


> <u>**[力扣第 162 场双周赛第 4 题](https://leetcode.cn/problems/threshold-majority-queries/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的整数数组 <code>nums</code> 和一个查询数组 <code>queries</code>，其中 <code>queries[i] = [l<sub>i</sub>, r<sub>i</sub>, threshold<sub>i</sub>]</code>。</p>

<p>返回一个整数数组 <code data-end="33" data-start="28">ans</code>，其中 <code data-end="48" data-start="40">ans[i]</code> 等于子数组 <code data-end="102" data-start="89">nums[l<sub>i</sub>...r<sub>i</sub>]</code> 中出现 <strong>至少</strong> <code data-end="137" data-start="125">threshold<sub>i</sub></code> 次的元素，选择频率 <strong>最高 </strong>的元素（如果频率相同则选择 <strong>最小 </strong>的元素），如果不存在这样的元素则返回 -1。</p>



<p><strong class="example">示例 1:</strong></p>

<div class="example-block">
<p><strong>输入：</strong> <span class="example-io">nums = [1,1,2,2,1,1], queries = [[0,5,4],[0,3,3],[2,3,2]]</span></p>

<p><strong>输出：</strong> <span class="example-io">[1,-1,2]</span></p>

<p><strong>解释：</strong></p>

<table style="border: 1px solid black;">
<thead>
<tr>
<th align="left" style="border: 1px solid black;">查询</th>
<th align="left" style="border: 1px solid black;">子数组</th>
<th align="left" style="border: 1px solid black;">阈值</th>
<th align="left" style="border: 1px solid black;">频率表</th>
<th align="left" style="border: 1px solid black;">答案</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left" style="border: 1px solid black;">[0, 5, 4]</td>
<td align="left" style="border: 1px solid black;">[1, 1, 2, 2, 1, 1]</td>
<td align="left" style="border: 1px solid black;">4</td>
<td align="left" style="border: 1px solid black;">1 → 4, 2 → 2</td>
<td align="left" style="border: 1px solid black;">1</td>
</tr>
<tr>
<td align="left" style="border: 1px solid black;">[0, 3, 3]</td>
<td align="left" style="border: 1px solid black;">[1, 1, 2, 2]</td>
<td align="left" style="border: 1px solid black;">3</td>
<td align="left" style="border: 1px solid black;">1 → 2, 2 → 2</td>
<td align="left" style="border: 1px solid black;">-1</td>
</tr>
<tr>
<td align="left" style="border: 1px solid black;">[2, 3, 2]</td>
<td align="left" style="border: 1px solid black;">[2, 2]</td>
<td align="left" style="border: 1px solid black;">2</td>
<td align="left" style="border: 1px solid black;">2 → 2</td>
<td align="left" style="border: 1px solid black;">2</td>
</tr>
</tbody>
</table>
</div>



<p><strong class="example">示例 2:</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [3,2,3,2,3,2,3], queries = [[0,6,4],[1,5,2],[2,4,1],[3,3,1]]</span></p>

<p><strong>输出：</strong><span class="example-io">[3,2,3,2]</span></p>

<p><strong>解释：</strong></p>

<table style="border: 1px solid black;">
<thead>
<tr>
<th align="left" style="border: 1px solid black;">查询</th>
<th align="left" style="border: 1px solid black;">子数组</th>
<th align="left" style="border: 1px solid black;">阈值</th>
<th align="left" style="border: 1px solid black;">频率表</th>
<th align="left" style="border: 1px solid black;">答案</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left" style="border: 1px solid black;">[0, 6, 4]</td>
<td align="left" style="border: 1px solid black;">[3, 2, 3, 2, 3, 2, 3]</td>
<td align="left" style="border: 1px solid black;">4</td>
<td align="left" style="border: 1px solid black;">3 → 4, 2 → 3</td>
<td align="left" style="border: 1px solid black;">3</td>
</tr>
<tr>
<td align="left" style="border: 1px solid black;">[1, 5, 2]</td>
<td align="left" style="border: 1px solid black;">[2, 3, 2, 3, 2]</td>
<td align="left" style="border: 1px solid black;">2</td>
<td align="left" style="border: 1px solid black;">2 → 3, 3 → 2</td>
<td align="left" style="border: 1px solid black;">2</td>
</tr>
<tr>
<td align="left" style="border: 1px solid black;">[2, 4, 1]</td>
<td align="left" style="border: 1px solid black;">[3, 2, 3]</td>
<td align="left" style="border: 1px solid black;">1</td>
<td align="left" style="border: 1px solid black;">3 → 2, 2 → 1</td>
<td align="left" style="border: 1px solid black;">3</td>
</tr>
<tr>
<td align="left" style="border: 1px solid black;">[3, 3, 1]</td>
<td align="left" style="border: 1px solid black;">[2]</td>
<td align="left" style="border: 1px solid black;">1</td>
<td align="left" style="border: 1px solid black;">2 → 1</td>
<td align="left" style="border: 1px solid black;">2</td>
</tr>
</tbody>
</table>
</div>



<p><strong>提示：</strong></p>

<ul>
<li data-end="51" data-start="19"><code data-end="49" data-start="19">1 &lt;= nums.length == n &lt;= 10<sup>4</sup></code></li>
<li data-end="82" data-start="54"><code data-end="80" data-start="54">1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li data-end="120" data-start="85"><code data-end="118" data-start="85">1 &lt;= queries.length &lt;= 5 * 10<sup>4</sup></code></li>
<li data-end="195" data-start="123"><code data-end="193" data-is-only-node="" data-start="155">queries[i] = [l<sub>i</sub>, r<sub>i</sub>, threshold<sub>i</sub>]</code></li>
<li data-end="221" data-start="198"><code data-end="219" data-start="198">0 &lt;= l<sub>i</sub> &lt;= r<sub>i</sub> &lt; n</code></li>
<li data-end="259" data-is-last-node="" data-start="224"><code data-end="259" data-is-last-node="" data-start="224">1 &lt;= threshold<sub>i</sub> &lt;= r<sub>i</sub> - l<sub>i</sub> + 1</code></li>
</ul>




## 分析

### #1

- 区间众数问题首先想到用莫队
- 转移时要维护 (频率,元素) 的有序集合
- 直接用 SortedList 会超时，可以用懒删除堆来维护


```python
class Solution:
    def subarrayMajority(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        def add(i):
            a = nums[i]
            ct[a] += 1
            heappush(pq,(-ct[a],a))
        
        def pop(i):
            a = nums[i]
            ct[a] -= 1
            if ct[a]>0:
                heappush(pq,(-ct[a],a))

        n,m = len(nums),len(queries)
        sq = isqrt(n*n//m)+1
        ct = defaultdict(int)
        pq = []
        res = [-1]*m
        Q = [(l,r,t,i) for i,(l,r,t) in enumerate(queries)]
        Q.sort(key=lambda p:(p[0]//sq,p[1]//sq*(1 if p[0]//sq&1 else -1)))
        l0,r0 = 1,0
        for l,r,t,i in Q:
            while l0>l:
                l0 -= 1
                add(l0)
            while r0<r:
                r0 += 1
                add(r0)
            while l0<l:
                pop(l0)
                l0 += 1
            while r0>r:
                pop(r0)
                r0 -= 1
            while ct[pq[0][1]]!=-pq[0][0]:
                heappop(pq)
            w,a = pq[0]
            if -w>=t:
                res[i] = a
        return res
```
8017 ms
### #2

还可以用回滚莫队优化掉 log
- 先分块，查询在块内直接暴力统计
- 查询按左端点所处块分组，组内按右端点排序
- 固定左端点的块 a，遍历右端点可以统计 a 右边的部分
- 属于块 a 的部分每次统计后再撤销，即回滚

## 解答


```python
class Solution:
    def subarrayMajority(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        n,m = len(nums),len(queries)
        sq = isqrt(n*n//m)+1
        N = (n-1)//sq+1
        res = [-1]*m
        d = defaultdict(list)
        for i,(l,r,t) in enumerate(queries):
            a,b = l//sq,r//sq
            if a==b:
                ans = min([(-w,c) for c,w in Counter(nums[l:r+1]).items()])
                if -ans[0]>=t:
                    res[i] = ans[1]
            else:
                d[a].append((r,l,t,i))
        for a in d:
            ans = (0,-1)
            ct = defaultdict(int)
            l0 = r0 = a*sq+sq
            for r,l,t,i in sorted(d[a]):
                for j in range(r0,r+1):
                    x = nums[j]
                    ct[x] += 1
                    ans = min(ans,(-ct[x],x))
                tmp = ans
                for j in range(l,l0):
                    x = nums[j]
                    ct[x] += 1
                    ans = min(ans,(-ct[x],x))
                if -ans[0]>=t:
                    res[i] = ans[1]
                ans = tmp
                for j in range(l,l0):
                    ct[nums[j]] -= 1
                r0 = r+1
        return res
```
2927 ms
