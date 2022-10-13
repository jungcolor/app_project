# 상태관리와 컴포넌트

## 상태관리의 탄생배경

### 과거
- jQuery장점 - DOM API (DOM을 쉽게 조작할 수 있도록 해주고 크로스 브라우징과 관련 된 이슈를 해결)
- DOM을 직접적으로 다루게 됨

### jQuery
jQuery
- jQuery는 빠르고 작고 기능이 풍부한 JavaScript 라이브러리이다
- jQuery API는 크로스 브라우징을 지원한다
- DOM, Event, Animation 및 Ajax와 같은 작업을 훨씬 간단하게 만든다

### 현재
- 브라우저(클라이언트) 단에서 렌더링을 하고, 서버에서는 브라우저 렌더링에 필요한 데이터(REST API / GraphQL)만 제공하는 형태로 변경
> Javscript의 발전으로 인해 CRS가 탄생
- DOM을 직접적으로 다루지 않음
> DOM을 직접적으로 다뤘을 때 발생하는 문제점
- DOM을 다루지 않는 대신 상태(state)를 기준으로 DOM을 렌더링 하는 형태로 발전
- 즉, DOM이 변하기 위해서는 state가 변경되야 한다 - DOM이 state에 종속되어짐
- 위와 같은 과정속에서 Client Side Rendering 개념과 상태관리 개념이 생기게 됨

### SSR과 CSR
#### SSR(Server-Side Rendering)
- 5년전까지는 JSP, PHP, ASP등이 웹 개발 3대장으로 불려짐
- 서버에서 HTML을 만들어 클라이언트에 넘겨주는 것이 위에 언급한 것들이 하는 역할(Server-Side Rendering)
- 클라이언트에서는 굳이 데이터를 깊은 단계까지 정교하게 관리할 필요가 없음

#### CRS(Client-Side Rendering)
- Javascript가 발전하면서 클라이언트(브라우저)단에서 모든 렌더링을 처리 하려는 시도가 계속 됨
> React, Angular, Vue같은 라이브러리(혹은 프레임워크)가 탄생
> Javascript가 발전하는것과 렌더링을 클라이언트에서 처리하는게 어떤 관계가 있는것인지?
> 그렇다면 만약에 Javascript가 퇴보하면(그럴리는 없겠지만) 다시 서버(Server-Side)에서 렌더링을 처리하게 되는건가?
- 클라이언트(브라우저)에서 렌더링을 하기 위해선, 렌더링에 필요한 상태(state)를 정교하게 관리해야함
- 상태(state)를 정교하게 관리하기 위해 Redux같은 상태관리 라이브러리(혹은 프레임워크)가 생겨남

자세한 내용 - https://www.youtube.com/watch?v=o4meZ7MRd5o


## 컴포넌트
- CSR기반 개발 > Angular
- 컴포넌트 기반 개발 > React
- 두개의 장점을 모두 수용 > Vue

현 시점의 웹 어플리케이션은 컴포넌트 단위로 설계되고 개발된다
컴포넌트마다 컴포넌트를 렌더링할 때 필요한 상태를 관리하게 되었으며, Proxy, Observer Pattern등을 이용하여 구현한다

# state > setState > render
코드 구현 > app.js


내용 및 코드 출처 (개발자 황준일님 블로그)
- https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/