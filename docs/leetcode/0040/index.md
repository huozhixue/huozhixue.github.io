# 0040：组合总和 II（★）


> <u>**[力扣第 40 题](https://leetcode.cn/problems/combination-sum-ii/)**</u>

## 题目

<p>给定一个候选人编号的集合 <code>candidates</code> 和一个目标数 <code>target</code> ，找出 <code>candidates</code> 中所有可以使数字和为 <code>target</code> 的组合。</p>

<p><code>candidates</code> 中的每个数字在每个组合中只能使用 <strong>一次</strong> 。</p>

<p><strong>注意：</strong>解集不能包含重复的组合。 </p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> candidates = <code>[10,1,2,7,6,1,5]</code>, target = <code>8</code>,
<strong>输出:</strong>
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> candidates = [2,5,2,1,2], target = 5,
<strong>输出:</strong>
[
[1,2,2],
[5]
]</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= candidates.length &lt;= 100</code></li>
<li><code>1 &lt;= candidates[i] &lt;= 50</code></li>
<li><code>1 &lt;= target &lt;= 30</code></li>
</ul>


## 分析 

{{< lc "0090" >}} 升级版，添加了和的限制。

## 解答

```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        def dfs(i,s):
            if i==len(A) or s>=target:
                if s==target:
                    res.append(path[:])
                return 
            dfs(i+1,s)
            k,v = A[i]
            if v and s+k<=target:
                path.append(k)
                A[i][1] -= 1
                dfs(i,s+k)
                path.pop()
                A[i][1] += 1
        A = [[k,v] for k,v in Counter(candidates).items()]
        res, path = [], []
        dfs(0,0)
        return res
```
41 ms
## *附加

同样可以看作背包dp。

```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        @cache
        def dfs(i,s):
            if i==len(A):
                return [[]] if s==0 else []
            k,v = A[i]
            res = dfs(i+1,s)[:]
            for x in range(1,v+1):
                if x*k<=s:
                    res.extend([k]*x+sub for sub in dfs(i+1,s-x*k))
            return res
        A = list(Counter(candidates).items())
        return dfs(0,target)
```
47 ms
