// 1
// compare가 없는 경우 === 연산자로 비교합니다
function uniq<T>(arr: T, compare?: (a: { key: number }, b: { key: number }) => boolean) {}

uniq<number[]>([2, 1, 2]);
uniq<string[]>(["사과", "귤", "사과"]);

const objArr = [
    { key: 1, name: "길동" },
    { key: 2, name: "민수" },
    { key: 1, name: "민지" },
];
uniq<object[]>(objArr, (a, b) => a.key === b.key);

// 2
// const tuttle = {
//     name: "거북이",
//     speed: 1,
//     walk() {
//         console.log("엉금엉금");
//     },

//     shellThickness: 10,
// };

// const rabbit = {
//     name: "토끼",
//     speed: 10,
//     walk() {
//         console.log("깡총깡총");
//     },

//     earLength: 20,
// };

// function getProperty(animal) {
//     if (/* 거북이이면 */) {
//         return animal.shellThickness;
//     }
//     if (/* 토끼이면 */) {
//         return animal.earLength;
//     }
//     return animal.name;
// }

// getProperty(tuttle);
// getProperty(rabbit);
