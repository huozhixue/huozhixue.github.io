# 0194：转置文件（★★）


## 题目

给定一个文件 file.txt，转置它的内容。

你可以假设每行列数相同，并且每个字段由 ' ' 分隔。

示例：

假设 file.txt 文件内容如下：

    name age
    alice 21
    ryan 30

应当输出：

    name alice ryan
    age 21 30

## 分析

需要用到的操作：

    cat             浏览文件
    head -n         取前 n 行
    wc -w           获取当前行的列数
    xargs           转为单行输出
    cut -d' ' f1    按空格分割，取第一列
 
## 解答

```bash
col=$(cat file.txt | head -n 1 | wc -w)
for i in $(seq 1 $col)
do
    cut -d' ' -f$i file.txt | xargs
done
```
8 ms



