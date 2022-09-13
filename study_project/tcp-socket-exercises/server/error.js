function geterror() {
    throw new Error('서버 내부에서 에러가 발생했습니다');
}

exports.geterror = geterror;