/**
 * Welcome to Cloudflare Workers!
 *
 * This is V11 of the Sleep Calculator Worker. (Final Polish)
 *
 * Key Feature:
 * 1. Updated Title: The main title is now "☀️ Sweet Dreams 🌙" to reflect
 * its utility for both daytime naps and nighttime sleep.
 *
 * This is the final, polished version based on our collaboration.
 */

export default {
  async fetch(request, env, ctx) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sleep Cycle Calculator</title>
  <style>
    :root {
      --bg-color: #111827;
      --card-color: #1f2937;
      --input-color: #374151;
      --border-color: #4b5563;
      --text-primary: #f3f4f6;
      --text-secondary: #d1d5db;
      --text-muted: #9ca3af;
      --accent-color: #a78bfa;
      --button-color: #6d28d9;
      --button-hover: #5b21b6;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
    }
    .lang-switcher {
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 5px;
      background-color: var(--card-color);
      padding: 5px;
      border-radius: 8px;
      z-index: 10;
    }
    .lang-switcher button {
      background-color: transparent;
      border: none;
      color: var(--text-muted);
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s ease;
      margin: 0;
      width: auto;
    }
    .lang-switcher button.active {
      background-color: var(--accent-color);
      color: white;
    }
    .container {
      width: 100%;
      max-width: 800px;
      text-align: center;
      padding-top: 40px;
    }
    h1 {
      font-size: 2.5rem;
      color: var(--accent-color);
      margin-bottom: 40px;
      font-weight: 500;
    }
    .main-layout {
      display: flex;
      gap: 30px;
      justify-content: center;
    }
    .calculator-section {
      background-color: var(--card-color);
      padding: 25px;
      border-radius: 12px;
      margin-bottom: 20px;
      flex: 1;
      min-width: 280px;
    }
    h2 {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: 400;
    }
    .time-picker-group {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .time-picker-group select {
      flex-grow: 1;
      background-color: var(--input-color);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 12px;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E');
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 0.65em auto;
    }
    button {
      display: block;
      width: 100%;
      padding: 15px;
      margin-top: 20px;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 500;
      color: white;
      background-color: var(--button-color);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: var(--button-hover);
    }
    .now-btn {
        flex-shrink: 0;
        width: auto;
        padding: 8px 12px;
        margin-top: 0;
        font-size: 0.9rem;
        background-color: var(--input-color);
    }
    .now-btn:hover {
        background-color: var(--border-color);
    }
    .suggestions {
      margin-top: 25px;
      text-align: left;
      opacity: 1;
      transition: opacity 0.1s ease-in-out;
    }
    .suggestions h3 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--accent-color);
      margin-bottom: 15px;
      border-bottom: 1px solid var(--input-color);
      padding-bottom: 8px;
    }
    .suggestions p {
      background-color: var(--input-color);
      padding: 12px;
      border-radius: 6px;
      margin: 0 0 10px 0;
      font-size: 1rem;
      color: var(--text-secondary);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
    }
    .suggestions p.passed {
      text-decoration: line-through;
      color: var(--text-muted);
    }
    .suggestions p.passed span {
       color: var(--border-color);
    }
    .suggestions p span {
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    footer {
      font-size: 0.8rem;
      color: var(--border-color);
      margin-top: 20px;
    }
    @media (max-width: 768px) {
      .main-layout {
        flex-direction: column;
      }
      .container {
        max-width: 400px;
      }
    }
  </style>
</head>
<body>

  <div class="lang-switcher">
    <button id="lang-en">EN</button>
    <button id="lang-zh_tw">繁</button>
  </div>

  <div class="container">
    <h1 data-i18n-key="title"></h1>
    <div class="main-layout">
      <div class="calculator-section">
        <h2 data-i18n-key="wakeUpHeader"></h2>
        <div class="time-picker-group">
          <select id="wakeUpHour"></select>
          <select id="wakeUpMinute"></select>
        </div>
        <button onclick="calculateBedtime()" data-i18n-key="calculateBedtimeBtn"></button>
        <div id="bedtimeSuggestions" class="suggestions"></div>
      </div>

      <div class="calculator-section">
        <h2 data-i18n-key="sleepHeader"></h2>
        <div class="time-picker-group">
            <select id="sleepHour"></select>
            <select id="sleepMinute"></select>
            <button id="setToNowBtn" class="now-btn" data-i18n-key="setNowBtn"></button>
        </div>
        <button onclick="calculateWakeUpTime()" data-i18n-key="calculateWakeUpBtn"></button>
        <div id="wakeUpSuggestions" class="suggestions"></div>
      </div>
    </div>
    <footer data-i18n-key="footerHint"></footer>
  </div>

  <script>
    const translations = {
      title: { en: '☀️ Sweet Dreams 🌙', zh_tw: '☀️ 願您擁有一個好夢 🌙' },
      wakeUpHeader: { en: 'I plan to wake up at...', zh_tw: '我計劃在 ... 起床' },
      sleepHeader: { en: 'I plan to sleep at...', zh_tw: '我計劃在 ... 入睡' },
      calculateBedtimeBtn: { en: 'Calculate Bedtime', zh_tw: '計算入睡時間' },
      calculateWakeUpBtn: { en: 'Calculate Wake-up Time', zh_tw: '計算起床時間' },
      setNowBtn: { en: 'Now', zh_tw: '現在' },
      suggestionHeaderBedtime: { en: 'You should go to bed at:', zh_tw: '你應該在以下時間入睡:' },
      suggestionHeaderWakeUp: { en: 'You should wake up at:', zh_tw: '你應該在以下時間醒來:' },
      cyclesUnit: { en: 'cycles', zh_tw: '個週期' },
      powerNap: { en: 'Power Nap', zh_tw: '能量小睡' },
      memoryNap: { en: 'Memory Nap', zh_tw: '記憶小睡' },
      footerHint: { 
        en: 'Tip: A full sleep cycle is about 90 minutes. Recommended 5-6 cycles. Calculation includes a 15-minute falling asleep time.', 
        zh_tw: '提示: 一個完整的睡眠週期約90分鐘，建議睡夠5-6個週期。計算已包含約15分鐘的入睡時間。'
      }
    };

    let currentLang = 'en';

    function setLanguage(lang) {
      currentLang = lang;
      document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        if (translations[key]?.[lang]) el.innerText = translations[key][lang];
      });
      document.getElementById('lang-en').classList.toggle('active', lang === 'en');
      document.getElementById('lang-zh_tw').classList.toggle('active', lang === 'zh_tw');
      calculateBedtime();
      calculateWakeUpTime();
    }
    
    function formatTime(date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      if (currentLang === 'zh_tw') {
        return \`\${String(hours).padStart(2, '0')}:\${String(minutes).padStart(2, '0')}\`;
      }
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return \`\${formattedHours}:\${String(minutes).padStart(2, '0')} \${ampm}\`;
    }

    const fallAsleepTime = 15 * 60 * 1000;

    function renderSuggestions(element, headerKey, calculationFn) {
        if (element.dataset.renderTimeout) {
            clearTimeout(parseInt(element.dataset.renderTimeout));
        }
        
        const results = calculationFn();
        const now = new Date();
        let html = \`<h3>\${translations[headerKey][currentLang]}</h3>\`;
        results.forEach(result => {
            const isPassed = result.time < now;
            const passedClass = isPassed ? 'passed' : '';
            html += \`<p class="\${passedClass}">\${formatTime(result.time)}<span>\${result.label}</span></p>\`;
        });
        
        if (element.innerHTML === '' || element.style.opacity === '0') {
            element.innerHTML = html;
            element.style.opacity = '1';
        } else {
            element.style.opacity = '0';
            element.dataset.renderTimeout = setTimeout(() => {
                element.innerHTML = html;
                element.style.opacity = '1';
            }, 100);
        }
    }

    function calculateBedtime() {
        renderSuggestions(document.getElementById("bedtimeSuggestions"), 'suggestionHeaderBedtime', () => {
            const wakeUpHour = parseInt(document.getElementById("wakeUpHour").value);
            const wakeUpMinute = parseInt(document.getElementById("wakeUpMinute").value);
            const wakeUpDate = new Date();
            wakeUpDate.setHours(wakeUpHour, wakeUpMinute, 0, 0);
            
            const now = new Date();
            if (wakeUpDate < now) wakeUpDate.setDate(wakeUpDate.getDate() + 1);

            const totalMinutesAvailable = (wakeUpDate.getTime() - now.getTime()) / (1000 * 60);
            let results = [];

            const sleepCycles = [6, 5, 4, 3, 2, 1];
            sleepCycles.forEach(cycles => {
                const cycleDuration = cycles * 90;
                if (cycleDuration + 15 <= totalMinutesAvailable) {
                    results.push({
                        time: new Date(wakeUpDate.getTime() - (cycleDuration * 60 * 1000) - fallAsleepTime),
                        label: \`\${cycles} \${translations.cyclesUnit[currentLang]}\`
                    });
                }
            });

            if (totalMinutesAvailable < 5 * 60) {
                const napCycles = [
                    { nameKey: 'memoryNap', duration: 60 },
                    { nameKey: 'powerNap', duration: 25 }
                ];
                napCycles.forEach(nap => {
                    if (nap.duration + 15 <= totalMinutesAvailable) {
                        results.push({
                            time: new Date(wakeUpDate.getTime() - (nap.duration * 60 * 1000) - fallAsleepTime),
                            label: translations[nap.nameKey][currentLang]
                        });
                    }
                });
            }
            
            results = results.filter((result, index, self) =>
                index === self.findIndex((r) => r.time.getTime() === result.time.getTime())
            );
            results.sort((a, b) => b.time - a.time);

            return results;
        });
    }

    function calculateWakeUpTime() {
        renderSuggestions(document.getElementById("wakeUpSuggestions"), 'suggestionHeaderWakeUp', () => {
            const sleepHour = parseInt(document.getElementById("sleepHour").value);
            const sleepMinute = parseInt(document.getElementById("sleepMinute").value);
            const sleepTime = new Date();
            sleepTime.setHours(sleepHour, sleepMinute, 0, 0);
            if (sleepTime < new Date()) sleepTime.setDate(sleepTime.getDate() + 1);
            
            const sleepCycles = [6, 5, 4, 3, 2, 1];
            return sleepCycles.map(cycles => ({
                time: new Date(sleepTime.getTime() + fallAsleepTime + (cycles * 90 * 60 * 1000)),
                label: \`\${cycles} \${translations.cyclesUnit[currentLang]}\`
            }));
        });
    }

    function populateTimeSelect(hourEl, minuteEl, defaultToNow) {
        for (let i = 0; i < 24; i++) hourEl.add(new Option(String(i).padStart(2, '0'), i));
        for (let i = 0; i < 60; i++) minuteEl.add(new Option(String(i).padStart(2, '0'), i));
        
        if (defaultToNow) {
            const now = new Date();
            hourEl.value = now.getHours();
            minuteEl.value = now.getMinutes();
        } else {
            hourEl.value = 8;
            minuteEl.value = 0;
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      const wakeUpHourEl = document.getElementById('wakeUpHour');
      const wakeUpMinuteEl = document.getElementById('wakeUpMinute');
      const sleepHourEl = document.getElementById('sleepHour');
      const sleepMinuteEl = document.getElementById('sleepMinute');
      
      populateTimeSelect(wakeUpHourEl, wakeUpMinuteEl, false);
      populateTimeSelect(sleepHourEl, sleepMinuteEl, true);

      wakeUpHourEl.addEventListener('change', calculateBedtime);
      wakeUpMinuteEl.addEventListener('change', calculateBedtime);
      
      sleepHourEl.addEventListener('change', calculateWakeUpTime);
      sleepMinuteEl.addEventListener('change', calculateWakeUpTime);

      document.getElementById('setToNowBtn').addEventListener('click', () => {
          const now = new Date();
          sleepHourEl.value = now.getHours();
          sleepMinuteEl.value = now.getMinutes();
          calculateWakeUpTime();
      });
      
      document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
      document.getElementById('lang-zh_tw').addEventListener('click', () => setLanguage('zh_tw'));

      setLanguage('en'); 
    });
  <\/script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};
