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
            본 약관은 '개발자 공방'이 제공하는 GitHub PR 분석 서비스의 이용과 관련하여 운영자와
            이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제2조 (서비스 이용)</h2>
          <p>
            이용자는 GitHub OAuth 인증을 통해 본 약관에 동의하고 서비스를 이용할 수 있습니다.
            서비스는 분석된 데이터를 별도로 저장하지 않는 단발성 분석 도구입니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제3조 (권리 및 소유권)</h2>
          <p>
            이용자가 분석을 위해 제공한 소스코드의 저작권은 이용자에게 있으며, 서비스가 생성한
            리포트의 형식 및 디자인에 대한 권리는 운영자에게 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제4조 (책임의 한계 및 면책)</h2>
          <p className="font-medium text-red-600">
            본 서비스의 분석 결과는 알고리즘에 의한 것으로 100% 정확성을 보장하지 않습니다. 분석
            결과를 바탕으로 한 최종적인 코드 수정 및 배포 판단의 책임은 이용자 본인에게 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제5조 (광고의 게재)</h2>
          <p>
            서비스 운영 유지를 위해 광고가 게재될 수 있으며, 이용자는 서비스 이용 시 노출되는 광고에
            대해 동의하는 것으로 간주합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">제6조 (기타)</h2>
          <p>
            운영상의 사유나 GitHub API 정책 변경 등에 따라 서비스가 일시 중단되거나 약관이 변경될 수
            있습니다.
          </p>
        </section>
      </div>
    </main>
  );
}
