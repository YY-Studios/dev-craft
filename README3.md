좋은 질문입니다! JavaScript의 **객체 참조(reference) 비교** 때문입니다.

## 문제 상황:

```typescript
// ❌ 항상 새 객체를 생성
setSelectFilters: (data) =>
  set(() => ({
    selectedFilters: data, // 새로운 state 객체
  }));
```

## 왜 업데이트가 되는가?

JavaScript는 객체를 **참조**로 비교합니다:

```javascript
// 내용은 같지만 다른 참조
const filter1 = { documentType: ['blog'] };
const filter2 = { documentType: ['blog'] };

filter1 === filter2; // ❌ false! (다른 객체)

// 같은 참조
const filter3 = filter1;
filter1 === filter3; // ✅ true (같은 객체)
```

## Zustand의 동작:

```typescript
// 1. 현재 state
state = { selectedFilters: { documentType: ['blog'] } };

// 2. setSelectFilters 호출
setSelectFilters({ documentType: ['blog'] });

// 3. set() 함수가 새 객체 생성
newState = { selectedFilters: { documentType: ['blog'] } };

// 4. Zustand가 참조 비교
state !== newState; // ❌ true! (다른 참조)

// 5. 구독자들에게 알림 → 리렌더링 🔄
```

## 해결:

```typescript
setSelectFilters: (data) =>
  set((state) => {
    // ✅ 내용 비교 (JSON 문자열)
    if (JSON.stringify(state.selectedFilters) === JSON.stringify(data)) {
      return state; // 같은 참조 반환 → 리렌더링 안 함
    }

    // 실제로 다르면 새 객체 생성
    return {
      selectedFilters: data,
    };
  });
```

**즉, 내용이 같아도 `set()`을 호출하면 항상 새 객체가 만들어져서 "변경됨"으로 인식됩니다!**
