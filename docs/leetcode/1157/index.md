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

### #1 分块

区间查询相关的常用算法有块状数组、树状数组、线段树等。本题的数据规模可以尝试块状数组：
- threshold 小的查询，区间也小，暴力统计即可
- threshold 大的查询，数组中频数较大的元素也少，考虑直接从这些元素中找
- 因此，预先记录频数 >=100 的元素，及其在数组中的下标列表，二分查找即可


```python
class MajorityChecker:

    def __init__(self, arr: List[int]):
        self.d = d = defaultdict(list)
        for i,x in enumerate(arr):
            d[x].append(i)
        self.cands = [x for x in d if len(d[x])>=100]
        self.arr = arr

    def query(self, left: int, right: int, threshold: int) -> int:
        if threshold<100:
            x,w = Counter(self.arr[left:right+1]).most_common(1)[0]
            return x if w>=threshold else -1
        for x in self.cands:
            A = self.d[x]
            w = bisect_right(A,right)-bisect_left(A,left)
            if w>=threshold:
                return x
        return -1
```
154 ms

### #2 线段树

也可以采用时间更优的线段树：
- 注意区间若直接维护众数，很难合并
- 一种巧妙的方式是维护摩尔投票的结果，其结果是可能的绝对众数
- 最后再用二分查找验证是否是绝对众数即可

```python
class MajorityChecker:

    def __init__(self, arr: List[int]):
        self.arr = arr
        self.d = defaultdict(list)
        for i,x in enumerate(arr):
            self.d[x].append(i)
        self.n = n = len(arr)
        self.t = [(0,0) for _ in range(n*4)]
        self.build(1,0,n-1)

    def build(self,o,l,r):
        t = self.t
        if l==r:
            t[o] = (self.arr[l],1)
            return
        m = (l+r)//2
        self.build(o*2,l,m)
        self.build(o*2+1,m+1,r)
        t[o] = self.up(t[o*2],t[o*2+1])
    
    def up(self,x,y):
        if x[0]==y[0]:
            return (x[0],x[1]+y[1])
        return (x[0],x[1]-y[1]) if x[1]>y[1] else (y[0],y[1]-x[1])

    def qr(self,a,b,o,l,r):
        t = self.t
        if a<=l and r<=b:
            return t[o]
        m = (l+r)//2
        res = (0,0)
        if a<=m: res = self.qr(a,b,o*2,l,m)
        if m<b: res = self.up(res,self.qr(a,b,o*2+1,m+1,r))
        return res

    def query(self, left: int, right: int, threshold: int) -> int:
        x,_ = self.qr(left,right,1,0,self.n-1)
        A = self.d[x]
        a = bisect_left(A,left)
        b = bisect_right(A,right)
        return x if b-a>=threshold else -1
```
462 ms

### #3 位运算

还有种巧妙的位运算方法：
- 假如存在绝对众数 x，那么单独考虑 x 二进制的某一位，其在区间中必然也是绝对众数
- 因此对于二进制的每一位 j，预处理 arr 中的前缀和，即可快速得到区间中的众数是 1 还是 0
- 将每一位拼起来即得到可能的绝对众数 x，再验证即可
## 解答

```python
class MajorityChecker:

    def __init__(self, arr: List[int]):
        n = len(arr)
        L = max(arr).bit_length()
        self.d = defaultdict(list)
        self.f = f = [[] for _ in range(L)]
        for i,x in enumerate(arr):
            self.d[x].append(i)
        for j in range(L):
            f[j] = [0]+list(accumulate(x>>j&1 for x in arr))

    def query(self, left: int, right: int, threshold: int) -> int:
        x = 0
        for j,A in enumerate(self.f):
            a = A[right+1]-A[left]
            if a>=threshold:
                x |= 1<<j
            elif right-left+1-a<threshold:
                return -1
        A = self.d[x]
        if bisect_right(A,right)-bisect_left(A,left)>=threshold:
            return x
        return -1
```
276 ms
