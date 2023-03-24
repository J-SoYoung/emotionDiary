# 감정 다이어리 프로젝트
react hooks의 사용법을 공부합니다.

useState
컴포넌트에서 상태관리가 필요한 값을 저장하여 사용하는 hook입니다.
setState함수는 state가 변경되었는지 감지하며 리렌더링을 발생시켜줍니다.
useEffect
컴포넌트의 라이프 사이클과 관련된 훅입니다.
의존성 배열을 사용해 컴포넌트가 화면에 생성될 때, 업데이트 될 때, 사라질 때에 해당하는 함수를 실행시킬 수 있다.
useRef
DOM을 조작할 수 있는 hook입니다. useRef는 리렌더링과 관련이 없이 작동 할 수 있다.
useMemo
컴포넌트가 리렌더링 될 때, 이전 값에 변화가 없다면 값을 재사용하도록 하는 hooks이다.
useCallback
컴포넌트가 리렌더링 될 때, 함수를 재사용 할 수 있도록 하는 hooks이다.
react.memo
컴포넌트 로직을 재사용 할 수 있게 해준다. 동일한 결과의 컴포넌트를 렌더링 한다면 컴포넌트 호출의 결과를 재사용 할 수 있도록 한다.
useReducer
상태 관리를 분리하여 관리할 수 있게 해준다.
useContext
전역으로 데이터를 공급하여 리액트의 단방향 데이터 흐름의 단점을 보완할 수 있다.
