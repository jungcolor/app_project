import React from "react";

function App() {
    return (
        <div className="App">
            <header>
                <nav>
                    <a href="#">전체보기</a>
                    <a href="#">비즈니스</a>
                    <a href="#">엔터테인먼트</a>
                    <a href="#">건강</a>
                    <a href="#">과학</a>
                    <a href="#">스포츠</a>
                    <a href="#">기술</a>
                </nav>
            </header>
            <div className="contents">
                <article className="viewer-list">
                    <h3>뉴스기사</h3>
                    <a href="#">
                        <figure>이미지</figure>
                        <dl>
                            <dt>타이틀</dt>
                            <dd>내용</dd>
                        </dl>
                    </a>
                </article>
            </div>
        </div>
    )
}

export default App;
