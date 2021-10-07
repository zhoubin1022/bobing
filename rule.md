> 基于[《Python PEP8》](https://www.python.org/dev/peps/pep-0008/)  指定的个人编程规范

## 缩进

python对于缩进有着严格的要求，它是根据缩进来判断代码属于那一部分。python的每一次缩进的最小单位都是4个空格或者一个Tab，但是不能将空格和Tab混合使用。示例如下：

```python
while completeLevel <= 0 or completeLevel > 4:
	completeLevel = int(input("输入错误"))
                              
# 还有含有很多元素的列表的缩进
keyWord = [
    "auto", "break", "case", "char", "const", "continue", "default", "do",
    "double", "else", "enum", "extern",	"float", "for",	"goto",	"if",
    "int", "long", "register", "return", "short", "signed",	"sizeof", "static",
    "struct", "switch",	"typedef", "union", "unsigned",	"void",	"volatile",	"while"
]
```

## 变量命名

尽量不要使用单字母来命名，要能根据变量名字判断出变量的作用。通常也不要用下划线开头的变量命名，因为这些可能被识别为内部私有变量。

那么，我们就要尽量使用对应的英语单词来命名，有多个单词时要使用驼峰命名法或者单词之间用下划线连接，但不要混合使用具体如下：

正确：

```python
keyWord

KeyWord

key_word

错误：

a

b

_keyWord

Key_Word
```



## 每行最多字符数

个人规定每行最多85个字符，这样在全屏的情况下不会产生需要滑动才能看到完整代码的情况，更加利于编程。

## 函数最大行数

个人要求函数最大不要超过150行，不然就会影响阅读代码的效率，如果函数需要写很多行就在里面调用另一个函数。

## 函数、类命名

同样需要遵循变量命名的规定。

## 常量

以所有大写字母书写，下划线分隔单词。如 `MAX_OVERFLOW`和`TOTAL`。

## 空行规则

类中的方法定义被一个空行包围。函数之间也需要一个空行分割。用两个空行包围顶级函数和类定义。函数中也可以利用空行分割不同的执行部分。

但要注意，空格的数量不能太多。

## 注释规则

注释都是以#和一个空格作为开头的。

### 多行注释

```
"""

abcdefg

hijklmn

"""
```

### 内嵌注释

注释与语句之间空两格

```
print("hello world")  # 这是一个输出
```



操作符前后空格

操作符前后都需要有一个空格，这样会更利于阅读。如下：

```
a = b + 1

if a == b:

a += 1
```



