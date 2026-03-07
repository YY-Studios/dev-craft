const response = $input.first().json;

// 1. 응답 텍스트 추출
let rawText = response[0]?.content?.parts[0]?.text
|| response.content?.parts[0]?.text;

if (!rawText) throw new Error("응답 텍스트를 찾을 수 없습니다.");

// 2. JSON 블록 추출
const jsonMatch = rawText.match(/\{[\s\S]\*\}/);
if (!jsonMatch) throw new Error("JSON 블록을 찾을 수 없습니다.");

let parsed;

// 3. 1차: 정상 파싱 시도
try {
parsed = JSON.parse(jsonMatch[0]);
} catch (e1) {

// 4. 2차: content 필드가 마지막이고 이스케이프 안 된 경우 복구
try {
const fixed = jsonMatch[0].replace(
/"content"\s*:\s*"([\s\S]_)"\s_\}\s\*$/,
      (_, content) => {
        const escaped = content
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\t/g, '\\t');
        return `"content": "${escaped}"}`;
}
);
parsed = JSON.parse(fixed);
} catch (e2) {

    // 5. 3차: 필드별 정규식 직접 추출 (최후 수단)
    const extractString = (key) => {
      const m = rawText.match(new RegExp(`"${key}"\\s*:\\s*"([\\s\\S]*?)"(?=\\s*[,}])`));
      return m ? m[1] : null;
    };
    const extractArray = (key) => {
      const m = rawText.match(new RegExp(`"${key}"\\s*:\\s*(\\[[\\s\\S]*?\\])`));
      if (!m) return [];
      try { return JSON.parse(m[1]); } catch { return []; }
    };
    parsed = {
      title:   extractString('title'),
      tags:    extractArray('tags'),
      content: extractString('content'),
    };

}
}

// 6. title fallback: content 첫 # 헤딩에서 추출
const title = (() => {
if (parsed.title?.trim()) return parsed.title.trim();
const m = (parsed.content || "").match(/^#\s+(.+)/m);
return m ? m[1].trim() : "제목 없음";
})();

// 7. tags fallback
const tags = (() => {
if (!parsed.tags) return [];
if (Array.isArray(parsed.tags)) return parsed.tags.filter(Boolean).slice(0, 5);
if (typeof parsed.tags === "string") return [parsed.tags];
return [];
})();

return {
json: {
title,
tags,
pr_url: $('Webhook').first().json.body.prUrl || "",
content: parsed.content || "",
repo_name: $('Webhook').first().json.body.repo || "",
repo_owner: $('Webhook').first().json.body.owner || "",
}
};
