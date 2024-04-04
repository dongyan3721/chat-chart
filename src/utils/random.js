export function generateRandomColor() {
    // 生成随机的浮点数，范围在 0 到 1 之间
    let randomFloat = Math.random();

    // 将浮点数转换为十六进制字符串，并且截取前 6 位作为颜色代码
    let hexColor = '#' + Math.floor(randomFloat * 16777215).toString(16).padStart(6, '0');

    return hexColor;
}

export function shuffleArray(array) {
    // 遍历数组
    for (let i = array.length - 1; i > 0; i--) {
        // 生成一个随机索引
        let j = Math.floor(Math.random() * (i + 1));

        // 交换当前位置和随机位置上的元素
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// 浮点数线性插值
export function getRandomValueBetween(min, max) {
    // 生成一个0到1之间的随机浮点数
    let random = Math.random();
    // 使用线性插值计算两个浮点数之间的某一值
    return (min + (max - min) * random);
}

// 饮酒概率随机
export function oneZeroRandom(min, max) {
    let random = Math.random();
    if (random>0.8){
        return getRandomValueBetween(min, max).toFixed(2)
    }
    return 0;
}
