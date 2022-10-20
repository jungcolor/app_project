type TValueStr = string;
type TValueNum = number;

function getLength(value1: TValueStr | TValueNum): TValueNum {
    if (typeof value1 === "number") {
        return value1.toString().split(".")[0].length;
    } else {
        return value1.length;
    }
}

// 함수 오버로딩
function addLength(value1: TValueStr, value2: TValueStr, fnGetLength: (value1: TValueStr) => TValueNum): TValueNum | void;
function addLength(value1: TValueNum, value2: TValueNum, fnGetLength: (value1: TValueNum) => TValueNum, type?: TValueStr): TValueNum | void;

// 타입이 다른경우에는 number 또는 string이 될 수도 있기때문에 타입을 any로 한다
// 반환값은 모두 number이므로 number로 정의한다
function addLength(value1: any, value2: any, fnGetLength: (value1: any) => TValueNum, type?: TValueStr): TValueNum | void {
    if (!type) {
        type = "value";
    }

    switch (type) {
        case "value":
            return fnGetLength(value1 + value2);
        case "length":
            return fnGetLength(value1) + fnGetLength(value2);
        // defualt가 없어서 함수의 반환타입을 유니온으로 해야함 number | void
        // default:
        //     return 0;
    }
}

console.log(addLength(5, 10, getLength, "length"));

console.log(addLength("Hello", "World", getLength));

// 다음과 같이 숫자와 문자열을 함께 넘기면 타입 에러가 발생해야 합니다
// console.log(addLength(100, "World", getLength));
