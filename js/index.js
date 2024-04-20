window.addEventListener('load', function() {
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focuswidth = focus.offsetWidth;
    $(".focus").mouseenter(function() {
        $(".arrow-l").css("display", "block");
        $(".arrow-r").css("display", "block");
        clearInterval(timer);
        timer = null;
    })
    $(".focus").mouseleave(function() {
        $(".arrow-l").css("display", "none");
        $(".arrow-r").css("display", "none");
        timer = setInterval(function() {
            arrow_r.click();
        }, 3000);
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
    var flag = true; // 节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            animate(ul, -num * focuswidth, function() {
                flag = true; // 打开节流阀
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // num %= ul.children.length;
            // 实现无缝滚动
            // 如果移动到了最后一张复制的图片，此时要快速恢复需要令ul的left为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focuswidth + 'px';
            }
            num--;
            animate(ul, -num * focuswidth, function() {
                flag = true;
            });
            // 8.点击右侧按钮，小圆圈跟着一起变化
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
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
    }, 3000);

    // goBack返回顶部功能
    $(this).scroll(function() {
        if (window.scrollY > 400) {
            $(".goBack").stop().show();
        } else {
            $(".goBack").stop().hide();
        }
    })
    $(".goBack").click(function() {
        $("body, html").stop().animate({
            scrollTop: 0
        });
    });
})