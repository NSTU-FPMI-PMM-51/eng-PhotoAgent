// ============================================================
//  APP.JS — рендеринг, клики, статистика, toggle
// ============================================================

;(function () {
	'use strict'

	const container = document.getElementById('articleContent')
	const statsEl = document.getElementById('stats')
	const toggleBtn = document.getElementById('toggleAllBtn')

	let allSentences = []

	// ============================================================
	//  РЕНДЕРИНГ
	// ============================================================

	function renderArticle() {
		if (!container) return

		let html = ''

		ARTICLE_DATA.sections.forEach(section => {
			if (section.type === 'heading') {
				const tag = section.level === 2 ? 'h2' : 'h3'
				html += `<${tag}>${section.text}</${tag}>`
			} else if (section.type === 'paragraph') {
				html += `<div class="paragraph">`
				section.sentences.forEach(s => {
					const enEscaped = s.en.replace(/"/g, '&quot;')
					const ruEscaped = s.ru.replace(/"/g, '&quot;')
					html += `
                        <span class="sentence" data-en="${enEscaped}" data-ru="${ruEscaped}">
                            <span class="en">${s.en}</span>
                            <span class="ru">${s.ru}</span>
                        </span>
                    `
				})
				html += `</div>`
			} else if (section.type === 'list') {
				html += `<ol class="ordered-list">`
				section.items.forEach(item => {
					const enEscaped = item.en.replace(/"/g, '&quot;')
					const ruEscaped = item.ru.replace(/"/g, '&quot;')
					html += `
                        <li class="sentence" data-en="${enEscaped}" data-ru="${ruEscaped}">
                            <span class="en">${item.en}</span>
                            <span class="ru">${item.ru}</span>
                        </li>
                    `
				})
				html += `</ol>`
			}
		})

		container.innerHTML = html

		allSentences = Array.from(document.querySelectorAll('.sentence'))

		allSentences.forEach(el => {
			el.addEventListener('click', function (e) {
				if (e.target.closest('.ru')) return
				this.classList.toggle('active')
				updateStats()
			})
		})

		updateStats()
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
