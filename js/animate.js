function animate(obj, target, callback) {
    console.log(callback);
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 尽量不出现小数，否则最终位置可能不是在target
        // var step = (target - obj.offsetLeft) / 10;
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画
            clearInterval(obj.timer);
            // 回调函数写到定时器结束后面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}

// function goTop(obj, target, callback) {
//     console.log(callback);
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function() {
//         // 尽量不出现小数，否则最终位置可能不是在target
//         // var step = (target - obj.offsetLeft) / 10;
//         // var step = Math.ceil((target - obj.offsetLeft) / 10);
//         var step = (target - window.scrollY) / 10;
//         step = step > 0 ? Math.ceil(step) : Math.floor(step);
//         if (window.scrollY == target) {
//             // 停止动画
//             clearInterval(obj.timer);
//             // 回调函数写到定时器结束后面
//             // if (callback) {
//             //     // 调用函数
//             //     callback();
//             // }
//             callback && callback();
//         }
//         window.scroll(0, window.scrollY + step);
//     }, 15);
// }