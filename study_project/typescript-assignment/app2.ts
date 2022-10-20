// 1
interface IData {
    key: number;
    name: string;
}

// compare가 없는 경우 === 연산자로 비교합니다
function uniq<T>(arr: T[], compare?: Function) {
    if (!compare) {
        return arr.filter((item, idx, identicArr) => identicArr.indexOf(item) === idx);
    } else {
        return arr.filter((item1, idx) => {
            return arr.findIndex((item2) => compare(item1, item2)) === idx;
        });
    }
}

console.log(uniq<number>([2, 1, 2]));
console.log(uniq<string>(["사과", "귤", "사과"]));

const objArr: IData[] = [
    { key: 1, name: "길동" },
    { key: 2, name: "민수" },
    { key: 1, name: "민지" },
];
console.log(uniq<object>(objArr, (a: { key: number }, b: { key: number }) => a.key === b.key));

// 2
interface IAnimal {
    name: string;
    speed: number;
    walk: () => void;
    shellThickness?: number;
    earLength?: number;
}

const tuttle: IAnimal = {
    name: "거북이",
    speed: 1,
    walk() {
        console.log("엉금엉금");
    },

    shellThickness: 10,
};

const rabbit: IAnimal = {
    name: "토끼",
    speed: 10,
    walk() {
        console.log("깡총깡총");
    },

    earLength: 20,
};

function getProperty(animal: IAnimal) {
    if (animal.shellThickness) {
        return animal.shellThickness;
    }

    if (animal.earLength) {
        return animal.earLength;
    }

    return animal.name;
}

console.log(getProperty(tuttle));
console.log(getProperty(rabbit));
