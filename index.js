const digits = {
    Z: 2000,
    M: 2000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
};
function translateArab (string)
{
    return string
        .toUpperCase()
        .split("")
        .reduce(function (s, v, i, arr)
        {
            const [a, b, c] = [
                digits[arr[i]],
                digits[arr[i + 1]],
                digits[arr[i + 2]],
            ];
            return b > a ? s - a : s + a;
        }, 0);
}

function translateRome (num)
{
    if (num < 1) 
    {
        return ""
    }
    let result = "";

    for (key in digits)//обходим объект digits в котором находятся переменные римского калькулятора
        while (num >= digits[key])//обходим циклом while объект digits от массива key
        {
            result += key;//короткая запись result = result+key
            num -= digits[key];
        }
    return result;
}

function calculator (string)
{
    let array = [];

    string = string.replace(/[^IVXLCDMZ\d-+*\/]/gi, (ch) => //регулярное выражение методом replace выполняем поиск и заменяем одну подстроку другой подстрокой если нашли совпадение
    {
        if (ch !== " ") //добавляем в пустой массив созданный выше иначе вернем пустую строку ""
        {
            array.push(ch)
        } else
        {
            return ""
        }
    });

    if (array.length > 0)
    {//если длинна созданного массива больше 0 вернем ошибку
        throw Error("Ошибка, неверные символы:" + array)
    }
    let operand = string.split(/[+\-*\/]/g);//регулярное выражение метод split разбиваем на массив

    if (operand.length !== 2)
    {
        throw Error("Введите два операнда")//Выводим ошибку если введен 1 операндл или более
    }

    const numRome = /[IVXLCDMZ]/i;//регулярное выражение с цифрами римскими

    const r = operand.reduce((s, v) => s + numRome.test(v), 0); //метод reduce плохо понимаю, также методом test тестируем регулярное выражение который тестирует совпадение в строке. Возвращает либо истину либо ложь. Reduce применяет функцию reducer к каждому элементу массива (слева-направо), возвращая одно результирующее значение
    //если операнл reduce с переменными s,v, тогда переменная s внутри метода reduce прибьавляется к регулярному выражению с римскими цифрами и тестирует строку на совпадения, начинаем с 0
    if (r === 1)
    {
        throw Error("должны быть 2 арабские или 2 римские цифры");//если одно совпрадение то ввели только 1 римскую переменную выводим ошибку что должно быть 2 переменные рим или араб
    } else if (r === 2)
    {
        operand = operand.map((v) => translateArab(v))//метод map создает новый массив относительно callback функции от v к функции translateArab от V если переменная r строгое равенство 2
    }
    //если два совпадения найдемны запускаем метод мап от функции тьранслейте араб

    if (operand.some((v) => v < 1 || v > 10))//метод some проверяет совпадает ли условию созданный массив operand и если совпадает в
    {
        throw Error("Только числа от 1 до 10")
    }
    let acr = string.match(/[+\-*\/]/)[0];//регулярное выражение метод match поиск совпадения в строке по нулевому индексу

    let result = Math.floor(eval(operand.join(acr)));//округляем результат до целого значения методом Math.floor а так же методом join преобразуем готовый массив в строку

    console.log(result);

    return r === 0 ? result.toLocaleString() : translateRome(result);//методом toLocaleString() преобразуем полученные чяисловые значения в строку
}