/* Alisa bilan rus tili — foydalanish statistikasi (faqat Telegram ichida ishlaydi) */
(function () {
  var URL_ = "https://script.google.com/macros/s/AKfycbx2ZKUVOA4U9fnGOFUsTl5XJ7UqB-iA_S9QcrnZMoDf3S9UXNaOtqrtwrssLB6gt717/exec";
  var tg = window.Telegram && Telegram.WebApp;
  if (!tg || !tg.initData || URL_.indexOf("https://") !== 0) return;
  var timer = null, last = "";
  function summary() {
    var S = window.__alisaS && window.__alisaS(); if (!S) return {};
    var l = {}, w = 0, v = 0;
    Object.keys(S.done || {}).forEach(function (id) { l[id] = [(S.done[id] || []).length, null]; });
    Object.keys(S.score || {}).forEach(function (id) {
      var sc = S.score[id] || {}; if (!l[id]) l[id] = [0, null];
      if (sc.ex != null) l[id][1] = Math.round(sc.ex * 100);
    });
    Object.keys(S.srs || {}).forEach(function (k) { v++; if ((S.srs[k] || {}).b >= 3) w++; });
    var c = (location.hash.match(/^#(l\d+)/) || [])[1] || "";
    return { l: l, w: w, v: v, c: c };
  }
  function send(ev) {
    var body = JSON.stringify({ initData: tg.initData, ev: ev, s: summary() });
    if (ev === "save" && body === last) return;
    last = body;
    try { fetch(URL_, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: body, keepalive: true }); } catch (e) {}
  }
  window.__alisaStats = function () { clearTimeout(timer); timer = setTimeout(function () { send("save"); }, 4000); };
  send("open");
})();
