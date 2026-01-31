export const FILTERS = {
  /* 문서 종류 */
  documentType: {
    label: '문서 종류',
    options: [
      { key: 'readme', label: '리드미' },
      { key: 'blog', label: '블로그' },
    ],
  },

  /* 글 목적 (1개 선택) */
  purpose: {
    label: '글 목적',
    options: [
      // README 전용
      { key: 'overview', label: '프로젝트 개요', availableFor: ['readme'] },
      { key: 'setupGuide', label: '설치 및 실행 가이드', availableFor: ['readme'] },
      { key: 'usage', label: '사용 방법', availableFor: ['readme'] },
      { key: 'architecture', label: '아키텍처 설명', availableFor: ['readme'] },
      { key: 'techDecision', label: '기술 선택 이유', availableFor: ['readme'] },

      // BLOG 전용
      { key: 'concept', label: '개념 정리', availableFor: ['blog'] },
      { key: 'troubleshooting', label: '트러블슈팅', availableFor: ['blog'] },
      { key: 'tutorial', label: '튜토리얼', availableFor: ['blog'] },
      { key: 'prReview', label: '코드 리뷰 정리 (PR 기반)', availableFor: ['blog'] },
      { key: 'retrospective', label: '프로젝트 회고', availableFor: ['blog'] },
    ],
  },

  /* 설명 수준 (1~2개 선택) */
  explanationDepth: {
    label: '설명 수준',
    options: [
      { key: 'lineByLine', label: '한 줄씩 상세 설명', availableFor: ['readme', 'blog'] },
      { key: 'keyCode', label: '핵심 코드만 설명', availableFor: ['readme', 'blog'] },
      { key: 'flowBased', label: '전체 흐름 위주 설명', availableFor: ['readme', 'blog'] },
      { key: 'beforeAfter', label: 'Before / After 비교', availableFor: ['readme', 'blog'] },
    ],
  },

  /* 독자 타겟 (1개 선택) */
  targetLevel: {
    label: '독자 타겟',
    options: [
      { key: 'beginner', label: '초급 개발자', availableFor: ['readme', 'blog'] },
      { key: 'intermediate', label: '중급 개발자', availableFor: ['readme', 'blog'] },
      { key: 'advanced', label: '고급 개발자', availableFor: ['readme', 'blog'] },
    ],
  },

  /* 말투 */
  toneStyle: {
    label: '말투',
    options: [
      { key: 'plain', label: '담백한', availableFor: ['readme', 'blog'] },
      { key: 'natural', label: '자연스러운', availableFor: ['readme', 'blog'] },
      { key: 'senior', label: '선배가 설명해주는', availableFor: ['readme', 'blog'] },
      { key: 'lecture', label: '강의 말투', availableFor: ['readme', 'blog'] },
    ],
  },
  /* 글 구조 */
  contentStructure: {
    label: '글 구조',
    options: [
      { key: 'summaryFirst', label: '요약 먼저', availableFor: ['readme', 'blog'] },
      { key: 'conclusionFirst', label: '결론 먼저', availableFor: ['blog'] },
      {
        key: 'problemCauseSolution',
        label: '문제 → 원인 → 해결',
        availableFor: ['blog'],
      },
      { key: 'stepByStep', label: '단계별 설명', availableFor: ['readme', 'blog'] },
      {
        key: 'onePointPerParagraph',
        label: '한 문단 한 포인트',
        availableFor: ['readme', 'blog'],
      },
    ],
  },
  /* 스타일 옵션 */
  styleOptions: {
    label: '스타일 옵션',
    options: [
      { key: 'noEmoji', label: '이모지 없음', availableFor: ['readme', 'blog'] },
      { key: 'minEmoji', label: '이모지 최소', availableFor: ['blog'] },
      { key: 'table', label: '표 사용', availableFor: ['readme', 'blog'] },
      { key: 'codeHeavy', label: '코드 블록 많음', availableFor: ['readme', 'blog'] },
      { key: 'codeLight', label: '코드 최소', availableFor: ['blog'] },
    ],
  },
  /* PR 기반 옵션 (1~3개 선택) */
  prOptions: {
    label: 'PR 기반 옵션',
    options: [
      // README
      { key: 'changeSummary', label: '변경 요약', availableFor: ['readme'] },
      { key: 'majorChanges', label: '주요 수정 사항', availableFor: ['readme'] },
      { key: 'risks', label: '리스크 및 주의사항', availableFor: ['readme'] },

      // BLOG
      { key: 'learnings', label: 'PR에서 배운 점', availableFor: ['blog'] },
      { key: 'mistakes', label: '실수 정리', availableFor: ['blog'] },
      {
        key: 'reviewFeedback',
        label: '리뷰 피드백 반영 과정',
        availableFor: ['blog'],
      },
      { key: 'ifRedo', label: '다시 한다면 이렇게', availableFor: ['blog'] },
    ],
  },
} as const;
