export const metadata = {
  title: '개인정보처리방침 - DevCraft',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-gray-800 leading-relaxed">
      <h1 className="text-2xl font-bold mb-8 border-b pb-4">개인정보처리방침</h1>

      <div className="space-y-8 text-sm">
        <section>
          <h2 className="text-lg font-semibold mb-3">1. 개인정보의 수집 및 이용 목적</h2>
          <p>
            '개발자 공방'(이하 '서비스')은 사용자의 GitHub 계정 인증 및 선택한 Pull Request(PR)
            데이터 분석을 위해 최소한의 정보를 수집합니다. 수집된 정보는 서비스 제공 및 품질 향상
            외의 용도로는 이용되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. 수집하는 개인정보 항목</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>필수 항목: GitHub 사용자 ID, 이메일 주소, 프로필 이미지</li>
            <li>
              서비스 이용 과정 생성 정보: 입력된 GitHub PR URL, 해당 PR 내 소스코드 및 텍스트 데이터
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. 개인정보의 보유 및 파기</h2>
          <p>
            본 서비스는 사용자의 PR 소스코드 데이터를 서버에 영구적으로 저장하지 않습니다. 분석을
            위해 일시적으로 처리된 데이터는 분석 완료 즉시 혹은 브라우저 세션 종료 시 파기됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. 제3자 제공 및 위탁</h2>
          <p>
            원칙적으로 사용자의 데이터를 외부에 제공하지 않습니다. 다만, 향후 맞춤형 광고 게재를
            위해 구글(Google) 등 제3자 광고 네트워크가 방문 기록을 토대로 쿠키를 사용할 수 있으며,
            이 과정에서 소스코드는 공유되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. 쿠키(Cookie)의 운용 및 거부</h2>
          <p>
            서비스 최적화 및 광고 게재를 위해 쿠키를 운용할 수 있습니다. 사용자는 브라우저 설정을
            통해 쿠키 저장을 거부할 수 있으나 서비스 이용에 제한이 생길 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. 이용자의 권리</h2>
          <p>
            이용자는 언제든지 GitHub 계정 설정을 통해 본 서비스의 데이터 접근 권한을 철회할 수
            있습니다. 관련 문의는 [운영자 이메일]로 연락 주시기 바랍니다.
          </p>
        </section>
      </div>
    </main>
  );
}
