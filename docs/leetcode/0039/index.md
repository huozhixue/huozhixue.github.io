# 0039：组合总和（★）


> <u>**[力扣第 39 题](https://leetcode.cn/problems/combination-sum/)**</u>

## 题目

<p>给你一个 <strong>无重复元素</strong> 的整数数组 <code>candidates</code> 和一个目标整数 <code>target</code> ，找出 <code>candidates</code> 中可以使数字和为目标数 <code>target</code> 的 所有<em> </em><strong>不同组合</strong> ，并以列表形式返回。你可以按 <strong>任意顺序</strong> 返回这些组合。</p>

<p><code>candidates</code> 中的 <strong>同一个</strong> 数字可以 <strong>无限制重复被选取</strong> 。如果至少一个数字的被选数量不同，则两种组合是不同的。 </p>

<p>对于给定的输入，保证和为 <code>target</code> 的不同组合数少于 <code>150</code> 个。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>candidates = <code>[2,3,6,7], </code>target = <code>7</code>
<strong>输出：</strong>[[2,2,3],[7]]
<strong>解释：</strong>
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入: </strong>candidates = [2,3,5]<code>, </code>target = 8
<strong>输出: </strong>[[2,2,2,2],[2,3,3],[3,5]]</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入: </strong>candidates = <code>[2], </code>target = 1
<strong>输出: </strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= candidates.length &lt;= 30</code></li>
<li><code>2 &lt;= candidates[i] &lt;= 40</code></li>
<li><code>candidates</code> 的所有元素 <strong>互不相同</strong></li>
<li><code>1 &lt;= target &lt;= 40</code></li>
</ul>


**相似问题：**
- [0017：电话号码的字母组合](/leetcode/0017)
- [0040：组合总和 II](/leetcode/0040)
- [0077：组合](/leetcode/0077)
- [0216：组合总和 III](/leetcode/0216)
- [0254：因子的组合](/leetcode/0254)
- [0377：组合总和 Ⅳ](/leetcode/0377)
- [3183：达到总和的方法数量](/leetcode/3183)


## 分析 

{{< lc "0078" >}} 升级版，添加了和的限制。

## 解答

```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        def dfs(i,s):
            if i==len(candidates) or s>=target:
                if s==target:
                    res.append(path[:])
                return 
            dfs(i+1,s)
            x = candidates[i]
            path.append(x)
            dfs(i,s+x)
            path.pop()
        res, path = [], []
        dfs(0,0)
        return res
```
60 ms


## *附加

还可以用 dp，典型的背包问题。

```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        @cache
        def dfs(i,s):
            if i==len(candidates):
                return [[]] if s==0 else []
            x = candidates[i]
            return dfs(i+1,s)+ ([[x]+sub for sub in dfs(i,s-x)] if x<=s else [])
        return dfs(0,target)
```
48 ms
