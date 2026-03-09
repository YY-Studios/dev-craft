export const metadata = {
  title: '이용약관 - DevCraft',
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-gray-800 leading-relaxed">
      <h1 className="text-2xl font-bold mb-8 border-b pb-4">이용약관</h1>

      <div className="space-y-8 text-sm">
        <section>
          <h2 className="text-lg font-semibold mb-3">제1조 (목적)</h2>
          <p>
            본 약관은 '개발자 공방'(이하 '서비스')이 제공하는 GitHub PR 분석 및 포트폴리오 문서화
            서비스의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및 책임 사항을 규정함을
            목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제2조 (서비스의 제공 및 이용)</h2>
          <p>
            이용자는 GitHub OAuth 인증을 통해 본 약관에 동의하고 서비스를 이용할 수 있습니다.
            서비스는 이용자의 PR 데이터를 AI로 분석하여 문서를 생성하며, 생성된 문서는 이용자의
            계정에 저장되어 관리됩니다. 또한, 이용자의 선택에 따라 피드(Feed)를 통해 타인에게 공개될
            수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제3조 (권리 및 소유권)</h2>
          <p>
            이용자가 분석을 위해 제공한 원본 소스코드의 저작권은 전적으로 이용자에게 있습니다.
            서비스를 통해 생성된 분석 리포트 및 문서의 저작권 역시 이용자에게 귀속되나, 이용자가
            해당 문서를 '공개'로 설정할 경우, 운영자는 이를 서비스 내 피드 노출 및 프로모션 목적으로
            무상 사용할 수 있는 권리를 가집니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제4조 (이용자의 의무 및 금지 행위)</h2>
          <p>이용자는 다음 행위를 하여서는 안 되며, 적발 시 서비스 이용이 제한될 수 있습니다.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>타인의 GitHub 계정을 도용하거나 비정상적인 방법으로 서비스를 이용하는 행위</li>
            <li>서비스의 API를 매크로, 봇 등을 통해 과도하게 호출하여 서버에 부담을 주는 행위</li>
            <li>
              불법적이거나 타인의 권리(지적재산권, 영업비밀 등)를 침해하는 코드를 분석 요청하는 행위
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제5조 (책임의 한계 및 면책)</h2>
          <p className="font-medium text-red-600">
            본 서비스의 분석 결과는 외부 AI 모델(LLM) 및 알고리즘에 기반한 것으로, 내용의 100%
            정확성, 무결성, 보안성을 보장하지 않습니다. AI 특성상 환각 현상(오류)이 포함될 수
            있으며, 분석 결과를 바탕으로 한 최종적인 코드 수정, 배포, 업무 활용 등에 대한 모든
            책임은 전적으로 이용자 본인에게 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제6조 (광고의 게재)</h2>
          <p>
            서비스 운영 유지를 위해 화면 내에 배너 등의 광고가 게재될 수 있으며, 이용자는 서비스
            이용 시 노출되는 광고에 대해 동의하는 것으로 간주합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제7조 (서비스의 중단 및 변경)</h2>
          <p>
            본 서비스는 GitHub API 및 외부 AI API의 상태, 운영상의 사유 등에 따라 예고 없이 기능이
            변경되거나 서비스가 일시 중단될 수 있습니다. 이로 인해 발생하는 이용자의 불이익에 대해
            운영자는 고의 또는 중과실이 없는 한 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제8조 (회원 탈퇴 및 데이터 삭제)</h2>
          <p>
            이용자는 언제든지 서비스 내 설정 또는 관리자 문의를 통해 서비스 탈퇴(데이터베이스 정보
            삭제)를 요청할 수 있으며, 이 경우 저장된 분석글 및 연동 정보는 지체 없이 파기됩니다.
          </p>
        </section>
      </div>
    </main>
  );
}
