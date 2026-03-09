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
            '개발자 공방'(이하 '서비스')은 다음과 같은 목적을 위해 최소한의 개인정보 및 데이터를
            수집합니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>회원 식별 및 GitHub 연동을 통한 로그인 서비스 제공</li>
            <li>Pull Request(PR) 데이터 분석 및 포트폴리오(문서) 자동 생성 기능 제공</li>
            <li>생성된 문서의 저장, 피드 노출 및 다른 사용자와의 공유 기능(소셜 기능) 제공</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. 수집하는 개인정보 및 데이터 항목</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <strong>회원 정보 (필수):</strong> GitHub 고유 ID, 사용자 이름(Username), 이메일 주소,
              프로필 이미지 URL
            </li>
            <li>
              <strong>서비스 이용 데이터:</strong> 입력된 GitHub PR URL, 레포지토리 이름 및 소유자
              정보, 자동 생성된 분석 문서(제목, 본문, 태그), 좋아요 및 조회수 기록
            </li>
            <li>
              ※ PR을 분석하는 과정에서 원본 소스코드 텍스트가 일시적으로 처리되나, 원본 코드 자체는
              당사 데이터베이스에 저장하지 않으며 분석된 결과물(문서)만 저장됩니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">
            3. 개인정보 및 데이터의 보유, 이용 기간 및 파기
          </h2>
          <p>
            수집된 회원 정보 및 사용자가 생성한 분석글(문서)은{' '}
            <strong>
              개발자 공방 서비스 탈퇴(데이터 삭제 및 GitHub 연동 해제) 시점 혹은 사용자가 직접
              문서를 삭제할 때까지 보관 및 이용
            </strong>
            됩니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>사용자가 문서를 직접 삭제 할 수 있습니다.</li>
            {/* <li>
              회원 탈퇴 요청 시, 해당 사용자의 개인정보와 작성한 문서는 지체 없이 안전하게
              파기됩니다.
            </li> */}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. 제3자 제공 및 AI 처리 위탁</h2>
          <p>
            원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 원활한 서비스 제공을
            위해 아래와 같은 처리가 이루어집니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>
              <strong>AI 분석 처리:</strong> PR 내용을 분석하여 문서를 생성하기 위해, 익명화된
              텍스트 데이터가 외부 AI 모델(예: OpenAI 등) API로 전송될 수 있습니다.
            </li>
            <li>
              <strong>서비스 공개:</strong> 사용자가 '공개(Public)'로 설정한 분석글과 프로필
              정보(이름, 아바타)는 피드를 통해 다른 사용자에게 공개됩니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. 쿠키(Cookie)의 운용 및 거부</h2>
          <p>
            서비스 최적화, 사용자 인증 유지 및 맞춤형 환경 제공을 위해 쿠키를 운용할 수 있습니다.
            사용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 로그인 등 일부
            서비스 이용에 제한이 생길 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. 이용자의 권리 및 연락처</h2>
          <p>
            이용자는 언제든지 서비스 내 설정이나 GitHub 권한 해제를 통해 동의를 철회하거나 회원
            탈퇴를 진행할 수 있습니다. 개인정보 보호와 관련된 문의는 아래 이메일로 연락해 주시기
            바랍니다.
          </p>
          <p className="mt-2 font-medium text-gray-700">📧 문의: s0912135@gmail.com</p>
        </section>
      </div>
    </main>
  );
}
