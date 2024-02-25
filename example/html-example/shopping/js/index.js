window.addEventListener('load', function() {
    // 1.获取元素
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focuswidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click(); // 手动调用点击事件
        }, 2000);

    })
    // 3.动态生成小圆圈，个数和图片数对应
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = this.document.createElement('li');
        // 记录当前小圆圈的索引号，作为一个自定义属性
        li.setAttribute('index', i);
        // 将li插入ol中
        ol.appendChild(li);
        // 在生成小圆圈时绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈，移动图片，移动距离=图片宽度*图片索引号
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focuswidth);
        })
    }
    // ol里第一个li设置类名为current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片，放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮，图片移动到下一张
    var num = 0;
    var circle = 0; // 控制小圆圈播放
    arrow_r.addEventListener('click', function() {
        // num %= ul.children.length;
        // 实现无缝滚动
        // 如果移动到了最后一张复制的图片，此时要快速恢复需要令ul的left为0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focuswidth);
        // 8.点击右侧按钮，小圆圈跟着一起变化
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        circleChange();
    })
    arrow_l.addEventListener('click', function() {
        // num %= ul.children.length;
        // 实现无缝滚动
        // 如果移动到了最后一张复制的图片，此时要快速恢复需要令ul的left为0
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focuswidth + 'px';
        }
        num--;
        animate(ul, -num * focuswidth);
        // 8.点击右侧按钮，小圆圈跟着一起变化
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 10.自动播放轮播图
    var timer = setInterval(function() {
        arrow_r.click(); // 手动调用点击事件
    }, 2000);
})