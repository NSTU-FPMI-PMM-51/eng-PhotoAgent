// ============================================================
//  APP.JS — вся логика: рендеринг, клики, toggle, статистика
// ============================================================

;(function () {
	'use strict'

	const container = document.getElementById('sentencesContainer')
	const statsEl = document.getElementById('stats')
	const toggleBtn = document.getElementById('toggleAllBtn')

	let allBlocks = []

	// ---- РЕНДЕРИНГ ----
	function render() {
		if (!container) return

		let html = ''

		SENTENCE_DATA.forEach((item, index) => {
			// экранируем кавычки для атрибутов data-*
			const enEscaped = item.en.replace(/"/g, '&quot;')
			html += `
                <div class="sentence-block" data-index="${index}" data-en="${enEscaped}">
                    <div class="en">${item.en}</div>
                    <div class="ru">${item.ru}</div>
                </div>
            `
		})

		container.innerHTML = html

		// собираем все блоки в массив
		allBlocks = Array.from(document.querySelectorAll('.sentence-block'))

		// вешаем обработчики
		allBlocks.forEach(block => {
			block.addEventListener('click', function (e) {
				// игнорируем клик по самому переводу (чтобы не закрывалось при клике внутрь)
				if (e.target.closest('.ru')) return
				this.classList.toggle('active')
				updateStats()
			})
		})

		updateStats()
	}

	// ---- СТАТИСТИКА ----
	function updateStats() {
		if (!statsEl) return
		const total = allBlocks.length
		const active = allBlocks.filter(b => b.classList.contains('active')).length
		statsEl.textContent = `${active} / ${total} показано`
	}

	// ---- TOGGLE ALL ----
	function toggleAll() {
		if (!allBlocks.length) return

		const anyActive = allBlocks.some(b => b.classList.contains('active'))

		if (anyActive) {
			// если есть активные — закрываем все
			allBlocks.forEach(b => b.classList.remove('active'))
			toggleBtn.textContent = '📖 Показать все переводы'
		} else {
			// если все закрыты — открываем все
			allBlocks.forEach(b => b.classList.add('active'))
			toggleBtn.textContent = '📕 Скрыть все переводы'
		}

		updateStats()
	}

	// ---- ПОДПИСКА НА КНОПКУ ----
	if (toggleBtn) {
		toggleBtn.addEventListener('click', toggleAll)
	}

	// ---- ЗАПУСК ----
	document.addEventListener('DOMContentLoaded', render)
})()
