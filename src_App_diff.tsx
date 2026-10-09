--- src/App.tsx (原始)
import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import CodeBlock from './components/CodeBlock';
import StepCard from './components/StepCard';
import DetailedGuide from './DetailedGuide';
import { pythonCode, workflowCode, requirementsCode, readmeCode } from './data/githubActionsCode';

function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'code' | 'detailed'>('guide');

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    zip.file('bot.py', pythonCode);
    zip.file('requirements.txt', requirementsCode);
    zip.folder('.github')!.folder('workflows')!.file('bot.yml', workflowCode);
    zip.file('README.md', readmeCode);

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'culture-bot.zip');
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <div className="float-animation inline-block mb-6">
              <div className="text-7xl md:text-8xl">🤖</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              <span className="gradient-text">Telegram Бот</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              Монитор культурных событий
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Автоматически проверяет афиши и уведомляет о новых событиях.
              Работает через <b className="text-white">GitHub Actions</b> — бесплатно и 24/7.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
                <span className="pulse-dot w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-green-400 text-sm">Работает в России</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2">
                <span className="text-blue-400 text-sm">💻 Не нужен Python</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2">
                <span className="text-purple-400 text-sm">🆓 Бесплатно</span>
              </div>
            </div>

            {/* Venue cards */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['🎨 Третьяковка', '🎵 Зарядье', '🩰 Большой театр', '🖼 ГЭС-2', '🎭 Ленком'].map(v => (
                <div key={v} className="glass-card px-4 py-2 text-sm text-gray-300">{v}</div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={downloadAll}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
              >
                📥 Скачать все файлы (ZIP)
              </button>
              <a
                href="/bot-files/bot.py"
                download
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 py-3 rounded-xl transition-all"
              >
                📄 bot.py
              </a>
              <a
                href="/bot-files/requirements.txt"
                download
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 py-3 rounded-xl transition-all"
              >
                📄 requirements.txt
              </a>
              <a
                href="/bot-files/bot.yml"
                download
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 py-3 rounded-xl transition-all"
              >
                📄 bot.yml
              </a>
            </div>

            {/* Tabs */}
            <div className="inline-flex bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'guide'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📖 Инструкция
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'detailed'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📚 Подробно (каждый клик)
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                💻 Код
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {activeTab === 'guide' ? (
          <GuideSection downloadFile={downloadFile} downloadAll={downloadAll} />
        ) : activeTab === 'detailed' ? (
          <DetailedGuide />
        ) : (
          <CodeSection downloadFile={downloadFile} />
        )}
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>GitHub Actions + Python + Telegram Bot API</p>
      </footer>
    </div>
  );
}

/* ===== Visual components ===== */

function GitHubMockup({ children, title = 'github.com' }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden my-4">
      <div className="bg-[#161b22] px-4 py-2 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="flex-1 bg-[#010409] rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-2">
          🔒 {title}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function TelegramMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#17212b] rounded-xl border border-white/10 overflow-hidden my-4 max-w-sm">
      <div className="bg-[#232e3c] px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm">🤖</div>
        <div>
          <div className="text-white text-sm font-medium">Культурный Бот</div>
          <div className="text-green-400 text-xs">bot</div>
        </div>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

function TelegramMessage({ text, isUser = false }: { text: string; isUser?: boolean }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
        isUser ? 'bg-[#2b5278] text-white rounded-br-sm' : 'bg-[#182533] text-gray-200 rounded-bl-sm'
      }`}>
        {text}
      </div>
    </div>
  );
}

function ClickTarget({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded-md px-2 py-0.5 text-yellow-300 font-bold">
      {children}
    </span>
  );
}

/* ===== Guide Section ===== */

function GuideSection({ downloadAll }: { downloadFile: (c: string, f: string) => void; downloadAll: () => void }) {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-indigo-500">
        <h2 className="text-2xl font-bold text-white mb-4">📚 Что мы будем делать?</h2>
        <div className="text-gray-300 space-y-3">
          <p>
            Создадим бота на <b className="text-white">GitHub Actions</b>. Это значит:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>GitHub работает в России</b></p>
              <p className="text-green-200/70 text-xs">Не нужен VPN</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>Python не нужно ставить</b></p>
              <p className="text-green-200/70 text-xs">Он уже есть в GitHub</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>Бесплатно</b></p>
              <p className="text-green-200/70 text-xs">2000 минут/месяц</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>24/7</b></p>
              <p className="text-green-200/70 text-xs">Работает без вашего ПК</p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        🚀 8 простых шагов
      </h2>

      {/* Step 1 */}
      <StepCard number={1} title="Скачай файлы бота">
        <p>Скачай все файлы одним архивом или по одному:</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={downloadAll} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg">
            📦 Скачать все файлы (ZIP)
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <a href="/bot-files/bot.py" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 bot.py
          </a>
          <a href="/bot-files/requirements.txt" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 requirements.txt
          </a>
          <a href="/bot-files/bot.yml" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 bot.yml
          </a>
          <a href="/bot-files/README.md" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 README.md
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          <b>ZIP-архив</b> содержит все файлы в правильной структуре папок.
        </p>
        <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-gray-400 text-sm">
            💡 Файлы сохранятся в папку "Загрузки". Потом мы загрузим их на GitHub.
          </p>
        </div>
      </StepCard>

      {/* Step 2 */}
      <StepCard number={2} title="Создай бота в Telegram">
        <ol className="list-decimal list-inside space-y-3">
          <li>Открой Telegram, найди <b className="text-white">@BotFather</b></li>
          <li>Напиши <ClickTarget>/newbot</ClickTarget></li>
          <li>Придумай имя: <b className="text-white">Мой Культурный Бот</b></li>
          <li>Придумай username (обязан заканчиваться на <b>bot</b>): <b className="text-white">my_culture_bot</b></li>
          <li>Скопируй <b className="text-indigo-400">ТОКЕН</b> — длинная строка типа <code className="bg-black/30 px-1 rounded text-xs">123456:ABC...</code></li>
        </ol>

        <TelegramMockup>
          <TelegramMessage text="/newbot" isUser />
          <TelegramMessage text="Alright, a new bot. Let's give it a name." />
          <TelegramMessage text="Мой Культурный Бот" isUser />
          <TelegramMessage text="my_culture_bot" isUser />
          <TelegramMessage text="✅ Done! Token: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz" />
        </TelegramMockup>

        <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
          <p className="text-indigo-300 text-sm">
            🔑 <b>Сохрани токен!</b> Понадобится на шаге 6.
          </p>
        </div>
      </StepCard>

      {/* Step 3 */}
      <StepCard number={3} title="Узнай свой Chat ID">
        <p>Чтобы бот знал, <b className="text-white">кому</b> отправлять сообщения, нужен твой Chat ID.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">🤔 Что такое Chat ID?</p>
          <p className="text-indigo-200 text-sm">
            Это уникальный номер твоего аккаунта в Telegram. По нему бот понимает,
            именно тебе отправлять сообщения.
          </p>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📱 Как получить Chat ID:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            Открой Telegram и в поиске найди бота:
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-black/30 px-3 py-1.5 rounded font-mono text-green-400">@userinfobot</span>
            </div>
          </li>

          <li>
            Нажми <ClickTarget>Start</ClickTarget> или напиши <ClickTarget>/start</ClickTarget>
          </li>

          <li>
            Бот пришлёт сообщение с твоим ID:
          </li>
        </ol>

        <TelegramMockup>
          <TelegramMessage text="/start" isUser />
          <TelegramMessage text="Id: 123456789&#10;First: Иван&#10;Last: Иванов&#10;Lang: ru" />
        </TelegramMockup>

        <ol className="list-decimal list-inside space-y-4 mt-4" start={4}>
          <li>
            Найди в сообщении строку <b className="text-yellow-400">Id:</b> и скопируй число после неё
          </li>
        </ol>

        <div className="mt-4 bg-black/30 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-2">Пример:</p>
          <div className="font-mono text-sm">
            <span className="text-gray-500">Id: </span>
            <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-2 py-0.5 text-yellow-300 font-bold">
              123456789
            </span>
            <span className="text-gray-600 text-xs ml-2">← это и есть Chat ID</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Скопируй этот номер</b> — он понадобится на шаге 7.
          </p>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">
            💡 <b>Если хочешь добавить несколько получателей</b> (например, себя и друга):<br />
            Пусть каждый узнает свой Chat ID через @userinfobot, а потом объедините их через запятую:<br />
            <code className="bg-black/30 px-2 py-0.5 rounded text-xs mt-1 inline-block">123456789,987654321</code>
          </p>
        </div>
      </StepCard>

      {/* Step 4 */}
      <StepCard number={4} title="Создай репозиторий на GitHub">
        <p>Репозиторий — это как папка в облаке, где будет жить код бота.</p>

        <ol className="list-decimal list-inside space-y-4 mt-4">
          <li>
            Открой{' '}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-semibold">
              github.com
            </a>{' '}
            и войди в аккаунт (или зарегистрируйся — это бесплатно)
          </li>

          <li>
            В правом верхнем углу найди кнопку <ClickTarget>+</ClickTarget> (плюс)
          </li>

          <li>
            В выпадающем меню выбери <ClickTarget>New repository</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="github.com">
          <div className="flex justify-end gap-4 items-center">
            <span className="text-gray-400 text-sm">...</span>
            <div className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-3 py-1 text-yellow-300 font-bold">
              + ▾
            </div>
            <div className="absolute mt-8 right-4 bg-[#161b22] border border-white/20 rounded-lg p-2 shadow-xl">
              <div className="text-gray-300 text-sm space-y-1">
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">New repository</p>
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">Import repository</p>
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">New gist</p>
              </div>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={4}>
          <li>Заполни форму создания репозитория:</li>
        </ol>

        <GitHubMockup title="github.com/new">
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Repository name *</label>
              <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 text-white text-sm">
                culture-bot
              </div>
              <p className="text-gray-500 text-xs mt-1">↑ Придумай любое название</p>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Visibility</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/60 rounded px-3 py-2 cursor-pointer">
                  <input type="radio" checked className="accent-blue-500" />
                  <span className="text-white text-sm font-medium">Public</span>
                  <span className="text-gray-400 text-xs">— все видят</span>
                </label>
                <label className="flex items-center gap-2 text-gray-500">
                  <input type="radio" className="accent-blue-500" />
                  <span className="text-sm">Private</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Initialize this repository with:</label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked className="accent-green-500" />
                <span className="text-green-400 text-sm">Add a README file</span>
              </label>
            </div>

            <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md font-medium text-sm">
              Create repository
            </button>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={5}>
          <li>
            Нажми зелёную кнопку <ClickTarget>Create repository</ClickTarget>
          </li>
        </ol>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Готово!</b> Репозиторий создан. Теперь загрузим в него файлы.
          </p>
        </div>
      </StepCard>

      {/* Step 5 */}
      <StepCard number={5} title="Загрузи файлы в репозиторий">
        <p>Теперь загрузим скачанные файлы в репозиторий.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">📦 Какие файлы загружать?</p>
          <div className="text-indigo-200 text-sm space-y-1">
            <p>✅ <b>bot.py</b> — основной код бота</p>
            <p>✅ <b>requirements.txt</b> — список библиотек</p>
            <p>✅ <b>README.md</b> — описание (если скачал)</p>
            <p className="text-yellow-400">⚠️ <b>bot.yml</b> — пока НЕ загружай (он пойдёт в специальную папку)</p>
          </div>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📤 Как загрузить файлы:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            В репозитории найди кнопку <ClickTarget>Add file</ClickTarget> (над списком файлов)
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot">
          <div className="space-y-3">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <span className="text-gray-400 text-sm">📁 culture-bot /</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#21262d] border border-white/20 text-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-2 py-0.5 text-yellow-300 font-bold">
                  Add file ▾
                </span>
              </button>
              <span className="text-yellow-400 text-xs self-center">← нажми сюда</span>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={2}>
          <li>
            В выпадающем меню выбери <ClickTarget>Upload files</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Upload files">
          <div className="bg-[#161b22] border border-white/10 rounded-lg p-6">
            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">📁</div>
              <p className="text-gray-300 text-sm mb-2">Drag files here or</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                choose your files
              </button>
              <p className="text-gray-500 text-xs mt-3">
                Или перетащи файлы из папки "Загрузки"
              </p>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={3}>
          <li>
            Откроется страница загрузки. Найди файлы в папке <b className="text-white">"Загрузки"</b>:
          </li>
        </ol>

        <div className="mt-2 bg-black/30 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-2">📁 Загрузки:</p>
          <div className="space-y-1 font-mono text-sm">
            <p className="text-green-400">📄 bot.py</p>
            <p className="text-green-400">📄 requirements.txt</p>
            <p className="text-green-400">📄 README.md</p>
            <p className="text-gray-500">📄 bot.yml <span className="text-xs">(пока не трогай)</span></p>
          </div>
        </div>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={4}>
          <li>
            <b>Перетащи файлы</b> в область загрузки или нажми <b className="text-white">"choose your files"</b> и выбери их
          </li>
        </ol>

        <GitHubMockup title="Uploading files">
          <div className="bg-[#161b22] border border-white/10 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-[#010409] rounded p-3">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm flex-1">bot.py</span>
                <span className="text-gray-500 text-xs">12 KB</span>
              </div>
              <div className="flex items-center gap-3 bg-[#010409] rounded p-3">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm flex-1">requirements.txt</span>
                <span className="text-gray-500 text-xs">1 KB</span>
              </div>
              <div className="flex items-center gap-3 bg-[#010409] rounded p-3">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm flex-1">README.md</span>
                <span className="text-gray-500 text-xs">3 KB</span>
              </div>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={5}>
          <li>
            Прокрути вниз до раздела <b className="text-white">"Commit changes"</b>
          </li>
          <li>
            В поле описания напиши: <ClickTarget>Add bot files</ClickTarget>
          </li>
          <li>
            Нажми зелёную кнопку <ClickTarget>Commit changes</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Commit changes">
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Commit message</label>
              <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 text-white text-sm">
                Add bot files
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md font-medium text-sm">
              Commit changes
            </button>
          </div>
        </GitHubMockup>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Файлы загружены!</b> Теперь они видны в репозитории.
          </p>
        </div>
      </StepCard>

      {/* Step 6 */}
      <StepCard number={6} title="Создай папку для workflow и загрузи bot.yml">
        <p>GitHub Actions требует, чтобы файл настройки лежал в специальной папке.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">📂 Структура папок:</p>
          <div className="bg-black/30 rounded-lg p-3 font-mono text-sm">
            <p className="text-gray-400">culture-bot/</p>
            <p className="text-white ml-4">├── .github/</p>
            <p className="text-white ml-8">│   └── workflows/</p>
            <p className="text-yellow-400 ml-12">│       └── bot.yml <span className="text-gray-500 text-xs">← сюда</span></p>
            <p className="text-green-400 ml-4">├── bot.py <span className="text-gray-500 text-xs">← уже загружен</span></p>
            <p className="text-green-400 ml-4">├── requirements.txt <span className="text-gray-500 text-xs">← уже загружен</span></p>
            <p className="text-green-400 ml-4">└── README.md <span className="text-gray-500 text-xs">← уже загружен</span></p>
          </div>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📝 Как создать файл bot.yml:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            В репозитории нажми <ClickTarget>Add file</ClickTarget> → <ClickTarget>Create new file</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot">
          <div className="flex gap-2">
            <button className="bg-[#21262d] border border-white/20 text-gray-300 px-4 py-2 rounded-md text-sm">
              Add file ▾
            </button>
            <div className="absolute mt-10 bg-[#161b22] border border-white/20 rounded-lg p-2 shadow-xl">
              <div className="text-gray-300 text-sm space-y-1">
                <p className="bg-yellow-500/20 border border-yellow-500/60 rounded px-3 py-1 text-yellow-300 font-bold">
                  Create new file ← выбери это
                </p>
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">Upload files</p>
              </div>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={2}>
          <li>
            Откроется редактор. В поле <b className="text-white">"Name your file..."</b> напиши:
          </li>
        </ol>

        <GitHubMockup title="New file">
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Name your file...</label>
              <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 font-mono text-yellow-300 font-bold text-sm">
                .github/workflows/bot.yml
              </div>
              <p className="text-gray-500 text-xs mt-1">
                ↑ Важно: именно так, с точками и слэшами! GitHub автоматически создаст папки.
              </p>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={3}>
          <li>
            Открой скачанный файл <code className="bg-black/30 px-1 rounded">bot.yml</code> в любом текстовом редакторе (Блокнот, TextEdit)
          </li>
          <li>
            <b>Выдели всё</b> (Ctrl+A или Cmd+A) и <b>скопируй</b> (Ctrl+C или Cmd+C)
          </li>
          <li>
            <b>Вставь</b> (Ctrl+V или Cmd+V) в большое текстовое поле на GitHub
          </li>
        </ol>

        <GitHubMockup title="Edit new file">
          <div className="space-y-3">
            <div className="bg-[#010409] border border-white/10 rounded p-4 font-mono text-xs">
              <p className="text-purple-400">name: Culture Events Bot</p>
              <p className="text-gray-400"></p>
              <p className="text-gray-400">on:</p>
              <p className="text-gray-400">{'  '}schedule:</p>
              <p className="text-green-400">{'    '}- cron: '*/30 * * * *'</p>
              <p className="text-gray-400">{'  '}workflow_dispatch:</p>
              <p className="text-gray-400"></p>
              <p className="text-gray-400">jobs:</p>
              <p className="text-gray-400">{'  '}check-events:</p>
              <p className="text-gray-400">{'    '}runs-on: ubuntu-latest</p>
              <p className="text-gray-500">{'    '}</p>
              <p className="text-gray-400">{'    '}steps:</p>
              <p className="text-gray-500">{'      '}- name: Checkout repository</p>
              <p className="text-gray-500">{'        '}uses: actions/checkout@v4</p>
              <p className="text-gray-500">{'        '}</p>
              <p className="text-gray-500">{'      '}- name: Set up Python</p>
              <p className="text-gray-500">{'        '}uses: actions/setup-python@v5</p>
              <p className="text-gray-500">{'        '}with:</p>
              <p className="text-gray-500">{'          '}python-version: '3.11'</p>
              <p className="text-gray-500">{'        '}</p>
              <p className="text-gray-500">{'      '}- name: Install dependencies</p>
              <p className="text-gray-500">{'        '}run: |</p>
              <p className="text-gray-500">{'          '}python -m pip install --upgrade pip</p>
              <p className="text-gray-500">{'          '}pip install -r requirements.txt</p>
              <p className="text-gray-500">{'        '}</p>
              <p className="text-gray-500">{'      '}- name: Run bot</p>
              <p className="text-gray-500">{'        '}env:</p>
              <p className="text-yellow-400">{'          '}BOT_TOKEN: {'${{ secrets.BOT_TOKEN }}'}</p>
              <p className="text-yellow-400">{'          '}CHAT_IDS: {'${{ secrets.CHAT_IDS }}'}</p>
              <p className="text-gray-500">{'        '}run: python bot.py</p>
            </div>
            <p className="text-gray-500 text-xs">
              ↑ Вставь сюда содержимое файла bot.yml
            </p>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={6}>
          <li>
            Прокрути вниз до раздела <b className="text-white">"Commit new file"</b>
          </li>
          <li>
            Нажми зелёную кнопку <ClickTarget>Commit new file</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Commit new file">
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Commit message</label>
              <div className="bg-[#010409] border border-white/20 rounded px-3 py-2 text-white text-sm">
                Add workflow file
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md font-medium text-sm">
              Commit new file
            </button>
          </div>
        </GitHubMockup>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Отлично!</b> Файл workflow создан. GitHub Actions теперь знает, как запускать бота.
          </p>
        </div>

        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-purple-300 text-sm">
            💡 <b>Что происходит:</b> Теперь каждые 30 минут GitHub будет автоматически:
          </p>
          <ul className="text-purple-200 text-sm mt-2 space-y-1 ml-4">
            <li>• Запускать Python</li>
            <li>• Устанавливать библиотеки из requirements.txt</li>
            <li>• Запускать bot.py</li>
            <li>• Бот проверяет сайты и отправляет уведомления</li>
          </ul>
        </div>
      </StepCard>

      {/* Step 7 */}
      <StepCard number={7} title="Добавь секреты (токен и Chat ID)">
        <p>GitHub хранит токены безопасно в "Secrets" — это как сейф для паролей.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">🔐 Что такое Secrets?</p>
          <p className="text-indigo-200 text-sm">
            Это безопасное хранилище для токенов и паролей. GitHub шифрует их,
            и никто не сможет их увидеть (даже ты после сохранения).
          </p>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📍 Куда добавлять секреты:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            Открой свой репозиторий на GitHub
          </li>

          <li>
            Вверху найди вкладку <ClickTarget>Settings</ClickTarget> (шестерёнка ⚙️)
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot">
          <div className="flex gap-4 text-sm border-b border-white/10 pb-2">
            <span className="text-gray-400">Code</span>
            <span className="text-gray-400">Issues</span>
            <span className="text-gray-400">Pull requests</span>
            <span className="text-gray-400">Actions</span>
            <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-3 py-1 text-yellow-300 font-bold">
              Settings ⚙️
            </span>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-4" start={3}>
          <li>
            В меню слева прокрути вниз и найди <ClickTarget>Secrets and variables</ClickTarget>
          </li>
          <li>
            Нажми на стрелочку ▾ и выбери <ClickTarget>Actions</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Settings — Secrets and variables">
          <div className="space-y-2">
            <div className="text-gray-400 text-sm space-y-1">
              <p>General</p>
              <p>Access</p>
              <p>...</p>
              <p className="bg-yellow-500/20 border border-yellow-500/60 rounded px-2 py-1 text-yellow-300 font-bold">
                Secrets and variables ▾
              </p>
              <p className="ml-4 bg-yellow-500/20 border border-yellow-500/60 rounded px-2 py-1 text-yellow-300 font-bold">
                → Actions
              </p>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-4" start={5}>
          <li>
            Нажми зелёную кнопку <ClickTarget>New repository secret</ClickTarget>
          </li>
        </ol>

        <div className="mt-6 p-4 bg-[#161b22] border border-white/10 rounded-xl">
          <p className="text-white font-semibold mb-4">🔑 Создай 2 секрета (по очереди):</p>

          {/* Секрет 1 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span className="text-white font-medium">Секрет: BOT_TOKEN</span>
            </div>

            <GitHubMockup title="New secret — BOT_TOKEN">
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Name:</label>
                  <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 font-mono text-yellow-300 font-bold">
                    BOT_TOKEN
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Value:</label>
                  <div className="bg-[#010409] border-2 border-green-500/60 rounded px-3 py-2 font-mono text-green-400 text-sm">
                    1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
                  </div>
                  <p className="text-gray-500 text-xs mt-1">↑ Вставь токен из шага 2</p>
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">
                  Add secret
                </button>
              </div>
            </GitHubMockup>
          </div>

          {/* Секрет 2 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span className="text-white font-medium">Секрет: CHAT_IDS</span>
            </div>

            <GitHubMockup title="New secret — CHAT_IDS">
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Name:</label>
                  <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 font-mono text-yellow-300 font-bold">
                    CHAT_IDS
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Value:</label>
                  <div className="bg-[#010409] border-2 border-green-500/60 rounded px-3 py-2 font-mono text-green-400 text-sm">
                    123456789
                  </div>
                  <p className="text-gray-500 text-xs mt-1">↑ Вставь Chat ID из шага 3</p>
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">
                  Add secret
                </button>
              </div>
            </GitHubMockup>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Готово!</b> После добавления обоих секретов бот сможет работать.
          </p>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">
            💡 <b>Несколько Chat ID?</b> Если хочешь отправлять сообщения нескольким людям,
            раздели их запятыми:<br />
            <code className="bg-black/30 px-2 py-0.5 rounded text-xs mt-1 inline-block">123456789,987654321,555666777</code>
          </p>
        </div>
      </StepCard>

      {/* Step 8 */}
      <StepCard number={8} title="Готово! Бот работает 🎉">
        <p>
          Workflow уже запущен! Он будет автоматически выполняться каждые 30 минут.
        </p>

        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <p className="text-green-300 font-bold mb-2">✅ Что происходит:</p>
          <ul className="space-y-1 text-sm text-green-200">
            <li>• Каждые 30 минут GitHub запускает Python-скрипт</li>
            <li>• Скрипт проверяет сайты площадок</li>
            <li>• Если есть новые события — отправляет в Telegram</li>
            <li>• Работает 24/7, даже когда компьютер выключен</li>
          </ul>
        </div>

        <p className="mt-4">Чтобы проверить, что всё работает:</p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li>
            В репозитории нажми вкладку <ClickTarget>Actions</ClickTarget>
          </li>
          <li>Увидишь список запусков — зелёная галочка ✅ = всё хорошо</li>
          <li>
            Можно запустить вручную: <ClickTarget>Run workflow</ClickTarget> → <ClickTarget>Run workflow</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot/actions">
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-[#161b22] border border-white/10 rounded-lg p-3">
              <span className="text-green-400">✓</span>
              <span className="text-white text-sm">Culture Events Bot</span>
              <span className="text-gray-500 text-xs">#1</span>
              <span className="text-gray-400 text-xs ml-auto">2 minutes ago</span>
            </div>
            <div className="flex items-center gap-3 bg-[#161b22] border border-white/10 rounded-lg p-3">
              <span className="text-green-400">✓</span>
              <span className="text-white text-sm">Culture Events Bot</span>
              <span className="text-gray-500 text-xs">#2</span>
              <span className="text-gray-400 text-xs ml-auto">32 minutes ago</span>
            </div>
          </div>
        </GitHubMockup>

        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <p className="text-purple-300 font-bold mb-2">📱 Что ты получишь в Telegram:</p>
          <TelegramMockup>
            <TelegramMessage text="🆕 Новое событие!&#10;&#10;📍 🎨 Третьяковская галерея&#10;🎭 Выставка «Авангард в трёх актах»&#10;📅 15 марта 2026&#10;&#10;🔗 Подробнее" />
          </TelegramMockup>
        </div>
      </StepCard>

      {/* How it all connects */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-cyan-500">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">🔗</span> Как всё связано между собой?
        </h2>

        <div className="bg-black/30 rounded-xl p-6 my-6">
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                📁 bot.py
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Код бота (что делать)</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                📦 requirements.txt
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Список библиотек (requests, beautifulsoup4)</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                ⚙️ .github/workflows/bot.yml
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Инструкция для GitHub (когда и как запускать)</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-yellow-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                🔐 Secrets
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Токен бота и Chat ID (секретные данные)</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
          <p className="text-cyan-300 font-semibold mb-3">🔄 Как работает автоматизация:</p>
          <div className="space-y-3 text-sm text-cyan-200">
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <div>
                <b>GitHub Actions</b> читает файл <code className="bg-black/30 px-1 rounded">bot.yml</code> каждые 30 минут
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <div>
                Запускает виртуальную машину с <b>Python</b>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <div>
                Устанавливает библиотеки из <code className="bg-black/30 px-1 rounded">requirements.txt</code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
              <div>
                Запускает <code className="bg-black/30 px-1 rounded">bot.py</code> с секретами (BOT_TOKEN, CHAT_IDS)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
              <div>
                Бот проверяет сайты и отправляет уведомления в <b>Telegram</b>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">📂 Структура проекта</h3>
            <div className="bg-black/30 rounded p-3 font-mono text-xs">
              <p className="text-gray-400">culture-bot/</p>
              <p className="text-white ml-4">├── .github/</p>
              <p className="text-white ml-8">│   └── workflows/</p>
              <p className="text-purple-400 ml-12">│       └── bot.yml</p>
              <p className="text-blue-400 ml-4">├── bot.py</p>
              <p className="text-green-400 ml-4">├── requirements.txt</p>
              <p className="text-gray-400 ml-4">└── README.md</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🔐 Секреты (Secrets)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <code className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded text-xs">BOT_TOKEN</code>
                <span className="text-gray-400">= токен от @BotFather</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded text-xs">CHAT_IDS</code>
                <span className="text-gray-400">= твой Chat ID</span>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Хранятся в Settings → Secrets and variables → Actions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-purple-500">
        <h2 className="text-2xl font-bold text-white mb-4">❓ Частые вопросы</h2>
        <div className="space-y-5">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">🤔 Где взять Chat ID?</p>
            <div className="text-sm text-gray-300 space-y-2">
              <p>В Telegram найди бота <code className="bg-black/30 px-1 rounded">@userinfobot</code> и напиши ему <code className="bg-black/30 px-1 rounded">/start</code></p>
              <p>Он пришлёт твой ID — это число после <b className="text-yellow-400">Id:</b></p>
              <TelegramMockup>
                <TelegramMessage text="/start" isUser />
                <TelegramMessage text="Id: 123456789&#10;First: Иван&#10;Lang: ru" />
              </TelegramMockup>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">🔐 Куда добавлять токен и Chat ID?</p>
            <div className="text-sm text-gray-300 space-y-2">
              <p><b>В GitHub Secrets:</b></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Репозиторий → <b>Settings</b> (вверху)</li>
                <li>Слева: <b>Secrets and variables</b> → <b>Actions</b></li>
                <li>Нажми <b>New repository secret</b></li>
                <li>Создай два секрета:</li>
              </ol>
              <div className="mt-2 space-y-2 ml-4">
                <div className="bg-black/30 rounded p-2">
                  <p><b className="text-yellow-400">BOT_TOKEN</b> = токен от @BotFather</p>
                </div>
                <div className="bg-black/30 rounded p-2">
                  <p><b className="text-yellow-400">CHAT_IDS</b> = твой Chat ID</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">👥 Можно добавить несколько получателей?</p>
            <div className="text-sm text-gray-300">
              <p>Да! В секрете <code className="bg-black/30 px-1 rounded">CHAT_IDS</code> укажи несколько ID через запятую:</p>
              <code className="bg-black/30 px-2 py-1 rounded text-xs mt-2 inline-block">123456789,987654321,555666777</code>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">🔗 Можно добавить свои сайты для мониторинга?</p>
            <div className="text-sm text-gray-300">
              <p>Да! Создай секрет <code className="bg-black/30 px-1 rounded">CUSTOM_URLS</code> и укажи ссылки через запятую:</p>
              <code className="bg-black/30 px-2 py-1 rounded text-xs mt-2 inline-block">https://theatre1.ru/afisha,https://museum2.ru/events</code>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-yellow-500">
        <h2 className="text-2xl font-bold text-white mb-4">🔍 Если что-то не так</h2>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold">❌ Ошибка в Actions</p>
            <p className="text-sm mt-1 text-gray-400">
              Вкладка Actions → клик на красный запуск → смотри логи.
              Частая ошибка: не заполнены Secrets.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold">❌ Бот не пишет в Telegram</p>
            <p className="text-sm mt-1 text-gray-400">
              Проверь: 1) Токен правильный? 2) Chat ID верный? 3) Ты написал боту /start?
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold">❌ Сайт не парсится</p>
            <p className="text-sm mt-1 text-gray-400">
              Некоторые сайты блокируют автоматические запросы. Это нормально — бот продолжит работать с другими.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-green-500">
        <h2 className="text-2xl font-bold text-white mb-4">✅ Итого</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: '📥', title: 'Скачал файлы', desc: 'bot.py, requirements.txt, bot.yml' },
            { icon: '🤖', title: 'Создал бота', desc: 'через @BotFather' },
            { icon: '🆔', title: 'Узнал Chat ID', desc: 'через @userinfobot' },
            { icon: '📦', title: 'Создал репозиторий', desc: 'на GitHub' },
            { icon: '📤', title: 'Загрузил файлы', desc: 'bot.py + requirements.txt' },
            { icon: '⚙️', title: 'Настроил workflow', desc: '.github/workflows/bot.yml' },
            { icon: '🔐', title: 'Добавил секреты', desc: 'BOT_TOKEN + CHAT_IDS' },
            { icon: '🎉', title: 'Готово!', desc: 'Бот работает 24/7' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Code Section ===== */

function CodeSection({ downloadFile }: { downloadFile: (c: string, f: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-3">💻 Код бота</h2>
        <p className="text-gray-300 mb-4">
          Все файлы для настройки бота — скачай по одному или все вместе:
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          <a href="/bot-files/bot.py" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 bot.py
          </a>
          <a href="/bot-files/requirements.txt" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 requirements.txt
          </a>
          <a href="/bot-files/bot.yml" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 bot.yml
          </a>
          <a href="/bot-files/README.md" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 README.md
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          Или скопируй код ниже и сохрани вручную.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 bot.py — основной скрипт</h3>
        <CodeBlock code={pythonCode} filename="bot.py" language="python" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 requirements.txt — зависимости</h3>
        <CodeBlock code={requirementsCode} filename="requirements.txt" language="text" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 bot.yml — настройка GitHub Actions</h3>
        <p className="text-gray-400 text-sm mb-3">
          Этот файл кладётся в папку <code className="bg-black/30 px-1 rounded">.github/workflows/</code>
        </p>
        <CodeBlock code={workflowCode} filename=".github/workflows/bot.yml" language="yaml" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 README.md — описание</h3>
        <CodeBlock code={readmeCode} filename="README.md" language="markdown" />
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-3">🏗 Структура проекта</h3>
        <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
          <p className="text-gray-400">culture-bot/</p>
          <p className="text-white ml-4">├── .github/</p>
          <p className="text-white ml-8">│   └── workflows/</p>
          <p className="text-yellow-400 ml-12">│       └── bot.yml</p>
          <p className="text-green-400 ml-4">├── bot.py</p>
          <p className="text-green-400 ml-4">├── requirements.txt</p>
          <p className="text-gray-400 ml-4">└── README.md</p>
        </div>
      </div>
    </div>
  );
}

export default App;


+++ src/App.tsx (修改后)
import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import CodeBlock from './components/CodeBlock';
import StepCard from './components/StepCard';
import DetailedGuide from './DetailedGuide';
import QuickStart from './QuickStart';
import { pythonCode, workflowCode, requirementsCode, readmeCode } from './data/githubActionsCode';

function App() {
  const [activeTab, setActiveTab] = useState<'quick' | 'guide' | 'code' | 'detailed'>('quick');

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    zip.file('bot.py', pythonCode);
    zip.file('requirements.txt', requirementsCode);
    zip.folder('.github')!.folder('workflows')!.file('bot.yml', workflowCode);
    zip.file('README.md', readmeCode);

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'culture-bot.zip');
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <div className="float-animation inline-block mb-6">
              <div className="text-7xl md:text-8xl">🤖</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              <span className="gradient-text">Telegram Бот</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              Монитор культурных событий
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Автоматически проверяет афиши и уведомляет о новых событиях.
              Работает через <b className="text-white">GitHub Actions</b> — бесплатно и 24/7.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
                <span className="pulse-dot w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-green-400 text-sm">Работает в России</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2">
                <span className="text-blue-400 text-sm">💻 Не нужен Python</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2">
                <span className="text-purple-400 text-sm">🆓 Бесплатно</span>
              </div>
            </div>

            {/* Venue cards */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['🎨 Третьяковка', '🎵 Зарядье', '🩰 Большой театр', '🖼 ГЭС-2', '🎭 Ленком'].map(v => (
                <div key={v} className="glass-card px-4 py-2 text-sm text-gray-300">{v}</div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={downloadAll}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
              >
                📥 Скачать все файлы (ZIP)
              </button>
              <a
                href="/bot-files/bot.py"
                download
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 py-3 rounded-xl transition-all"
              >
                📄 bot.py
              </a>
              <a
                href="/bot-files/requirements.txt"
                download
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 py-3 rounded-xl transition-all"
              >
                📄 requirements.txt
              </a>
              <a
                href="/bot-files/bot.yml"
                download
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 py-3 rounded-xl transition-all"
              >
                📄 bot.yml
              </a>
            </div>

            {/* Tabs */}
            <div className="inline-flex bg-white/5 rounded-xl p-1 border border-white/10 flex-wrap justify-center">
              <button
                onClick={() => setActiveTab('quick')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'quick'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ⚡ Быстрый старт (3 шага)
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'guide'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📖 Инструкция
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'detailed'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📚 Подробно (каждый клик)
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                💻 Код
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {activeTab === 'quick' ? (
          <QuickStart />
        ) : activeTab === 'guide' ? (
          <GuideSection downloadFile={downloadFile} downloadAll={downloadAll} />
        ) : activeTab === 'detailed' ? (
          <DetailedGuide />
        ) : (
          <CodeSection downloadFile={downloadFile} />
        )}
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>GitHub Actions + Python + Telegram Bot API</p>
      </footer>
    </div>
  );
}

/* ===== Visual components ===== */

function GitHubMockup({ children, title = 'github.com' }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden my-4">
      <div className="bg-[#161b22] px-4 py-2 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="flex-1 bg-[#010409] rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-2">
          🔒 {title}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function TelegramMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#17212b] rounded-xl border border-white/10 overflow-hidden my-4 max-w-sm">
      <div className="bg-[#232e3c] px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm">🤖</div>
        <div>
          <div className="text-white text-sm font-medium">Культурный Бот</div>
          <div className="text-green-400 text-xs">bot</div>
        </div>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

function TelegramMessage({ text, isUser = false }: { text: string; isUser?: boolean }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
        isUser ? 'bg-[#2b5278] text-white rounded-br-sm' : 'bg-[#182533] text-gray-200 rounded-bl-sm'
      }`}>
        {text}
      </div>
    </div>
  );
}

function ClickTarget({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded-md px-2 py-0.5 text-yellow-300 font-bold">
      {children}
    </span>
  );
}

/* ===== Guide Section ===== */

function GuideSection({ downloadAll }: { downloadFile: (c: string, f: string) => void; downloadAll: () => void }) {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-indigo-500">
        <h2 className="text-2xl font-bold text-white mb-4">📚 Что мы будем делать?</h2>
        <div className="text-gray-300 space-y-3">
          <p>
            Создадим бота на <b className="text-white">GitHub Actions</b>. Это значит:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>GitHub работает в России</b></p>
              <p className="text-green-200/70 text-xs">Не нужен VPN</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>Python не нужно ставить</b></p>
              <p className="text-green-200/70 text-xs">Он уже есть в GitHub</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>Бесплатно</b></p>
              <p className="text-green-200/70 text-xs">2000 минут/месяц</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm">✅ <b>24/7</b></p>
              <p className="text-green-200/70 text-xs">Работает без вашего ПК</p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        🚀 8 простых шагов
      </h2>

      {/* Step 1 */}
      <StepCard number={1} title="Скачай файлы бота">
        <p>Скачай все файлы одним архивом или по одному:</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={downloadAll} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg">
            📦 Скачать все файлы (ZIP)
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <a href="/bot-files/bot.py" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 bot.py
          </a>
          <a href="/bot-files/requirements.txt" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 requirements.txt
          </a>
          <a href="/bot-files/bot.yml" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 bot.yml
          </a>
          <a href="/bot-files/README.md" download className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded text-xs">
            📄 README.md
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          <b>ZIP-архив</b> содержит все файлы в правильной структуре папок.
        </p>
        <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-gray-400 text-sm">
            💡 Файлы сохранятся в папку "Загрузки". Потом мы загрузим их на GitHub.
          </p>
        </div>
      </StepCard>

      {/* Step 2 */}
      <StepCard number={2} title="Создай бота в Telegram">
        <ol className="list-decimal list-inside space-y-3">
          <li>Открой Telegram, найди <b className="text-white">@BotFather</b></li>
          <li>Напиши <ClickTarget>/newbot</ClickTarget></li>
          <li>Придумай имя: <b className="text-white">Мой Культурный Бот</b></li>
          <li>Придумай username (обязан заканчиваться на <b>bot</b>): <b className="text-white">my_culture_bot</b></li>
          <li>Скопируй <b className="text-indigo-400">ТОКЕН</b> — длинная строка типа <code className="bg-black/30 px-1 rounded text-xs">123456:ABC...</code></li>
        </ol>

        <TelegramMockup>
          <TelegramMessage text="/newbot" isUser />
          <TelegramMessage text="Alright, a new bot. Let's give it a name." />
          <TelegramMessage text="Мой Культурный Бот" isUser />
          <TelegramMessage text="my_culture_bot" isUser />
          <TelegramMessage text="✅ Done! Token: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz" />
        </TelegramMockup>

        <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
          <p className="text-indigo-300 text-sm">
            🔑 <b>Сохрани токен!</b> Понадобится на шаге 6.
          </p>
        </div>
      </StepCard>

      {/* Step 3 */}
      <StepCard number={3} title="Узнай свой Chat ID">
        <p>Чтобы бот знал, <b className="text-white">кому</b> отправлять сообщения, нужен твой Chat ID.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">🤔 Что такое Chat ID?</p>
          <p className="text-indigo-200 text-sm">
            Это уникальный номер твоего аккаунта в Telegram. По нему бот понимает,
            именно тебе отправлять сообщения.
          </p>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📱 Как получить Chat ID:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            Открой Telegram и в поиске найди бота:
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-black/30 px-3 py-1.5 rounded font-mono text-green-400">@userinfobot</span>
            </div>
          </li>

          <li>
            Нажми <ClickTarget>Start</ClickTarget> или напиши <ClickTarget>/start</ClickTarget>
          </li>

          <li>
            Бот пришлёт сообщение с твоим ID:
          </li>
        </ol>

        <TelegramMockup>
          <TelegramMessage text="/start" isUser />
          <TelegramMessage text="Id: 123456789&#10;First: Иван&#10;Last: Иванов&#10;Lang: ru" />
        </TelegramMockup>

        <ol className="list-decimal list-inside space-y-4 mt-4" start={4}>
          <li>
            Найди в сообщении строку <b className="text-yellow-400">Id:</b> и скопируй число после неё
          </li>
        </ol>

        <div className="mt-4 bg-black/30 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-2">Пример:</p>
          <div className="font-mono text-sm">
            <span className="text-gray-500">Id: </span>
            <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-2 py-0.5 text-yellow-300 font-bold">
              123456789
            </span>
            <span className="text-gray-600 text-xs ml-2">← это и есть Chat ID</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Скопируй этот номер</b> — он понадобится на шаге 7.
          </p>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">
            💡 <b>Если хочешь добавить несколько получателей</b> (например, себя и друга):<br />
            Пусть каждый узнает свой Chat ID через @userinfobot, а потом объедините их через запятую:<br />
            <code className="bg-black/30 px-2 py-0.5 rounded text-xs mt-1 inline-block">123456789,987654321</code>
          </p>
        </div>
      </StepCard>

      {/* Step 4 */}
      <StepCard number={4} title="Создай репозиторий на GitHub">
        <p>Репозиторий — это как папка в облаке, где будет жить код бота.</p>

        <ol className="list-decimal list-inside space-y-4 mt-4">
          <li>
            Открой{' '}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-semibold">
              github.com
            </a>{' '}
            и войди в аккаунт (или зарегистрируйся — это бесплатно)
          </li>

          <li>
            В правом верхнем углу найди кнопку <ClickTarget>+</ClickTarget> (плюс)
          </li>

          <li>
            В выпадающем меню выбери <ClickTarget>New repository</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="github.com">
          <div className="flex justify-end gap-4 items-center">
            <span className="text-gray-400 text-sm">...</span>
            <div className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-3 py-1 text-yellow-300 font-bold">
              + ▾
            </div>
            <div className="absolute mt-8 right-4 bg-[#161b22] border border-white/20 rounded-lg p-2 shadow-xl">
              <div className="text-gray-300 text-sm space-y-1">
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">New repository</p>
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">Import repository</p>
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">New gist</p>
              </div>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={4}>
          <li>Заполни форму создания репозитория:</li>
        </ol>

        <GitHubMockup title="github.com/new">
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Repository name *</label>
              <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 text-white text-sm">
                culture-bot
              </div>
              <p className="text-gray-500 text-xs mt-1">↑ Придумай любое название</p>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Visibility</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/60 rounded px-3 py-2 cursor-pointer">
                  <input type="radio" checked className="accent-blue-500" />
                  <span className="text-white text-sm font-medium">Public</span>
                  <span className="text-gray-400 text-xs">— все видят</span>
                </label>
                <label className="flex items-center gap-2 text-gray-500">
                  <input type="radio" className="accent-blue-500" />
                  <span className="text-sm">Private</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Initialize this repository with:</label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked className="accent-green-500" />
                <span className="text-green-400 text-sm">Add a README file</span>
              </label>
            </div>

            <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md font-medium text-sm">
              Create repository
            </button>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={5}>
          <li>
            Нажми зелёную кнопку <ClickTarget>Create repository</ClickTarget>
          </li>
        </ol>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Готово!</b> Репозиторий создан. Теперь загрузим в него файлы.
          </p>
        </div>
      </StepCard>

      {/* Step 5 */}
      <StepCard number={5} title="Загрузи файлы в репозиторий">
        <p>Теперь загрузим скачанные файлы в репозиторий.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">📦 Какие файлы загружать?</p>
          <div className="text-indigo-200 text-sm space-y-1">
            <p>✅ <b>bot.py</b> — основной код бота</p>
            <p>✅ <b>requirements.txt</b> — список библиотек</p>
            <p>✅ <b>README.md</b> — описание (если скачал)</p>
            <p className="text-yellow-400">⚠️ <b>bot.yml</b> — пока НЕ загружай (он пойдёт в специальную папку)</p>
          </div>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📤 Как загрузить файлы:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            В репозитории найди кнопку <ClickTarget>Add file</ClickTarget> (над списком файлов)
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot">
          <div className="space-y-3">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <span className="text-gray-400 text-sm">📁 culture-bot /</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#21262d] border border-white/20 text-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-2 py-0.5 text-yellow-300 font-bold">
                  Add file ▾
                </span>
              </button>
              <span className="text-yellow-400 text-xs self-center">← нажми сюда</span>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={2}>
          <li>
            В выпадающем меню выбери <ClickTarget>Upload files</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Upload files">
          <div className="bg-[#161b22] border border-white/10 rounded-lg p-6">
            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">📁</div>
              <p className="text-gray-300 text-sm mb-2">Drag files here or</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                choose your files
              </button>
              <p className="text-gray-500 text-xs mt-3">
                Или перетащи файлы из папки "Загрузки"
              </p>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={3}>
          <li>
            Откроется страница загрузки. Найди файлы в папке <b className="text-white">"Загрузки"</b>:
          </li>
        </ol>

        <div className="mt-2 bg-black/30 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-2">📁 Загрузки:</p>
          <div className="space-y-1 font-mono text-sm">
            <p className="text-green-400">📄 bot.py</p>
            <p className="text-green-400">📄 requirements.txt</p>
            <p className="text-green-400">📄 README.md</p>
            <p className="text-gray-500">📄 bot.yml <span className="text-xs">(пока не трогай)</span></p>
          </div>
        </div>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={4}>
          <li>
            <b>Перетащи файлы</b> в область загрузки или нажми <b className="text-white">"choose your files"</b> и выбери их
          </li>
        </ol>

        <GitHubMockup title="Uploading files">
          <div className="bg-[#161b22] border border-white/10 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-[#010409] rounded p-3">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm flex-1">bot.py</span>
                <span className="text-gray-500 text-xs">12 KB</span>
              </div>
              <div className="flex items-center gap-3 bg-[#010409] rounded p-3">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm flex-1">requirements.txt</span>
                <span className="text-gray-500 text-xs">1 KB</span>
              </div>
              <div className="flex items-center gap-3 bg-[#010409] rounded p-3">
                <span className="text-green-400">✓</span>
                <span className="text-white text-sm flex-1">README.md</span>
                <span className="text-gray-500 text-xs">3 KB</span>
              </div>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={5}>
          <li>
            Прокрути вниз до раздела <b className="text-white">"Commit changes"</b>
          </li>
          <li>
            В поле описания напиши: <ClickTarget>Add bot files</ClickTarget>
          </li>
          <li>
            Нажми зелёную кнопку <ClickTarget>Commit changes</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Commit changes">
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Commit message</label>
              <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 text-white text-sm">
                Add bot files
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md font-medium text-sm">
              Commit changes
            </button>
          </div>
        </GitHubMockup>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Файлы загружены!</b> Теперь они видны в репозитории.
          </p>
        </div>
      </StepCard>

      {/* Step 6 */}
      <StepCard number={6} title="Создай папку для workflow и загрузи bot.yml">
        <p>GitHub Actions требует, чтобы файл настройки лежал в специальной папке.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">📂 Структура папок:</p>
          <div className="bg-black/30 rounded-lg p-3 font-mono text-sm">
            <p className="text-gray-400">culture-bot/</p>
            <p className="text-white ml-4">├── .github/</p>
            <p className="text-white ml-8">│   └── workflows/</p>
            <p className="text-yellow-400 ml-12">│       └── bot.yml <span className="text-gray-500 text-xs">← сюда</span></p>
            <p className="text-green-400 ml-4">├── bot.py <span className="text-gray-500 text-xs">← уже загружен</span></p>
            <p className="text-green-400 ml-4">├── requirements.txt <span className="text-gray-500 text-xs">← уже загружен</span></p>
            <p className="text-green-400 ml-4">└── README.md <span className="text-gray-500 text-xs">← уже загружен</span></p>
          </div>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📝 Как создать файл bot.yml:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            В репозитории нажми <ClickTarget>Add file</ClickTarget> → <ClickTarget>Create new file</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot">
          <div className="flex gap-2">
            <button className="bg-[#21262d] border border-white/20 text-gray-300 px-4 py-2 rounded-md text-sm">
              Add file ▾
            </button>
            <div className="absolute mt-10 bg-[#161b22] border border-white/20 rounded-lg p-2 shadow-xl">
              <div className="text-gray-300 text-sm space-y-1">
                <p className="bg-yellow-500/20 border border-yellow-500/60 rounded px-3 py-1 text-yellow-300 font-bold">
                  Create new file ← выбери это
                </p>
                <p className="hover:bg-white/10 px-3 py-1 rounded cursor-pointer">Upload files</p>
              </div>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={2}>
          <li>
            Откроется редактор. В поле <b className="text-white">"Name your file..."</b> напиши:
          </li>
        </ol>

        <GitHubMockup title="New file">
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Name your file...</label>
              <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 font-mono text-yellow-300 font-bold text-sm">
                .github/workflows/bot.yml
              </div>
              <p className="text-gray-500 text-xs mt-1">
                ↑ Важно: именно так, с точками и слэшами! GitHub автоматически создаст папки.
              </p>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={3}>
          <li>
            Открой скачанный файл <code className="bg-black/30 px-1 rounded">bot.yml</code> в любом текстовом редакторе (Блокнот, TextEdit)
          </li>
          <li>
            <b>Выдели всё</b> (Ctrl+A или Cmd+A) и <b>скопируй</b> (Ctrl+C или Cmd+C)
          </li>
          <li>
            <b>Вставь</b> (Ctrl+V или Cmd+V) в большое текстовое поле на GitHub
          </li>
        </ol>

        <GitHubMockup title="Edit new file">
          <div className="space-y-3">
            <div className="bg-[#010409] border border-white/10 rounded p-4 font-mono text-xs">
              <p className="text-purple-400">name: Culture Events Bot</p>
              <p className="text-gray-400"></p>
              <p className="text-gray-400">on:</p>
              <p className="text-gray-400">{'  '}schedule:</p>
              <p className="text-green-400">{'    '}- cron: '*/30 * * * *'</p>
              <p className="text-gray-400">{'  '}workflow_dispatch:</p>
              <p className="text-gray-400"></p>
              <p className="text-gray-400">jobs:</p>
              <p className="text-gray-400">{'  '}check-events:</p>
              <p className="text-gray-400">{'    '}runs-on: ubuntu-latest</p>
              <p className="text-gray-500">{'    '}</p>
              <p className="text-gray-400">{'    '}steps:</p>
              <p className="text-gray-500">{'      '}- name: Checkout repository</p>
              <p className="text-gray-500">{'        '}uses: actions/checkout@v4</p>
              <p className="text-gray-500">{'        '}</p>
              <p className="text-gray-500">{'      '}- name: Set up Python</p>
              <p className="text-gray-500">{'        '}uses: actions/setup-python@v5</p>
              <p className="text-gray-500">{'        '}with:</p>
              <p className="text-gray-500">{'          '}python-version: '3.11'</p>
              <p className="text-gray-500">{'        '}</p>
              <p className="text-gray-500">{'      '}- name: Install dependencies</p>
              <p className="text-gray-500">{'        '}run: |</p>
              <p className="text-gray-500">{'          '}python -m pip install --upgrade pip</p>
              <p className="text-gray-500">{'          '}pip install -r requirements.txt</p>
              <p className="text-gray-500">{'        '}</p>
              <p className="text-gray-500">{'      '}- name: Run bot</p>
              <p className="text-gray-500">{'        '}env:</p>
              <p className="text-yellow-400">{'          '}BOT_TOKEN: {'${{ secrets.BOT_TOKEN }}'}</p>
              <p className="text-yellow-400">{'          '}CHAT_IDS: {'${{ secrets.CHAT_IDS }}'}</p>
              <p className="text-gray-500">{'        '}run: python bot.py</p>
            </div>
            <p className="text-gray-500 text-xs">
              ↑ Вставь сюда содержимое файла bot.yml
            </p>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-6" start={6}>
          <li>
            Прокрути вниз до раздела <b className="text-white">"Commit new file"</b>
          </li>
          <li>
            Нажми зелёную кнопку <ClickTarget>Commit new file</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Commit new file">
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Commit message</label>
              <div className="bg-[#010409] border border-white/20 rounded px-3 py-2 text-white text-sm">
                Add workflow file
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md font-medium text-sm">
              Commit new file
            </button>
          </div>
        </GitHubMockup>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Отлично!</b> Файл workflow создан. GitHub Actions теперь знает, как запускать бота.
          </p>
        </div>

        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-purple-300 text-sm">
            💡 <b>Что происходит:</b> Теперь каждые 30 минут GitHub будет автоматически:
          </p>
          <ul className="text-purple-200 text-sm mt-2 space-y-1 ml-4">
            <li>• Запускать Python</li>
            <li>• Устанавливать библиотеки из requirements.txt</li>
            <li>• Запускать bot.py</li>
            <li>• Бот проверяет сайты и отправляет уведомления</li>
          </ul>
        </div>
      </StepCard>

      {/* Step 7 */}
      <StepCard number={7} title="Добавь секреты (токен и Chat ID)">
        <p>GitHub хранит токены безопасно в "Secrets" — это как сейф для паролей.</p>

        <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-indigo-300 font-semibold mb-2">🔐 Что такое Secrets?</p>
          <p className="text-indigo-200 text-sm">
            Это безопасное хранилище для токенов и паролей. GitHub шифрует их,
            и никто не сможет их увидеть (даже ты после сохранения).
          </p>
        </div>

        <h4 className="text-white font-semibold mt-6 mb-3">📍 Куда добавлять секреты:</h4>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            Открой свой репозиторий на GitHub
          </li>

          <li>
            Вверху найди вкладку <ClickTarget>Settings</ClickTarget> (шестерёнка ⚙️)
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot">
          <div className="flex gap-4 text-sm border-b border-white/10 pb-2">
            <span className="text-gray-400">Code</span>
            <span className="text-gray-400">Issues</span>
            <span className="text-gray-400">Pull requests</span>
            <span className="text-gray-400">Actions</span>
            <span className="bg-yellow-500/20 border-2 border-dashed border-yellow-500/60 rounded px-3 py-1 text-yellow-300 font-bold">
              Settings ⚙️
            </span>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-4" start={3}>
          <li>
            В меню слева прокрути вниз и найди <ClickTarget>Secrets and variables</ClickTarget>
          </li>
          <li>
            Нажми на стрелочку ▾ и выбери <ClickTarget>Actions</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="Settings — Secrets and variables">
          <div className="space-y-2">
            <div className="text-gray-400 text-sm space-y-1">
              <p>General</p>
              <p>Access</p>
              <p>...</p>
              <p className="bg-yellow-500/20 border border-yellow-500/60 rounded px-2 py-1 text-yellow-300 font-bold">
                Secrets and variables ▾
              </p>
              <p className="ml-4 bg-yellow-500/20 border border-yellow-500/60 rounded px-2 py-1 text-yellow-300 font-bold">
                → Actions
              </p>
            </div>
          </div>
        </GitHubMockup>

        <ol className="list-decimal list-inside space-y-4 mt-4" start={5}>
          <li>
            Нажми зелёную кнопку <ClickTarget>New repository secret</ClickTarget>
          </li>
        </ol>

        <div className="mt-6 p-4 bg-[#161b22] border border-white/10 rounded-xl">
          <p className="text-white font-semibold mb-4">🔑 Создай 2 секрета (по очереди):</p>

          {/* Секрет 1 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span className="text-white font-medium">Секрет: BOT_TOKEN</span>
            </div>

            <GitHubMockup title="New secret — BOT_TOKEN">
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Name:</label>
                  <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 font-mono text-yellow-300 font-bold">
                    BOT_TOKEN
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Value:</label>
                  <div className="bg-[#010409] border-2 border-green-500/60 rounded px-3 py-2 font-mono text-green-400 text-sm">
                    1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
                  </div>
                  <p className="text-gray-500 text-xs mt-1">↑ Вставь токен из шага 2</p>
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">
                  Add secret
                </button>
              </div>
            </GitHubMockup>
          </div>

          {/* Секрет 2 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span className="text-white font-medium">Секрет: CHAT_IDS</span>
            </div>

            <GitHubMockup title="New secret — CHAT_IDS">
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Name:</label>
                  <div className="bg-[#010409] border-2 border-yellow-500/60 rounded px-3 py-2 font-mono text-yellow-300 font-bold">
                    CHAT_IDS
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Value:</label>
                  <div className="bg-[#010409] border-2 border-green-500/60 rounded px-3 py-2 font-mono text-green-400 text-sm">
                    123456789
                  </div>
                  <p className="text-gray-500 text-xs mt-1">↑ Вставь Chat ID из шага 3</p>
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">
                  Add secret
                </button>
              </div>
            </GitHubMockup>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ <b>Готово!</b> После добавления обоих секретов бот сможет работать.
          </p>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">
            💡 <b>Несколько Chat ID?</b> Если хочешь отправлять сообщения нескольким людям,
            раздели их запятыми:<br />
            <code className="bg-black/30 px-2 py-0.5 rounded text-xs mt-1 inline-block">123456789,987654321,555666777</code>
          </p>
        </div>
      </StepCard>

      {/* Step 8 */}
      <StepCard number={8} title="Готово! Бот работает 🎉">
        <p>
          Workflow уже запущен! Он будет автоматически выполняться каждые 30 минут.
        </p>

        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <p className="text-green-300 font-bold mb-2">✅ Что происходит:</p>
          <ul className="space-y-1 text-sm text-green-200">
            <li>• Каждые 30 минут GitHub запускает Python-скрипт</li>
            <li>• Скрипт проверяет сайты площадок</li>
            <li>• Если есть новые события — отправляет в Telegram</li>
            <li>• Работает 24/7, даже когда компьютер выключен</li>
          </ul>
        </div>

        <p className="mt-4">Чтобы проверить, что всё работает:</p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li>
            В репозитории нажми вкладку <ClickTarget>Actions</ClickTarget>
          </li>
          <li>Увидишь список запусков — зелёная галочка ✅ = всё хорошо</li>
          <li>
            Можно запустить вручную: <ClickTarget>Run workflow</ClickTarget> → <ClickTarget>Run workflow</ClickTarget>
          </li>
        </ol>

        <GitHubMockup title="github.com/username/culture-bot/actions">
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-[#161b22] border border-white/10 rounded-lg p-3">
              <span className="text-green-400">✓</span>
              <span className="text-white text-sm">Culture Events Bot</span>
              <span className="text-gray-500 text-xs">#1</span>
              <span className="text-gray-400 text-xs ml-auto">2 minutes ago</span>
            </div>
            <div className="flex items-center gap-3 bg-[#161b22] border border-white/10 rounded-lg p-3">
              <span className="text-green-400">✓</span>
              <span className="text-white text-sm">Culture Events Bot</span>
              <span className="text-gray-500 text-xs">#2</span>
              <span className="text-gray-400 text-xs ml-auto">32 minutes ago</span>
            </div>
          </div>
        </GitHubMockup>

        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <p className="text-purple-300 font-bold mb-2">📱 Что ты получишь в Telegram:</p>
          <TelegramMockup>
            <TelegramMessage text="🆕 Новое событие!&#10;&#10;📍 🎨 Третьяковская галерея&#10;🎭 Выставка «Авангард в трёх актах»&#10;📅 15 марта 2026&#10;&#10;🔗 Подробнее" />
          </TelegramMockup>
        </div>
      </StepCard>

      {/* How it all connects */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-cyan-500">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">🔗</span> Как всё связано между собой?
        </h2>

        <div className="bg-black/30 rounded-xl p-6 my-6">
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                📁 bot.py
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Код бота (что делать)</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                📦 requirements.txt
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Список библиотек (requests, beautifulsoup4)</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                ⚙️ .github/workflows/bot.yml
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Инструкция для GitHub (когда и как запускать)</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-yellow-600 text-white px-3 py-2 rounded-lg font-mono text-xs">
                🔐 Secrets
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-gray-300">Токен бота и Chat ID (секретные данные)</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
          <p className="text-cyan-300 font-semibold mb-3">🔄 Как работает автоматизация:</p>
          <div className="space-y-3 text-sm text-cyan-200">
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <div>
                <b>GitHub Actions</b> читает файл <code className="bg-black/30 px-1 rounded">bot.yml</code> каждые 30 минут
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <div>
                Запускает виртуальную машину с <b>Python</b>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <div>
                Устанавливает библиотеки из <code className="bg-black/30 px-1 rounded">requirements.txt</code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
              <div>
                Запускает <code className="bg-black/30 px-1 rounded">bot.py</code> с секретами (BOT_TOKEN, CHAT_IDS)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
              <div>
                Бот проверяет сайты и отправляет уведомления в <b>Telegram</b>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">📂 Структура проекта</h3>
            <div className="bg-black/30 rounded p-3 font-mono text-xs">
              <p className="text-gray-400">culture-bot/</p>
              <p className="text-white ml-4">├── .github/</p>
              <p className="text-white ml-8">│   └── workflows/</p>
              <p className="text-purple-400 ml-12">│       └── bot.yml</p>
              <p className="text-blue-400 ml-4">├── bot.py</p>
              <p className="text-green-400 ml-4">├── requirements.txt</p>
              <p className="text-gray-400 ml-4">└── README.md</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🔐 Секреты (Secrets)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <code className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded text-xs">BOT_TOKEN</code>
                <span className="text-gray-400">= токен от @BotFather</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded text-xs">CHAT_IDS</code>
                <span className="text-gray-400">= твой Chat ID</span>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Хранятся в Settings → Secrets and variables → Actions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-purple-500">
        <h2 className="text-2xl font-bold text-white mb-4">❓ Частые вопросы</h2>
        <div className="space-y-5">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">🤔 Где взять Chat ID?</p>
            <div className="text-sm text-gray-300 space-y-2">
              <p>В Telegram найди бота <code className="bg-black/30 px-1 rounded">@userinfobot</code> и напиши ему <code className="bg-black/30 px-1 rounded">/start</code></p>
              <p>Он пришлёт твой ID — это число после <b className="text-yellow-400">Id:</b></p>
              <TelegramMockup>
                <TelegramMessage text="/start" isUser />
                <TelegramMessage text="Id: 123456789&#10;First: Иван&#10;Lang: ru" />
              </TelegramMockup>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">🔐 Куда добавлять токен и Chat ID?</p>
            <div className="text-sm text-gray-300 space-y-2">
              <p><b>В GitHub Secrets:</b></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Репозиторий → <b>Settings</b> (вверху)</li>
                <li>Слева: <b>Secrets and variables</b> → <b>Actions</b></li>
                <li>Нажми <b>New repository secret</b></li>
                <li>Создай два секрета:</li>
              </ol>
              <div className="mt-2 space-y-2 ml-4">
                <div className="bg-black/30 rounded p-2">
                  <p><b className="text-yellow-400">BOT_TOKEN</b> = токен от @BotFather</p>
                </div>
                <div className="bg-black/30 rounded p-2">
                  <p><b className="text-yellow-400">CHAT_IDS</b> = твой Chat ID</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">👥 Можно добавить несколько получателей?</p>
            <div className="text-sm text-gray-300">
              <p>Да! В секрете <code className="bg-black/30 px-1 rounded">CHAT_IDS</code> укажи несколько ID через запятую:</p>
              <code className="bg-black/30 px-2 py-1 rounded text-xs mt-2 inline-block">123456789,987654321,555666777</code>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">🔗 Можно добавить свои сайты для мониторинга?</p>
            <div className="text-sm text-gray-300">
              <p>Да! Создай секрет <code className="bg-black/30 px-1 rounded">CUSTOM_URLS</code> и укажи ссылки через запятую:</p>
              <code className="bg-black/30 px-2 py-1 rounded text-xs mt-2 inline-block">https://theatre1.ru/afisha,https://museum2.ru/events</code>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-yellow-500">
        <h2 className="text-2xl font-bold text-white mb-4">🔍 Если что-то не так</h2>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold">❌ Ошибка в Actions</p>
            <p className="text-sm mt-1 text-gray-400">
              Вкладка Actions → клик на красный запуск → смотри логи.
              Частая ошибка: не заполнены Secrets.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold">❌ Бот не пишет в Telegram</p>
            <p className="text-sm mt-1 text-gray-400">
              Проверь: 1) Токен правильный? 2) Chat ID верный? 3) Ты написал боту /start?
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold">❌ Сайт не парсится</p>
            <p className="text-sm mt-1 text-gray-400">
              Некоторые сайты блокируют автоматические запросы. Это нормально — бот продолжит работать с другими.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-6 md:p-8 border-l-4 border-l-green-500">
        <h2 className="text-2xl font-bold text-white mb-4">✅ Итого</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: '📥', title: 'Скачал файлы', desc: 'bot.py, requirements.txt, bot.yml' },
            { icon: '🤖', title: 'Создал бота', desc: 'через @BotFather' },
            { icon: '🆔', title: 'Узнал Chat ID', desc: 'через @userinfobot' },
            { icon: '📦', title: 'Создал репозиторий', desc: 'на GitHub' },
            { icon: '📤', title: 'Загрузил файлы', desc: 'bot.py + requirements.txt' },
            { icon: '⚙️', title: 'Настроил workflow', desc: '.github/workflows/bot.yml' },
            { icon: '🔐', title: 'Добавил секреты', desc: 'BOT_TOKEN + CHAT_IDS' },
            { icon: '🎉', title: 'Готово!', desc: 'Бот работает 24/7' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Code Section ===== */

function CodeSection({ downloadFile }: { downloadFile: (c: string, f: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-3">💻 Код бота</h2>
        <p className="text-gray-300 mb-4">
          Все файлы для настройки бота — скачай по одному или все вместе:
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          <a href="/bot-files/bot.py" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 bot.py
          </a>
          <a href="/bot-files/requirements.txt" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 requirements.txt
          </a>
          <a href="/bot-files/bot.yml" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 bot.yml
          </a>
          <a href="/bot-files/README.md" download className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
            📥 README.md
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          Или скопируй код ниже и сохрани вручную.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 bot.py — основной скрипт</h3>
        <CodeBlock code={pythonCode} filename="bot.py" language="python" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 requirements.txt — зависимости</h3>
        <CodeBlock code={requirementsCode} filename="requirements.txt" language="text" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 bot.yml — настройка GitHub Actions</h3>
        <p className="text-gray-400 text-sm mb-3">
          Этот файл кладётся в папку <code className="bg-black/30 px-1 rounded">.github/workflows/</code>
        </p>
        <CodeBlock code={workflowCode} filename=".github/workflows/bot.yml" language="yaml" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-3">📄 README.md — описание</h3>
        <CodeBlock code={readmeCode} filename="README.md" language="markdown" />
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-3">🏗 Структура проекта</h3>
        <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
          <p className="text-gray-400">culture-bot/</p>
          <p className="text-white ml-4">├── .github/</p>
          <p className="text-white ml-8">│   └── workflows/</p>
          <p className="text-yellow-400 ml-12">│       └── bot.yml</p>
          <p className="text-green-400 ml-4">├── bot.py</p>
          <p className="text-green-400 ml-4">├── requirements.txt</p>
          <p className="text-gray-400 ml-4">└── README.md</p>
        </div>
      </div>
    </div>
  );
}

export default App;
