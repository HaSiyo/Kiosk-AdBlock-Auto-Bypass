// ==UserScript==
// @name         Kiosk AdBlock Auto Bypass
// @namespace    https://kio.ac/userscript/adblock-pass
// @match        https://kio.ac/*
// @run-at       document-start
// @grant        none
// @version      2.3
// @description  Automatically bypasses AdBlock detection on Kiosk and unlocks downloads. Cleans up the interface by removing intrusive UI elements like 'Lifespan' and sponsor requests.
// @author       local
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';
  const AD_REGEX = /애드블록|adblock/i;
  const BTN_REGEX = /확인|닫기|동의|알겠습니다|ok|close/i;
  // 후원 팝업 내 텍스트 추가 ("후원하기", "서비스 유지비")
  const ANNOYING_TEXTS = ["수명", "Kiosk를 도와주세요", "후원 시 광고 제거", "후원하기", "서비스 유지비"];

  // 1. 잠금/배경막 및 CSS 기반 배너 무력화
  function ensureCss() {
    if (document.getElementById('__kioCss')) return;
    const s = document.createElement('style');
    s.id = '__kioCss';
    
    s.textContent = `
      html, body { 
        pointer-events: auto !important; 
        overflow: auto !important; 
      }
      [data-dialog-overlay], [class*="overlay"], [class*="backdrop"], [id*="overlay"] { 
        pointer-events: none !important; 
        opacity: 0 !important; 
        display: none !important; 
      }
      [data-dialog-content], [role="dialog"], dialog, [aria-modal="true"], .modal, .dialog { 
        pointer-events: auto !important; 
      }
      /* 명시적인 광고, 배너 및 후원 유도(Patreon) 요소 CSS 원천 차단 */
      .ad-slot, .internal-banner, [class*="ad-slot"], [class*="internal-banner"],
      [data-bits-floating-content-wrapper]:has(a[href*="patreon.com"]),
      [data-tooltip-content]:has(a[href*="patreon.com"]) {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    (document.head || document.documentElement).appendChild(s);
  }

  // 2. 텍스트 기반 불필요 UI 탐색 및 숨김 처리
  function hideAnnoyingElements() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const nodesToHide = new Set();

    while ((node = walker.nextNode())) {
      const text = node.nodeValue.trim();
      if (ANNOYING_TEXTS.some(k => text.includes(k))) {
        let parent = node.parentElement;
        if (parent) {
          // 1순위: 새롭게 추가된 후원 팝업 등 플로팅 래퍼 전체를 탐색
          let wrapper = parent.closest('[data-bits-floating-content-wrapper], [data-tooltip-content]');
          
          // 2순위: 없으면 기존처럼 툴팁 트리거, 버튼, 링크, 배너를 탐색
          if (!wrapper) {
            wrapper = parent.closest('button[data-tooltip-trigger], button, a, [class*="banner"]');
          }
          
          nodesToHide.add(wrapper || parent);
        }
      }
    }

    nodesToHide.forEach(el => {
      // 본문 전체가 날아가는 것을 방지하기 위한 방어 코드
      if (el && el.style && el.tagName !== 'BODY' && el.tagName !== 'HTML') {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
      }
    });
  }

  function handle() {
    ensureCss();

    // 3. 대화상자/모달 형태 범용 탐색 (애드블록 경고만 처리하고 비밀번호 모달은 건드리지 않음)
    const dialogs = document.querySelectorAll(
      '[data-dialog-content], [role="dialog"], dialog, [aria-modal="true"], [class*="dialog"], [class*="modal"]'
    );

    dialogs.forEach(dialog => {
      // 애드블록 텍스트가 없으면(ex: 비밀번호 입력창) 무시
      if (!AD_REGEX.test(dialog.textContent || '')) return;

      const buttons = [...dialog.querySelectorAll('button, [role="button"], a[href="#"], input[type="button"], input[type="submit"], [class*="btn"]')];
      let targetBtn = buttons.find(b => BTN_REGEX.test((b.textContent || b.value || '').trim()));
      
      if (!targetBtn && buttons.length > 0) {
        targetBtn = buttons[buttons.length - 1];
      }

      if (targetBtn) {
        targetBtn.disabled = false;
        targetBtn.removeAttribute('disabled');
        targetBtn.removeAttribute('aria-disabled');
        targetBtn.style.pointerEvents = 'auto';
        targetBtn.click();
      } else {
        dialog.remove();
      }
    });

    // 4. 토스트/알림 형태 범용 탐색 및 제거
    const toasts = document.querySelectorAll(
      'ol.toaster li, [data-sonner-toast], [role="alert"], [class*="toast"], [id*="toast"]'
    );
    
    toasts.forEach(toast => {
      if (AD_REGEX.test(toast.textContent || '')) {
        toast.remove();
      }
    });

    // 추가된 불필요 요소(후원 팝업, 수명 텍스트 등) 제거
    hideAnnoyingElements();
  }

  ensureCss();
  
  const targetNode = document.documentElement || document;
  new MutationObserver(handle).observe(targetNode, { childList: true, subtree: true });
  
  setInterval(handle, 300);
  handle();
})();
