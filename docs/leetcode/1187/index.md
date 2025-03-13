# 1187：使数组严格递增（2315 分）


> <u>**[力扣第 153 场周赛第 4 题](https://leetcode.cn/problems/make-array-strictly-increasing/)**</u>

## 题目

<p>给你两个整数数组 <code>arr1</code> 和 <code>arr2</code>，返回使 <code>arr1</code> 严格递增所需要的最小「操作」数（可能为 0）。</p>

<p>每一步「操作」中，你可以分别从 <code>arr1</code> 和 <code>arr2</code> 中各选出一个索引，分别为 <code>i</code> 和 <code>j</code>，<code>0 &lt;= i &lt; arr1.length</code> 和 <code>0 &lt;= j &lt; arr2.length</code>，然后进行赋值运算 <code>arr1[i] = arr2[j]</code>。</p>

<p>如果无法让 <code>arr1</code> 严格递增，请返回 <code>-1</code>。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
<strong>输出：</strong>1
<strong>解释：</strong>用 2 来替换 <code>5，之后</code> <code>arr1 = [1, 2, 3, 6, 7]</code>。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr1 = [1,5,3,6,7], arr2 = [4,3,1]
<strong>输出：</strong>2
<strong>解释：</strong>用 3 来替换 <code>5，然后</code>用 4 来替换 3<code>，得到</code> <code>arr1 = [1, 3, 4, 6, 7]</code>。
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
<strong>输出：</strong>-1
<strong>解释：</strong>无法使 <code>arr1 严格递增</code>。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr1.length, arr2.length &lt;= 2000</code></li>
<li><code>0 &lt;= arr1[i], arr2[i] &lt;= 10^9</code></li>
</ul>




**相似问题：**
- [2263：数组变为有序的最小操作次数](/leetcode/2263)


## 分析


### #1

- 先考虑首位，要么不变，要么从 arr2 中选最小的来替代
- 考虑第二位，要维持严格递增，需要知道第一位选的数 x
	- 假如 arr1[1]>x，可以不变
	- 假如 arr2 中有比 x 大的，可以从中选最小的替代
- 因此，令 dfs(i,x) 代表 i-1 位选择了数 x 时，前 i 位的最小操作数，即可递归
- 将 arr2 排序，可以二分找到比 x 大的数中最小的那个


```python
class Solution:
    def makeArrayIncreasing(self, arr1: List[int], arr2: List[int]) -> int:
        @cache
        def dfs(i,x):
            if i==len(arr1):
                return 0
            res = inf
            if arr1[i]>x:
                res = dfs(i+1,arr1[i])
            j = bisect_right(arr2,x)
            if j<len(arr2):
                res = min(res,1+dfs(i+1,arr2[j]))
            return res
        arr2.sort()
        res = dfs(0,-inf)
        return res if res<inf else -1
```
730 ms

### #2

- 还可以反过来，求 arr1 最多能保留的个数
- 令 f(i) 代表选了 arr1[i]，arr1[:i+1] 最多保留的个数
	- 枚举 j<i，如果 arr2 能找到 j-i-1 个不同的数 x 满足 arr1[j]<x<arr1[i]，那么 f(i)=max(f[i],1+f[j])
	- 将 arr2 去重并排序，可以二分判断 j 是否满足
## 解答

```python
class Solution:
    def makeArrayIncreasing(self, arr1: List[int], arr2: List[int]) -> int:
        A = [-inf]+arr1+[inf]
        B = sorted(set(arr2))
        n = len(A)
        f = [-inf]*n
        f[0] = 1
        for i in range(1,n):
            if A[i]>A[i-1]:
                f[i] = 1+f[i-1]
            k = bisect_left(B,A[i])
            for j in range(max(i-1-k,0),i-1):
                if B[k+1-i+j]>A[j] and 1+f[j]>f[i]:
                    f[i] = 1+f[j]
        return len(A)-f[-1] if f[-1]>-inf else -1
```
119 ms
