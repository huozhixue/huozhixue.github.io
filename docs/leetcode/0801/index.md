# 0801：使序列递增的最小交换次数（★★）


> **第  场周赛第  题**

## 题目

我们有两个长度相等且不为空的整型数组 nums1 和 nums2 。在一次操作中，
我们可以交换 nums1[i] 和 nums2[i]的元素。
- 例如，如果 nums1 = [1,2,3,8] ， nums2 =[5,6,7,4] ，你可以交换 i = 3 处的元素，
得到 nums1 =[1,2,3,4] 和 nums2 =[5,6,7,8] 。

返回 使 nums1 和 nums2 严格递增 所需操作的最小次数 。

数组 arr 严格递增 且  arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1] 。

注意：用例保证可以实现操作。
 

示例 1:

    输入: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
    输出: 1
    解释: 
    交换 A[3] 和 B[3] 后，两个数组如下:
    A = [1, 3, 5, 7] ， B = [1, 2, 3, 4]
    两个数组均为严格递增的。
示例 2:

    输入: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
    输出: 1
     

提示:
- 2 <= nums1.length <= 10^5
- nums2.length == nums1.length
- 0 <= nums1[i], nums2[i] <= 2 * 10^5



## 分析

最后一对元素交换/不交换是否有效只与倒数第二对元素的状态有关。

为了方便递推，令：
- dp[i][0] 代表第 i 对不交换的情况下使前 i 对有效的最小次数
- dp[i][1] 代表第 i 对交换的情况下使前 i 对有效的最小次数

即可由 dp[i] 递推得到 dp[i+1]。还可以用滚动数组优化。

## 解答

```python
def minSwap(self, nums1: List[int], nums2: List[int]) -> int:
    n = len(nums1)
    a, b = 0, 1
    for i in range(1, n):
        a2 = b2 = float('inf')
        if nums1[i]>nums1[i-1] and nums2[i]>nums2[i-1]:
            a2, b2 = min(a2, a), min(b2, b+1)
        if nums1[i]>nums2[i-1] and nums2[i]>nums1[i-1]:
            a2, b2 = min(a2, b), min(b2, a+1)
        a, b = a2, b2
    return min(a, b)
```
312 ms

