window.addEventListener('load', function() {
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
            arrow_r.click();
        }, 2000);
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = circle = index;
            animate(ul, -index * focuswidth);
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0, circle = 0;
    arrow_r.addEventListener('click', function() {
        if (num == ul.children.length - 1) {
            num = 0;
            ul.style.left = 0;
        }
        num++;
        animate(ul, -num * focuswidth);
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
    // 自动轮播
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);
})