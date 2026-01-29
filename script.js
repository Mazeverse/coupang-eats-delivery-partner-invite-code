(() => {
  const toast = document.getElementById('toast');
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.style.opacity = '1';
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      toast.textContent = '';
    }, 1800);
  };

  const copyTextFromEl = async (el) => {
    const text = (el?.textContent || '').trim();
    if (!text) throw new Error('복사할 내용이 없습니다.');

    // Prefer Clipboard API
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (!ok) throw new Error('복사에 실패했습니다.');
    return true;
  };

  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const el = document.getElementById(targetId);
      try {
        await copyTextFromEl(el);
        showToast('복사 완료! ✅');
      } catch (e) {
        showToast('복사 실패 ❌ 브라우저 권한을 확인해주세요.');
      }
    });
  });
})();
