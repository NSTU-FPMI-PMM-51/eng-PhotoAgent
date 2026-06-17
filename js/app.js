// ============================================================
//  APP.JS — рендеринг статьи, обработка кликов, toggle
// ============================================================

;(function () {
	'use strict'

	const container = document.getElementById('articleContent')
	const statsEl = document.getElementById('stats')
	const toggleBtn = document.getElementById('toggleAllBtn')

	// ---- ХРАНИЛИЩЕ ВСЕХ ПРЕДЛОЖЕНИЙ (для статистики) ----
	let allSentences = []

	// ============================================================
	//  РЕНДЕРИНГ СТАТЬИ
	// ============================================================

	function renderArticle() {
		if (!container) return

		let html = ''

		ARTICLE_DATA.sections.forEach(section => {
			if (section.type === 'heading') {
				const tag = section.level === 2 ? 'h2' : 'h3'
				html += `<${tag} class="section-title">${section.text}</${tag}>`
			} else if (section.type === 'paragraph') {
				html += `<div class="paragraph">`
				section.sentences.forEach(sentenceText => {
					// экранируем кавычки
					const safeText = sentenceText.replace(/"/g, '&quot;')
					html += `
                        <span class="sentence" data-en="${safeText}">
                            <span class="en">${sentenceText}</span>
                            <span class="ru"></span>
                        </span>
                    `
				})
				html += `</div>`
			} else if (section.type === 'list') {
				html += `<ol class="ordered-list">`
				section.items.forEach(item => {
					html += `<li class="sentence" data-en="${item.replace(/"/g, '&quot;')}">
                                <span class="en">${item}</span>
                                <span class="ru"></span>
                             </li>`
				})
				html += `</ol>`
			}
		})

		container.innerHTML = html

		// ---- ЗАГРУЖАЕМ ПЕРЕВОДЫ В КАЖДОЕ ПРЕДЛОЖЕНИЕ ----
		// переводы хранятся в отдельном объекте (map) для быстрого доступа
		const translationMap = buildTranslationMap()

		allSentences = Array.from(document.querySelectorAll('.sentence'))

		allSentences.forEach(el => {
			const enText = el.getAttribute('data-en')
			const ruText = translationMap[enText] || '⚠️ перевод не найден'
			const ruSpan = el.querySelector('.ru')
			if (ruSpan) {
				ruSpan.textContent = ruText
			}

			// клик по предложению
			el.addEventListener('click', function (e) {
				// если кликнули по самому переводу — не закрываем
				if (e.target.closest('.ru')) return
				this.classList.toggle('active')
				updateStats()
			})
		})

		updateStats()
	}

	// ============================================================
	//  ПОСТРОЕНИЕ MAP'Ы ПЕРЕВОДОВ
	// ============================================================

	function buildTranslationMap() {
		const map = {}

		// проходим по всем данным и собираем переводы из абзацев и списков
		ARTICLE_DATA.sections.forEach(section => {
			if (section.type === 'paragraph') {
				section.sentences.forEach((en, index) => {
					// перевод берём из того же массива (индекс соответствует)
					// для этого нужно, чтобы в данных были и переводы.
					// Пока что оставляем заглушку — заполним ниже.
				})
			}
			if (section.type === 'list') {
				section.items.forEach((en, index) => {
					// аналогично
				})
			}
		})

		// --- ВРЕМЕННО: заполняем вручную (позже можно вынести в data.js) ---
		// Но правильнее — хранить переводы прямо в data.js.
		// Для этого нужно расширить структуру данных.
		// Сейчас сделаем через отдельный объект.

		// Я добавлю переводы в расширенной версии ниже.
		// Пока возвращаем заглушку.
		return map
	}

	// ============================================================
	//  СТАТИСТИКА
	// ============================================================

	function updateStats() {
		if (!statsEl) return
		const total = allSentences.length
		const active = allSentences.filter(el =>
			el.classList.contains('active'),
		).length
		statsEl.textContent = `${active} / ${total}`
	}

	// ============================================================
	//  TOGGLE ALL
	// ============================================================

	function toggleAll() {
		if (!allSentences.length) return

		const anyActive = allSentences.some(el => el.classList.contains('active'))

		if (anyActive) {
			allSentences.forEach(el => el.classList.remove('active'))
			toggleBtn.textContent = '📖 Показать все переводы'
		} else {
			allSentences.forEach(el => el.classList.add('active'))
			toggleBtn.textContent = '📕 Скрыть все переводы'
		}

		updateStats()
	}

	if (toggleBtn) {
		toggleBtn.addEventListener('click', toggleAll)
	}

	// ============================================================
	//  ЗАПУСК
	// ============================================================

	document.addEventListener('DOMContentLoaded', renderArticle)
})()
